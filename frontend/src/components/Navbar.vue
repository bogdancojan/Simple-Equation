<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        :elevation="17"
        rounded
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list>
          <v-list-item 
            v-for="item in items"
            :key="item.value"
            @click="updatePage(item)">
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 100vh;">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      title: 'Infinity War',
      items: [
        {
          title: 'Infinity War',
          value: 'infinity_war',
        },
        {
          title: 'Speed Run',
          value: 'speed_run',
        },
        {
          title: 'PDF Downloader',
          value: 'pdf_downloader',
        },
      ],
    }),

    methods: {
      updatePage(item) {
        //Update the title of the navbar
        this.title = item.title

        //Emit an event to the parent component to update the page
        this.$emit('update-page', item.value)
      },
    },

    watch: {
      group() {
        this.drawer = false
      },
    },
  }
</script>