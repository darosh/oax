<template lang="pug">
  v-container.pa-0-sm(fluid)
    .hidden-md-and-up.mt-2
    v-layout(row wrap)
      //v-flex.hidden-sm-and-up(xs12)
        v-divider
      .flex(:style="{'flex-basis': $outer, 'max-width': $outer}", v-for="(m, k) in metas", v-if="m.value || m.download || m.image", :key="")
        app-meta(:item="m")
        //v-divider.hidden-sm-and-up
    .hidden-md-and-up.mb-3
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
