<template>
  <v-container class="mt-5">
    <v-row justify="space-around">
      <v-card width="300" class="mb-5" v-for="curso in listadoCursos" v-bind:key=" curso.id">
        <v-img
          height="200px"
          :src="curso.imagen">

          
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            {{curso.nombre}}
          </div>
          <div class="font-weight-bold ml-8 mb-2">
           Información
          </div>

          <v-timeline align-top  dense>
            <v-timeline-item color="deep-purple lighten-1" small>
              <div>
                <div class="font-weight-normal">
                  <strong>Costo</strong> : {{ curso.costo }}
                </div>
                <div class="font-weight-normal">
                  <strong>Duración</strong> : {{ curso.duracion }}
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item color="green" small>
              <div>
                <div class="font-weight-normal">
                  <strong>Cupo</strong> : {{ curso.cupos }}
                </div>
                <div class="font-weight-normal">
                  <strong>Completado</strong> : {{ (curso.cupo === curso.inscritos) ?  'Completado' : 'No'}}
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item color="deep-purple lighten-1" small>
              <div>
                <div class="font-weight-normal">
                  <strong>Fecha Registro</strong>
                </div>
                <div class="font-weight-normal">
                 {{ curso.registro }}
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item color="green" small>
              <div>
                <div class="font-weight-normal">
                  <strong>Descripcion</strong> 
                </div>
                <div class="font-weight-normal">
                  {{ curso.descripcion }}
                </div>
              </div>
            </v-timeline-item>
            
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
 
  export default {
    data: () => ({
    }),
    methods: {

      // para validar si el curso esta terminado o no para que se muestre en la card
      terminado(cupos, inscritos){
        return (cupos === inscritos) ? 'Si' : 'No'
      }
    },
    computed:{

      // para llamar al listado de cursos desde el store
      listadoCursos() {
        const cursos = this.$store.getters.getCursos;
        return cursos;
      }
    },
    created() {
    }
  }
</script>