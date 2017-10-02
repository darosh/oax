<template lang="pug">
  span(v-if="array")
    | [
    template(v-for="(i, k) in item")
      app-json(:item="i", :level="level + 1", :key="k", v-model="value")
      span(v-if="k < (item.length - 1)")
        =", "
        br
        span &nbsp;&nbsp;
    | ]
  span(v-else-if="object")
    | {
    ul
      li(v-for="(prop, propName) in item")
        span.expander(v-if="value || (expanded[propName] === null)") &nbsp;
        span.expander(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") {{expanded[propName] ? '&minus;' : '+'}}
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
      return {
        expanded: this.init(this.item)
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
    },
    methods: {
      init (item) {
        const e = {}

        if (typeof item === 'object') {
          Object.keys(item).forEach(p => {
            e[p] = (item[p] && (typeof item[p] === 'object')) ? this.level < 1 : null
          })
        }

        return e
      }
    },
    watch: {
      item: function () {
        this.expanded = this.init(this.item)
      }
    }
  }
</script>
