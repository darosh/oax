<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 v-for="r in resources" :key="r.name">
        <app-resource :r="r"></app-resource>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    components: {
      appResource: () => import('./Resource')
    },
    props: ['resources', 'description']
  }
</script>
