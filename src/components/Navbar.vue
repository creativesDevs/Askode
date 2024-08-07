<template>
    <nav class="flex items-center justify-center w-full h-[130px] bg-black/30 absolute top-0 z-40">
        <div class="flex justify-between items-center w-[80vw]">
            <div>
               <router-link to="/"><img src="../assets/icons/logo.png" alt="Logo Askode"></router-link>
            </div>

            <div class="flex gap-4">
                <router-link v-if="!isGamePage" to="/game">
                <button class="uppercase w-36 h-14 text-xl rounded-lg bg-custom-purple">Play</button>
                </router-link>
                <router-link to="/login">
                    <button class="uppercase w-36 h-14 text-xl rounded-lg border border-custom-purple">Login</button>
                </router-link>

            </div>
        </div>

    </nav>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
name: "Navbar",
setup() {
    const route = useRoute()

    const isGamePage = computed(() => {
        return route.path === "/game"
    })
return {
    isGamePage
}
}

}
</script>

<style>

</style>