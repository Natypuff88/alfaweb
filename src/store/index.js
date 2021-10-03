import Vue from 'vue';
import Vuex from 'vuex';

import Firebase from 'firebase'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoading: false,
    currentUser: {
      email: '',
      path: '/login'
    },
    isDeleted: false,
    cursos: [
      /*{
        codigo: "C00101",
        nombre: "Html Básico",
        estado: true,
        costo: 10000, 
        duracion: "1 mes",
        descripcion: "Curso básico de HTML para prin  cipiantes",
        cupos: 35,
        inscritos: 0,
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
        inscritos: 23,
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
        inscritos: 0,
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
        inscritos: 10,
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
        inscritos: 35,
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
        inscritos: 35,
        imagen: "https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png"

      }*/
    ],
    loading: false,
  },
  getters: {
    getCurrentUser({currentUser}){
      return currentUser;
    },
    getCursos({cursos}){
      return cursos
    },
    getIsLoading({isLoading}) {
      return isLoading;
    },
    getIsDeleted({isDeleted}) {
      return isDeleted;
    }
  },
  mutations: {
    isLoading(state, load){
      state.isLoading = load;
    },
    isDeleted(state, load){
      state.isDeleted = load;
    },
    setCurrentUser(state, user){
      state.currentUser.email = user;
      state.currentUser.path = '/Home';
    },
    setCurrentPath(state, path) {
      state.currentUser.path = path;
    },
    logout(state){
      state.currentUser.email = '';
      state.currentUser.path = '/login';
    },
    setCursos(state,cursos){
      state.cursos = cursos
    },
  },
  actions: {
    stopIsLoading({commit}) {
      commit("isLoading", false);
    },
    setCurrentUser({ commit }, user) {
      commit("isLoading", true);
      commit("setCurrentUser", user)
  

    },
    setCurrentPath({ commit }, path) {
      commit("isLoading", true);
      commit("setCurrentPath", path)
   

    },
    logout({commit}){
      commit("isLoading", true);
      commit('logout')

    },
    // para eliminar el curso de firebase
     eliminarCurso({ commit, dispatch }, cursoId) {
       commit("isLoading", true);
       commit("isDeleted", true);
        Firebase
          .firestore()
          .collection("curso")
          .doc(cursoId)
          .delete()
          .then(() => {
            dispatch("getCursos");
          });
    },
      // para agregar el curso de firebase
    agregarCurso({ commit, dispatch }, curso) {
      commit("isLoading", true);
      Firebase
        .firestore()
        .collection("curso")
        .add(curso)
        .then(() => {
          dispatch("getCursos");
        })
    },

    // con esta función llamo al Firebase para acceder al firestore y tomar la colección "curso"
    getCursos({ commit }) {
      commit("isLoading" , true);
       Firebase
        .firestore()
        .collection("curso")
        //.where("codigo", "==", "A0001")
        //.where("precio", ">", "2000")
        .get()
        .then((resp) => {
          const cursos = [];
          resp.forEach((doc) => {
            const data = doc.data();
            cursos.push({ 
              id: doc.id,
              ...data, 
            });
          });
          commit("setCursos", cursos)
        }).then(() => {
          commit("isLoading" , false);
        })
        .catch(() => {
          commit("isLoading" , false);
        })
       

    },
    // para poder editar el curso seleccionado y guardarlo en el firestore
    async editarCurso({ commit, dispatch}, { curso, id }) {
      
      commit("isLoading", true);
      Firebase
        .firestore()
        .collection("curso")
        .doc(id)
        .set(curso)
        .then(() => {
          dispatch("getCursos");
        });
    },
  }
});

export default store; 