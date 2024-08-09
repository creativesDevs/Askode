import { defineStore } from 'pinia';
import { auth, firestore } from '../firebase';
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    username: null, 
  }),
  actions: {
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        await this.fetchUserName(); // Obtener el nombre de usuario después de iniciar sesión
      } catch (error) {
        console.error('Login failed: ', error.message);
        throw error; 
      }
    },
    async logout() {
      try {
        await firebaseSignOut(auth);
        this.user = null;
        this.username = null; // Limpiar el nombre de usuario al cerrar sesión
      } catch (error) {
        console.error('Logout failed: ', error.message);
        throw error; 
      }
    },
    async initialize() {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          this.user = user;
          if (user) {
            await this.fetchUserName(); // Obtener el nombre de usuario cuando el estado de autenticación cambia
          }
          resolve(user);
        });
        // Puedes devolver la función unsubscribe para limpiar el listener si es necesario
        return unsubscribe;
      });
    },
    async fetchUserName() {
      if (this.user) {
        try {
          const userDoc = await getDoc(doc(firestore, 'users', this.user.uid));
          if (userDoc.exists()) {
            this.username = userDoc.data().username;
          } else {
            console.error('No such document!');
            this.username = 'User'; // Valor por defecto si no se encuentra el documento
          }
        } catch (error) {
          console.error('Error getting user document: ', error.message);
          this.username = 'User'; // Valor por defecto en caso de error
        }
      } else {
        this.username = 'User'; // Valor por defecto si no hay usuario
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    userName: (state) => state.username || 'User', // Usar el nombre de usuario obtenido de Firestore
  },
});

