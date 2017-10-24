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
        span.expander(v-if="value || expanded[propName] === null") &nbsp;
        span.expander(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") {{expanded[propName] ? '&minus;' : '+'}}
        | "{{propName}}":
        =" "
        app-example(v-if="value || expanded[propName] || (expanded[propName] === null)", :item="prop", :level="level + 1" v-model="value")
        span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") &hellip;
    | }
  span(v-else :class="{'cm-string': type === 'string', 'cm-atom': type === 'boolean', 'cm-number': type === 'number'}") {{val}}
</template>

<script>
  import { value } from '../../../assets/scripts/specification/methods/schema'
  import appJson from './Json'

  export default {
    name: 'app-example',
    components: { appJson },
    props: {value: {}, item: {}, level: {default: 0}},
    data () {
      return {
        expanded: this.init(this.item.properties)
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
    },
    methods: {
      init (properties) {
        const e = {}

        if (properties) {
          Object.keys(properties).forEach(p => {
            e[p] = (properties[p] && (properties[p].properties || properties[p].items))
              ? this.level < 1
              : null
          })
        }

        return e
      }
    },
    watch: {
      item: function () {
        this.expanded = this.init(this.item.properties)
      }
    }
  }
</script>
