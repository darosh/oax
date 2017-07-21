import {Contact, Info, License, Spec} from "swagger-schema-official";
import {IMeta} from "./IMeta";
import {IExtra} from "../oas/IExtra";

export function metas(spec: Spec, url: string, validatorUrl: string): IMeta[] {
  const info: Info = spec.info
  const contact: Contact = info.contact || {}
  const license: License = info.license || {} as any
  const validatorBadge = validatorUrl + '?url=' + url
  const validatorDebug = (validatorUrl && url) ? (validatorUrl + '/debug?url=' +
  url) : null

  return [
    {
      title: 'Contact',
      icon: 'person',
      value: (contact.name && !contact.email)
        ? contact.name
        : null
    },
    {
      title: 'Email',
      icon: 'email',
      value: contact.email
        ? (contact.name || contact.email)
        : null,
      link: 'mailto:' + contact.email + '?subject=' + info.title
    },
    {
      title: 'License',
      icon: 'vpn_key',
      value: license.name || license.url,
      link: license.url
    },
    {
      title: 'Terms of service',
      icon: 'assignment',
      value: info.termsOfService,
      link: info.termsOfService
    },
    {
      title: 'Client registration',
      icon: 'assignment_ind',
      value: (info as IExtra)['x-apiClientRegistration'] && (info as IExtra)['x-apiClientRegistration'].url,
      link: (info as IExtra)['x-apiClientRegistration'] && (info as IExtra)['x-apiClientRegistration'].url
    },
    {
      title: 'Documentation',
      icon: 'help_outline',
      value: spec.externalDocs &&
      (spec.externalDocs.description || spec.externalDocs.url),
      link: spec.externalDocs && spec.externalDocs.url
    },
    {
      title: 'Host',
      icon: 'home',
      value: spec.schemes[0] + '://' + spec.host,
      link: spec.schemes[0] + '://' + spec.host
    },
    {
      title: 'Base URL',
      icon: 'link',
      value: spec.basePath,
      link: (spec.schemes[0] ? (spec.schemes[0] + '://') : '') + spec.host + spec.basePath
    },
    {
      title: 'API version',
      icon: 'developer_board',
      value: info.version
    },
    {
      title: 'JSON',
      icon: 'file_download',
      link: '#',
      download: 'swagger.json'
    },
    {
      title: 'YAML',
      icon: 'file_download',
      link: '#',
      download: 'swagger.yaml'
    },
    {
      title: 'Origin',
      icon: 'cloud_download',
      value: (info as IExtra)['x-origin'] && (info as IExtra)['x-origin'].url,
      link: (info as IExtra)['x-origin'] && (info as IExtra)['x-origin'].url
    },
    {
      icon: 'code',
      link: validatorDebug,
      image: validatorBadge
    }
  ]
}
