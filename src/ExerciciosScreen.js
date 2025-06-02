import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const ExerciciosScreen = () => {
  const [favoritos, setFavoritos] = useState({});
  const navigation = useNavigation();
  const user = auth.currentUser;

  useEffect(() => {
    const carregarFavoritos = async () => {
      if (user) {
        const docRef = doc(db, 'favoritos_exercicios', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFavoritos(docSnap.data());
        }
      }
    };

    carregarFavoritos();
  }, [user]);

  const salvarFavoritos = async (novosFavoritos) => {
    if (user) {
      const docRef = doc(db, 'favoritos_exercicios', user.uid);
      await setDoc(docRef, novosFavoritos);
    }
  };

  const toggleFavorito = (titulo) => {
    const atualizado = {
      ...favoritos,
      [titulo]: !favoritos[titulo],
    };
    setFavoritos(atualizado);
    salvarFavoritos(atualizado);
  };

  const exercicios = [
    {
      titulo: "Ponte",
      descricao: "Deite-se de bruços no chão, numa superfície plana. Levante o corpo apoiando-se sobre as pontas dos pés e os antebraços (mantendo-os paralelos, à frente da cabeça). Todo o corpo deve permanecer suspenso, formando uma espécie de triângulo retângulo. Você pode começar com três séries de 20 segundos por dia.",
      videoUrl: "https://youtu.be/YMGevmwBams?si=4REjlNYdIpm9HDKM",
    },
    {
      titulo: "Agachamento na cadeira",
      descricao: "Com uma cadeira, faça movimentos de sentar e levantar em sequências de 10 a 12 vezes por série. Tente fazer com que o movimento de assentar não seja muito rápido, fortalecendo a musculatura trabalhada. A  partir do segundo dia de atividades, você pode fazer entre 3 e 4 séries.",
      videoUrl: "https://youtu.be/m-ewcuzzZS0?si=pB2fwfZw8MLKX481",
    },
    {
      titulo: "Agachamento na parede (isométrico)",
      descricao: "Basta sentar-se “no vazio”, apoiando as costas na parede e buscando manter os joelhos flexionados em um ângulo de 90º. Você pode fazer entre 3 e 4 séries, cada uma com 20 a 40 segundos de duração.",
      videoUrl: "https://youtu.be/p1KsWs_SNjg?si=pzLIP-PKMkbEnAxh",
    },
    {
      titulo: "Aviãozinho (stiff unilateral)",
      descricao: "De pé, com os braços abertos (no formato Cristo Redentor), coluna ereta e os pés unidos, faça movimentos de reclinar o tronco para frente, levantando, ao mesmo tempo, uma das pernas para trás. Flexione bem levemente o joelho da perna que não se movimenta. Comece com 6 séries de 10 a 12 movimentos, sendo 3 com cada perna.",
      videoUrl: "https://youtu.be/4u7g_TwDRLk?si=gWh2Y-GSjVHZ4s3Y",
    },
    {
      titulo: "Flexão de braço",
      descricao: "Levante o corpo com as duas mãos apoiadas no chão, alinhadas ao peito. Depois, é preciso descer o corpo até o peitoral se encontrar com o chão. Para começar, faça 3 séries de 10 movimentos. Com o tempo, aumente para 12 a 14 por vez.",
      videoUrl: "https://youtu.be/rig2BqSMoe4?si=qEoiBc3JHuO3FU4-",
    },
    {
      titulo: "Abdominal",
      descricao: "Deite-se de barriga para cima, dobre as pernas, cruze os braços em X sobre o troco e inicie os movimentos de elevação do troco em direção dos joelhos. Você pode fazer, inicialmente, 3 séries de 15 movimentos.",
      videoUrl: "https://youtu.be/wYUHrvWLy7U?si=2nzNoP6jB6bhy-CT",
    },
    {
      titulo: "Elevação das pontas dos pés",
      descricao: "De pé, com o corpo ereto, erga-se na ponta dos pés, subindo e descendo. 3 séries de 15 a 20 repetições.",
      videoUrl: "https://youtu.be/tfA5BoBPO04?si=Dqs4_-ShP031D3kw",
    },
    {
      titulo: "Pular corda",
      descricao: "Pular corda exige um pouco mais de coordenação motora e condicionamento do que outros exercícios. O ideal para os iniciantes é alternar de 2 a 3 minutos de corda com alguns exercícios de musculação.",
      videoUrl: "https://youtu.be/7LpAXD4-kwQ?si=8eaPrMZc3hSOLuVp",
    },
    {
      titulo: "Corrida estacionária",
      descricao: "A corrida ou marcha estacionária é um exercício no qual você simula os movimentos como se estivesse correndo, mas sem sair do lugar. Faça cerca de 5 séries com duração de 3 minutos cada.",
      videoUrl: "https://youtu.be/AjKNsaieu2Y?si=ql4_Ha9TXLGqWltu",
    },
    {
      titulo: "Tríceps no banco",
      descricao: "Coloque um banco perpendicular às costas. Em seguida, apoie as suas mãos no banco quase na largura dos ombros. Com as pernas estendidas para a frente, eleve o seu tronco para cima e para baixo. Para iniciantes, é interessante fazer 3 sessões de 12 agachadas.",
      videoUrl: "https://youtu.be/GM21qkns-Ao?si=7-M2_3QD0r3aFP3L",
    },
    {
      titulo: "Bicicleta imaginária",
      descricao: "É preciso deitar com as costas encostadas no chão e, com os pés para cima, simular pedalar em uma bicicleta. Você também pode colocar as mãos atrás da cabeça e tentar encostar, alternadamente, o cotovelo no joelho do lado oposto. Procure iniciar com exercícios de 2 a 3 minutos.",
      videoUrl: "https://youtu.be/vdWV9CCMyx0?si=7VbJi94htEJ-PL2k",
    },
    {
      titulo: "Afundo com os pés no apoio",
      descricao: "Você vai precisar de algum banco, sofá ou qualquer outro tipo de apoio. Fique de costas para o objeto, com o peito do pé apoiado nele, enquanto o outro fica na frente do corpo. Faça repetidos agachamentos, com o tronco reto e sem levá-lo para a frente. O ideal é fazer cerca de 3 séries com 10 a 15 repetições.",
      videoUrl: "https://youtu.be/M6Fn6v9DWyE?si=1HaWkHvAZkt8JMdQ",
    },
  ];

  return (
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png' }}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

      <Text style={styles.titleHeader}>Exercícios 🏃‍♂️</Text>        

      {exercicios.map((ex, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{ex.titulo}</Text>
            <TouchableOpacity onPress={() => toggleFavorito(ex.titulo)}>
              <Image
                source={{
                  uri: favoritos[ex.titulo]
                    ? 'https://cdn-icons-png.flaticon.com/512/833/833472.png' // preenchido
                    : 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png', // vazio
                }}
                style={styles.heartIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{ex.descricao}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(ex.videoUrl)}
          >
            <Text style={styles.buttonText}>Ver vídeo</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default ExerciciosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF5E1',
    padding: 12,
  },
  titleHeader: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007F00',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 8,
  },
  heartIcon: {
    width: 28,
    height: 28,
  },
  description: {
    fontFamily: 'Inter-VariableFont',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#69CE69',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-VariableFont',
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
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