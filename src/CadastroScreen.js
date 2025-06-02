import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo_simples.png';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const db = getFirestore();

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        celular,
        email,
      });

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg' }}
      style={styles.background}
    >
      <View style={styles.overlay}>

        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.navText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={[styles.navText, styles.active]}>Registre-se</Text>
            <View style={styles.underline} />
          </View>
          <Image source={logo} style={styles.logo} />
        </View>

        <Text style={styles.welcome}>É um prazer te acolher nessa nova fase!</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Nome completo, por gentileza"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Seu número de celular"
            value={celular}
            onChangeText={setCelular}
            style={styles.input}
            keyboardType="phone-pad"
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Agora a senha"
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#333"
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navText: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  registerContainer: {
    alignItems: 'center',
  },
  active: {
    color: '#000',
  },
  underline: {
    height: 3,
    backgroundColor: '#404040',
    width: '100%',
    marginTop: 5,
    borderRadius: 24,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  welcome: {
    fontFamily: 'ABeeZee-Regular',
    marginTop: 30,
    fontSize: 18,
    fontStyle: 'italic',
    color: '#000',
  },
  form: {
    marginTop: 210,
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 20,
    borderRadius: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 15,
    paddingVertical: 8,
    fontFamily: 'ABeeZee-Regular',
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#00ff00',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Inter-VariableFont',
    fontSize: 16,
    fontWeight: 'bold',
  },
});