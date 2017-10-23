<template lang="pug">
  v-container.gpu(v-once style="width: 100%; max-width: 100%")
    v-data-table.ma-3-md.elevation-1.app-table(:headers="headers", :items="items" hide-actions)
      template(slot="items" slot-scope="props")
        td.nowrap
          app-header(:item="props.item[0]")
        td.capitalize(style="min-width: 260px") {{ props.item[1] }}
        td
          a(:href="props.item[3]" target="_blank") {{ props.item[2] }}
</template>

<script>
  import appHeader from '../components/elements/api/Header'
  const items = () => import('../assets/data/http-header.json')

  export default {
    components: {
      appHeader
    },
    data () {
      return {
        items: [],
        headers: [
          {text: 'Title', value: '0', align: 'left'},
          {text: 'Description', value: '1', align: 'left'},
          {text: 'Specification', value: '2'}
        ]
      }
    },
    created () {
      items().then(res => {
        Object.keys(res).map(k => {
          const item = res[k].slice()
          item.push(k)
          const obj = {}

          for (const i in item) {
            obj[i] = item[i]
          }

          this.items.push(obj)
        })
      })
    }
  }
</script>

<style scoped lang="stylus">
  .app-table
    max-width 80em
    margin-left: auto
    margin-right: auto

  .capitalize::first-letter
    text-transform uppercase

  .nowrap
    white-space nowrap
    word-break keep-all
</style>
