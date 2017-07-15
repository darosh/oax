<template>
  <v-dialog v-model="active">
    <v-card>
      <v-toolbar :class="color">
        <v-toolbar-title>
          <span class="headline">{{type}}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>
          <span class="subheader">HTTP Method</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        {{method[0]}}
      </v-card-text>
      <v-card-actions>
        <a class="btn btn--flat primary--text" target="_blank" @click.native="active = false" :href="method[2]">
          <div class="btn__content">{{method[1]}}</div>
        </a>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="active = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { bus } from '../services/bus'
  import { Methods } from '../services/methods'
  const methods = () => import('../assets/http-method.json')

  export default {
    data () {
      return {
        active: false,
        method: {},
        type: '',
        color: ''
      }
    },
    methods: {
      show (method) {
        methods().then((res) => {
          this.type = method
          this.method = res[method]
          this.color = Methods[method]
          this.active = true
        })
      }
    },
    created () {
      bus.$on('dialog:method', this.show)
    },
    destroyed () {
      bus.$off('dialog:method', this.show)
    }
  }
</script>
