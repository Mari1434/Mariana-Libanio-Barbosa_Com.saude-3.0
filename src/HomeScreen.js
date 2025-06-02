import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { fetchVacinacaoBrasil } from './services/api';

import logo from '../assets/logo_simples.png';

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('Tudo');
  const [vacinacao, setVacinacao] = useState(null);
  const [loadingDots, setLoadingDots] = useState('');

  const categories = ['Tudo', '⚖️', '🏃‍♂️', '🛌', '💧'];

  const cards = [
    {
      id: 'imc',
      category: '⚖️',
      title: 'IMC ⚖️',
      subtitle: 'Vamos calcular o seu IMC?',
      image: 'https://images.pexels.com/photos/15319043/pexels-photo-15319043/free-photo-of-cuidados-de-saude-assistencia-medica-nutricionista-dietista.jpeg',
      titleStyle: { fontFamily: 'Inter-VariableFont', fontWeight: '600' },
      subtitleStyle: { fontFamily: 'Inter-VariableFont', fontWeight: '500' },
      screen: 'IMC',
    },
    {
      id: 'exercise',
      category: '🏃‍♂️',
      title: 'Exercícios 🏃‍♂️',
      subtitle: 'Escolha algum exercício físico para fazer',
      image: 'https://images.pexels.com/photos/4775192/pexels-photo-4775192.jpeg',
      titleStyle: { fontFamily: 'Inter-VariableFont', fontWeight: '600', color: '#228B22' },
      subtitleStyle: { fontFamily: 'Inter-VariableFont', fontWeight: '500' },
      screen: 'Exercicios',
    },
    {
      id: 'sleep',
      category: '🛌',
      title: 'Monitoramento do sono 🛌',
      subtitle: 'Vamos monitorar o seu sono?',
      image: 'https://images.pexels.com/photos/17536106/pexels-photo-17536106/free-photo-of-leve-luz-light-camera.jpeg',
      titleStyle: { fontFamily: 'Inter-VariableFont', fontWeight: '600' },
      subtitleStyle: { fontFamily: 'Inter-VariableFont', fontWeight: '500', color: '#2E8B57' },
      screen: 'Sono',
    },
    {
      id: 'water',
      category: '💧',
      title: 'Beber água 💧',
      subtitle: 'Registre quantos copos você bebeu no dia',
      image: 'https://images.pexels.com/photos/8537880/pexels-photo-8537880.jpeg',
      titleStyle: { fontFamily: 'Inter-VariableFont', fontWeight: '600' },
      subtitleStyle: { fontFamily: 'Inter-VariableFont', fontWeight: '500', color: '#00BFFF' },
      screen: 'Agua',
    },
  ];

  const filteredCards =
    selectedCategory === 'Tudo'
      ? cards
      : cards.filter(card => card.category === selectedCategory);
  
    useEffect(() => {
      fetchVacinacaoBrasil(setVacinacao, setLoadingDots);
    }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/40/007F00/menu--v1.png' }}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>Com.saude 3.0</Text>
          <Text style={styles.subtitle}>Sua saúde mais conectada!</Text>
        </View>

        <Image source={logo} style={styles.logo} />
      </View>

      <Text style={styles.highlight}>O seu hub de saúde favorito ♡</Text>

      <View style={styles.mainImage}>
        {vacinacao ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ fontFamily: 'Inter-VariableFont', fontSize: 20, fontWeight: 'bold', color: '#004d00' }}>
              💉 Vacinação COVID-19 no Brasil
            </Text>
            <Text style={{ fontFamily: 'Inter-VariableFont', fontSize: 14, color: '#006400' }}>
              Última atualização: {vacinacao.data}
            </Text>
            <Text style={{ fontFamily: 'Inter-VariableFont', fontSize: 17, color: '#007F00' }}>
              Total de doses aplicadas: {vacinacao.total.toLocaleString('pt-BR')}
            </Text>
            <Text style={{ textAlign: 'center', fontFamily: 'Inter-VariableFont', fontSize: 16, fontWeight: 'bold', color: '#0a5c0a', marginTop: 5 }}>
              * Lembre-se que manter a vacinação em dia é importante para uma saúde estável ☺️
            </Text>
          </View>
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20, fontStyle: 'italic', color: '#006400' }}>
            Carregando vacinação{loadingDots}
          </Text>
        )}
      </View>

      <View style={styles.categoryBar}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category
                ? styles.categorySelected
                : styles.categoryUnselected,
            ]}
          >
            <Text
              style={
                selectedCategory === category
                  ? styles.categoryTextSelected
                  : styles.categoryTextUnselected
              }
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredCards.map(card => (
        <TouchableOpacity
          key={card.id}
          style={styles.card}
          onPress={() => {
            if (card.screen) {
              navigation.navigate(card.screen);
            }
          }}
        >
          <ImageBackground
            source={{ uri: card.image }}
            style={styles.cardImage}
            imageStyle={styles.cardImageStyle}
          >
            <Text style={[styles.cardTitle, card.titleStyle]}>{card.title}</Text>
            <Text style={[styles.cardSubtitle, card.subtitleStyle]}>{card.subtitle}</Text>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4E2B4',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    marginLeft: 10,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Kalam-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007F00',
  },
  subtitle: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 13,
    color: '#000',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  highlight: {
    fontFamily: 'ABeeZee-Regular',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
    marginTop: 15,
  },
  mainImage: {
    height: 175,
    width: '100%',
    backgroundColor: '#d4f0d4',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  categoryBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categorySelected: {
    backgroundColor: '#228B22',
  },
  categoryUnselected: {
    backgroundColor: '#7ac184',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryTextUnselected: {
    color: '#004d00',
    fontWeight: 'normal',
  },
  card: {
    margin: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardImage: {
    height: 190,
    justifyContent: 'center',
    padding: 15,
  },
  cardImageStyle: {
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 15,
    marginTop: 90,
  },
});