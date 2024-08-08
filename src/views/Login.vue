<template>
    <Navbar/>
    <main class="flex flex-col gap-14 items-center justify-center w-full h-screen overflow-hidden">
        <!-- Background gradients decorations -->
        <div class="absolute inset-0 bg-combined-gradient"></div>
        <div class="absolute top-[-50%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[50vw] rounded-full blur-[350px]"></div>

        <div class="flex flex-col items-center w-[682px] h-auto bg-black/30 shadow-lg shadow-black/50 rounded-lg mt-24 py-16 px-24 z-30">
            <h2 class="uppercase text-6xl text-gradient">Login</h2>
            <form @submit.prevent="submitForm" class="flex flex-col w-full mt-[75px] gap-[30px]">
                <div class="relative">
                    <input v-model="email" type="text" name="email" placeholder="Email" class="w-full h-[65px] bg-transparent border border-custom-purple rounded-lg px-2 placeholder:text-xl placeholder:text-white/50 text-xl" required>
                    <img src="../assets/icons/email.png" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-50">
                </div>
                <div class="relative">
                    <input v-model="password" :type="passwordFieldType" name="password" placeholder="Password" class="w-full h-[65px] bg-transparent border border-custom-purple rounded-lg px-2 placeholder:text-xl placeholder:text-white/50 text-xl pr-10" required>
                    <img src="../assets/icons/password.png" @click="togglePasswordVisibility" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-50 cursor-pointer">
                </div>
                <button type="submit" class="w-full h-[65px] rounded-lg bg-custom-purple uppercase text-2xl mt-[10px]">Login</button>
            </form>
            <div class="flex flex-col items-center gap-[10px] mt-[50px]">
                <span>Forgot<router-link to="/forgot" class="text-custom-purple hover:text-custom-purple/60 ease-in-out duration-300"> Password?</router-link></span>
                <span>Don't have an account?<router-link to="/signup" class="text-custom-purple hover:text-custom-purple/60 ease-in-out duration-300"> Signup</router-link></span>
            </div>
        </div>
    </main>
</template>

<script>
import { useAuthStore } from '../stores/authStore'; 
import Navbar from '../components/Navbar.vue';

export default {
    name: 'Login',
    components: {
        Navbar,
    },
    data() {
        return {
            email: '',
            password: '',
            showPassword: false,
        };
    },
    computed: {
        passwordFieldType() {
            return this.showPassword ? 'text' : 'password';
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        async submitForm() {
            if (this.email && this.password) {
                const authStore = useAuthStore();
                try {
                    await authStore.login(this.email, this.password);
                    const redirectPath = this.$route.query.redirect || '/'; // Redirige a la ruta original o al home
                    this.$router.push(redirectPath);
                } catch (error) {
                    alert('Login failed: ' + error.message);
                }
            } else {
                alert('Please, fill in all fields');
            }
        },
    },
}
</script>

<style>

</style>
