import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';

export default function PerfilScreen() {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const navigation = useNavigation();
  const user = auth.currentUser;

  const [photo, setPhoto] = useState('https://cdn-icons-png.flaticon.com/512/12259/12259373.png');
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [experiencia, setExperiencia] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setPhoto(data.photo || photo);
          setNome(data.nome || '');
          setCelular(data.celular || '');
          setEmail(data.email || user.email || '');
          setExperiencia(data.experiencia || '');
        }
      }
    };
    loadUserData();
  }, []);

  const handlePickImage = async () => {

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permissão para acessar imagens é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `perfil/${user.uid}.png`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      await updateDoc(doc(db, 'usuarios', user.uid), { photo: url });
      await updateProfile(user, { photoURL: url });
      setPhoto(url);
    }
  };

  const handleSaveDados = async () => {
    try {
      await updateDoc(doc(db, 'usuarios', user.uid), {
        nome,
        celular,
        experiencia,
        email, // armazenado apenas para exibição, não muda no auth
      });
      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
    } catch (e) {
      console.error('Erro ao salvar dados:', e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png' }}
          style={styles.backIcon}
        />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>  

      <TouchableOpacity onPress={handlePickImage}>
        <Image source={{ uri: photo }} style={styles.avatar} />
        <Text style={styles.editText}>Trocar foto de perfil</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Nome completo:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholder="Digite seu nome completo"
      />

      <Text style={styles.label}>Celular:</Text>
      <TextInput
        value={celular}
        onChangeText={setCelular}
        style={styles.input}
        placeholder="(xx) xxxxx-xxxx"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        value={email}
        editable={false}
        style={[styles.input, { backgroundColor: '#eee' }]}
      />

      <Text style={styles.label}>Minhas Experiências:</Text>
      <TextInput
        value={experiencia}
        onChangeText={setExperiencia}
        style={[styles.input, { height: 100 }]}
        placeholder="Conte aqui suas experiências..."
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveDados}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#DFF5E1',
    flex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
  },
  editText: {
    fontFamily: 'Inter-VariableFont',
    color: '#02980A',
    textAlign: 'center',
    marginTop: 8,
  },
  label: {
    fontFamily: 'Inter-VariableFont',
    marginTop: 20,
    fontWeight: 'bold',
    color: '#02980A',
  },
  input: {
    borderColor: '#02980A',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 7,
    marginBottom: 10,
    textAlignVertical: 'top',
    fontFamily: 'Inter-VariableFont',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#02980A',
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    fontFamily: 'Inter-VariableFont',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 23,
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