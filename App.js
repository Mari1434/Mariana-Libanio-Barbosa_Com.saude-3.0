import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

import SplashScreen from './src/SplashScreen';
import LoginScreen from './src/LoginScreen';
import CadastroScreen from './src/CadastroScreen';
import HomeScreen from './src/HomeScreen';
import IMCScreen from './src/IMCScreen';
import ExerciciosScreen from './src/ExerciciosScreen';
import SonoScreen from './src/SonoScreen';
import AguaScreen from './src/AguaScreen';
import DrawerContent from './src/DrawerContent';
import PerfilScreen from './src/PerfilScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {

  const [fontsLoaded] = useFonts({
    'ABeeZee-Regular': require('./assets/fonts/ABeeZee-Regular.ttf'),
    'Inter-VariableFont': require('./assets/fonts/Inter-VariableFont.ttf'),
    'Kalam-Bold': require('./assets/fonts/Kalam-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Home" component={DrawerRoutes} />
        <Stack.Screen name="IMC" component={IMCScreen} />
        <Stack.Screen name="Exercicios" component={ExerciciosScreen} />
        <Stack.Screen name="Sono" component={SonoScreen} />
        <Stack.Screen name="Agua" component={AguaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}