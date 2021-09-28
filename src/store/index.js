import Vue from 'vue';
import Vuex from 'vuex';
//import Firebase from 'firebase'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: {
      email: '',
      path: '/login'
    },
    cursos: [
      {
        codigo: "C00101",
        nombre: "Html Básico",
        estado: true,
        costo: 10000, 
        duracion: "1 mes",
        descripcion: "Curso básico de HTML para principiantes",
        cupos: 35,
        inscriots: 0,
        imagen: "https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png"

      },

      {
        codigo: "C00102",
        nombre: "CSS para principiantes",
        estado: false,
        costo: 10000, 
        duracion: "1 mes",
        descripcion: "Aprendiendo estilos con CSS desde el nivel más básico",
        cupos: 35,
        inscriots: 23,
        imagen: "https://lineadecodigo.com/wp-content/uploads/2014/04/css.png"

      },

      {
        codigo: "C00201",
        nombre: "Javascript básico de 0 a 100",
        estado: true,
        costo: 20000, 
        duracion: "2 mes",
        descripcion: "Programando para la web con Javascript",
        cupos: 25,
        inscriots: 0,
        imagen: "https://i.blogs.es/545cf8/es6-logo/450_1000.png"

      },

      {
        codigo: "C00202",
        nombre: "Javascript Avanzado",
        estado: false,
        costo: 30000, 
        duracion: "2 mes",
        descripcion: "Curso con las nuevas actualizaciones de Javascript",
        cupos: 20,
        inscriots: 10,
        imagen: "https://i.blogs.es/545cf8/es6-logo/450_1000.png"

      },
      {
        codigo: "C00301",
        nombre: "VueJS de 0 a 100",
        estado: false,
        costo: 85500, 
        duracion: "5 mes",
        descripcion: "Framework Vue.js desde principiante a avanzado",
        cupos: 35,
        inscriots: 35,
        imagen: "https://thumbs.gfycat.com/PinkPiercingBull-size_restricted.gif"

      },
      {
        codigo: "C00302",
        nombre: "Estilos con SASS",
        estado: false,
        costo: 45000, 
        duracion: "1 mes",
        descripcion: "Mejorando los estilos con mayor potencia mediante SASS",
        cupos: 45,
        inscriots: 35,
        imagen: "https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png"

      }
    ]
  },
  getters: {
    getCurrentUser({currentUser}){
      return currentUser;
    }
  },
  mutations: {
    setCurrentUser(state, user){
      state.currentUser.email = user;
      state.currentUser.path = '/home';
    },
    setCurrentPath(state, path) {
      state.currentUser.path = path;
    },
    logout(state){
      state.currentUser.email = '';
      state.currentUser.path = '/login';
    }
  },
  actions: {
    setCurrentUser({ commit }, user) {
      commit("setCurrentUser", user)
    },
    setCurrentPath({ commit }, path) {
      commit("setCurrentPath", path)
    },
    logout({commit}){
      commit('logout')
    }
  }
});

export default store; 