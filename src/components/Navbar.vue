<template>

<div>
  <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title color="white">Cursos AlfaWeb</v-toolbar-title>
      <v-spacer></v-spacer>
      <h3> {{getCurrentUser.email}}</h3>
      <v-btn icon v-if="isLogedIn">
        <v-icon @click='logout()'>mdi-lock-reset</v-icon>
      </v-btn>
      <v-menu left bottom >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="registrarse()" v-if="getCurrentUser.path==='/login'" >
            <v-list-item-title>Registrarse</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout()" v-if="getCurrentUser.path==='/registro'" >
            <v-list-item-title>Ir al login</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
  </v-app-bar>

</div>
</template>

<script>
// import mapGetters from 'vuex'
import Firebase from 'firebase';
import {mapActions} from 'vuex';
export default {
  data() {
      return {
      
      }
  },
  computed:{
    getCurrentUser(){
      return this.$store.getters.getCurrentUser;
    },
    isLogedIn(){
      return this.$store.getters.getCurrentUser.email !== '';
    }
  },
  methods: {
    ...mapActions(["setCurrentPath"]),
    registrarse(){
      this.$router.push({ name: "Registro" });
      this.setCurrentPath('/registro')

    },
    logout(){
      Firebase.auth()
        .signOut()
        .then(
          () => {
            this.$router.push({ name: "Login" });
            this.$store.dispatch('logout')
          },
          () => {
            // var errorCode = reject.code;
            this.loading = false;
          }
        );
    }
  },
  
}
</script>


