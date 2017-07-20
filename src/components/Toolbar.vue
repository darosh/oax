<template lang="pug">
  v-toolbar(fixed)
    v-toolbar-items(v-if="main")
      v-text-field.transition--width(v-bind:style="{width: editing ? '240px' : '24px'}", prepend-icon='edit', :prepend-icon-cb='edit', v-model='url', name='url', label='Open API Specification URL', single-line)
    v-toolbar-title(v-if="main && showTitle && $store.state.spec && $store.state.spec.info") {{$store.state.spec.info.title}}
    v-toolbar-title(v-if="!main") HTTP Methods
    v-spacer
    v-toolbar-items(v-if="main")
      v-text-field(prepend-icon='search', v-model='search', name='search', label='Search', single-line)
    v-btn(v-if="main && $store.state.view.grouped" icon @click.native.stop="toggleResources(true)" v-tooltip:bottom="{html: 'Expand all groups'}")
      v-icon keyboard_arrow_down
    v-btn(v-if="main && $store.state.view.grouped" icon @click.native.stop="toggleResources(false)" v-tooltip:bottom="{html: 'Collapse all groups'}")
      v-icon keyboard_arrow_up
    v-btn(v-if="main" icon @click.native='toggleGrouped()' v-tooltip:bottom="{html: $store.state.view.grouped ? 'View list' : 'View groups'}")
      v-icon {{$store.state.view.grouped ? 'view_column' : 'view_comfy'}}
    v-btn(v-if="main" icon @click.native='toggleDescription()' v-tooltip:bottom="{html: $store.state.view.description ? 'Hide descriptions' : 'Show descriptions'}")
      v-icon {{$store.state.view.description ? 'speaker_notes_off' : 'speaker_notes'}}
    v-btn(v-if="main" icon @click.native.stop="setDialog('proxy')")
      v-icon security
    v-btn(v-if="main" icon @click.native.stop="setDialog('security')")
      v-icon vpn_key
    v-btn(v-if="main" icon @click.native.stop='toggleDark()' v-tooltip:bottom="{html: $store.state.view.dark ? 'Light theme' : 'Dark theme'}")
      v-icon {{$store.state.view.dark ? 'brightness_5' : 'brightness_4'}}
    v-menu(v-if="main" bottom left)
      v-btn(icon slot='activator')
        v-icon more_vert
      v-list
        v-list-tile
          v-list-tile-title
            router-link(to="http-method") HTTP Method Reference
        v-list-tile
          v-list-tile-title
            router-link(to="http-status") HTTP Status Reference
        v-list-tile
          v-list-tile-title
            router-link(to="http-header") HTTP Header Reference
    v-toolbar-items(v-if="!main")
      v-btn(flat href="#/" tag="a") Explorer
      v-btn(flat href="#/http-methods" tag="a") Methods
      v-btn(flat href="#/http-statuses" tag="a") Statuses
      v-btn(flat href="#/http-headers" tag="a") Headers
</template>

<script>
  import { mapMutations, mapActions } from 'vuex'

  export default {
    data () {
      return {
        editing: false,
        showTitle: true
      }
    },
    computed: {
      url: {
        get () {
          return this.$store.state.url
        },
        set (value) {
          this.loadUrl(value)
        }
      },
      search: {
        get () {
          return this.$store.state.search
        },
        set (value) {
        }
      },
      path: {
        get () {
          return this.$store.state.route.path
        }
      },
      main: {
        get () {
          return this.$store.state.route.path === '/'
        }
      }
    },
    methods: {
      edit () {
        this.editing = !this.editing
        document.getElementsByName('url')[0][this.editing ? 'focus' : 'blur']()
        this.showTitle = !this.editing
      },
      ...mapMutations([
        'toggleDark',
        'toggleGrouped',
        'toggleDescription',
        'setDialog',
        'toggleResources'
      ]),
      ...mapActions([
        'loadUrl'
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .transition--width
    transition width 0.3s cubic-bezier(.25, .8, .25, 1)
</style>
