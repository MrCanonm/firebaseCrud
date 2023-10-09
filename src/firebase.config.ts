// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyDHc4sxAnVMNu09I6JFCaPBwlcTp7iqX14',
  authDomain: 'prueba1-cb231.firebaseapp.com',
  databaseURL: 'https://prueba1-cb231-default-rtdb.firebaseio.com',
  projectId: 'prueba1-cb231',
  storageBucket: 'prueba1-cb231.appspot.com',
  messagingSenderId: '712345307652',
  appId: '1:712345307652:web:c2d29d5291647aee434351',
  measurementId: 'G-YVSDBV18NN',
};

// Inicializa Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// Obtiene una referencia a Firebase Storage
export const firebaseStorage = getStorage(firebaseApp);
// Obtiene una referencia a Firebase Realtime Database (si es necesario)
export const firebaseDatabase = getDatabase(firebaseApp);
