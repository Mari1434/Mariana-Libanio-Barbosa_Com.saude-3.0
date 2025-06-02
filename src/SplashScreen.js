import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import logoImage from '../assets/logo_grande.png';

const { height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/4943912/pexels-photo-4943912.jpeg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image source={logoImage} style={styles.logoImage} resizeMode="contain" />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Comece agora</Text>
          <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2985/2985179.png' }}
              style={styles.arrow}
            />
        </TouchableOpacity>

        <Text style={styles.slogan}>Sua saúde mais conectada!</Text>

      </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  logoContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#05CA0F',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 13,
    marginTop: 380,
  },
  buttonText: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 17,
    fontWeight: 'bold',
  },
  arrow: {
    width: 17,
    height: 17,
    marginLeft: 10,
    tintColor: '#000',
  },
  slogan: {
    fontFamily: 'ABeeZee-Regular',
    fontSize: 20,
    color: '#fff',
    marginTop: 25,
    marginBottom: 20,
  },
});