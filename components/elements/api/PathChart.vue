<template lang="pug">
  div(style="position: relative" v-if="layout")
    svg(:width="layout._label.width + 24", :height="layout._label.height + 24" style="position: absolute")
      g.edgePath
        defs
          marker#arrow(viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="12" markerHeight="12" orient="auto")
            path(d="M 0 0 L 10 5 L 0 10 z" style="stroke-width: 0;")
        path(marker-end="url(#arrow)" v-for="e in layout._edgeLabels", :d="line(e.points)")

    div(style="position: absolute; transform: translateX(-50%) translateY(-50%)" v-for="n in layout._nodes", :style="{left: n.x + 'px', top: n.y + 'px'}")
      div(@click="setOp(n)" v-ripple="!!n.methods", :class="n.classes", :style="{width: n.width + 'px'}") {{n.name}}
      div.material-icons(v-if="n.methods")
        span.elevation-3(v-for="m in n.methods", :class="MethodStyle[m]")
          svg(width="16" height="16" viewBox="0 0 24 24")
            g(v-if="icons[m][0] === '<'" v-html="icons[m]")
            path(v-else :d="icons[m]")
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../../store/types'
  import { Graph } from '../../../plugins/graphlib'
  import { monotoneX, line, scaleLinear } from '../../../plugins/d3'
  import { MethodStyle } from '../../../assets/scripts/services/method-style'
  import getPaths from '../../../assets/scripts/utils/paths'
  import measure from '../../../assets/scripts/utils/measure'

  const dagre = require('../../../plugins/dagre.js')

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
      const $icons = typeof window !== 'undefined' ? window.$icons : global.$icons

      return {
        MethodStyle,
        icons: Object.keys(ICONS).reduce((r, i) => {
          r[i] = $icons[ICONS[i]]
          return r
        }, {}),
        layout: null,
        line: line()
          .curve(monotoneX)
          .x(function (d) { return d.x })
          .y(function (d) { return d.y })
      }
    },
    created () {
      if (this.SPEC) {
        this.layout = this.chart(this.paths)
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC,
        types.SPEC_OPERATION,
        types.SPEC_OPERATIONS
      ]),
      paths () {
        if (!this.SPEC) {
          return null
        }

        return getPaths(this.SPEC)
      }
    },
    methods: {
      ...mapMutations([
        types.SPEC_SET_OPERATION
      ]),
      setOp (n) {
        if (n.ops && n.ops.length) {
          this.SPEC_SET_OPERATION(n.ops[(n.ops.indexOf(this.SPEC_OPERATION) + 1) % n.ops.length])
        }
      },
      chart (data) {
        if (!data) {
          return
        }

        const g = new Graph({multigraph: false}).setGraph({
          rankdir: 'LR',
          nodesep: 24,
          ranksep: 48
        })

        data.nodes.forEach(function (item, index) {
          const radius = 13
          const name = item.name.replace(/{/g, '{\u200A').replace(/}/g, '\u200A}')
          const width = Math.max(measure(name) + 12 * 2, (item.methods
            ? item.methods.length
            : 0) * 17 + 2 * 12)

          const classes = `card card-path${item.param ? ' param' : ' slug'}${item.methods
            ? ' endpoint'
            : ' empty'}`

          g.setNode(index, {
            height: item.methods ? 33 : 24,
            width,
            rx: item.last ? 0 : item.param ? Math.floor(radius / 2) : radius,
            ry: item.last ? 0 : item.param ? Math.floor(radius / 2) : radius,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            data: item.end,
            ops: item.ops,
            name,
            classes,
            methods: item.methods,
            id: item.methods ? 'path-' + index : undefined
          })
        })

        data.links.forEach(function (link) {
          const s = data.nodes.indexOf(link[0])
          const t = data.nodes.indexOf(link[1])

          g.setEdge(s, t, {})
          // g.setEdge(s, t, {
          // curve: monotoneX
          // })
        })

        dagre.default.layout(g)

        Object.keys(g._out).forEach(from => {
          const keys = Object.keys(g._out[from])

          if (keys.length) {
            const ys = keys.map(to => g._nodes[g._out[from][to].w].y).sort((a, b) => a - b)
            const n = g._nodes[from]
            const fy = n.y
            let mid = ys.indexOf(fy)

            if (mid === -1) {
              ys.push(fy)
              ys.sort((a, b) => a - b)
              mid = ys.indexOf(fy)
            }

            const h = n.width / 2
            const scale = scaleLinear()
              .range([0, 1, 0])
              .domain([0, mid, ys.length - 1])

            keys.forEach(k => {
              const y = g._nodes[g._out[from][k].w].y
              const s = ys.length === 1 ? h : Math.sin(scale(ys.indexOf(y)) * Math.PI / 2.5) * h
              g._edgeLabels[k].points[0] = {x: n.x + s, y: n.y}
            })
          }
        })

        return Object.freeze(g)
      }
    },
    watch: {
      SPEC: function () {
        if (this.SPEC) {
          this.layout = this.chart(this.paths)
        } else {
          this.layout = null
        }
      }
    }
  }
</script>

<style scoped>
  .card-path {
    white-space: nowrap;
    position: relative;
    margin-top: 8px;
    font-size: 14px;
    text-align: center;
    padding: 6px 0;
  }

  .edgePath path {
    fill: none;
    stroke: #888;
    stroke-opacity: 0.75;
    stroke-width: 0.75px;
  }

  .edgePath defs path {
    fill: #888;
    fill-opacity: .87;
  }

  .material-icons {
    position: relative;
    text-align: center;
    margin-top: -8px;
    height: 16px;
    pointer-events: none;
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
  }

  .empty {
    box-shadow: inset 0 1px 16px rgba(0, 0, 0, 0.2), inset 0 2px 2px rgba(0, 0, 0, 0.14), inset 0 3px 1px -2px rgba(0, 0, 0, 0.12);;
    height: 24px;
    line-height: 14px;
    margin-top: 0;
  }

  .empty {
    cursor: default;
  }

  .endpoint {
    cursor: pointer;
  }
</style>
