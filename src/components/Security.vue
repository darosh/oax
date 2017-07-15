<template>
  <v-dialog v-model="value.show">
    <v-card>
      <v-card-title>
        <span class="headline">Security</span>
      </v-card-title>
      <v-card-text>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue--text darken-1" flat @click.native="value.show = false">Close</v-btn>
        <v-btn class="blue--text darken-1" flat @click.native="value.show = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['value']
  }
</script>

<style scoped lang="stylus">
</style>
