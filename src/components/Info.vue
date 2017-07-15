<template>
  <div class="pa-2">
    <div v-if="value.responses && Object.keys(value.responses).length" class="subheader">Response messages</div>
    <div class="pa-1" v-for="(response, code) in value.responses">
      <v-btn small>{{code}}</v-btn>
      {{response.description}}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value']
  }
</script>
