import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZ3s5h6R2AJFz5JeERU3T4gqDlkZ-EUNM",
  authDomain: "tennis-record-app.firebaseapp.com",
  projectId: "tennis-record-app",
  storageBucket: "tennis-record-app.appspot.com",
  messagingSenderId: "89673391977",
  appId: "1:89673391977:web:c8854404c2143413c7e7f8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
