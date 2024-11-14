<template>
  <v-app>
    <Navbar @update-page="currentPage = $event">
      <v-container>
        <component :is="currentPageComponent" />
      </v-container>
    </Navbar>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import InfinityWar from './pages/InfinityWar.vue'
import SpeedRun from './pages/SpeedRun.vue';
import PDFDownloader from './pages/PDFDownloader.vue';

export default {
  components: {
    Navbar,
    InfinityWar,
    SpeedRun,
    PDFDownloader
  },

  data() {
    return {
      currentPage: 'infinity_war'
    }
  },

  computed: {
    currentPageComponent() {
      switch(this.currentPage){
        case 'speed_run':
          return 'SpeedRun';
        case 'pdf_downloader':
          return 'PDFDownloader';
        default:
          return 'InfinityWar';
      }
    }
  }
}
</script>