<template lang="pug">
  v-container(fluid :class="ERROR ? 'pa-0' : ''")
    v-layout.ma-0(v-if="LOADING" style="padding-top: calc(50vh - 64px)")
      v-spacer
      div
        .subheading.secondary--text.ma-0(style="margin-top: 2px; min-width: 160px" v-if="LOADING && typeof (LOADING === 'string')") {{LOADING.text}}&hellip;
        v-progress-linear(:value="Math.round(LOADING.done * 100)", :height="4", class="primary--text")
      v-spacer
    v-alert.ma-0(error v-if="ERROR" value="true")
      .pre(v-if="!ERROR.message") {{JSON.stringify(ERROR, null, 2)}}
      span(v-if="ERROR.message") {{ERROR.message}}
    div(v-if="!SEARCH && SPEC && SPEC.info")
      v-container.pa-0-sm(fluid grid-list-xl)
        v-layout(column)
          v-flex
            v-expansion-panel(expand)
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
        this.LOAD_URL(this.$route.query.url)
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
    border-bottom-left-radius 2px
    border-bottom-right-radius 2px
</style>
