import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBLYZ-G2clyOMLi_H5US9pt9pr7SDB1IlI",
  authDomain: "askode-de1d2.firebaseapp.com",
  projectId: "askode-de1d2",
  storageBucket: "askode-de1d2.appspot.com",
  messagingSenderId: "698265625159",
  appId: "1:698265625159:web:c293e0e914ae0354e08762"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
