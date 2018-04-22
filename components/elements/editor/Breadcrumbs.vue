<template lang="pug">
  ul.breadcrumbs
    li(v-for="(item, key) in items", :key="key")
      span {{item}}
</template>

<script>
  export default {
    props: ['items']
  }
</script>

<style lang="stylus">
  @import "../../../assets/style/config/variables.styl"

  $bcbg := $material-light.background
  $bcbg-dark := $material-dark.background
  $bcbg-alt := darken($bcbg, 6%)
  $bcbg-alt-dark := lighten($bcbg-dark, 6%)
  $bc-height := 24px

  .breadcrumbs
    list-style: none
    display: flex
    padding 0
    width calc(100% + 13px)
    overflow hidden
    background-color: darken($bcbg, 24%)

  .breadcrumbs li
    flex: 0 1 auto
    display flex

  .breadcrumbs li:first-child
    flex: 0 0 auto

  .breadcrumbs li:last-child
    flex: 1 0 auto

  .breadcrumbs li span
    word-break break-all
    display: flex
    flex 1
    background: $bcbg
    text-decoration: none
    position: relative
    height: $bc-height
    line-height: $bc-height + 1px
    padding: 0 8px 0 0
    text-align: center
    margin-right: ($bc-height/2 + 1px)

  .theme--dark
    .breadcrumbs
      background-color: lighten($bcbg-dark, 18%)
    .breadcrumbs li span
      background: $bcbg-dark
    .breadcrumbs li span:before
      border-color: $bcbg-dark
      border-left-color: transparent
    .breadcrumbs li span:after
      border-color: transparent
      border-left-color: $bcbg-dark

  .breadcrumbs li:first-child:not(:last-child) span
    color #fff
  .breadcrumbs li:first-child span
    background-color: $theme.primary
  .breadcrumbs li:first-child span:after
    border-left-color: $theme.primary

  .breadcrumbs li:last-child span
    background-color: $bcbg-alt
  .breadcrumbs li:last-child span:before
    border-color: $bcbg-alt
    border-left-color: transparent

  .theme--dark
    .breadcrumbs li:last-child span
      background-color: $bcbg-alt-dark
    .breadcrumbs li:last-child span:before
      border-color: $bcbg-alt-dark
      border-left-color: transparent

  .breadcrumbs li:first-child span
    margin-right: ($bc-height/2)
    padding-left: 8px
  .breadcrumbs li:first-child span:before
    border: none

  .breadcrumbs li:last-child span
    padding-right: 8px
  .breadcrumbs li:last-child span:after
    border: none

  .breadcrumbs li span:before,
  .breadcrumbs li span:after
    content: ""
    position: absolute
    top: 0
    border: 0 solid $bcbg
    border-width: ($bc-height/2) ($bc-height/4)
    width: 0
    height: 0

  .breadcrumbs li span:before
    left: -($bc-height/2)
    border-left-color: transparent

  .breadcrumbs li span:after
    left: 100%
    border-color: transparent
    border-left-color: $bcbg
</style>
