<template lang="pug">
  div
    v-text-field(v-model="item._value" v-if="!item.enum && (type === 'string')" :label="item.name" :hint="item.description" :required="item.required" persistent-hint)
    v-text-field(v-model="item._value" v-else-if="!item.enum && (type === 'number')" type="number" :label="item.name" :hint="item.description" :required="item.required" persistent-hint)
    v-text-field(v-model="item._value" v-else-if="!type && item.schema" multi-line :label="item.name" :hint="item.description" :required="item.required" persistent-hint)
    v-text-field(v-model="item._value" v-else-if="type === 'file'" type="file" :label="item.name" :hint="item.description" :required="item.required" persistent-hint)
    <!--TODO: Switch to primary checkbox colors in multiple select-->
    v-select(v-model="item._value" v-else-if="(type === 'array')" :items="item.items.enum" multiple :label="item.name" :hint="item.description" :required="item.required" single-line bottom persistent-hint)
    v-select(v-model="item._value" v-else-if="item.enum" :items="item.enum" :label="item.name" :hint="item.description" :required="item.required" single-line bottom persistent-hint)
    div(v-else) {{item}}
</template>

<script>
  import { type } from '../models/oas/methods/schema'

  export default {
    props: ['item'],
    computed: {
      type () {
        return type(this.item)
      }
    }
  }
</script>

<style lang="stylus">
  input[type="file"]
    opacity 0
</style>
