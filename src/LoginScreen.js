import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo_simples.png';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/4348638/pexels-photo-4348638.jpeg' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.topRow}>
          <TouchableOpacity>
            <Text style={[styles.navText, styles.active]}>Login</Text>
            <View style={styles.underline} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.navText}>Registre-se</Text>
          </TouchableOpacity>

          <Image source={logo} style={styles.logo} />
        </View>

        <Text style={styles.welcome}>Bem-vindo de volta!</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#333"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
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
    justifyContent: 'flex-start',
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
    marginRight: 20,
  },
  active: {
    color: '#000',
  },
  underline: {
    height: 3,
    backgroundColor: '#D9D9D9',
    width: '100%',
    marginTop: 6,
    borderRadius: 24,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  welcome: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: 'ABeeZee-Regular',
    fontStyle: 'italic',
    color: '#fff',
  },
  form: {
    marginTop: 310,
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
    marginTop: 15,
  },
  buttonText: {
    fontFamily: 'Inter-VariableFont',
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});