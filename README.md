# 🧘 Com.Saude 3.0 - Sua Saúde Mais Conectada! 💚

[![React Native](https://img.shields.io/badge/React%20Native-0.76.9-61DAFB?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-52.0.46-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-DA5A05?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Figma](https://img.shields.io/badge/Figma-Design-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/EIl6MJxT8kR4eHyGyUoiqA/Com.saude-3.0?node-id=0-1&p=f&t=5UnP59BMOyVmAX9i-0)

Bem-vindo ao **Com.Saude 3.0**, o seu hub de saúde favorito! Este aplicativo foi cuidadosamente desenvolvido para te ajudar a monitorar e gerenciar diversos aspectos da sua saúde e bem-estar de forma intuitiva e conectada. O design e as interações foram meticulosamente planejados e prototipados no Figma para garantir uma experiência de usuário fiel à visão original do projeto.

Com uma interface amigável e repleta de funcionalidades, o Com.Saude 3.0 é o companheiro ideal para sua jornada em busca de uma vida mais saudável e equilibrada.

## ✨ Funcionalidades:

O Com.Saude 3.0 oferece um conjunto de ferramentas para você se manter no controle:

* 👤 **Autenticação Segura e Perfil Personalizado**:
    * Crie sua conta ou faça login de forma simples e segura com Firebase Authentication.
    * Gerencie seus dados, troque sua foto de perfil e conte suas experiências na tela de Perfil.
* ⚖️ **Calculadora de IMC (Índice de Massa Corporal)**:
    * Calcule seu IMC de forma rápida e veja sua classificação.
    * Acompanhe seu histórico de IMC para visualizar sua evolução.
* 🏃‍♂️ **Guia de Exercícios**:
    * Explore uma lista de exercícios com descrições detalhadas.
    * Favorite os exercícios que mais gosta para acesso rápido!
* 🛌 **Monitoramento do Sono**:
    * Registre seus horários de dormir e acordar.
    * Adicione observações sobre a qualidade do seu sono.
    * Visualize um gráfico com suas horas de sono ao longo do tempo.
* 💧 **Controle de Hidratação**:
    * Registre cada copo de água que você bebe durante o dia.
    * Receba notificações para te lembrar de se hidratar! 🌿
* 💉 **Informações sobre Vacinação COVID-19**:
    * Mantenha-se atualizado com os últimos dados de vacinação contra a COVID-19 no Brasil, diretamente na tela inicial.

## 🎨 Design e Prototipagem:

A identidade visual e a experiência de usuário do Com.Saude 3.0 foram prioridade desde o início.
* **Prototipagem no Figma**: O aplicativo foi desenvolvido com base em um protótipo detalhado criado no Figma. Isso garantiu que a interface final fosse fiel ao design planejado, incluindo fluxos de interação do usuário.
    * **Explore o protótipo**: [Com.Saude 3.0 no Figma](https://www.figma.com/design/EIl6MJxT8kR4eHyGyUoiqA/Com.saude-3.0?node-id=0-1&p=f&t=5UnP59BMOyVmAX9i-0)
* **Interface Intuitiva**: Navegação fluida e clara com Stack e Drawer Navigation.
* **Fontes Customizadas**: Utilização das fontes `ABeeZee-Regular`, `Inter-VariableFont` e `Kalam-Bold` para uma experiência visual única e agradável.
* **Feedback Visual**: Indicadores de carregamento para manter o usuário informado.

## 🚀 Tecnologias Utilizadas:

Este projeto foi construído com as seguintes tecnologias e bibliotecas:

* **React Native**: Para o desenvolvimento mobile multiplataforma.
* **Expo**: Para facilitar o desenvolvimento e build do app.
* **Firebase**:
    * **Authentication**: Para gerenciamento de login e cadastro.
    * **Firestore**: Para armazenamento e recuperação de dados do usuário (históricos, perfil, etc.).
* **React Navigation**: Para gerenciamento de navegação entre telas (Stack e Drawer).
* **Axios**: Para realizar chamadas à API de vacinação.
* **React Hooks**: `useState`, `useEffect` e hooks customizados (`useHistoricoAgua`) para lógica e estado dos componentes.
* **Expo Notifications**: Para envio de lembretes.
* **Expo Image Picker**: Para seleção de imagem de perfil.
* **React Native Chart Kit**: Para visualização de gráficos (ex: monitoramento do sono).
* **Fontes Customizadas**: `expo-font` para carregar fontes personalizadas.

## 📱 Telas (Preview):

![SplashScreen](https://github.com/user-attachments/assets/3de2c49b-3ac6-4921-8506-3bfc7d36992c)
![LoginScreen](https://github.com/user-attachments/assets/d1b2bc78-418f-4f33-9a5d-ff2bca28cd27)
![CadastroScreen](https://github.com/user-attachments/assets/8164f83c-62fd-4fbc-9768-a83593e1d137)
![HomeScreen](https://github.com/user-attachments/assets/05613943-0ad4-41b9-90bb-0af6c3578bd2)
![DrawerContent](https://github.com/user-attachments/assets/357a9442-b20b-47ba-b006-1f3195de44ad)
![PerfilScreen](https://github.com/user-attachments/assets/fee979e6-b2d4-4692-9d4b-050210fdd05f)
![IMCScreen](https://github.com/user-attachments/assets/1ca1d289-2e00-4e12-a789-9c680918241f)
![ExerciciosScreen](https://github.com/user-attachments/assets/44fb30a0-0d29-4710-a6a3-2c899c3deeee)
![SonoScreen](https://github.com/user-attachments/assets/233d0724-24c9-4906-ac87-9313f2023018)
![AguaScreen](https://github.com/user-attachments/assets/198ea05a-0cb9-4923-b4e3-2b2bfecd08ee)

## 👩‍💻 Informações da desenvolvedora:

By: **Mariana Libânio Barbosa**

* **GitHub**: [@Mari1434](https://github.com/Mari1434)
* **LinkedIn**: [Mariana Libânio Barbosa](https://www.linkedin.com/in/mariana-libânio-barbosa-83b8451a4)
* **Email**: marianalibaniobarbosa@gmail.com

---

Este projeto foi desenvolvido como parte de trabalho acadêmico do curso de Análise e Desenvolvimento de Sistemas, pela disciplina de Programação para Dispositivos Móveis, com o objetivo de aplicar conceitos modernos de desenvolvimento mobile com React Native e Firebase.

Sinta-se à vontade para explorar, contribuir ou dar seu feedback! ✨
**A sua saúde agradece!** 🌿😌
