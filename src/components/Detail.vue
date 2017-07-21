<template lang="pug">
  div
    v-toolbar
      v-toolbar-title {{operation.tags[0]}}
    v-layout
      v-flex(pt-4 pl-4 pr-4 pb-2)
        app-operation(:item="operation", :clickable="true")
        .subheading.pt-3.pb-2 {{operation.summary}}
        .body-1 {{operation.description}}
    v-tabs.app--tabs(:scrollable="false")
      v-tabs-bar.tabs--transparent(slot="activators")
        v-tabs-item(ripple href="tab-1") Info
        v-tabs-item.relative(ripple href="tab-2") Script
        v-tabs-item.relative(ripple href="tab-3") Result
        v-tabs-slider
      v-tabs-content#tab-1
        app-info(v-model="operation")
      v-tabs-content#tab-2
        app-scripts
      v-tabs-content#tab-3
        app-result
</template>

<script>
  export default {
    props: ['operation'],
    components: {
      appOperation: () => import('./Operation'),
      appInfo: () => import('./Info'),
      appScripts: () => import('./Scripts'),
      appResult: () => import('./Result')
    }
  }
</script>

<style scoped lang="stylus">
  .tabs--transparent
    background-color transparent

  .relative
    position relative
</style>
