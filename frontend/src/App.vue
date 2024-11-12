<template>
  <v-app>
    <v-main>
      <Navbar />
      <v-container>
        <Home />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Home from './pages/Home.vue'

export default {
  components: {
    Navbar,
    Home,
  },
}
</script>