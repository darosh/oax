<template lang="pug">
  v-container.gpu(v-once style="width: 100%; max-width: 100%")
    v-data-table.ma-3-md.elevation-1.app-table(:headers="headers", :items="items" hide-actions)
      template(slot="items" slot-scope="props")
        td
          app-method(:item="props.item[6]")
        td.capitalize(style="min-width: 260px") {{ props.item[0] }}
        td
          a(:href="props.item[2]" target="_blank" rel="noopener") {{ props.item[1] }}
        td.text-xs-right
          v-icon {{props.item[3] ? 'check_box' : 'check_box_outline_blank'}}
        td.text-xs-right
          v-icon {{props.item[4] ? 'check_box' : 'check_box_outline_blank'}}
        td.text-xs-right
          v-icon {{props.item[5] ? 'check_box' : 'check_box_outline_blank'}}
</template>

<script>
  import appMethod from '../components/elements/api/Method'
  const items = () => import('../assets/data/http-method.json')

  export default {
    components: {
      appMethod
    },
    data () {
      return {
        items: [],
        headers: [
          {text: 'Method', value: '6', align: 'left'},
          {text: 'Description', value: '0', align: 'left'},
          {text: 'Specification', value: '1', align: 'left'},
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
    margin-left: auto
    margin-right: auto

  .capitalize::first-letter
    text-transform uppercase
</style>
