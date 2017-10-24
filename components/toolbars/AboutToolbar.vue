<template lang="pug">
  v-layout.ma-0.toolbar__content(row style="height: 100%")
    v-btn(v-if="($route.name === 'about') && !UI_LEFT_DRAWER" icon, @click.stop="UI_SET_LEFT_DRAWER()")
      v-icon menu
    v-toolbar-title {{APP_PAGE_NAME}}
    v-spacer
    v-toolbar-items
      v-btn(v-if="i && !i.header" flat :to="i.exact ? APP_HOME : i.to ? i.to : null", :href="i.href ? i.href : null" tag="a", :exact="i.exact", :class="{'hidden-sm-and-down': !i.exact}", :target="i.blank ? '_blank' : null" , :rel="i.blank ? 'noopener' : null" v-for="(i, k) in links", :key="k") {{i.title}}

    v-menu.hidden-md-and-up(bottom left)
      v-btn(icon slot="activator")
        v-icon more_vert
      app-toolbar-menu(navigation)
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import links from '../../assets/scripts/utils/links'

  export default {
    components: {
      appToolbarMenu: () => import('./ToolbarMenu')
    },
    data () {
      return {
        links
      }
    },
    computed: {
      ...mapGetters([
        types.APP_HOME,
        types.APP_PAGE_NAME,
        types.UI_LEFT_DRAWER
      ])
    },
    methods: {
      ...mapMutations([
        types.UI_SET_LEFT_DRAWER
      ])
    }
  }
</script>
