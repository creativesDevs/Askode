<template>
    <Navbar/>
    <main class="flex flex-col gap-14 items-center justify-center w-full h-screen overflow-hidden">
        <!-- Background gradients decorations -->
        <div class="absolute inset-0 bg-combined-gradient"></div>
        <div class="absolute top-[-50%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[50vw] rounded-full blur-[350px]"></div>

        <div class="flex flex-col items-center w-[682px] h-auto bg-black/30 shadow-lg shadow-black/50 rounded-lg mt-24 py-16 px-24 z-30">
            <h2 class="flex flex-col uppercase text-center text-5xl gap-2"><span class="text-gradient">forgot</span><span class="text-gradient">password?</span></h2>
            <form @submit.prevent="submitForm" class="flex flex-col w-full mt-[60px] gap-[30px]">
                <div class="relative">
                    <input v-model="email" type="email" name="email" placeholder="Your email adress" class="w-full h-[65px] bg-transparent border border-custom-purple rounded-lg px-2 placeholder:text-xl placeholder:text-white/50 text-xl" required>
                    <img src="../assets/icons/email.png" class="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-50">
                </div>

                <button type="submit" class="w-full h-[65px] rounded-lg bg-custom-purple uppercase text-2xl mt-[10px]">Reset Password</button>
            </form>
        </div>
    </main>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
    name: 'Login',
    components: {
        Navbar,
    },
    data() {
        return {
            email: '',
        };
    },
    methods: {
        submitForm() {
            if (this.email) {
                alert('Form successfully submitted');
            } else {
                alert('Please, fill the field');
            }
        },
    },
}
</script>

<style>

</style>