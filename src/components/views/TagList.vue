<template lang="pug">
  v-container.pa-0-sm(fluid grid-list-xl)
    v-layout(row wrap)
      .flex(:style="{'flex-basis': $inner, 'max-width': $inner}", v-if="r._._display", v-for="(r, k) in SPEC_RESOURCES", :key="r.name")
        app-tag(:item="SPEC_RESOURCES[k]")
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import layout from '../mixins/layout'
  import appTag from './Tag'

  export default {
    mixins: [layout],
    components: {
      appTag
    },
    computed: {
      ...mapGetters([
        types.SPEC_RESOURCES
      ])
    }
  }
</script>
