<template lang="pug">
  v-list.list--single(two-line subheader)
    v-list-tile(avatar :tag="item.link ? 'a' : 'div'", :href="item.link", :target="item.link ? '_blank' : ''", :ripple="!!(item.link || item.download)", @click.stop="item.dialog ? UI_SET_DIALOG(item.dialog) : null")
      v-list-tile-avatar(:tile="!!item.dialog")
        v-icon.white--text.secondary {{item.icon}}
      v-list-tile-content
        v-list-tile-title {{ item.title }}
        v-list-tile-sub-title
          a(v-if="item.link || item.image || item.download", :href="item.link", :target="item.link ? '_blank' : ''")
            span(v-if="item.value || item.download") {{item.value || item.download}}
            img(v-if="item.image", :src="item.image", alt)
          span(v-if="item.value && !item.link") {{item.value}}
</template>

<script>
  import { mapMutations } from 'vuex'
  import * as types from '../store/types'

  export default {
    props: ['item'],
    methods: {
      ...mapMutations([
        types.UI_SET_DIALOG
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .list.list--single
    background transparent
    padding 0

  img
    margin-top: 4px

  .avatar--tile .icon
    border-radius: 2px
</style>
