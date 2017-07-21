<!--TODO: How to make non-link list tile?-->

<template lang="pug">
  v-list.list--single(dense two-line subheader)
    v-list-tile(avatar :href="item.link || null" :target="item.link ? '_blank' : null")
      v-list-tile-avatar
        v-icon.secondary.white--text {{item.icon}}
      v-list-tile-content
        v-list-tile-title {{ item.title }}
        v-list-tile-sub-title
          a(v-if="item.link || item.image", :href="item.link", target="_blank")
            span(v-if="item.value") {{item.value}}
            img(v-if="item.image", :src="item.image", alt)
          span(v-if="item.value && !item.link") {{item.value}}
</template>

<script>
  export default {
    props: ['item']
  }
</script>

<style scoped lang="stylus">
  .list.list--single
    background transparent
    padding 0

  img
    margin-top: 4px
</style>
