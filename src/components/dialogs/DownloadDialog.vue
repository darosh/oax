<template lang="pug">
  v-dialog(v-model="active" fullscreen transition="dialog-bottom-transition")
    v-card
      v-layout(column style="height: 100vh")
        v-toolbar.transparent.elevation-0
          v-btn(icon @click="UI_SET_DIALOG()")
            v-icon keyboard_backspace
          v-toolbar-title Download
          v-spacer.hidden-xs-only
          .ml-4.hidden-sm-and-up
          v-radio-group(v-model="json" mandatory style="max-width: 220px")
            v-layout.ml-3.mt-2(wrap)
              v-radio(label="JSON", :value="true" style="max-width: 90px; min-width: 90px" color="primary")
              v-radio(label="YAML", :value="false" style="max-width: 90px; min-width: 90px" color="primary")
          v-spacer.hidden-xs-only
          .ml-4.hidden-sm-and-up
          v-radio-group(v-model="bundled" mandatory style="max-width: 220px" primary)
            v-layout.ml-3.mt-2(wrap)
              v-radio(label="Original", :value="false"  style="max-width: 110px; min-width: 100px" color="primary")
              v-radio(label="Bundled", :value="true"  style="max-width: 110px; min-width: 100px" color="primary")
          v-spacer
          v-btn.application--dark(icon primary dark :href="blob", :download="'api.' + (json ? 'json' : 'yaml')")
            v-icon(style="color: #fff") file_download
        div
          v-divider
        v-flex(fill-height d-flex)
          iframe(:src="blob")
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
        blobUrl({json: this.json, bundled: this.bundled}).then(res => {
          this.blob = res.blob
        })
      }
    },
    watch: {
      active: function () { this.update() },
      json: function () { this.update() },
      bundled: function () { this.update() }
    }
  }
</script>

<style scoped lang="stylus">
  iframe
    width: 100%
    margin: 0
    border none
</style>
