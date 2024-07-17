import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realo-9440f.firebaseapp.com",
  projectId: "realo-9440f",
  storageBucket: "realo-9440f.appspot.com",
  messagingSenderId: "666859525489",
  appId: "1:666859525489:web:cb73098d598ec7c8f692d0"
};

export const app = initializeApp(firebaseConfig);