<template>
  <v-expansion-panel expand>
    <v-expansion-panel-content v-model="value._opened" ripple class="relative">
      <div slot="header" class="title">{{value.name}}</div>
      <v-divider></v-divider>
      <v-card>
        <v-card-title v-if="value.description">{{value.description}}</v-card-title>
        <v-divider v-if="value.description"></v-divider>
        <v-card-text v-if="value.externalDocs && value.externalDocs.url">
          <a :href="value.externalDocs.url">{{value.externalDocs.description}}</a>
        </v-card-text>
        <v-divider v-if="value.externalDocs && value.externalDocs.url"></v-divider>
        <div class="pt-2 pb-2">
          <div v-for="o in value._operations" :key="o._id">
            <app-operation v-ripple :o="o" @click.native="selected(o)" class="relative pl-3 pr-3"></app-operation>
          </div>
        </div>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import { bus } from '../services/bus'

  export default {
    components: {
      appOperation: () => import('./Operation')
    },
    props: ['value'],
    methods: {
      selected (item) {
        bus.$emit('selected', item)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .relative
    position relative
</style>
