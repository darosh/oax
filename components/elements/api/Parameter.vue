<template lang="pug">
  div
    v-text-field(spellcheck="false" v-model="value", :label="item.name", hint="!!item._.description" v-markdown.hint="item._", :required="item.required" persistent-hint v-if="!item.enum && (type === 'string')")
    v-text-field(spellcheck="false" v-model="value", :label="item.name", hint="!!item._.description" v-markdown.hint="item._", :required="item.required" persistent-hint v-else-if="!item.enum && (type === 'number')" type="number")
    v-text-field(spellcheck="false" v-model="value", :label="item.name", hint="!!item._.description" v-markdown.hint="item._", :required="item.required" persistent-hint v-else-if="!type && item.schema" multi-line :rows="3")
    v-text-field(spellcheck="false" v-model="value", :label="item.name", hint="!!item._.description" v-markdown.hint="item._", :required="item.required" persistent-hint v-else-if="type === 'file'" type="file")
    <!--TODO: Switch to primary checkbox colors in multiple select-->
    v-select(spellcheck="false" v-model="value", :label="item.name", hint=" " v-markdown.hint="item._", :required="item.required" persistent-hint v-else-if="(type === 'array')", :items="item.items.enum" multiple)
    v-select(spellcheck="false" v-model="value", :label="item.name", hint=" " v-markdown.hint="item._", :required="item.required" persistent-hint v-else-if="item.enum", :items="item.enum")
    div(v-else) {{item}}
</template>

<script>
  import { mapMutations } from 'vuex'
  import * as types from '../../../store/types'
  import { type } from '../../../assets/scripts/specification/methods/schema'
  import markdown from '../../directives/markdown'

  export default {
    props: ['item'],
    directives: {markdown},
    computed: {
      type () {
        return type(this.item)
      },
      value: {
        get () {
          return this.item._._value
        },
        set (value) {
          this.SPEC_SET_VALUE({item: this.item, value: value})
        }
      }
    },
    methods: {
      ...mapMutations([
        types.SPEC_SET_VALUE
      ])
    }
  }
</script>

<style scoped lang="stylus">
  input[type="file"]
    opacity 0
</style>
