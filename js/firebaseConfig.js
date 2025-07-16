// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsaMOrp4cOip-ETdweY2e0sbsCq0AoL_U",
  authDomain: "app-concesionario-fc5ae.firebaseapp.com",
  databaseURL: "https://app-concesionario-fc5ae-default-rtdb.firebaseio.com",
  projectId: "app-concesionario-fc5ae",
  storageBucket: "app-concesionario-fc5ae.appspot.com", 
  messagingSenderId: "736453420079",
  appId: "1:736453420079:web:1a76928e01e14c8d1592da"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);