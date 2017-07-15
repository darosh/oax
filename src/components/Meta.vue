<template>
  <v-list two-line subheader class="list--single">
    <v-list-tile avatar>
      <v-list-tile-avatar>
        <v-icon class="secondary white--text">{{m.icon}}</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ m.title }}</v-list-tile-title>
        <v-list-tile-sub-title><a v-if="m.link || m.image" :href="m.link">
          <span v-if="m.value">{{m.value}}</span>
          <img v-if="m.image" :src="m.image" alt=""></a>
          <span v-if="m.value && !m.link">{{m.value}}</span>
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    props: ['m']
  }
</script>

<style scoped lang="stylus">
  .list.list--single {
    background transparent
    padding 0
  }
</style>
