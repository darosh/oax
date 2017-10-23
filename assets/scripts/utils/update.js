export default function update (schema, bundled) {
  schema.bundled = bundled

  // schema.bundle()
  schema.refs = schema.bundlePart(schema.bundled, schema.url)
  schema.refs = Object.keys(schema.cache).length === 1
    ? schema.refs
    : schema.getRefs(schema.bundled)
  schema.simplifyRefs(schema.refs)

  schema.deref(true, false)
}
