import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import useHistoricoAgua from './customHook/useHistoricoAgua';

const AguaScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();

  const { copos, setCopos, historico, buscarHistorico } = useHistoricoAgua(user);

  useEffect(() => {
    const scheduleNotification = async () => {
      await Notifications.requestPermissionsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "💧 Hora da hidratação!",
          body: "Beba um copo de água agora mesmo! Seu corpo agradece 🌿",
        },
        trigger: {
          seconds: 60 * 60,
          repeats: true,
        },
      });
    };
    scheduleNotification();
  }, []);

  const adicionarCopo = async () => {
    try {
      await addDoc(collection(db, 'agua'), {
        uid: user.uid,
        timestamp: serverTimestamp(),
        copos: copos + 1,
      });
      setCopos(copos + 1);
      buscarHistorico();
    } catch (e) {
      console.error("Erro ao registrar copo de água: ", e);
    }
  };

  useEffect(() => {
    if (user) buscarHistorico();
  }, [user]);

  return (
    <FlatList
      style={styles.container}
      data={historico}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png' }}
              style={styles.backIcon}
            />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.titulo}>Monitoramento de Água 💧</Text>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/9047/9047068.png' }}
              style={styles.imagem}
            />
            <Text style={styles.coposTexto}>Você já tomou:</Text>
            <Text style={styles.contador}>{copos} copos hoje</Text>

            <TouchableOpacity style={styles.botao} onPress={adicionarCopo}>
              <Text style={styles.botaoTexto}>+ Adicionar Copo</Text>
            </TouchableOpacity>

            <Text style={styles.historicoTitulo}>Histórico de hoje:</Text>
          </View>
        </View>
      }
      renderItem={({ item, index }) => {
        const isLast = index === historico.length - 1;
        return (
          <Text style={[styles.itemLista, isLast && styles.ultimoItem]}>
            🕒 {item.timestamp?.toDate().toLocaleTimeString('pt-BR')}
          </Text>
        );
      }}
      contentContainerStyle={{ paddingBottom: 30 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DFF5E1',
    padding: 20,
  },
  titulo: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 37,
    marginBottom: 20,
    color: '#2c5f2d',
  },
  imagem: {
    width: 100,
    height: 100,
    marginVertical: 20,
    marginBottom: 30,
  },
  coposTexto: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 18,
    marginBottom: 10,
    color: '#4f772d',
  },
  contador: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1b4332',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#52b788',
    width: 165,
    height: 55,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  botaoTexto: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  historicoTitulo: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#081c15',
  },
  itemLista: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
    color: '#344e41',
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 10,
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
  ultimoItem: {
    backgroundColor: '#b7e4c7',
    padding: 10,
    borderRadius: 8,
    fontWeight: 'bold',
  },
});

export default AguaScreen;