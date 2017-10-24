<template lang="pug">
  span
    div.cm-comment(v-if="merged.description && !level" style="white-space: pre-wrap") // {{merged.description}}
    div.cm-comment(v-if="merged.enum  && !level" style="white-space: pre-wrap") // (
      span.cm-string(v-html="merged.enum.join('&#x200B;<span class=\"cm-comment\">|</span>')")
      | )
    div.cm-comment(v-if="merged.pattern  && !level") //
      span.cm-atom  /{{merged.pattern}}/
    div.cm-comment(v-if="((merged.minLength) <= 0 || merged.maxLength)  && !level") //
      span.cm-number  {{merged.minLength}}
      | ..
      span.cm-number {{merged.maxLength}}
    span(v-if="merged.type === 'array'")
      div.cm-comment(v-if="merged.items.description" style="white-space: pre-wrap")  // {{merged.items.description}}
      div.cm-comment(v-if="((merged.minItems) <= 0 || merged.maxItems)")  // [
        span.cm-number {{merged.minItems}}
        | ..
        span.cm-number {{merged.maxItems}}
        | ]
      | [
      // b.primary--text.link(v-if="itemsName", @click.stop="UI_SET_DIALOG({type: 'schema', param: itemsName})") {{itemsName}}
      app-model(:item="merged.items", :level="level + 1", v-model="value")
      | ]
    span(v-else-if="merged.type === 'object' || merged.properties || (typeof merged === 'object' && !Object.keys(merged).length)")
      b.primary--text.link(v-if="name", @click.stop="UI_SET_DIALOG({type: 'schema', param: name})") {{name}}
      span(v-if="name && parentNames")
        =": "
      span(v-if="parentNames", v-for="(n, k) in parentNames", :key="k")
        span(v-if="k")
          =", "
        b.primary--text.link(@click.stop="UI_SET_DIALOG({type: 'schema', param: n})") {{n}}
      span(v-if="name")=" {"
      span(v-else="name")="{"
      ul
        li(v-for="(prop, propName) in merged.properties")
          div.cm-comment(v-if="prop.description" style="white-space: pre-wrap") // {{prop.description}}
          div.cm-comment(v-if="prop.enum  && !level" style="white-space: pre-wrap") // (
            span.cm-string(v-html="prop.enum.join('&#x200B;<span class=\"cm-comment\">|</span>')")
            | )
          div.cm-comment(v-if="prop.pattern") //
            span.cm-atom  /{{prop.pattern}}/
          div.cm-comment(v-if="((prop.minLength) <= 0 || prop.maxLength)") //
            span.cm-number  {{prop.minLength}}
            | ..
            span.cm-number {{prop.maxLength}}
          span.expander(v-if="value || (expanded[propName] === null)") &nbsp;
          span.expander(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") {{expanded[propName] ? '&minus;' : '+'}}
          span.cm-error(v-if="required(propName)") *
          | "{{propName}}":
          =" "
          app-model(v-if="value || expanded[propName] || (expanded[propName] === null)", :item="prop", :level="level + 1", v-model="value")
          span(v-else class="click", @click.stop="expanded[propName] = !expanded[propName]") &hellip;
      | }
    span(v-else)
      span(:class="{'cm-string': type === 'string', 'cm-atom': type === 'boolean', 'cm-number': type === 'number'}") {{merged.format || merged.type || t}}
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../../store/types'

  import { value, type } from '../../../assets/scripts/specification/methods/schema'
  import { allOf, mergeAllOf } from '../../../assets/scripts/utils/allof'
  import { name, names } from '../../../assets/scripts/utils/name'

  export default {
    name: 'app-model',
    props: {value: {}, item: {}, level: {default: 0}},
    data () {
      let merged = this.item.allOf ? allOf(this.item) : this.item

      return {
        merged: merged,
        expanded: this.init(merged.properties)
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC
      ]),
      v () {
        return value(this.merged)
      },
      t () {
        return type(this.merged)
      },
      val () {
        return JSON.stringify(this.v)
      },
      type () {
        return typeof this.v
      },
      name () {
        return name(this.SPEC, this.item)
      },
      parentNames () {
        return this.item.allOf ? names(this.SPEC, mergeAllOf({allOf: [].concat(this.item.allOf)})) : null
      },
      itemsName () {
        return name(this.SPEC, this.merged.items)
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
      },
      required (prop) {
        return this.merged.required && (this.merged.required.indexOf(prop) > -1)
      }
    },
    watch: {
      item: function () {
        this.merged = this.item.allOf ? allOf(this.item) : this.item
        this.expanded = this.init(this.merged.properties)
      }
    }
  }
</script>
