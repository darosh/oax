<template lang="pug">
  span(v-if="array")
    | [
    app-json(v-for="(i, k) in item", :item="i", :level="level + 1", :key="k", v-model="value")
    | ]
  span(v-else-if="object")
    | {
    ul
      li(v-for="(prop, propName) in item")
        span(v-if="value || (expanded[propName] === null)") &nbsp;
        span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") {{expanded[propName] ? '&minus;' : '+'}}
        | "{{propName}}":
        =" "
        app-json(v-if="value || expanded[propName] || (expanded[propName] === null)", :item="prop", :level="level + 1", v-model="value")
        span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") &hellip;
    | }
  span(v-else :class="{'cm-string': type === 'string', 'cm-atom': type === 'boolean', 'cm-number': type === 'number'}") {{val}}
</template>

<script>
  export default {
    name: 'app-json',
    props: {value: {}, item: {}, level: {default: 0}},
    data () {
      const e = {}

      if (typeof this.item === 'object') {
        Object.keys(this.item).forEach(p => {
          e[p] = (this.item[p] && (typeof this.item[p] === 'object')) ? this.level < 1 : null
        })
      }

      return {
        expanded: e
      }
    },
    computed: {
      array () {
        return Array.isArray(this.item)
      },
      object () {
        return typeof this.item === 'object'
      },
      type () {
        return typeof this.item
      },
      val () {
        return JSON.stringify(this.item)
      }
    }
  }
</script>
