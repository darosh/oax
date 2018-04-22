<template lang="pug">
    //v-container.pa-0(style="overflow-x: scroll" fluid v-if="SPEC_OPERATIONS").pl-4.pr-4.pa-3-sm
    v-data-table.ma-3-md.table__no--overflow.elevation-1(v-if="SPEC_OPERATIONS", :headers="headers", :items="items" hide-actions)
      template(slot="items" slot-scope="props")
        td(@click="SPEC_SET_OPERATION(props.item.op)") {{props.item.op._id}}
        td(@click="SPEC_SET_OPERATION(props.item.op)") {{props.item.op.operationId}}
        td(@click="SPEC_SET_OPERATION(props.item.op)")
          app-method(:item="props.item.op._method")
        td(@click="SPEC_SET_OPERATION(props.item.op)")
          app-path(:name="props.item.op._pathName")
        td(@click="SPEC_SET_OPERATION(props.item.op)") {{props.item.op.tags.join(', ')}}
        td(@click="SPEC_SET_OPERATION(props.item.op)") {{props.item.op._.summary}}
        //td
        //  v-icon(v-if="props.item.op._.summary" success) check_circle
        //  v-icon(v-else error) cancel
        //td
        //  v-icon(v-if="props.item.op._.description" success) check_circle
        //  v-icon(v-else error) cancel
        td(@click="SPEC_SET_OPERATION(props.item.op)") {{props.item.op.parameters && props.item.op.parameters.length}}
        td(@click="SPEC_SET_OPERATION(props.item.op)")
          app-response.mr-1(:code="code" v-for="(response, code) in props.item.op.responses", :key="code")
        td
          template(v-for="(s, index) in props.item.schemas")
            span(v-if="index")=", "
            a(@click.stop="UI_SET_DIALOG({type: 'schema', param: s})") {{s}}
        <!--td(@click.stop="SPEC_SET_OPERATION(props.item)") {{props.item.security}}-->
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'

  import appMethod from '../elements/api/Method'

  import markdown from '../../components/directives/markdown'
  import appResponse from '../elements/api/Response'
  import appPath from '../elements/api/Path'
  import { schemas } from '../../assets/scripts/specification/methods/schemas'

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
        headers: [
          {text: '#', value: 'op._id', align: 'left'},
          {text: 'Id', value: 'op.operationId', align: 'left'},
          {text: 'Method', value: 'op._method', align: 'left'},
          {text: 'Path', value: 'op._pathName', align: 'left'},
          {text: 'Tags', value: 'op.tags', align: 'left'},
          {text: 'Summary', value: 'op.summary', align: 'left'},
          // {text: 'Description', value: 'op.description', align: 'left'},
          {text: 'Parameters', value: 'op.parameters', align: 'left'},
          {text: 'Responses', value: 'op.responses', align: 'left'},
          {text: 'Schemas', value: 'schemas', align: 'left'}
          //          {text: 'Security', value: 'security', align: 'left'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        types.VIEW_SUMMARY,
        types.SPEC_OPERATIONS,
        types.SPEC_OPERATION,
        types.SPEC
      ]),
      items () {
        const items = []

        while (items.length < this.SPEC_OPERATIONS.length) {
          items.push({
            op: this.SPEC_OPERATIONS[items.length],
            schemas: this.schemas(this.SPEC_OPERATIONS[items.length], this.SPEC)
          })
        }

        return items
      }
    },
    methods: {
      ...mapMutations([
        types.SPEC_SET_OPERATION,
        types.UI_SET_DIALOG
      ]),
      schemas
    }
  }
</script>

<style scoped>
  * >>> table {
    /*table-layout: fixed;*/
    transform: translate3d(0, 0, 0);
    cursor: pointer;
  }

  /*>>> thead > tr > th.column {*/
    /*width: 280px;*/
  /*}*/

  /*>>> thead > tr > th.column:first-child {*/
    /*width: 24px;*/
  /*}*/

  /*>>> thead > tr > th.column:nth-child(2) {*/
    /*width: 80px;*/
  /*}*/

  /*>>> thead > tr > th.column:nth-child(6) {*/
    /*width: 120px;*/
  /*}*/

  /*>>> thead > tr > th.column:nth-child(8) {*/
    /*width: 320px;*/
  /*}*/
</style>
