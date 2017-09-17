<template lang="pug">
  span
    div.cm-comment(v-if="item.description && !level" style="white-space: pre-wrap") // {{item.description}}
    div.cm-comment(v-if="item.enum  && !level" style="white-space: pre-wrap") // (
      span.cm-string(v-html="item.enum.join('&#x200B;<span class=\"cm-comment\">|</span>')")
      | )
    div.cm-comment(v-if="item.pattern  && !level") //
      span.cm-atom  /{{item.pattern}}/
    div.cm-comment(v-if="((item.minLength) <= 0 || item.maxLength)  && !level") //
      span.cm-number  {{item.minLength}}
      | ..
      span.cm-number {{item.maxLength}}
    span(v-if="item.type === 'array'")
      div.cm-comment(v-if="item.items.description" style="white-space: pre-wrap")  // {{item.items.description}}
      div.cm-comment(v-if="((item.minItems) <= 0 || item.maxItems)")  // [
        span.cm-number {{item.minItems}}
        |..
        span.cm-number {{item.maxItems}}
        | ]
      | [
      app-model(:item="item.items", :level="level + 1", v-model="value")
      | ]
    span(v-else-if="item.type === 'object' || item.properties || (typeof item === 'object' && !Object.keys(item).length)")
      b.primary--text.link(v-if="name", @click.stop="UI_SET_DIALOG({type: 'schema', param: name})") {{name}}
        =" "
      | {
      ul
        li(v-for="(prop, propName) in item.properties")
          div.cm-comment(v-if="prop.description" style="white-space: pre-wrap")  // {{prop.description}}
          div.cm-comment(v-if="prop.enum  && !level" style="white-space: pre-wrap") // (
            span.cm-string(v-html="prop.enum.join('&#x200B;<span class=\"cm-comment\">|</span>')")
            | )
          div.cm-comment(v-if="prop.pattern")  //
            span.cm-atom  /{{prop.pattern}}/
          div.cm-comment(v-if="((prop.minLength) <= 0 || prop.maxLength)")  //
            span.cm-number  {{prop.minLength}}
            | ..
            span.cm-number {{prop.maxLength}}
          span(v-if="value || (expanded[propName] === null)") &nbsp;
          span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") {{expanded[propName] ? '&minus;' : '+'}}
          | "{{propName}}":
          =" "
          app-model(v-if="value || expanded[propName] || (expanded[propName] === null)", :item="prop", :level="level + 1", v-model="value")
          span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") &hellip;
      | }
    span(v-else)
      span(:class="{'cm-string': type === 'string', 'cm-atom': type === 'boolean', 'cm-number': type === 'number'}") {{item.format || item.type || t}}
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'

  import { value, type } from '../../models/oas/methods/schema'

  export default {
    name: 'app-model',
    props: {value: {}, item: {}, level: {default: 0}},
    data () {
      return {
        expanded: this.init(this.item.properties)
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
      val () {
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
    },
    methods: {
      ...mapMutations([
        types.UI_SET_DIALOG
      ]),
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
