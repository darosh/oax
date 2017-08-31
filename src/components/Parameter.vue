<template lang="pug">
  div
    v-text-field(v-model="value" v-if="!item.enum && (type === 'string')", :label="item.name", :hint="md(item)", :required="item.required" persistent-hint)
    v-text-field(v-model="value" v-else-if="!item.enum && (type === 'number')" type="number", :label="item.name", :hint="md(item)", :required="item.required" persistent-hint)
    v-text-field(v-model="value" v-else-if="!type && item.schema" multi-line :rows="3", :label="item.name", :hint="md(item)", :required="item.required" persistent-hint)
    v-text-field(v-model="value" v-else-if="type === 'file'" type="file", :label="item.name", :hint="md(item)", :required="item.required" persistent-hint)
    <!--TODO: Switch to primary checkbox colors in multiple select-->
    v-select(v-model="value" v-else-if="(type === 'array')", :items="item.items.enum" multiple :label="item.name", :hint="md(item)", :required="item.required" persistent-hint)
    v-select(v-model="value" v-else-if="item.enum", :items="item.enum", :label="item.name", :hint="md(item)", :required="item.required" persistent-hint)
    div(v-else) {{item}}
</template>

<script>
  import { mapMutations } from 'vuex'
  import * as types from '../store/types'
  import { type } from '../models/oas/methods/schema'

  import { md } from '../services/md'

  export default {
    props: ['item'],
    computed: {
      type () {
        return type(this.item)
      },
      value: {
        get () {
          return this.item._._value
        },
        set (value) {
          this.SET_VALUE({item: this.item, value: value})
        }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_VALUE
      ]),
      md
    }
  }
</script>

<style scoped lang="stylus">
  input[type="file"]
    opacity 0
</style>
