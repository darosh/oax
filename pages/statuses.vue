<template lang="pug">
  v-container.gpu(v-once style="width: 100%; max-width: 100%")
    v-data-table.ma-3-md.elevation-1.app-table(pagination.sync="pagination", :headers="headers", :items="items" hide-actions :must-sort="false")
      template(slot="items" slot-scope="props")
        td
          app-response(:code="props.item[4]")
        td.capitalize.nowrap(v-html="props.item[0]")
        td.nop.capitalize(v-html="props.item[1]")
        td
          a(:href="props.item[3]" target="_blank" rel="noopener") {{ props.item[2] }}
</template>

<script>
  import appResponse from '../components/elements/api/Response'
  const items = () => import('../assets/data/http-status.json')

  export default {
    components: {
      appResponse
    },
    data () {
      return {
        items: [],
        pagination: {sortBy: '2'},
        headers: [
          {text: 'Code', value: '5', align: 'left'},
          {text: 'Title', value: '0', align: 'left'},
          {text: 'Description', value: '1', align: 'left'},
          {text: 'Specification', value: '2', align: 'left'}
        ]
      }
    },
    created () {
      items().then(res => {
        Object.keys(res).map(k => {
          const item = res[k].slice()
          item.push(k)
          item.push('_' + k.replace(/xx/, '0'))
          // const obj = {}
          //
          // for (const i in item) {
          //   obj[i] = item[i]
          // }

          this.items.push(item)
        })
      })
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/style/app/table.styl"
</style>
