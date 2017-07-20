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
        drawer: false
      }
    },
    computed: {
      operation: {
        get () {
          return this.$store.state.operation
        }
      }
    },
    watch: {
      operation: function (val) {
        if (val) {
          this.drawer = true
        }
      }
    }
  }
</script>
