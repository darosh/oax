import {Spec} from "swagger-schema-official";

export  function info(spec: Spec, url: string, defaultContentType: string) {
  const a: any = document.createElement('a')
  a.href = url

  spec.schemes = spec.schemes || []

  if (spec.schemes.length === 0) {
    spec.schemes.push(a.protocol.replace(':', ''))
  }

  spec.host = spec.host || a.host
  spec.consumes = spec.consumes || [defaultContentType]
  spec.produces = spec.produces || [defaultContentType]
}
