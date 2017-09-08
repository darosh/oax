<template lang="pug">
  v-dialog(v-model="active" fullscreen transition="dialog-bottom-transition", :overlay="false")
    v-card
        v-toolbar.transparent.elevation-0
          v-btn(icon @click="UI_SET_DIALOG()")
            v-icon keyboard_backspace
          v-toolbar-title.hidden-xs-only Code generator
        v-divider
        v-stepper.ma-5(v-model="step" vertical)
          v-stepper-step(step="1", :complete="step > 1" editable) Target
          v-stepper-content(step="1")
            v-btn(primary @click.native="step++") Client
            span.mr-2 or
            v-btn(primary @click.native="step++") Server
          v-stepper-step(step="2", :complete="step > 2") Language
          v-stepper-content(step="2") 9
            v-btn(primary large @click.native="step++") Client
            v-btn(primary large @click.native="step++") Server
          v-stepper-step(step="3", :complete="step > 3") Options
          v-stepper-content(step="3") 8
            v-btn(primary large @click.native="step++") Client
            v-btn(primary large @click.native="step++") Server
          v-stepper-step(step="4", :complete="step > 4") Download
          v-stepper-content(step="4") 8
            v-btn(primary large @click.native="step++") Client
            v-btn(primary large @click.native="step++") Server
</template>

<script>
  import dialog from '../../mixins/dialog'
  import { blobUrl } from '../../worker'

  export default {
    mixins: [dialog],
    data () {
      return {
        dialog: 'generator',
        step: 1
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
