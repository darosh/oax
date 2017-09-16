<template lang="pug">
  app-json(v-if="item.example", :item="item.example", :level="level" v-model="value")
  span(v-else-if="item.type === 'array'")
    | [
    app-example(:item="item.items", :level="level + 1" v-model="value")
    | ]
  span(v-else-if="item.type === 'object' || item.properties || (typeof item === 'object' && !Object.keys(item).length)")
    | {
    ul
      li(v-for="(prop, propName) in item.properties")
        span(v-if="value || expanded[propName] === null") &nbsp;
        span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") {{expanded[propName] ? '&minus;' : '+'}}
        | "{{propName}}":
        =" "
        app-example(v-if="expanded[propName] || (expanded[propName] === null)", :item="prop", :level="level + 1" v-model="value")
        span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") &hellip;
    | }
  span(v-else :class="{'cm-string': type === 'string', 'cm-atom': type === 'boolean', 'cm-number': type === 'number'}") {{val}}
</template>

<script>
  import { value } from '../../models/oas/methods/schema'
  import appJson from './Json'

  export default {
    name: 'app-example',
    components: { appJson },
    props: {value: {}, item: {}, level: {default: 0}},
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
      val () {
        return JSON.stringify(this.v)
      },
      type () {
        return typeof this.v
      }
    }
  }
</script>
