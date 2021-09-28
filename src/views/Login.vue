<template>
    <div>
      <v-container> 
        <h1 class="font-weight-bold mt-5" > Login de Usuario </h1>

          <v-form   ref="form"
              v-model="valid"
              lazy-validation :model="formLabelAlign">
            <v-row>
                    <!--EMAIL -->
                      <v-col
                        cols="12"
                        md="12"
                      >
                          <v-text-field
                            label="Email"  v-model="formLabelAlign.user"
                            type="text"
                          ></v-text-field>
                    </v-col>
                    
                    <!--CONTRASEÑA -->
                      <v-col
                      cols="12"
                      md="12"
                    >
                          <v-text-field
                            label="Password"  
                            v-model="formLabelAlign.password"
                            type='password'
                          ></v-text-field>
                    </v-col>
            </v-row>

           <!--BOTONES -->
            <v-row class="d-flex justify-center "> 
              <v-btn
                  class="ma-2"
                  :loading="loading"
                  :disabled="loading"
                  
                  color="success"
                  @click="login"
                >
                  INICIAR
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
          </v-form>
      </v-container>
    </div>
</template>

<script>
import Firebase from "firebase";
import {mapActions} from 'vuex';
export default {
  data () {
    return {
      formLabelAlign: {
        user: "",
        password: "",
      },
      loading: false,
      valid: true
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

  methods: {
    ...mapActions(["setCurrentUser"]),
    login() {
      this.loading = true;
      Firebase.auth()
      .signInWithEmailAndPassword(
        this.formLabelAlign.user,
        this.formLabelAlign.password
      )
      .then(
        () => {
          this.$router.push("/home");
          this.setCurrentUser(this.formLabelAlign.user);
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      )
      .catch(() => {
        this.loading = false;
      })
    },
  },
  }
</script>