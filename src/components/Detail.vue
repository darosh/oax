<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>{{operation.tags[0]}}</v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <v-flex pt-4 pl-4 pr-4 pb-2>
        <app-operation :o="operation" :clickable="true"></app-operation>
        <div class="subheading pt-3 pb-2">{{operation.summary}}</div>
        <div class="body-1">{{operation.description}}</div>
      </v-flex>
    </v-layout>
    <v-tabs :scrollable="false">
      <v-tabs-bar slot="activators" class="tabs--transparent">
        <v-tabs-item href="tab-1">Info</v-tabs-item>
        <v-tabs-item href="tab-2">Script</v-tabs-item>
        <v-tabs-item href="tab-3">Result</v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-content id="tab-1">
        <app-info v-model="operation"></app-info>
      </v-tabs-content>
      <v-tabs-content id="tab-2">
        <app-scripts></app-scripts>
      </v-tabs-content>
      <v-tabs-content id="tab-3">
        <app-result></app-result>
      </v-tabs-content>
    </v-tabs>
  </div>
</template>

<script>
  export default {
    props: ['operation'],
    components: {
      appOperation: () => import('./Operation'),
      appInfo: () => import('./Info'),
      appScripts: () => import('./Scripts'),
      appResult: () => import('./Result')
    }
  }
</script>

<style scoped lang="stylus">
  .tabs--transparent
    background-color transparent
</style>
