<template lang="pug">
  span(v-if="item.type === 'array'")
    | [
    app-model(:item="item.items", :level="level + 1")
    | ]
  span(v-else-if="item.type === 'object' || item.properties || (typeof item === 'object' && !Object.keys(item).length)")
    b(v-if="name") {{name}}
      =" "
    | {
    ul
      li(v-for="(prop, propName) in item.properties")
        span(v-if="expanded[propName] === null") &nbsp;
        span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") {{expanded[propName] ? '&minus;' : '+'}}
        | "{{propName}}":
        =" "
        app-model(v-if="expanded[propName] || (expanded[propName] === null)", :item="prop", :level="level + 1")
        span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") &hellip;
    | }
  span(v-else :class="{'cm-string': type === 'string', 'cm-atom': type === 'boolean', 'cm-number': type === 'number'}") {{t}}
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'

  import { value, type } from '../../models/oas/methods/schema'

  export default {
    name: 'app-model',
    props: {item: {}, level: {default: 0}},
    data () {
      const e = {}

      if (this.item.properties) {
        Object.keys(this.item.properties).forEach(p => {
          e[p] = (this.item.properties[p] && (this.item.properties[p].properties || this.item.properties[p].items))
            ? this.level < 1
            : null
        })
      }

      return {
        expanded: e
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC
      ]),
      v () {
        return value(this.item)
      },
      t () {
        return type(this.item)
      },
      value () {
        return JSON.stringify(this.v)
      },
      type () {
        return typeof this.v
      },
      name () {
        for (const def in this.SPEC.definitions) {
          if (this.SPEC.definitions[def] === this.item) {
            return def
          }
        }

        return null
      }
    }
  }
</script>
