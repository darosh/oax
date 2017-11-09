<template lang="pug">
  div
    svg
      g
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../../store/types'
  import dagreD3 from '../../../plugins/dagre-d3'
  import { Graph } from '../../../plugins/graphlib'
  import { select, monotoneX } from '../../../plugins/d3'
  import { MethodStyle } from '../../../assets/scripts/services/method-style'
  import getPaths from '../../../assets/scripts/utils/paths'

  const ICONS = {
    get: 'arrow_right',
    post: 'arrow_left',
    put: 'chevron_left',
    patch: 'first_page',
    delete: 'close',
    options: 'radio_button_unchecked',
    head: 'sentiment_neutral'
  }

  export default {
    data () {
      return {
        el: null
      }
    },
    mounted () {
      this.el = this.$el

      if (this.SPEC) {
        this.chart(this.paths)
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC,
        types.SPEC_OPERATIONS
      ]),
      paths () {
        if (!this.SPEC || !this.el) {
          return null
        }

        return getPaths(this.SPEC)
      }
    },
    methods: {
      ...mapMutations([
        types.SPEC_SET_OPERATION
      ]),
      chart (data) {
        if (!data || !this.el) {
          return
        }

        this.SVG = select(this.el.querySelector('svg'))
        this.ROOT = select(this.el.querySelector('g'))

        // eslint-disable-next-line new-cap
        const RENDER = new dagreD3.render()

        const g = new Graph({multigraph: false}).setGraph({
          rankdir: 'LR',
          nodesep: 24,
          ranksep: 48
        })

        data.nodes.forEach(function (item, index) {
          const radius = 13

          let x = ''

          if (item.methods) {
            x = item.methods.map(function (m) {
              const i = Vue.prototype.$icons[ICONS[m]]
              return `<span class="elevation-3 ${MethodStyle[m]}"><svg width="16" height="16" viewBox="0 0 24 24">${i[0] ===
              '<' ? `<g>${i}</g>` : `<path d="${i}" />`}</svg></span>`
            }).join('')
          }

          g.setNode(index, {
            labelType: 'html',
            label: `<div class="card${item.param ? ' param' : ' slug'}${item.methods
              ? ' endpoint'
              : ' empty'}" style="position: initial; margin-top:8px; font-size: 14px; text-align: center; padding: 6px 12px">` +
            item.name.replace(/{/g, '{&hairsp;').replace(/}/g, '&hairsp;}') + '</div>' +
            '<div class="material-icons" style="text-align: center; margin-top:-8px; height: 16px">' + x + '</div>',
            height: item.methods ? 33 : 24,
            'class': `${item.methods
              ? ' endpoint'
              : ' empty'}`,
            rx: item.last ? 0 : item.param ? Math.floor(radius / 2) : radius,
            ry: item.last ? 0 : item.param ? Math.floor(radius / 2) : radius,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            data: item.path,
            id: item.methods ? 'path-' + index : undefined
          })
        })

        data.links.forEach(function (link) {
          const s = data.nodes.indexOf(link[0])
          const t = data.nodes.indexOf(link[1])

          g.setEdge(s, t, {
            curve: monotoneX
          })
        })

        RENDER(this.ROOT, g)

        this.ROOT.attr('transform', 'translate(' + [2, 2.5] + ')')
        this.SVG.attr('height', ((g.graph().height > 0) ? g.graph().height : 0) + 4 + 14)
          .attr('width', ((g.graph().width > 0) ? g.graph().width : 0) + 4)

        for (const el of this.el.querySelectorAll('.nodes > g')) {
          if (!el.id) {
            continue
          }

          ((el) => {
            el.onclick = () => {
              const d = data.nodes[el.id.split('-')[1]]
              console.log(d.end)
              // this.SPEC_SET_OPERATION(this.SPEC_OPERATIONS[el.id.split('-')[1]])
            }
          })(el)
        }
      }
    },
    watch: {
      SPEC: function () {
        if (this.SPEC) {
          this.chart(this.paths)
        }
      }
    }
  }
</script>

<style>
  text {
    font-size: 14px;
  }

  .node rect {
    fill: none;
    stroke-width: 0;
  }

  .edgePath path {
    stroke: #888;
    stroke-opacity: 0.75;
    stroke-width: 0.75px;
  }

  .edgePath defs path {
    fill: #888;
    fill-opacity: .87;
  }

  .material-icons > span {
    display: inline-block;
    text-align: center;
    width: 16px;
    height: 16px;
    padding: 0;
    fill: #fff;
    background-color: #666;
    border-radius: 8px;
    margin: 0 1px;
  }

  .param {
    border-radius: 16px;
    min-width: 64px;
  }

  .empty {
    box-shadow: inset 0 1px 16px rgba(0, 0, 0, 0.2), inset 0 2px 2px rgba(0, 0, 0, 0.14), inset 0 3px 1px -2px rgba(0, 0, 0, 0.12);;
    /*border: 0.75px solid rgba(192, 192, 192, 0.5);*/
    height: 24px;
    padding: 0;
    line-height: 14px;
  }

  .nodes > g.empty {
    cursor: default;
  }

  .nodes > g.endpoint {
    cursor: pointer;
  }

  .nodes > g.endpoint:hover .card {
    background-color: rgba(128, 128, 128, .25);
  }
</style>
