import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, where, onSnapshot, Timestamp } from 'firebase/firestore';

export default function SonoScreen() {
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [notes, setNotes] = useState('');
  const [registros, setRegistros] = useState([]);
  const [graficoData, setGraficoData] = useState({ labels: [], datasets: [{ data: [] }] });
  const navigation = useNavigation();

  const salvarSono = async () => {
    if (!sleepTime || !wakeTime) {
      Alert.alert('Atenção', 'Preencha os horários de dormir e acordar.');
      return;
    }

    const usuarioId = auth.currentUser?.uid;
    if (!usuarioId) {
      Alert.alert('Erro', 'Usuário não autenticado. Faça login para salvar.');
      return;
    }

    const createdAt = Timestamp.fromDate(new Date());

    try {
      await addDoc(collection(db, 'sono'), {
        usuarioId,
        sleepTime,
        wakeTime,
        notes,
        createdAt,
      });

      setSleepTime('');
      setWakeTime('');
      setNotes('');
      Alert.alert('Sucesso', 'Registro de sono salvo!');
    } catch (error) {
      console.error("Erro ao salvar sono: ", error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o registro de sono.');
    }
  };

  const calcularHorasSono = (inicio, fim) => {
    try {
      const [hi, mi] = inicio.split(':').map(Number);
      const [hf, mf] = fim.split(':').map(Number);
      let horas = hf - hi;
      let minutos = mf - mi;
      if (minutos < 0) {
        minutos += 60;
        horas--;
      }
      if (horas < 0) horas += 24;
      return +(horas + minutos / 60).toFixed(1);
    } catch (error) {
      console.error("Erro ao calcular horas de sono:", error, "Valores:", inicio, fim);
      return 0;
    }
  };

  useEffect(() => {
    let unsubscribeFirestoreListener = () => {};

    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        const registrosRef = collection(db, 'sono');
        const q = query(registrosRef, where('usuarioId', '==', user.uid), orderBy('createdAt', 'desc'));

        unsubscribeFirestoreListener = onSnapshot(q, (querySnapshot) => {
          const loadedRegistros = [];
          const chartLabels = [];
          const chartHorasSono = [];

          querySnapshot.forEach((doc) => {
            const item = doc.data();
            loadedRegistros.push({ id: doc.id, ...item });

            const horas = calcularHorasSono(item.sleepTime, item.wakeTime);
            chartHorasSono.unshift(horas);

            const dataLabel = item.createdAt?.toDate?.().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) || `Reg.`;
            chartLabels.unshift(dataLabel);
          });

          setRegistros(loadedRegistros);
          setGraficoData({
            labels: chartLabels,
            datasets: [{ data: chartHorasSono }],
          });

        }, (error) => {
          console.error("Erro ao buscar registros com onSnapshot: ", error);
          Alert.alert("Erro de Dados", "Não foi possível carregar os registros de sono.");
        });

      } else {
        unsubscribeFirestoreListener();
        setRegistros([]);
        setGraficoData({ labels: [], datasets: [{ data: [] }] });
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestoreListener();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png' }}
          style={styles.backIcon}
        />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Monitoramento do Sono 🛌</Text>

      <View style={styles.form}>
        <Text style={styles.label}>⏰ Horário em que você dormiu ontem:</Text>
        <TextInput
          placeholder="Ex: 22:30"
          style={styles.input}
          value={sleepTime}
          onChangeText={setSleepTime}
          keyboardType="numbers-and-punctuation"
        />

        <Text style={styles.label}>🌞 Horário em que você acordou hoje:</Text>
        <TextInput
          placeholder="Ex: 07:00"
          style={styles.input}
          value={wakeTime}
          onChangeText={setWakeTime}
          keyboardType="numbers-and-punctuation"
        />

        <Text style={styles.label}>📝 Observações (opcional):</Text>
        <TextInput
          placeholder="Como foi a noite de sono?"
          style={[styles.input, { height: 80 }]}
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={salvarSono}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>📊 Gráfico de Horas de Sono:</Text>
      {graficoData.labels.length > 0 && graficoData.datasets[0].data.length > 0 ? (
        <LineChart
          data={graficoData}
          width={Dimensions.get('window').width - 32}
          height={220}
          yAxisSuffix="h"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#DFF5E1',
            backgroundGradientFrom: '#d9f6e5',
            backgroundGradientTo: '#DFF5E1',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(25, 135, 84, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#7aa2f7',
            },
            propsForBackgroundLines: {
              strokeDasharray: '',
              stroke: '#cce0d1',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text style={{ textAlign: 'center', color: '#666', marginVertical: 20 }}>
          Sem dados suficientes para mostrar o gráfico. Adicione alguns registros!
        </Text>
      )}

      <Text style={styles.subHeader}>🗂️ Últimos Registros:</Text>
      {registros.length > 0 ? (
        registros.map((item) => (
          <View key={item.id} style={styles.registroCard}>
            <Text style={styles.cardText}>🛌 Dormiu: {item.sleepTime}</Text>
            <Text style={styles.cardText}>🌞 Acordou: {item.wakeTime}</Text>
            {item.notes ? <Text style={styles.cardText}>📝 {item.notes}</Text> : null}
            <Text style={styles.dataText}>
              {item.createdAt?.toDate?.().toLocaleString('pt-BR') ?? 'Data desconhecida'}
            </Text>
          </View>
        ))
      ) : (
        <Text style={{ textAlign: 'center', color: '#666', marginVertical: 20 }}>
          Nenhum registro de sono encontrado.
        </Text>
      )}

      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2829/2829069.png' }}
        style={styles.iconFooter}
      />
      <Text style={styles.footerText}>Dormir bem é viver melhor! 🧘</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF5E1',
    padding: 16,
  },
  header: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#19573A',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 16,
    marginTop: 8,
    color: '#19573A',
    marginBottom: 4,
  },
  input: {
    fontFamily: 'Inter-VariableFont',
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#02980A',
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-VariableFont',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subHeader: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#19573A',
  },
  registroCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1,
  },
  cardText: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
  },
  dataText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
  iconFooter: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 5,
  },
  footerText: {
    fontFamily: 'Inter-VariableFont',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 30,
    color: '#19573A',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  backText: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});