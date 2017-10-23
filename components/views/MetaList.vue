<template lang="pug">
  v-container.pa-0-sm(fluid)
    .hidden-sm-and-up.mt-3
    v-layout(row wrap)
      v-flex.hidden-sm-and-up(xs12)
        v-divider
      .flex(:style="{'flex-basis': $outer, 'max-width': $outer}", v-for="m in metas", v-if="m.value || m.download || m.image", :key="m.icon")
        app-meta(:item="m")
        v-divider.hidden-sm-and-up
    .hidden-sm-and-up.mt-1.mb-1
</template>

<script>
  import appMeta from './Meta'
  import layout from '../mixins/layout'

  export default {
    mixins: [layout],
    components: {
      appMeta
    },
    props: ['metas']
  }
</script>
