<template>
  <v-toolbar fixed>
    <v-toolbar-items>
      <v-text-field v-bind:style="{width: editing ? '240px' : '24px'}"
                    prepend-icon="edit"
                    :prepend-icon-cb="edit"
                    class="transition--width"
                    v-model="value.url"
                    name="url"
                    label="Open API Specification URL"
                    single-line></v-text-field>
    </v-toolbar-items>
    <v-toolbar-title v-if="showTitle && value.spec && value.spec.info">{{value.spec.info.title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-text-field prepend-icon="search"
                    v-model="value.search"
                    name="search"
                    label="Search"
                    single-line></v-text-field>
    </v-toolbar-items>
    <v-btn icon @click.native.stop="emit('open')">
      <v-icon>keyboard_arrow_down</v-icon>
    </v-btn>
    <v-btn icon @click.native.stop="emit('close')">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
    <v-btn icon @click.native="toggleGrouped()">
      <v-icon>{{$store.state.view.grouped ? '_view_columns' : 'view_comfy'}}</v-icon>
    </v-btn>
    <v-btn icon @click.native="toggleDescription()">
      <v-icon>{{$store.state.view.description ? 'speaker_notes_off' : 'speaker_notes'}}</v-icon>
    </v-btn>
    <v-btn icon @click.native.stop="emitBus('dialog:proxy')">
      <v-icon>security</v-icon>
    </v-btn>
    <v-btn icon @click.native.stop="emitBus('dialog:security')">
      <v-icon>vpn_key</v-icon>
    </v-btn>
    <v-btn icon @click.native.stop="toggleDark()">
      <v-icon>{{$store.state.view.dark ? 'brightness_5' : 'brightness_4'}}</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  import { bus } from '../services/bus'
  import { mapMutations } from 'vuex'

  export default {
    props: ['value'],
    data () {
      return {
        editing: false,
        proxy: {show: false},
        security: {show: false},
        showTitle: true
      }
    },
    methods: {
      edit () {
        this.editing = !this.editing
        document.getElementsByName('url')[0][this.editing ? 'focus' : 'blur']()
        this.showTitle = !this.editing
      },
      emit (e) {
        this.$emit(e)
      },
      emitBus (e) {
        bus.$emit(e)
      },
      ...mapMutations([
        'toggleDark',
        'toggleGrouped',
        'toggleDescription'
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .transition--width
    transition width 0.3s cubic-bezier(.25, .8, .25, 1)
</style>
