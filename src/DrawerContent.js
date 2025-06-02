import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { DrawerActions } from '@react-navigation/native';

import Logo from '../assets/logo_grande.png';

export default function DrawerContent({ navigation }) {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const [pressedButton, setPressedButton] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: 'Nome completo',
    email: 'endereço@email.com',
    photo: 'https://cdn-icons-png.flaticon.com/512/12259/12259373.png',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'usuarios', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo({
              name: data.nome || 'Nome completo',
              email: data.email || user.email,
              photo: data.photo || 'https://cdn-icons-png.flaticon.com/512/12259/12259373.png',
            });
          } else {
            setUserInfo({
              name: user.displayName || 'Nome completo',
              email: user.email || 'endereço@email.com',
              photo: user.photoURL || 'https://cdn-icons-png.flaticon.com/512/12259/12259373.png',
            });
          }
        } catch (error) {
          console.log('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserInfo();
  }, [user]);

  const handlePress = async (action) => {
    setPressedButton(action);

    if (action === 'profile') {
      navigation.navigate('Perfil');
    } else if (action === 'logout') {
      try {
        await auth.signOut();
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } catch (error) {
        console.log("Erro ao sair:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <Image source={{ uri: userInfo.photo }} style={styles.profileImage} />
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>

      <Pressable
        onPress={() => handlePress('profile')}
        onPressOut={() => setPressedButton(null)}
        style={[
          styles.menuButton,
          pressedButton === 'profile' && styles.menuButtonPressed
        ]}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5582/5582872.png' }}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Meu perfil</Text>
      </Pressable>

      <Pressable
        onPress={() => handlePress('logout')}
        onPressOut={() => setPressedButton(null)}
        style={[
          styles.menuButton,
          pressedButton === 'logout' && styles.menuButtonPressed
        ]}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10969/10969973.png' }}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Sair</Text>
      </Pressable>

      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.footerText}>A sua saúde agradece 🌿😌</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 327,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  userInfoSection: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 6,
  },
  name: {
    fontFamily: 'Inter-VariableFont', 
    fontWeight: '600',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  email: {
    fontFamily: 'Inter-VariableFont', 
    fontWeight: '500',
    fontSize: 13,
    color: '#444',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#02980A',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  menuButtonPressed: {
    backgroundColor: '#DFFFE3',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#02980A',
  },
  buttonText: {
    fontSize: 14,
    color: '#02980A',
  },
  logoContainer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 1,
  },
  logo: {
    width: 230,
    height: 230,
  },
  footerText: {
    textAlign: 'center',
    color: '#02980A',
    fontFamily: 'ABeeZee-Regular',
    fontSize: 15,
    marginBottom: 45,
  },
});