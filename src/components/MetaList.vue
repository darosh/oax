<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 pa-0 v-for="m in metas" v-if="m.value || m.download || m.image" :key="m.icon">
        <app-meta :m="m"></app-meta>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    components: {
      appMeta: () => import('./Meta')
    },
    props: ['metas']
  }
</script>
