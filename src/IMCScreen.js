import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

export default function IMCScreen() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [status, setStatus] = useState('');
  const [historico, setHistorico] = useState([]);

  const navigation = useNavigation();

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      carregarHistorico();
    }
  }, []);

  const calcularIMC = async () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (!p || !a || a === 0) {
      Alert.alert('Erro', 'Preencha peso e altura corretamente.');
      return;
    }

    const resultado = p / (a * a);
    const resultadoFormatado = resultado.toFixed(2);
    setImc(resultadoFormatado);

    let statusIMC = '';
    if (resultado < 18.5) statusIMC = 'Abaixo do peso';
    else if (resultado < 25) statusIMC = 'Peso normal';
    else if (resultado < 30) statusIMC = 'Sobrepeso';
    else statusIMC = 'Obesidade';

    setStatus(statusIMC);

    await salvarNoFirebase(p, a, resultadoFormatado, statusIMC);
    await carregarHistorico();
  };

  const salvarNoFirebase = async (peso, altura, imc, status) => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não está autenticado.');
      return;
    }

    try {
      await addDoc(collection(db, 'imcRegistros'), {
        uid: user.uid,
        peso,
        altura,
        imc,
        status,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Erro ao salvar no Firebase:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  const carregarHistorico = async () => {
    try {
      const q = query(
        collection(db, 'imcRegistros'),
        where('uid', '==', user.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);

      const dados = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistorico(dados);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const getMensagemEImagem = status => {
    switch (status) {
      case 'Abaixo do peso':
        return {
          mensagem: 'Você está um pouco abaixo do ideal. Que tal reforçar sua alimentação com saúde? 💪',
          imagem: 'https://cdn-icons-png.flaticon.com/512/1048/1048953.png',
        };
      case 'Peso normal':
        return {
          mensagem: 'Parabéns! Você está com o peso ideal. Continue com esse estilo de vida saudável! 🥗🚶‍♀️',
          imagem: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
        };
      case 'Sobrepeso':
        return {
          mensagem: 'Atenção! Está um pouco acima do peso. Que tal inserir mais movimento na rotina? 🤸‍♂️',
          imagem: 'https://cdn-icons-png.flaticon.com/512/2000/2000047.png',
        };
      case 'Obesidade':
        return {
          mensagem: 'É importante cuidar do seu peso para sua saúde. Você consegue, um passo de cada vez! ❤️‍🔥',
          imagem: 'https://cdn-icons-png.flaticon.com/512/3854/3854411.png',
        };
      default:
        return {
          mensagem: '',
          imagem: '',
        };
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.historicoItem}>
      <Text style={styles.historicoText}>
        Peso: {item.peso}kg | Altura: {item.altura}m | IMC: {item.imc} ({item.status})
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png' }}
          style={styles.backIcon}
        />
        <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Calculadora de IMC ⚖️</Text>

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          style={styles.input}
          placeholder="Altura (m)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        <TouchableOpacity style={styles.button} onPress={calcularIMC}>
          <Text style={styles.buttonText}>Calcular IMC</Text>
        </TouchableOpacity>

        {imc && (
          <View style={styles.resultContainer}>
            <Text style={styles.result}>Seu IMC: {imc}</Text>
            <Text style={styles.status}>Classificação: {status}</Text>

            <Image
              source={{ uri: getMensagemEImagem(status).imagem }}
              style={styles.resultImage}
              resizeMode="contain"
            />
            <Text style={styles.resultMessage}>{getMensagemEImagem(status).mensagem}</Text>
          </View>
        )}

        {historico.length > 0 && (
          <View style={styles.historicoContainer}>
            <Text style={styles.historicoTitulo}>Histórico de IMC</Text>
            <FlatList
              data={historico}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#DFF5E1',
    flexGrow: 1,
  },
  title: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007F00',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontFamily: 'Inter-VariableFont',
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#02980A',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  result: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  resultImage: {
    width: 100,
    height: 100,
    marginTop: 16,
  },
  resultMessage: {
    marginTop: 12,
    fontFamily: 'Inter-VariableFont',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  historicoContainer: {
    marginTop: 40,
  },
  historicoTitulo: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007F00',
  },
  historicoItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  historicoText: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 16,
    color: '#333',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
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