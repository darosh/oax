<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>{{operation.tags[0]}}</v-toolbar-title>
    </v-toolbar>
    {{operation._pathName}}
    <v-tabs :scrollable="false">
      <v-tabs-bar slot="activators" class="white">
        <v-tabs-item href="tab-1">Info</v-tabs-item>
        <v-tabs-item href="tab-2">Script</v-tabs-item>
        <v-tabs-item href="tab-3">Result</v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-content id="tab-1"><app-info></app-info></v-tabs-content>
      <v-tabs-content id="tab-2"><app-scripts></app-scripts></v-tabs-content>
      <v-tabs-content id="tab-3"><app-result></app-result></v-tabs-content>
    </v-tabs>
  </div>
</template>

<script>
  export default {
    props: ['operation'],
    components: {
      appInfo: () => import('./Info'),
      appScripts: () => import('./Scripts'),
      appResult: () => import('./Result')
    }
  }
</script>

<style scoped lang="stylus">
</style>
