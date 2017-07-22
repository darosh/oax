<template lang="pug">
  div.pb-3
    v-text-field(v-if="!item.enum && (type === 'string')", :label="item.name")
    v-text-field(v-else-if="!item.enum && (type === 'number')", :label="item.name" type="number")
    div(v-else) {{item}}
</template>

<script>
  import { type } from '../models/oas/schema'

  export default {
    props: ['item'],
    computed: {
      type () {
        return type(this.item)
      }
    }
  }
</script>
