<template lang="pug">
  v-navigation-drawer(right overflow persistent v-model='drawer')
    app-detail(v-if='operation', :operation='operation')
</template>

<script>
  export default {
    components: {
      appDetail: () => import('./Detail')
    },
    data () {
      return {
        _drawer: false
      }
    },
    computed: {
      operation: {
        get () {
          return this.$store.state.operation
        }
      },
      drawer: {
        get () {
          return (this.$store.state.route.path === '/') && (this.$store.state.operation || this._drawer)
        },
        set (value) {
          this._drawer = value
        }
      }
    },
    watch: {
      operation: function (val) {
        if (val) {
          this._drawer = true
        }
      }
    }
  }
</script>
