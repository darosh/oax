<template lang="pug">
  v-container.app-table
    v-data-table.ma-3-md(:headers="headers", :items="items" hide-actions class="elevation-1 app-table")
      template(slot="items" scope="props")
        td
          app-method(:item="props.item[6]")
        td.capitalize(style="min-width: 260px") {{ props.item[0] }}
        td
          a(:href="props.item[2]" target="_blank") {{ props.item[1] }}
        td
          v-icon {{props.item[3] ? 'check_box' : 'check_box_outline_blank'}}
        td
          v-icon {{props.item[4] ? 'check_box' : 'check_box_outline_blank'}}
        td
          v-icon {{props.item[5] ? 'check_box' : 'check_box_outline_blank'}}
</template>

<script>
  const items = () => import('../../assets/http-method.json')

  export default {
    components: {
      appMethod: () => import('../elements/Method')
    },
    data () {
      return {
        items: [],
        headers: [
          {text: 'Method', value: '6', align: 'left'},
          {text: 'Description', value: '0', align: 'left'},
          {text: 'Specification', value: '1'},
          {text: 'Safe', value: '3'},
          {text: 'Idempotent', value: '4'},
          {text: 'Cacheable', value: '5'}
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

  .capitalize::first-letter
    text-transform uppercase
</style>
