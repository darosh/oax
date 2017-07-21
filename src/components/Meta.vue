<template lang="pug">
  v-list.list--single(dense two-line subheader)
    v-list-tile(avatar)
      v-list-tile-avatar
        v-icon.secondary.white--text {{m.icon}}
      v-list-tile-content
        v-list-tile-title {{ m.title }}
        v-list-tile-sub-title
          a(v-if="m.link || m.image", :href="m.link", target="_blank")
            span(v-if="m.value") {{m.value}}
            img(v-if="m.image", :src="m.image", alt)
          span(v-if="m.value && !m.link") {{m.value}}
</template>

<script>
  export default {
    props: ['m']
  }
</script>

<style scoped lang="stylus">
  .list.list--single
    background transparent
    padding 0

  img
    margin-top: 4px
</style>
