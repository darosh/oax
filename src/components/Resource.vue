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
          <div v-if="o._display" v-for="(o, i) in value._operations" :key="o._id">
            <div class="operation--block relative pt-1" v-ripple @click="selected(o)">
              <app-operation :o="o" class="pl-3 pr-3"></app-operation>
              <div v-if="$store.state.view.description">
                <div class="pt-1 pr-3 body-2" style="padding-left: 84px">{{o.description}}</div>
                <div class="pl-3 pr-3 pt-1">
                  <v-divider v-if="i < (value._operations.length - 1)"></v-divider>
                </div>
              </div>
            </div>
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

  @import "../../node_modules/vuetify/src/stylus/settings/_theme.styl"

  .operation--block:hover
    background: $material-twelve-percent-dark
    cursor pointer
</style>
