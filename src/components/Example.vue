<template lang="pug">
  span(v-if="item.type === 'array'")
    | [
    app-example(:item="item.items", :level="level + 1")
    | ]
  span(v-else-if="item.type === 'object' || item.properties || (typeof item === 'object' && !Object.keys(item).length)")
    | {
    ul
      li(v-for="(prop, propName) in item.properties")
        span(v-if="expanded[propName] === null") &nbsp;
        span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") {{expanded[propName] ? '&minus;' : '+'}}
        | "{{propName}}":
        =" "
        app-example(v-if="expanded[propName] || (expanded[propName] === null)", :item="prop", :level="level + 1")
        span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") &hellip;
    | }
  span(v-else :class="{'cm-string': type === 'string', 'cm-atom': type === 'boolean', 'cm-number': type === 'number'}") {{value}}
</template>

<script>
  import { value } from '../models/oas/methods/schema'

  export default {
    name: 'app-example',
    props: {item: {}, level: {default: 0}},
    data () {
      const e = {}

      if (this.item.properties) {
        Object.keys(this.item.properties).forEach(p => {
          e[p] = (this.item.properties[p] && (this.item.properties[p].properties || this.item.properties[p].items)) ? this.level < 1 : null
        })
      }

      return {
        expanded: e
      }
    },
    computed: {
      v () {
        return value(this.item)
      },
      value () {
        return JSON.stringify(this.v)
      },
      type () {
        return typeof this.v
      }
    },
    methods: {
      space (level) {
        return '  '.repeat(level >= 0 ? level : 0)
      }
    }
  }
</script>
