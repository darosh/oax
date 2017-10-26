<template lang="pug">
  div(v-if="paths")
    svg(width="100", height="100")
      g
    div(v-for="p in paths.nodes") {{p}}
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../../store/types'
  import dagreD3 from 'dagre-d3-webpack'
  import { select } from '../../../plugins/d3'

  // eslint-disable-next-line new-cap
  const RENDER = new dagreD3.render()

  const ICONS = {
    get: 'arrow_forward',
    post: 'arrow_backward',
    put: 'chevron_left',
    patch: 'first_page',
    delete: 'close',
    options: 'radio_button_unchecked',
    head: 'sentiment_neutral'
  }

  export default {
    mounted () {
      this.chart(this.paths)
    },
    computed: {
      ...mapGetters([
        types.SPEC
      ]),
      paths () {
        if (!this.SPEC) {
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
          const parts = path.split('/')
          parts.shift()
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
          if (!i) {
            return
          }

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
        const SVG = select(this.$el.querySelector('svg'))
        const ROOT = select(this.$el.querySelector('g'))

        const g = new dagreD3.graphlib.Graph({multigraph: false}).setGraph({
          rankdir: 'LR',
          nodesep: 16,
          ranksep: 48
        })

        data.nodes.forEach(function (item, index) {
          const radius = 13

          let x = ''

          if (item.methods) {
            x = '<span class="material-icons">' + item.methods.map(function (m) {
              return ICONS[m]
            }).join('</span><span class="material-icons">') + '</span>'
          }

          g.setNode(index, {
            labelType: 'html',
            label: '<div style="margin-top:19px; font-size: 14px; text-align: center">' + item.name + '</div>' +
            '<div style="text-align: center; margin-top:-2px; height: 19px">' + x + '</div>',
            height: 22,
            'class': item.last ? item.param ? 'last-param' : 'last' : item.param ? 'param' : 'intermediate',
            rx: item.last ? 0 : item.param ? Math.floor(radius / 2) : radius,
            ry: item.last ? 0 : item.param ? Math.floor(radius / 2) : radius,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 0,
            paddingBottom: 4
          })
        })

        data.links.forEach(function (link) {
          const s = data.nodes.indexOf(link[0])
          const t = data.nodes.indexOf(link[1])

          g.setEdge(s, t, {
            lineInterpolate: 'basis'
          })
        })

        console.log(g)

        RENDER(ROOT, g)

        ROOT.attr('transform', 'translate(' + [2, 2.5] + ')')
        SVG.attr('height', ((g.graph().height > 0) ? g.graph().height : 0) + 4 + 14)
          .attr('width', ((g.graph().width > 0) ? g.graph().width : 0) + 4)

        setTimeout(function () {
          try {
            select(self.frameElement).style('height', (48 + document.body.getBoundingClientRect().height) + 'px')
          } catch (ign) {
          }
        }, 50)
      }
    }
  }
</script>
