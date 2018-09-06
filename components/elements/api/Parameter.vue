<template lang="pug">
  div
    div( v-if="item.schema != null")
      h2.padding_header {{item.name}}
      v-container
        v-flex(xs12 v-for="prop in schemas")
          v-text-field(:hint="prop.description", @input="update_properties(prop.name, $event)", :label="prop.name" :required="prop.required")
    v-text-field(spellcheck="false" v-model="value", :label="item.name", hint="!!item._.description" v-markdown.hint="item._", :required="item.required" persistent-hint v-else-if="!item.enum && (type === 'string')")
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
      schemas () {
        if (this.item == null || this.item.schema == null) {
          return {}
        }
        let properties = []
        let required = this.item.schema.required == null ? [] : this.item.schema.required
        console.log(this.item.schema)
        for (var p in this.item.schema.properties) {
          if (this.item.schema.properties.hasOwnProperty(p)) {
            properties.push(
              {
                name: p,
                description: this.item.schema.properties[p].description,
                value: this.item.schema.properties[p],
                required: required.includes(p)
              }
            )
          }
        }
        console.log(properties)
        return properties
      },
      value: {
        get () {
          return this.item._._value
        },
        set (value) {
          console.log('setting value ')
          this.SPEC_SET_VALUE({item: this.item, value: value})
        }
      }
    },
    methods: {
      ...mapMutations([
        types.SPEC_SET_VALUE,
        types.SPEC_SET_NESTED_VALUE
      ]),
      update_properties: function (property, event) {
        console.log(property + 'pressed, with value' + event)
        this.SPEC_SET_NESTED_VALUE({item: this.item, value: {name: property, value: event}})
      }
    },
    created () {
      console.log(this.item.schema)
    }
  }
</script>

<style scoped lang="stylus">
  input[type="file"]
    opacity 0
  .padding_header
    padding-top 12px

</style>
