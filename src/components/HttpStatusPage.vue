<template lang="pug">
  div
    v-toolbar(fixed)
      v-toolbar-title HTTP Methods
    main
      v-container.app-table
        v-data-table(v-bind:headers="headers" :items="items" hide-actions class="elevation-1 app-table")
          template(slot="items" scope="props")
            td
              app-response(:code="props.item[4]")
            td.capitalize {{ props.item[0] }}
            td.capitalize {{ props.item[1] }}
            td
              a(:href="props.item[3]" target="_blank") {{ props.item[2] }}
</template>

<script>
  const items = () => import('../assets/http-status.json')

  export default {
    components: {
      appResponse: () => import('./Response')
    },
    data () {
      return {
        items: [],
        headers: [
          {text: 'Code', value: '4', align: 'left'},
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
</style>
