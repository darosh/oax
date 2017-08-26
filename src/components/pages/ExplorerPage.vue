<template lang="pug">
  v-container(fluid :class="ERROR ? 'pa-0' : ''")
    v-layout.ma-0(v-if="LOADING")
      v-spacer
      div.pt-2
        v-progress-linear(:value="Math.round(LOADING[0].done * 100)", :height="4", class="primary--text")
        div(v-for="(i, k) in LOADING", :style="{opacity: k ? Math.min(0.8, Math.max(0.33, 1 / (k / 2))) : 1, 'margin-bottom': !k ? '16px' : 0}" style="min-width: 260px; position: relative")
          span(v-if="k" style="inline-block; position: absolute; right: 0px; font-family: 'Roboto Mono', monospaced") +{{i.elapsed}} ms
          span(style="inline-block; font-size: 16px") {{i.text}}
            span(v-if="!k") &hellip;
        div(style="min-width: 260px; position: relative")
          b(style="opacity: 0.33; inline-block; position: absolute; right: 0px; font-family: 'Roboto Mono', monospaced") {{LOADING.elapsed}} ms
      v-spacer
    v-alert.ma-0(error v-if="ERROR" value="true")
      .pre(v-if="!ERROR.message") {{JSON.stringify(ERROR, null, 2)}}
      span(v-if="ERROR.message") {{ERROR.message}}
    div(v-if="!SEARCH && SPEC && SPEC.info")
      v-container.pa-0-sm(fluid grid-list-xl)
        v-layout(column)
          v-flex
            v-expansion-panel(expand :class="{'expansion-panel--disabled': !SPEC.info.description}")
              v-expansion-panel-content.bg.relative(v-model="exp1", ripple)
                .title(slot="header") {{SPEC.info.title}}
                v-divider(v-if="SPEC.info.description")
                v-card.bg(v-if="SPEC.info.description")
                  v-card-text
                    v-layout
                      v-spacer
                      .md(style="max-width: 60em" v-html="md(SPEC.info)")
                      v-spacer

      app-meta-list(v-if="METAS", :metas="METAS")
    app-resource-list(:class="{wide: IS_WIDE}" v-if="IS_GROUPED === 0")
    app-operation-list(:class="{wide: IS_WIDE}" v-else-if="IS_GROUPED === 1")
    app-operation-table(v-else-if="IS_GROUPED === 2")
    app-documentation(v-else)
    app-method-dialog
    app-status-dialog
    app-header-dialog
    app-security-dialog
    app-fab
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../../store/types'

  import {md} from '../../services/md'

  export default {
    components: {
      appMetaList: () => import('../MetaList'),
      appResourceList: () => import('../ResourceList'),
      appOperationList: () => import('../OperationList'),
      appOperationTable: () => import('../OperationTable'),
      appDocumentation: () => import('../Documentation'),
      appMethodDialog: () => import('../dialogs/MethodDialog'),
      appStatusDialog: () => import('../dialogs/StatusDialog'),
      appHeaderDialog: () => import('../dialogs/HeaderDialog'),
      appSecurityDialog: () => import('../dialogs/SecurityDialog'),
      appFab: () => import('../FAB')
    },
    data () {
      return {
        exp1: true
      }
    },
    computed: {
      ...mapGetters([
        types.METAS,
        types.ERROR,
        types.LOADING,
        types.IS_GROUPED,
        types.IS_WIDE,
        types.OPERATIONS,
        types.RESOURCES,
        types.SPEC,
        types.SEARCH
      ])
    },
    methods: {
      ...mapActions([
        types.LOAD_URL
      ]),
      md
    },
    created () {
      if (this.$route.query.url) {
        //        this.LOAD_URL(this.$route.query.url)
      }
    },
    watch: {
      $route: function (value) {
        if (value.query.url) {
          this.LOAD_URL(value.query.url)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .expansion-panel--disabled >>> .expansion-panel__header:after
    opacity 0.44

  .pre
    white-space pre

  >>> .progress-linear__bar__determinate
    transition none

  .relative
    position relative

  .expansion-panel
  .expansion-panel > li:first-child
    border none
    border-radius 2px

  .expansion-panel__body > *
    border-bottom-left-radius: 2px
    border-bottom-right-radius: 2px
</style>
