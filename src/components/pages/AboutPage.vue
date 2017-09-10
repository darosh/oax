<template lang="pug">
  v-container(fluid)
    v-layout
      v-spacer.hidden-xs-only
      v-flex(style="max-width: 888px")
        v-card.pa-4.mb-1
          .pt-3.hidden-xs-only
          h3.pb-3.ma-0 OpenAPI Specification Explorer
          .pb-3.hidden-xs-only
          v-divider
          v-layout.mt-3.mb-3
            v-flex
              .subheading.pt-2 Version {{APP_VERSION}}
            v-spacer
            v-btn.ma-0(flat @click="reload") Reload
          v-divider.mb-3
          h4 Keyboard shotcuts
          table.mb-3
            tbody
              tr(v-for="(notes, key) in keys", :key="key")
                td
                  kbd.nowrap {{key}}
                td.pl-3 {{notes}}
          v-divider.mb-3
          h4 Acknowledgement
          p This app wouldn be posssible without following packages
          span(v-for="(i, k) in libs", :key="k")
            span(v-if="k") ,
              =" "
            a.subheading.nowrap(:href="i.href" target="_blank") {{i.name}}
            | &nbsp;{{i.version}}
      v-spacer.hidden-xs-only
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import appLog from '../Log'
  import { dependencies } from '../../../package.json'

  export default {
    components: {
      appLog
    },
    data () {
      return {
        keys: {
          'Esc': 'Close dialog, Close right panel, Close left panel, Open left panel',
          'Alt + l': 'Show log',
          'Alt + t': 'Switch theme',
          'F10': 'Fullscreen specification editor'
        },
        libs: Object.keys(dependencies).filter(i => i[0] !== '@').map(i => ({
          name: i,
          version: dependencies[i].indexOf('github:') === 0 ? '' : dependencies[i][0] === '^' ? dependencies[i].substr(
            1) : dependencies[i],
          href: dependencies[i].indexOf('github:') === 0
            ? 'https://github.com/' + i.substr(6)
            : ('https://www.npmjs.com/package/' + i)
        }))
      }
    },
    computed: {
      ...mapGetters([
        types.APP_VERSION,
        types.UI_LOG,
        types.UI_LOADING
      ])
    },
    methods: {
      reload () {
        location.reload()
      }
    }
  }
</script>
