<template>
    <main class="flex justify-center items-center h-screen text-3xl w-full relative">
        <div class="absolute inset-0 bg-combined-gradient"></div>
        <div class="absolute top-[-50%] left-[25%] bg-gradient-radial-2 w-[50vw] h-[50vw] rounded-full blur-[350px]">
        </div>
        <section class="w-1/2 z-30 flex flex-col justify-center ">
            <h1 class=" text-white mb-16 text-7xl">Error - 404

            </h1>
            <p class="text-gray-200 mb-2">An error has occured, to continue:</p>
            <p class="text-gray-200 flex flex-col gap-2">
                <span>* Return to our homepage.</span>
                <span>* Send us an e-mail about this error and try later.</span>
            </p>
            <button
                class="flex w-fit justify-center items-center mt-16  border-2 px-3 py-4 font-semibold  hover:text-[#fb00ff] hover:border-[#cc00ff]  duration-300 transition-colors ">

                <router-link to="/">Homepage</router-link>
            </button>

        </section>

    </main>
</template>

<script>
export default {
    name: 'NotFound',
}
</script>

<style></style>