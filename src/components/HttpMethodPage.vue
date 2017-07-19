<template lang="pug">
  div
    v-toolbar
      v-toolbar-title HTTP Methods
    main
      v-container.app-table
        v-data-table(v-bind:headers="headers" :items="items" hide-actions class="elevation-1 app-table")
          template(slot="items" scope="props")
            td
              app-method(:m="props.item[6]")
            td.capitalize {{ props.item[0] }}
            td
              a(href="props.item[2]") {{ props.item[1] }}
            td
              v-icon {{props.item[3] ? 'check_box' : 'check_box_outline_blank'}}
            td
              v-icon {{props.item[4] ? 'check_box' : 'check_box_outline_blank'}}
            td
              v-icon {{props.item[5] ? 'check_box' : 'check_box_outline_blank'}}
</template>

<script>
  const items = () => import('../assets/http-method.json')

  export default {
    components: {
      appMethod: () => import('./Method')
    },
    data () {
      return {
        items: [],
        headers: [
          {text: 'Method', value: '6', align: 'left', sortable: false},
          {text: 'Description', value: '0', align: 'left', sortable: false},
          {text: 'Specification', value: '1', sortable: false},
          {text: 'Safe', value: '3', sortable: false},
          {text: 'Idempotent', value: '4', sortable: false},
          {text: 'Cacheable', value: '5', sortable: false}
        ]
      }
    },
    created () {
      items().then(res => {
        Object.keys(res).map(k => {
          const item = res[k].slice()
          item.push(k)
          this.items.push(item)
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
</style>
