const a = 'oax'
const b = 'oax'

export const selectMixin = {
  mounted: function () {
    if (this.$el && this.$el.setAttribute) {
      let tag = this.$options.name || this.$options._componentTag ||
        this.$options.__file || ''
      if (tag) {
        tag = tag.toLowerCase()
        this.$el.setAttribute(a, tag)
        this.$el[b] = this
      }
    }
  }
}

function query (q) {
  return q.split(/(?=\.)|(?=#)|(?=\[)|(?=:)|( )/).map(v => (v || '').replace(/^([a-z]+-[a-z-]+)$/g, `[${a}="$1"]`).replace(/^:([0-9]+)$/g, `:nth-child($1)`)).join('')
}

function selectAll (q) {
  return window.document.querySelectorAll(query(q))
}

export function select (q) {
  return window.document.querySelector(query(q))
}

function selectVue (q) {
  return select(q)[b]
}

function selectAllVue (q) {
  return selectAll(q).map(v => v[b])
}

select.query = query
select.vue = selectVue
select.all = selectAll
select.all.vue = selectAllVue
