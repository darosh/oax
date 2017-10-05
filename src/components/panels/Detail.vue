<template lang="pug">
  div(style="height: 100%; overflow: hidden")
    v-toolbar.elevation-0(style="background-color: transparent")
      v-btn(icon @click.stop="close")
        v-icon close
      v-toolbar-title Operation
      v-spacer
      v-tooltip(left)
        v-btn(slot="activator" icon @click.stop="SPEC_SET_PREV_OPERATION")
          v-icon skip_previous
        span Previous operation
      v-tooltip(left)
        v-btn(slot="activator" icon @click.stop="SPEC_SET_NEXT_OPERATION")
          v-icon skip_next
        span Next operation
      v-tooltip(left)
        v-btn(slot="activator" icon)
          v-icon lock_open
        span Operation authorization
    v-divider
    div.toolbar--scroll
      v-tabs(v-model="tab")
        v-tabs-items(touchless)
          v-tabs-content(v-if="t", v-for="(t, i) in tabs", :key="i", :id="'tab-op-' + i")
            app-detail-tab(:operation="t")
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'
  import Vue from 'vue'

  import appDetailTab from './DetailTab'

  export default {
    props: ['operation'],
    components: {
      appDetailTab
    },
    data () {
      const tabs = []
      Vue.set(tabs, 1000, this.operation)

      return {
        index: 0,
        id: 1000,
        tab: 'tab-op-1000',
        tabs
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC_OPERATIONS
      ])
    },
    methods: {
      ...mapMutations([
        types.UI_SET_DRAWER,
        types.SPEC_SET_PREV_OPERATION,
        types.SPEC_SET_NEXT_OPERATION
      ]),
      close () {
        this.UI_SET_DRAWER(false)
      }
    },
    watch: {
      operation (value, oldValue) {
        this.index = ((this.SPEC_OPERATIONS.indexOf(value) > this.SPEC_OPERATIONS.indexOf(oldValue)))
          ? -1 : this.index

        if (this.index > -1) {
          this.id--
        } else {
          this.id++
        }

        Vue.set(this.tabs, this.id, value)
        this.tab = `tab-op-${this.id}`
        this.index = 0

        if (this.pending) {
          clearTimeout(this.pending)
        }

        this.pending = setTimeout(() => {
          this.pending = null

          for (let i = 0; i < this.tabs; i++) {
            if ((i !== this.id) && this.tabs[i]) {
              Vue.set(this.tabs, i, null)
            }
          }
        }, 315)
      }
    }
  }
</script>
