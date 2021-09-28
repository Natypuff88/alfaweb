<template>
    <div>
      <v-container> 
        <h1 class="font-weight-bold mt-5" > Registro de Usuario </h1>

        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Email" v-model='user.email'></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field label="Contraseña" type="password" v-model='user.password'></v-text-field>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center "> 
           <v-btn
              class="ma-2"
              :loading="loading"
              :disabled="loading"
              color="success"
              @click="loader = 'loading'; registrar()"
            >
              REGISTRAR
          </v-btn>

                <v-btn
              class="ma-2" dark
              :loading="loading"
              :disabled="loading"
              color="red"
              @click="loader = 'loading'"
            >
              LIMPIAR FORMULARIO
          </v-btn>

                <v-btn
              class="ma-2" dark
              :loading="loading"
              :disabled="loading"
              color="orange"
              @click="loader = 'loading'"
            >
              LIMPIAR VALIDACIÓN
          </v-btn>

        </v-row>

      </v-container>
    </div>
</template>
<script>
import Firebase from 'firebase';
export default {
  data () {
    return {
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
  methods:{
    registrar(){
      Firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email.trim(), this.user.password)
      .then(
        (resp)=> {
          //se registro correctamente
          console.log(resp)
        },
        (err) => {
          //ocurrio un error al registrarse
          console.log(err)
        }
      )
      
    }
  }
}
</script>