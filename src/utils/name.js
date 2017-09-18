export function name (SPEC, item) {
  for (const def in SPEC.definitions) {
    if (SPEC.definitions[def] === item) {
      return def
    }
  }

  return null
}

export function names (SPEC, item) {
  return item.allOf.map(i => name(SPEC, i)).filter(d => d)
}
