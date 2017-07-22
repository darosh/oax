<template lang="pug">
  div(v-if="item._result")
    .subheader Request URL
    a.pl-3.pl-3(:href="item._result.config.url" target="_blank") {{item._result.config.url}}
    .subheader Response status
    div.pl-3.pl-3
      app-response(:code="item._result.status")
      |  {{item._result.statusText}}
    .subheader Response headers
    div.pl-3.pl-3(v-for="(header, headerName) in item._result.headers", :key="headerName") {{headerName}} {{header}}
    .subheader Response body
    pre.pl-3.pl-3 {{item._result.data}}
</template>

<script>
  export default {
    props: ['item'],
    components: {
      appResponse: () => import('./Response')
    }
  }
</script>

<style scoped lang="stylus">
</style>
