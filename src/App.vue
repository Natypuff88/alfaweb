<template>
<v-app>
<Navbar/>
<router-view v-if="!isLoading"></router-view>

<Loading v-if="isLoading"/>
</v-app>
</template>


<script>

import Navbar from "./components/Navbar.vue"
import Loading from "./components/Loading.vue";
import {mapActions} from "vuex"
export default {
  name: 'App',
  components:{
    Navbar,
    Loading
  },
  computed: {
    isLoading(){
      this.waitForLoad();
        return this.$store.getters.getIsLoading;
    },
  },
  methods: {
    ...mapActions(["stopIsLoading", "getCursos"]),
    waitForLoad(){
      setTimeout(()=>{
        this.stopIsLoading();
      },2000);
    }

  },
  created(){
    this.getCursos();
  }
};
</script>
