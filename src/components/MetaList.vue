<template lang="pug">
  v-container(fluid)
    v-layout(row wrap)
      v-flex.hidden-sm-and-up(xs12 sm6 md4 lg3 pa-0)
        v-divider
      v-flex(xs12 sm6 md4 lg3 pa-0 v-for="m in metas", v-if="m.value || m.download || m.image", :key="m.icon")
        app-meta(:item="m")
        v-divider.hidden-sm-and-up
</template>

<script>
  import appMeta from './Meta'

  export default {
    components: {
      appMeta
    },
    props: ['metas']
  }
</script>
