<template lang="pug">
  span
    span(v-if="item.type === 'array'")
      | [
      app-model(:item="item.items", :level="level + 1")
      | ]
    span(v-else-if="item.type === 'object'")
      i(v-if="item.xml && item.xml.name") {{item.xml.name ? item.xml.name + ' ' : ''}}
      | {
      br(v-if="item.properties && Object.keys(item.properties).length")
      div(v-for="(prop, propName) in item.properties") {{space(level+1)}}
        b {{propName}}:&#32;
        app-model(:item="prop", :level="level + 1")
      | {{space(level)}}}
    span(v-else) {{item.format || item.type}}
</template>

<script>
  export default {
    name: 'app-model',
    props: {item: {}, level: {default: 0}},
    methods: {
      space (level) {
        return '  '.repeat(level >= 0 ? level : 0)
      }
    }
  }
</script>
