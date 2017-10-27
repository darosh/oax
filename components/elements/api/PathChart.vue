<template lang="pug">
  div
    svg
      g
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import * as types from '../../../store/types'
  import dagreD3 from '../../../plugins/dagre-d3'
  import { Graph } from '../../../plugins/graphlib'
  import { select, curveBasis } from '../../../plugins/d3'
  import { MethodStyle } from '../../../assets/scripts/services/method-style'

  const ICONS = {
    get: 'keyboard_arrow_right',
    post: 'keyboard_arrow_left',
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
        types.SPEC
      ]),
      paths () {
        if (!this.SPEC || !this.el) {
          return null
        }

        const swagger = this.SPEC

        const nodes = []
        const methods = ['get', 'post', 'put', 'path', 'delete', 'head', 'options']
        const links = []
        const root = null
        const ps = []
        const paths = Object.keys(swagger.paths)
        let max = Number.MIN_VALUE
        let id = 0

        paths.forEach(function (path) {
          let parts = path.split('/').filter(d => d)

          parts = parts.length ? parts : ['/']

          const p = []
          // let previous = root

          max = Math.max(max, parts.length)

          for (let i = 0; i < parts.length; i++) {
            const part = parts[i]
            const n = {
              name: part,
              path: p.map(function (d) {
                return d.name
              }).join('/'),
              param: /\{.+}/.test(part),
              id: id++
            }

            if (i === (parts.length - 1)) {
              n.last = true

              methods.forEach(function (m) {
                if (swagger.paths[path][m]) {
                  n.methods = n.methods || []
                  n.methods.push(m)
                }
              })
            }

            p.push(n)

            // previous = n
          }

          ps.push(p)
        })

        for (let j = 0; j < max; j++) {
          const middles = {}

          for (let i = 1; i < ps.length; i++) {
            const pj = ps[i][j]

            if (!pj) {
              continue
            }

            middles[pj.path] = middles[pj.path] || {}
            middles[pj.path][pj.name] = middles[pj.path][pj.name] || pj
            middles[pj.path][pj.name].last = middles[pj.path][pj.name].last || pj.last

            ps[i][j] = middles[pj.path][pj.name]
          }
        }

        ps.forEach(function (p, i) {
          // if (!i) {
          //   return
          // }

          let previous
          previous = root

          p.forEach(function (n, j) {
            if (nodes.indexOf(n) === -1) {
              nodes.push(n)
            }

            if (previous) {
              links.push([previous, n])
            }
            previous = n
          })
        })

        return {
          org: root,
          nodes: nodes,
          links: links
        }
      }
    },
    methods: {
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
              return `<span class="elevation-3 ${MethodStyle[m]}"><svg width="16" height="16" viewBox="0 0 24 24"><path d="${Vue.prototype.$icons[ICONS[m]]}"></path></svg></span>`
            }).join('')
          }

          g.setNode(index, {
            labelType: 'html',
            label: '<div class="card" style="position: initial; margin-top:8px; font-size: 14px; text-align: center; padding: 6px 12px">' +
            item.name + '</div>' +
            '<div class="material-icons" style="text-align: center; margin-top:-8px; height: 16px">' + x + '</div>',
            height: 33,
            'class': item.last ? item.param ? 'last-param' : 'last' : item.param ? 'param' : 'intermediate',
            rx: item.last ? 0 : item.param ? Math.floor(radius / 2) : radius,
            ry: item.last ? 0 : item.param ? Math.floor(radius / 2) : radius,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          })
        })

        data.links.forEach(function (link) {
          const s = data.nodes.indexOf(link[0])
          const t = data.nodes.indexOf(link[1])

          g.setEdge(s, t, {
            curve: curveBasis
          })
        })

        RENDER(this.ROOT, g)

        this.ROOT.attr('transform', 'translate(' + [2, 2.5] + ')')
        this.SVG.attr('height', ((g.graph().height > 0) ? g.graph().height : 0) + 4 + 14)
          .attr('width', ((g.graph().width > 0) ? g.graph().width : 0) + 4)
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
    /*stroke: #666;*/
    /*stroke-opacity: 0.66;*/
    stroke-width: 0;
    /*shape-rendering: geometricPrecision;*/
  }

  .last rect {
    /*fill: #ffdfb3;*/
  }

  .last-param rect {
    /*fill: #fae3d4;*/
  }

  .param rect {
    /*fill: #f0f0f0;*/
  }

  .node text {
    /*fill: #333;*/
  }

  .edgePath path {
    stroke: #666;
    stroke-opacity: 0.5;
    stroke-width: 1.5px;
  }

  .legend-methods md-icon:not(:first-child) {
    margin-left: 24px;
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
</style>
