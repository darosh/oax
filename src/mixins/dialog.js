// TODO: vuex unknown SET_DIALOG error

import { mapGetters, mapActions } from 'vuex'
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
    if (this.DIALOG_PARAM && this.active) {
      this.show(this.DIALOG_PARAM)
    }
  },
  computed: {
    ...mapGetters([
      types.DIALOG_IS,
      types.DIALOG_PARAM
    ]),
    activated: function () { return this.DIALOG_IS(this.dialog) },
    active: {
      get () {
        return this.DIALOG_IS(this.dialog)
      },
      set (value) {
        if (!value) {
          this.SET_DIALOG()
        }
      }
    }
  },
  methods: {
    ...mapActions([
      types.SET_DIALOG
    ])
  },
  watch: {
    activated: function (val) {
      if (val) {
        this.show(this.DIALOG_PARAM)
      }
    }
  }
}
