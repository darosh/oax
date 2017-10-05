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
      v-tabs(v-model="tab" v-if="UI_RIGHT_DRAWER")
        v-tabs-items(touchless)
          v-tabs-content(v-if="t", v-for="(t, i) in tabs", :key="i", :id="'tab-op-' + i")
            app-detail-header(:operation="t")
      app-detail-tab(:operation="operation")
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'
  import Vue from 'vue'

  import appDetailHeader from './DetailHeader'
  import appDetailTab from './DetailTab'

  export default {
    props: ['operation'],
    components: {
      appDetailHeader,
      appDetailTab
    },
    data () {
      return {
        id: 0,
        tab: `tab-op-0`,
        tabs: [this.operation]
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC_OPERATIONS,
        types.UI_RIGHT_DRAWER
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
      operation (value) {
        this.tabs.push(value)

        Vue.nextTick(() => {
          this.tab = `tab-op-${this.tabs.length - 1}`

          if (this.pending) {
            clearTimeout(this.pending)
          }

          this.pending = setTimeout(() => {
            this.pending = null

            for (let i = this.tabs.length - 2; i >= 0; i--) {
              if (this.tabs[i] !== null) {
                Vue.set(this.tabs, i, null)
              } else {
                break
              }
            }
          }, 315)
        })
      }
    }
  }
</script>
