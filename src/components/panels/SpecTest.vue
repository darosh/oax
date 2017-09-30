<template lang="pug">
  div
    v-divider
    pre.pa-3 {{result}}
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'

  import axios from 'axios'

  export default {
    data () {
      return {
        result: null
      }
    },
    created () {
      this.update()
    },
    methods: {
      update () {
        this.result = null

        if (this.SPEC_URL) {
          // POST curl -X POST -d @swagger.json -H 'Content-Type:application/json' http://online.swagger.io/validator/debug
          axios.get('https://online.swagger.io/validator/debug?url=' + this.SPEC_URL).then(res => {
            this.result = res.data
          })
        }
      }
    },
    computed: {
      ...mapGetters([types.SPEC_URL])
    },
    watch: {
      SPEC_URL: function () {
        this.update()
      }
    }
  }
</script>
