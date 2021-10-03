<template>
    <div>
        <v-container> 
            <v-alert dense icon="mdi-account-check" outlined type="green" v-if="isDeleted">
              El curso fue eliminado correctamente
            </v-alert>
            <v-row class="justify-center mt-5 mb-5"> 

                <h1 class="text-center d-inline" > Administración </h1> 

                <v-btn class="ma-2"   dark color="blue" @click="agregar()">
                    Agregar curso
                </v-btn>
            </v-row>
            
            <v-data-table v-if="!isLoading" :headers="headers" :items="listadoCursos" class="elevation-1 m-5">
                    <template v-slot:item.costo="{ item }">
                        <v-chip :color="getColor(item.costo)" dark>
                            {{ item.costo }}
                        </v-chip>
                    </template>
                     <template v-slot:item.terminado="{ item }">
                        <v-chip :color="getColorEstado(item.terminado)" dark>
                            {{ item.terminado }}
                        </v-chip>
                    </template>
                    <template v-slot:item.herramientas="{ item }">
                       <v-icon @click="editar(item)">mdi-circle-edit-outline</v-icon>
                        <v-icon small @click="eliminar(item)">mdi-delete</v-icon>
                    </template>
            </v-data-table>
            <div>
                <v-alert dense icon="mdi-account-check" outlined type="purple" >
                        Cantidad total de alumnos permitidos: {{permitidos}}
                </v-alert>

                     <v-alert
                    dense
                    icon="mdi-account-plus"
                    outlined
                    type="blue"
                    >
                        Cantidad total de alumnos inscritos: {{inscritos}}
                </v-alert>

                     <v-alert
                    dense
                    icon="mdi-alarm"
                    outlined
                    type="red"
                    >
                        Cantidad total de cupos restantes: {{restantes}}
                </v-alert>

                     <v-alert
                    dense
                    icon="mdi-cancel"
                    outlined
                    type="pink"
                    >
                        Cantidad total de cursos terminados: {{terminados}}
                </v-alert>

                     <v-alert
                    dense
                    icon="mdi-bell"
                    outlined
                    type="brown"
                    >
                        Cantidad total de cursos activos: {{activos}}
                </v-alert>

                     <v-alert
                    dense
                    icon="mdi-bell"
                    outlined
                    type="red"
                    >
                        Cantidad total de cursos: {{listadoCursos.length}}
                </v-alert>

               
            </div>
        </v-container>
        <v-dialog v-model="showDeleteModal" persistent max-width="600px" >
      <v-card>
        <v-card-title>
          <span class="text-h5">Eliminar curso</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            Esta seguro que desea eliminar el curso ?
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showDeleteModal  = false;" >
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleted=true; confirmEliminar();">
            Si, eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-dialog v-model="showModal" persistent max-width="600px" >
      <v-card>
        <v-card-title>
          <span class="text-h5">Agregar curso</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-alert dense icon="mdi-cancel" v-if="error" outlined type="red" >
            La cantidad de inscritos no puede ser mayor al cupo del curso.
          </v-alert>
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
          <v-btn color="blue darken-1" text @click="showModal  = false" >
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="guardar()">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data () {
      return {
        selectedItem: {
        },
        error: false,
        showDeleteModal: false,
        deleted: false,
        form: {
          codigo: "",
          nombre: "",
          estado: true,
          costo: 0, 
          duracion: "",
          descripcion: "",
          cupos: 0,
          inscritos: 0,
          imagen: '',
          registro: ''
        },
        valid: true,
        showModal: false,
        headers: [
          {
            text: 'Codigo',
            align: 'start',
            sortable: false,
            value: 'codigo',
          },
          { text: 'Curso', value: 'nombre' },
          { text: 'Cupos', value: 'cupos' },
          { text: 'Inscritos', value: 'inscritos' },
          { text: 'Duración', value: 'duracion' },
          { text: 'Costo', value: 'costo' },
          { text: 'Terminado', value: 'terminado' },
          { text: 'Fecha', value: 'registro' },
          { text: 'Acciones', value: 'herramientas' },
        ],
      }
    },
    methods: {
     ...mapActions(["getCursos", "agregarCurso", "eliminarCurso"]),

     //para que sea azul o gris si los inscritos son iguales o menores a los cupos
      terminado(cupos, inscritos){
        return (cupos === inscritos) ? 'Si' : 'No'
      },
      getColorEstado(estado) {
          return (estado === 'Si')  ? 'blue' : 'gray'
      },
      // para que al hacer click en el botón agregar me aparezca la modal
      agregar() {
        this.showModal = true;  
      },
      getColor (number) {
        if (number > 400) return 'red'
        else if (number > 200) return 'orange'
        else return 'green'
      },
      // para editar el elemento
      editar(item) {
        this.selectedItem = item;
        this.$router.push({ name: "Editar" , params: { id: item.id}});
      },
      // para eliminar el elemento
      eliminar(item) {
        this.toDelete = item;
        this.showDeleteModal = true;
      },
      confirmEliminar(){
        this.deleted = true;
        this.eliminarCurso(this.toDelete.id)
        this.showDeleteModal = false;
        
      },
      // para guardarlos datos del modal
      guardar(){
        if(this.form.cupos < this.form.inscritos) {
          this.error = true;

        }
        if(!this.error) { 
          this.agregarCurso(this.form);
        }
      }
    },
    computed:{
      isDeleted(){
        return this.$store.getters.getIsDeleted;
      },
      isLoading(){
        return this.$store.getters.getIsLoading;
      },

      // recorre los datos en la tabla y les agrega el signo $ en curso
      listadoCursos() {
        const cursos = this.$store.getters.getCursos;
        let listadoCursos = [];
        cursos.forEach((curso) => {
           //  const temCosto = "$ " +(+curso.costo).toString().toLocaleString()
            const obj = {
                ...curso,
                terminado: this.terminado(curso.cupos, curso.inscritos),
                herramientas: '',
            }
            listadoCursos.push(obj);
        })
        return listadoCursos;
      },
      permitidos(){
        let permitidos = 0;
        const cursos = this.$store.getters.getCursos;
        cursos.forEach((curso) => {
          permitidos += +curso.cupos;
        })
        return permitidos;
      },
      inscritos(){
        let inscritos = 0;
        const cursos = this.$store.getters.getCursos;
        cursos.forEach((curso) => {
          inscritos += +curso.inscritos;
        })
        return inscritos;
      },
      restantes(){
        let restantes = 0;
        const cursos = this.$store.getters.getCursos;
        cursos.forEach((curso) => {
          restantes += +curso.cupos - curso.inscritos;
        })
        return restantes;
      },
      terminados(){
        let terminado = 0;
        const today = new Date();
        const cursos = this.$store.getters.getCursos;
        cursos.forEach((curso) => {
          const cursoDate = new Date(curso.registro);
          if(cursoDate.getTime() < today.getTime()){ 
            terminado += +1;
          }
        })
        return terminado;
      },
      activos(){
        let activos = 0;
        const today = new Date();
        const cursos = this.$store.getters.getCursos;
        cursos.forEach((curso) => {
          const cursoDate = new Date(curso.registro);
          if(cursoDate.getTime() > today.getTime()){ 
            activos += +1;
          }
        })
        return activos;
      }
    },
    created() {
    }
  }
</script>