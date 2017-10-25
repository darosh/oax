import { mapGetters } from 'vuex'
import * as types from '../../store/types'

export default {
  computed: {
    ...mapGetters([
      types.UI_LEFT_DRAWER,
      types.UI_LEFT_DRAWER_HALF,
      types.UI_RIGHT_DRAWER,
      types.VIEW_WIDE
    ]),
    $mobile () { return 1140 },
    $half () { return 1520 },
    $panel () {
      return Math.min(480, this.$route.meta.panelWidth || Math.round(this.$vuetify.breakpoint.width / this.$columns)) - 12
    },
    $panelLeft () {
      const w = this.$vuetify.breakpoint.width
      return (this.UI_LEFT_DRAWER_HALF && (this.$half < w)) ? Math.round(w / 2) : this.$panel
    },
    $column () {
      return this.$vuetify.breakpoint.width / this.$columns
    },
    $columns () {
      return this.$getColumns(this.$vuetify.breakpoint.width)
    },
    $content () {
      let w = this.$vuetify.breakpoint.width
      return w - ((this.UI_LEFT_DRAWER && (w > this.$mobile)) ? this.$panelLeft : 0) -
        ((this.UI_RIGHT_DRAWER && (w > this.$mobile)) ? this.$panel : 0)
    },
    $inner () {
      return (100 / Math.max(1, this.$getColumns(this.$content) - (this.VIEW_WIDE ? 2 : 0))) + '%'
    },
    $outer () {
      return (100 / this.$getColumns(this.$content)) + '%'
    }
  },
  methods: {
    $innerMin (cols) {
      return (100 / Math.min(cols, Math.max(1, this.$getColumns(this.$content) - (this.VIEW_WIDE ? 2 : 0)))) + '%'
    },
    $getColumns (w) {
      return w < 380 ? 1 : w < 760 ? 1 : w < 1140 ? 2 : w < 1520 ? 3 : w < (1920 - 16) ? 4 : w < 2280 ? 5 : 6
    }
  }
}
