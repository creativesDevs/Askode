<template>
    <Navbar />
    <main class="flex flex-col gap-14 items-center justify-center w-full h-screen overflow-hidden">
      <div class="absolute inset-0 bg-combined-gradient"></div>
      <div class="absolute top-[-50%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[50vw] rounded-full blur-[350px]"></div>
  
      <div class="flex flex-col items-center w-[682px] h-auto bg-black/30 shadow-lg shadow-black/50 rounded-lg mt-24 py-10 px-24 z-30">
        <h2 class="uppercase text-6xl text-gradient">Signup</h2>
        <form @submit.prevent="submitForm" class="flex flex-col w-full mt-[75px] gap-[30px]">
          <div class="relative">
            <input v-model="username" type="text" name="username" placeholder="Username" class="w-full h-[65px] bg-transparent border border-custom-purple rounded-lg px-2 placeholder:text-xl placeholder:text-white/50 text-xl" required />
            <img src="../assets/icons/user.png" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-50" />
          </div>
          <div class="relative">
            <input v-model="email" type="email" name="email" placeholder="Email" class="w-full h-[65px] bg-transparent border border-custom-purple rounded-lg px-2 placeholder:text-xl placeholder:text-white/50 text-xl" required />
            <img src="../assets/icons/email.png" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-50" />
          </div>
          <div class="relative">
            <input v-model="password" :type="passwordFieldType" name="password" placeholder="Password" class="w-full h-[65px] bg-transparent border border-custom-purple rounded-lg px-2 placeholder:text-xl placeholder:text-white/50 text-xl pr-10" required />
            <img src="../assets/icons/password.png" @click="togglePasswordVisibility" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-50 cursor-pointer" />
          </div>
          <div class="relative">
            <input v-model="confirm_password" :type="passwordFieldType" name="confirm_password" placeholder="Confirm Password" class="w-full h-[65px] bg-transparent border border-custom-purple rounded-lg px-2 placeholder:text-xl placeholder:text-white/50 text-xl pr-10" required />
            <img src="../assets/icons/password.png" @click="togglePasswordVisibility" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-50 cursor-pointer" />
          </div>
          <button type="submit" class="w-full h-[65px] rounded-lg bg-custom-purple uppercase text-2xl mt-[10px]">Signup</button>
        </form>
        <div class="flex flex-col items-center gap-[10px] mt-[50px]">
          <span>Have an account?<router-link to="/login" class="text-custom-purple hover:text-custom-purple/60 ease-in-out duration-300"> Login</router-link></span>
        </div>
      </div>
    </main>
  </template>
  
<script>
import Navbar from '../components/Navbar.vue';
import { auth, firestore } from '../firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default {
    name: 'Signup',
    components: {
        Navbar,
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            showPassword: false,
        };
    },
    computed: {
        passwordFieldType() {
            return this.showPassword ? 'text' : 'password';
        },
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        async submitForm() {
            if (this.password !== this.confirm_password) {
                alert('Passwords do not match');
                return;
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
                const user = userCredential.user;
                await setDoc(doc(firestore, 'users', user.uid), {
                    username: this.username,
                    email: this.email,
                });
                await auth.signOut();
                alert('Signup successful. Please login to continue.');
                this.$router.push('/login');
            } catch (error) {
                console.error('Signup failed: ', error.message);
                alert('Signup failed: ' + error.message);
            }
        },
    },
};
</script>
  
  
  <style>
  </style>
  