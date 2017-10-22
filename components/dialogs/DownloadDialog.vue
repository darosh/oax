<template lang="pug">
  v-dialog(content-class="download-dialog" v-model="active" fullscreen transition="dialog-bottom-transition", :overlay="false")
    v-card
      v-layout(column style="height: 100vh")
        v-toolbar.transparent.elevation-0
          v-btn(icon @click="UI_SET_DIALOG()")
            v-icon close
          v-toolbar-title Download
          v-spacer
          v-select(style="max-width: 78px; min-width: 78px" hide-details single-line bottom v-model="json", :items="[{text: 'JSON', value: true},{text: 'YAML', value: false}]")
          v-select.ml-3(style="max-width: 86px; min-width: 86px" hide-details single-line bottom v-model="bundled", :items="[{text: 'Bundled', value: true},{text: 'Original', value: false}]")
        div
          v-divider
        v-flex(fill-height d-flex)
          iframe(v-if="blob", :src="blob" style="background-color: #fff")
          v-progress-circular.mt-4(v-else indeterminate class="primary--text")
          v-btn(fab color="primary" dark fixed right bottom :href="blob", :download="'api.' + (json ? 'json' : 'yaml')")
            v-icon file_download
</template>

<script>
  import dialog from '../mixins/dialog'
  import worker from '../../assets/worker'

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
    methods: {
      show () {
        this.initialized = true
      },
      update () {
        this.blob = null

        if (this.active) {
          const start = Date.now()
          worker({blob: {json: this.json, bundled: this.bundled}}).then(res => {
            setTimeout(() => {
              this.blob = res.blob
            }, Math.max(320 - Date.now() + start, 0))
          })
        }
      }
    },
    watch: {
      active: function () {
        this.update()
      },
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

  /*.dialog__content*/
  /*z-index 6*/

  .dialog--fullscreen
    overflow hidden
</style>
