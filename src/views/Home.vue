<template>
    <div>
        <v-container> 

            

            <h1 class="text-center mt-5" > Lista de cursos </h1>
            <Cards />
         


        </v-container>
      
    </div>
</template>

<script>
import Cards from './../components/Cards.vue'

export default {
  components: {
      Cards
  }

}
</script>
