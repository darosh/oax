<template lang="pug">
  v-dialog(v-model="active" fullscreen transition="dialog-bottom-transition", :overlay="false")
    v-card.elevation-0
      v-layout(column style="height: 100vh")
        v-toolbar.transparent.elevation-0
          v-btn(icon @click="UI_SET_DIALOG()")
            v-icon close
          v-toolbar-title Code generator
        div
          v-divider
        v-flex(fill-height d-flex)
          div(style="overflow: auto")
            v-stepper.elevation-0.ma-0.pa-0(v-model="step" vertical)
              v-stepper-step(:step="1", :complete="step > 1", :editable="true")
                span
                  span Target
                  span(v-if="GENERATOR_TYPE") :
                  =' '
                  b.body-2(v-if="GENERATOR_TYPE") {{GENERATOR_TYPE}}
              v-stepper-content(:step="1")
                v-btn(:color="GENERATOR_TYPE === 'client' ? 'primary' : ''", @click="go(1, 'client')") Client
                span.mr-2 or
                v-btn(:color="GENERATOR_TYPE === 'server' ? 'primary' : ''", @click="go(1, 'server')") Server
              v-stepper-step(:step="2", :complete="step > 2", :editable="!!GENERATOR_TYPE")
                span
                  span Language / Framework
                  span(v-if="GENERATOR_LANGUAGE") :
                  =' '
                  b.body-2(v-if="GENERATOR_LANGUAGE") {{GENERATOR_LANGUAGE}}
              v-stepper-content(:step="2")
                v-container.pa-0(fluid)
                  v-layout(row wrap style="margin: 0 0")
                    v-flex(style="margin-right: -1px" xs12 sm6 md3 lg2 xl2 v-for="(l, key) in GENERATOR_LANGUAGES", :key="key")
                      v-radio-group.pa-0.ma-0(v-model="language", :mandatory="false" hide-details)
                        v-radio.pa-0(color="primary", :value="l", :label="l", @click.native="go(2)")
              v-stepper-step(:step="3", :complete="step > 3", :editable="!!(GENERATOR_TYPE && GENERATOR_LANGUAGE)") Options
              v-stepper-content(:step="3")
                v-container.pa-0(fluid)
                  v-layout(row wrap style="margin: 0 -16px")
                    v-flex.pl-3.pr-3.pb-3(xs12 md6 lg4 xl3 v-for="(o, key) in GENERATOR_OPTIONS", :key="key")
                      v-checkbox.pt-0(v-if="o.type === 'boolean'", :label="o.display" persistent-hint, :hint="o.description" v-model="GENERATOR_VALUES[key]" color="primary")
                      v-text-field(v-else :label="o.display", persistent-hint, :hint="o.description" v-model="GENERATOR_VALUES[key]")
                  v-btn(color="primary", @click="go(3, 'client')") Submit
              v-stepper-step(:step="4", :complete="step > 4", :editable="!!(GENERATOR_TYPE && GENERATOR_LANGUAGE && GENERATOR_GENERATED)") Download
              v-stepper-content(:step="4")
                v-layout.mb-4(row align-center v-if="!GENERATOR_GENERATED")
                  v-progress-circular.mr-2(indeterminate class="primary--text")
                  v-flex Generating code&hellip;
                v-btn.mb-4(v-else color="primary", :href="GENERATOR_GENERATED") Download
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import * as types from '../../store/types'
  import dialog from '../mixins/dialog'

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
    computed: {
      ...mapGetters([
        types.GENERATOR_TYPE,
        types.GENERATOR_LANGUAGE,
        types.GENERATOR_LANGUAGES,
        types.GENERATOR_OPTIONS,
        types.GENERATOR_VALUES,
        types.GENERATOR_GENERATED
      ]),
      language: {
        get: function () {
          return this.GENERATOR_LANGUAGE
        },
        set: function (value) {
          this.GENERATOR_RUN_SET_LANGUAGE(value)
        }
      }
    },
    methods: {
      ...mapMutations([]),
      ...mapActions([
        types.GENERATOR_RUN_SET_TYPE,
        types.GENERATOR_RUN_SET_LANGUAGE,
        types.GENERATOR_RUN_GENERATE
      ]),
      show () {
        this.initialized = true
      },
      go (s, p) {
        this.step++
        switch (s) {
          case 1:
            this.GENERATOR_RUN_SET_TYPE(p)
            break
          case 3:
            this.GENERATOR_RUN_GENERATE(p)
            break
        }
      }
    },
    watch: {}
  }
</script>

<style lang="stylus">
  /*.dialog__content*/
    //z-index 1000
</style>
