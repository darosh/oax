<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-if="r._display" v-for="(r, k) in resources" :key="r.name">
        <app-resource v-model="resources[k]"></app-resource>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    components: {
      appResource: () => import('./Resource')
    },
    props: ['resources']
  }
</script>
