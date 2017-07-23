<template lang="pug">
  v-navigation-drawer(right overflow persistent :disable-route-watcher="true" v-model="drawer")
    app-detail(v-if="OPERATION", :operation="OPERATION")
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/types'

  export default {
    components: {
      appDetail: () => import('./panels/Detail')
    },
    data () {
      return {
        _drawer: false
      }
    },
    computed: {
      ...mapGetters([
        types.OPERATION,
        types.IS_API
      ]),
      drawer: {
        get () {
          return this.IS_API && (this.OPERATION || this._drawer)
        },
        set (value) {
          this._drawer = value
        }
      }
    },
    watch: {
      OPERATION: function (val) {
        if (val) {
          this._drawer = true
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .navigation-drawer
    padding 0
</style>
