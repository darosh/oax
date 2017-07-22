<template lang="pug">
  div {{scripts}}
</template>

<script>
  export default {
    props: ['item'],
    computed: {
      scripts () {
        return 'SCRIPTS'
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>
