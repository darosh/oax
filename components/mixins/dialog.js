import { mapGetters, mapMutations } from 'vuex'
import * as types from '../../store/types'

export default {
  data () {
    return {
      dialog: '',
      type: '',
      color: '',
      ref: '',
      initialized: false
    }
  },
  created () {
    if (this.activated) {
      this.show(this.UI_DIALOG_PARAM)
    }
  },
  destroyed () {
    this.UI_SET_DIALOG()
  },
  computed: {
    ...mapGetters([
      types.APP_PATH,
      types.UI_DIALOG,
      types.UI_DIALOG_PARAM
    ]),
    activated: function () { return this.UI_DIALOG(this.dialog) },
    active: {
      get () {
        return this.initialized && this.UI_DIALOG(this.dialog)
      },
      set (value) {
        if (!value) {
          this.UI_SET_DIALOG()
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      types.UI_SET_DIALOG
    ])
  },
  watch: {
    activated: function (val) {
      if (val) {
        this.show(this.UI_DIALOG_PARAM)
      }
    },
    APP_PATH: function () {
      this.UI_SET_DIALOG()
    }
  }
}
