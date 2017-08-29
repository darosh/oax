<template lang="pug">
  v-container(fluid v-if="OPERATIONS").pl-4.pr-4.pa-3-sm
    v-data-table(:headers="headers", :items="OPERATIONS" hide-actions class="elevation-1 app-table")
      template(slot="items" scope="props")
        td(@click.stop="SET_OPERATION(props.item)") {{props.item._id}}
        td(@click.stop="SET_OPERATION(props.item)")
          app-method(:item="props.item._method")
        td(@click.stop="SET_OPERATION(props.item)") {{props.item._pathName}}
        td(@click.stop="SET_OPERATION(props.item)") {{props.item.tags.join(', ')}}
        td(@click.stop="SET_OPERATION(props.item)" v-markdown.summary="props.item")
        td(@click.stop="SET_OPERATION(props.item)" v-markdown="props.item")
        td(@click.stop="SET_OPERATION(props.item)") {{props.item.parameters && props.item.parameters.length}}
        td(@click.stop="SET_OPERATION(props.item)") {{Object.keys(props.item.responses).join(', ')}}
        td(@click.stop="SET_OPERATION(props.item)") {{props.item.security}}
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../store/types'

  import appMethod from './elements/Method'

  import markdown from '../directives/markdown'

  export default {
    directives: {
      markdown
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
          {text: 'Security', value: 'security', align: 'left'}
        ]
      }
    },
    components: {
      appMethod
    },
    computed: {
      ...mapGetters([
        types.IS_DESCRIPTION,
        types.OPERATIONS,
        types.OPERATION
      ])
    },
    methods: {
      ...mapMutations([
        types.SET_OPERATION
      ])
    }
  }
</script>
