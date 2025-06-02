import axios from 'axios';

export async function fetchVacinacaoBrasil(setVacinacao, setLoadingDots) {
  let interval;

  try {
    interval = setInterval(() => {
      setLoadingDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    const response = await axios.get(
      'https://disease.sh/v3/covid-19/vaccine/coverage/countries/Brazil?lastdays=1'
    );
    const data = response.data.timeline;
    const ultimoDia = Object.keys(data)[0];

    setVacinacao({ data: ultimoDia, total: data[ultimoDia] });

    clearInterval(interval);
  } catch (error) {
    console.error('Erro ao buscar vacinação:', error);
    clearInterval(interval);
  }
}