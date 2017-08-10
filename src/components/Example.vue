<template lang="pug">
  span
    span(v-if="item.type === 'array'")
      | [
      app-example(:item="item.items", :level="level + 1")
      | ]
    span(v-else-if="item.type === 'object'")
      | {
      br(v-if="Object.keys(item.properties).length")
      div(v-for="(prop, propName) in item.properties") {{space(level+1)}}
        b "{{propName}}":&#32;
        app-example(:item="prop", :level="level + 1")
      | {{space(level)}}}
    span(v-else) {{value}}
</template>

<script>
  import { value } from '../models/oas/methods/schema'

  export default {
    name: 'app-example',
    props: {item: {}, level: {default: 0}},
    computed: {
      value () {
        return JSON.stringify(value(this.item))
      }
    },
    methods: {
      space (level) {
        return '  '.repeat(level >= 0 ? level : 0)
      }
    }
  }
</script>
