// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPzmoQLe1pMdwnED4FiHgbHMSzWeYSRgU",
  authDomain: "react-native-project-a5847.firebaseapp.com",
  databaseURL: "https://react-native-project-a5847.firebaseio.com",
  projectId: "react-native-project-a5847",
  storageBucket: "react-native-project-a5847.appspot.com",
  messagingSenderId: "693106543201",
  appId: "1:693106543201:web:2da21b2c2866f1b4bd3820",
  measurementId: "G-781ZD19LJG",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
