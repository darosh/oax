import { mapGetters, mapActions } from 'vuex'
import * as types from '../../store/types'
import Vue from 'vue'
import { getColor } from 'random-material-color'

export default {
  data () {
    return {
      keys: {},
      cached: {}
    }
  },
  created () {
    this.APIS_RUN_LOAD()
  },
  computed: {
    ...mapGetters([
      types.APIS,
      types.SPEC_URL
    ])
  },
  methods: {
    ...mapActions([
      types.APIS_RUN_LOAD
    ]),
    cache (url, value = false) {
      if (!this.cached[url]) {
        Vue.set(this.cached, url, value)

        if (!value && window.caches) {
          window.caches.match(url).then(r => {
            if (r) {
              Vue.set(this.cached, url, true)
            }
          })
        }
      }

      return this.cached[url]
    },
    key (item) {
      if (this.keys[item.url]) {
        return this.keys[item.url]
      } else {
        const val = !this.APIS ? '?' : ((this.APIS.filter(
          v => v.url === item.url)[0] || {}).key || '') || item.title

        Vue.set(this.keys, item.url, val)

        return this.keys[item.url]
      }
    },
    color (item) {
      return getColor(
        {shades: ['400', '300'], text: this.key(item).split(':')[0]})
    },
    letter (item) {
      let s = this.key(item).split(':')
      s = (s[1] || s[0]).trim()[0]
      return (s === '#' ? item.title[0].toUpperCase() + (item.title[1] || '').toLowerCase() : s.toUpperCase())
    }
  },
  watch: {
    APIS: function (APIS) {
      for (const k in this.keys) {
        if (this.keys[k] === '?') {
          this.keys[k] = (APIS.filter(v => v.url === k)[0] || {}).key
        }
      }
    },
    SPEC_URL: function (url) {
      if (!this.cached[url]) {
        this.cache(url, true)
      }
    }
  }
}
