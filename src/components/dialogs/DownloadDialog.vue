<template lang="pug">
  v-dialog(v-model="active" fullscreen transition="dialog-bottom-transition", :overlay="false")
    v-card
      v-layout(column style="height: 100vh")
        v-toolbar.transparent.elevation-0
          v-btn(icon @click="UI_SET_DIALOG()")
            v-icon close
          v-toolbar-title.hidden-xs-only Download
          v-spacer.hidden-xs-only
          .ml-4.hidden-sm-and-up
          v-radio-group(v-model="json" mandatory style="max-width: 220px")
            v-layout.ml-3.mt-2(wrap)
              v-radio(label="JSON", :value="true" style="max-width: 90px; min-width: 90px" color="primary")
              v-radio(label="YAML", :value="false" style="max-width: 90px; min-width: 90px" color="primary")
          v-radio-group(v-model="bundled" mandatory style="max-width: 220px" primary)
            v-layout.ml-3.mt-2(wrap)
              v-radio(label="Original", :value="false"  style="max-width: 110px; min-width: 100px" color="primary")
              v-radio(label="Bundled", :value="true"  style="max-width: 110px; min-width: 100px" color="primary")
        div
          v-divider
        v-flex(fill-height d-flex)
          iframe(:src="blob")
          v-btn(fab primary dark fixed right bottom :href="blob", :download="'api.' + (json ? 'json' : 'yaml')")
            v-icon file_download
</template>

<script>
  import dialog from '../../mixins/dialog'
  import { blobUrl } from '../../worker'

  export default {
    mixins: [dialog],
    data () {
      return {
        dialog: 'download',
        json: true,
        bundled: true,
        blob: null
      }
    },
    created () {
    },
    methods: {
      show () {
        this.initialized = true
      },
      update () {
        this.blob = null

        if (this.active) {
          const start = Date.now()
          blobUrl({json: this.json, bundled: this.bundled}).then(res => {
            setTimeout(() => {
              this.blob = res.blob
            }, Math.max(320 - Date.now() + start, 0))
          })
        }
      }
    },
    watch: {
      active: function () { this.update() },
      json: function () { this.update() },
      bundled: function () { this.update() }
    }
  }
</script>

<style lang="stylus">
  iframe
    width: 100%
    margin: 0
    border none

  .dialog__content
    z-index 1000

  .dialog--fullscreen
    overflow hidden
</style>
