<template lang="pug">
  v-container.app-table
    v-data-table(v-bind:headers="headers" :items="items" hide-actions class="elevation-1 app-table")
      template(slot="items" scope="props")
        td.nowrap
          app-header(:item="props.item[0]")
        td.capitalize {{ props.item[1] }}
        td
          a(:href="props.item[3]" target="_blank") {{ props.item[2] }}
</template>

<script>
  const items = () => import('../../assets/http-header.json')

  export default {
    components: {
      appHeader: () => import('../Header')
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

<style lang="stylus">
  .app-table
    max-width 80em

  .capitalize::first-letter
    text-transform uppercase

  .nowrap
    white-space nowrap
    word-break keep-all
</style>
