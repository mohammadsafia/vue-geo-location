import firebase from 'firebase'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: "AIzaSyBpkgMqxbTy8WgGCf-L2IkBC64Cb80NtiQ",
  authDomain: "vue-geo-locations.firebaseapp.com",
  databaseURL: "https://vue-geo-locations.firebaseio.com",
  projectId: "vue-geo-locations",
  storageBucket: "vue-geo-locations.appspot.com",
  messagingSenderId: "50928398278",
  appId: "1:50928398278:web:7a998d04330af238530cc7",
  measurementId: "G-SFD4FJXBQM"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default  firebaseApp.firestore();
