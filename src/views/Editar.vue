<template>
    <div>
        <v-card>
        <v-card-title>
          <span class="text-h5">Editar</span>
        </v-card-title>
            
        <v-alert dense icon="mdi-cancel" v-if="error" outlined type="red" >
          La cantidad de inscritos no puede ser mayor al cupo del curso.
        </v-alert>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col  cols="12">
                <v-text-field label="Codigo" v-model="form.codigo" required></v-text-field>
              </v-col>
              <v-col  cols="12">
                <v-text-field label="Nombre" v-model="form.nombre" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field type="number" v-model="form.costo" label="Costo" hint="example of helper text only on focus" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Duracion"  v-model="form.duracion" hint="example of persistent helper text" persistent-hint required ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Descripcion"  v-model="form.descripcion" required ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Cupos"  v-model="form.cupos" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Inscritos"  v-model="form.inscritos" type="number" required></v-text-field>
              </v-col>
                 <v-col cols="12">
                <v-date-picker label="Fecha registro"  v-model="form.registro" required></v-date-picker>
              </v-col>
              <v-col cols="12">
                   <v-text-field label="URL Imagen"  v-model="form.imagen" type="text" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Campos Obligatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="volver()" >
            Volver
          </v-btn>
          <v-btn color="blue darken-1" text @click="guardar()">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>
<script >
import {mapActions} from 'vuex'

export default {
    name:"Editar",
    props: ['id'],
    data(){
        return {
            error: false,
            form: {
                codigo: "",
                nombre: "",
                estado: true,
                costo: '', 
                duracion: "",
                descripcion: "",
                cupos: 0,
                inscritos: 0,
                imagen: '',
                registro: '',
            },
        }
    },
    computed: {
    },
    methods: {
      ...mapActions(["editarCurso"]),

      // Para volver al pulsar el botón
      volver(){
        this.$router.push({ name: "Administracion" });
      },
      // Para guardar al pulsar el botón
      guardar(){
        if(this.form.cupos < this.form.inscritos) {
          this.error = true;

        }
        if(!this.error) {
          const data = this.form;
          this.editarCurso({curso: data, id: this.form.id})
          // Después de editar vuelvo a la Adm
          .then(()=> {
            this.$router.push({ name: "Administracion" });
          })
        }
      }
    },
    mounted(){
      // Para cargar los datos de lo que se va a editar
      this.$nextTick(function () {
          // Code that will run only after the
          // entire view has been rendered
          const curso = this.$store.getters.getCursos.find((c) => c.id === this.id);
          // const tempCosto = curso.costo.replace("$", "").replace(".", "").trim();
          this.form = {
            ...curso
          }
         // console.log(curso)
          // this.form.costo = tempCosto;
      })
    },
}
</script>
