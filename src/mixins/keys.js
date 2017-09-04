import { mapGetters, mapActions } from 'vuex'
import * as types from '../store/types'
import Vue from 'vue'
import { getColor } from 'random-material-color'

export default {
  data () {
    return {
      keys: {}
    }
  },
  created () {
    this.LOAD_APIS()
  },
  computed: {
    ...mapGetters([
      types.APIS
    ])
  },
  methods: {
    ...mapActions([
      types.LOAD_APIS
    ]),
    key (item) {
      if (this.keys[item.url]) {
        return this.keys[item.url]
      } else {
        const val = !this.APIS ? '?' : ((this.APIS.filter(
          v => v.url === item.url)[0] || {}).key || '')
        Vue.set(this.keys, item.url, val)

        return this.keys[item.url]
      }
    },
    color (item) {
      return getColor(
        {shades: ['400', '300'], text: this.key(item).split(':')[0]})
    },
    letter (item) {
      const s = this.key(item).split(':')
      return (s[1] || s[0])[0].toUpperCase()
    }
  },
  watch: {
    APIS: function (APIS) {
      for (const k in this.keys) {
        if (this.keys[k] === '?') {
          this.keys[k] = (APIS.filter(v => v.url === k)[0] || {}).key
        }
      }
    }
  }
}
