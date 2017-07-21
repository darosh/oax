<template lang="pug">
  v-toolbar(fixed)
    v-toolbar-items(v-if="IS_API")
      v-text-field.transition--width(v-bind:style="{width: editing ? '240px' : '24px'}", prepend-icon='edit', :prepend-icon-cb='edit', v-model='url', name='url', label='Open API Specification URL', single-line)
    v-toolbar-title(v-if="IS_API && showTitle && SPEC && SPEC.info") {{SPEC.info.title}}
    v-toolbar-title(v-if="!IS_API") HTTP {{PAGE_NAME}}
    v-spacer
    v-toolbar-items(v-if="IS_API")
      v-text-field(prepend-icon='search', v-model='search', name='search', label='Search', single-line)
    v-btn(v-if="IS_API && IS_GROUPED" icon @click.native.stop="TOGGLE_RESOURCES(true)" v-tooltip:bottom="{html: 'Expand all groups'}")
      v-icon keyboard_arrow_down
    v-btn(v-if="IS_API && IS_GROUPED" icon @click.native.stop="TOGGLE_RESOURCES(false)" v-tooltip:bottom="{html: 'Collapse all groups'}")
      v-icon keyboard_arrow_up
    v-btn(v-if="IS_API" icon @click.native='TOGGLE_GROUPED()' v-tooltip:bottom="{html: IS_GROUPED ? 'View list' : 'View groups'}")
      v-icon {{IS_GROUPED ? 'view_column' : 'view_comfy'}}
    v-btn(v-if="IS_API" icon @click.native='TOGGLE_DESCRIPTION()' v-tooltip:bottom="{html: IS_DESCRIPTION ? 'Hide descriptions' : 'Show descriptions'}")
      v-icon {{IS_DESCRIPTION ? 'speaker_notes_off' : 'speaker_notes'}}
    v-btn(v-if="IS_API" icon @click.native.stop="SET_DIALOG('proxy')")
      v-icon security
    v-btn(v-if="IS_API" icon @click.native.stop="SET_DIALOG('security')")
      v-icon vpn_key
    v-btn(v-if="IS_API" icon @click.native.stop='TOGGLE_DARK()' v-tooltip:bottom="{html: IS_DARK ? 'Light theme' : 'Dark theme'}")
      v-icon {{IS_DARK ? 'brightness_5' : 'brightness_4'}}
    v-menu(v-if="IS_API" bottom left)
      v-btn(icon slot='activator')
        v-icon more_vert
      v-list
        v-list-tile(to="/http-methods" tag="a")
          v-list-tile-title.upper Methods
        v-list-tile(to="/http-statuses" tag="a")
          v-list-tile-title.upper Statuses
        v-list-tile(to="/http-headers" tag="a")
          v-list-tile-title.upper Headers
    v-toolbar-items(v-if="!IS_API")
      v-btn(flat href="#/" tag="a") API
      v-btn(flat href="#/http-methods" tag="a") Methods
      v-btn(flat href="#/http-statuses" tag="a") Statuses
      v-btn(flat href="#/http-headers" tag="a") Headers
</template>

<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import * as types from '../store/types'

  export default {
    data () {
      return {
        editing: false,
        showTitle: true
      }
    },
    computed: {
      ...mapGetters([
        types.IS_API,
        types.IS_DARK,
        types.IS_DESCRIPTION,
        types.IS_GROUPED,
        types.URL,
        types.SPEC,
        types.PAGE_NAME,
        types.SEARCH
      ]),
      url: {
        get () {
          return this.URL
        },
        set (value) {
          this.LOAD_URL(value)
        }
      },
      search: {
        get () {
          return this.SEARCH
        },
        set (value) {
          this.SET_SEARCH(value)
          this.FILTER_RESOURCES(value)
        }
      }
    },
    methods: {
      ...mapMutations([
        types.TOGGLE_DARK,
        types.TOGGLE_GROUPED,
        types.TOGGLE_DESCRIPTION,
        types.SET_DIALOG,
        types.SET_SEARCH,
        types.FILTER_RESOURCES,
        types.TOGGLE_RESOURCES
      ]),
      ...mapActions([
        types.LOAD_URL
      ]),
      edit () {
        this.editing = !this.editing
        document.getElementsByName('url')[0][this.editing ? 'focus' : 'blur']()
        this.showTitle = !this.editing
      }
    }
  }
</script>

<style scoped lang="stylus">
  .transition--width
    transition width 0.3s cubic-bezier(.25, .8, .25, 1)

  .upper
    text-transform uppercase
</style>
