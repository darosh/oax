<template lang="pug">
  v-container(fluid v-if="OPERATIONS").pl-4.pr-4.pa-3-sm
    v-data-table.elevation-1(:headers="headers", :items="OPERATIONS" hide-actions)
      template(slot="items" scope="props")
        td(@click.stop="SET_OPERATION(props.item)") {{props.item._id}}
        td(@click.stop="SET_OPERATION(props.item)")
          app-method(:item="props.item._method")
        td(@click.stop="SET_OPERATION(props.item)" style="max-width: 240px")
          app-path(:name="props.item._pathName")
        td(@click.stop="SET_OPERATION(props.item)") {{props.item.tags.join(', ')}}
        td(@click.stop="SET_OPERATION(props.item)" v-markdown.summary="props.item._" style="max-width: 240px")
        td(@click.stop="SET_OPERATION(props.item)")
          v-icon(v-if="props.item._.description" success) check_circle
          v-icon(v-else error) cancel
        td(@click.stop="SET_OPERATION(props.item)") {{props.item.parameters && props.item.parameters.length}}
        td(@click.stop="SET_OPERATION(props.item)")
          app-response.mr-1(:code="code" v-for="(response, code) in props.item.responses", :key="code")
        td
          a(v-for="s in schemas(props.item, SPEC)", @click="") {{s}}

        <!--td(@click.stop="SET_OPERATION(props.item)") {{props.item.security}}-->
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../store/types'

  import appMethod from './elements/Method'

  import markdown from '../directives/markdown'
  import appResponse from './elements/Response'
  import appPath from './elements/Path'
  import {schemas} from '../models/oas/methods/schemas'

  export default {
    directives: {
      markdown
    },
    components: {
      appMethod,
      appPath,
      appResponse
    },
    data () {
      return {
        selected: [],
        headers: [
          {text: '#', value: '_id', align: 'left'},
          {text: 'Method', value: '_method', align: 'left'},
          {text: 'Path', value: '_pathName', align: 'left'},
          {text: 'Tags', value: 'tags', align: 'left'},
          {text: 'Summary', value: 'summary', align: 'left'},
          {text: 'Description', value: 'description', align: 'left'},
          {text: 'Parameters', value: 'parameters', align: 'left'},
          {text: 'Responses', value: 'responses', align: 'left'},
          {text: 'Schemas', value: 'schemas', align: 'left'}
          //          {text: 'Security', value: 'security', align: 'left'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        types.IS_DESCRIPTION,
        types.OPERATIONS,
        types.OPERATION,
        types.SPEC
      ])
    },
    methods: {
      ...mapMutations([
        types.SET_OPERATION
      ]),
      schemas
    }
  }
</script>
