import { mapGetters, mapMutations } from 'vuex'
import * as types from '../store/types'

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
    if (this.UI_DIALOG_PARAM && this.active) {
      this.show(this.UI_DIALOG_PARAM)
    }
  },
  computed: {
    ...mapGetters([
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
    }
  }
}
