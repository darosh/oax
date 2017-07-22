<template lang="pug">
  div
    | RESULT
    | {{item._result}}
    | {{item._error}}
</template>

<script>
  export default {
    props: ['item']
  }
</script>

<style scoped lang="stylus">
</style>
