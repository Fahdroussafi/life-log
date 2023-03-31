import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCYT5uX7G5P3fmG2pA5OI2HznjG1ZLA2Fo',
  authDomain: 'life-log-fda2b.firebaseapp.com',
  projectId: 'life-log-fda2b',
  storageBucket: 'life-log-fda2b.appspot.com',
  messagingSenderId: '258054204819',
  appId: '1:258054204819:web:64263ff4055c48dee28c66',
  measurementId: 'G-8JYH320P12',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};