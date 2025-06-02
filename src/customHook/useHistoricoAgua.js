import { useState, useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function useHistoricoAgua(user) {
  const [copos, setCopos] = useState(0);
  const [historico, setHistorico] = useState([]);

  const buscarHistorico = useCallback(async () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const q = query(collection(db, 'agua'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const registros = [];
    let total = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.timestamp?.toDate()?.toDateString() === hoje.toDateString()) {
        registros.push(data);
        total++;
      }
    });

    registros.sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());
    setCopos(total);
    setHistorico(registros);
  }, [user]);

  return { copos, setCopos, historico, buscarHistorico };
}