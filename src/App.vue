<template>
  
<!-- Render routes here -->
<RouterView/>

</template>

<script >
import { useQuizStore } from './stores/useQuizStore';
import { mapActions } from 'pinia'

export  default{
  name:"App",
  methods:{
    ...mapActions(useQuizStore, ['fetchData']),
  },
  created() {
      this.fetchData({limit: 10, category: "code"});
  }
}
</script>


<style ></style>
