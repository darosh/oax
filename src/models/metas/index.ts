import {Contact, Info, License, Spec} from 'swagger-schema-official';
import {IExtra} from '../oas/IExtra';
import {IMeta} from './IMeta';

export function metas(spec: Spec, url: string, validatorUrl: string): IMeta[] {
  const info: Info = spec.info;
  const contact: Contact = info.contact || {};
  const license: License = info.license || {} as any;
  const validatorBadge = validatorUrl + '?url=' + url;
  const validatorDebug = (validatorUrl && url) ? (validatorUrl + '/debug?url=' +
  url) : null;

  return [
    {
      icon: 'person',
      title: 'Contact',
      value: (contact.name && !contact.email)
        ? contact.name
        : null
    },
    {
      icon: 'email',
      link: 'mailto:' + contact.email + '?subject=' + info.title,
      title: 'Email',
      value: contact.email
        ? (contact.name || contact.email)
        : null
    },
    {
      icon: 'vpn_key',
      link: license.url,
      title: 'License',
      value: license.name || license.url
    },
    {
      icon: 'assignment',
      link: info.termsOfService,
      title: 'Terms of service',
      value: info.termsOfService
    },
    {
      icon: 'assignment_ind',
      link: (info as IExtra)['x-apiClientRegistration'] && (info as IExtra)['x-apiClientRegistration'].url,
      title: 'Client registration',
      value: (info as IExtra)['x-apiClientRegistration'] && (info as IExtra)['x-apiClientRegistration'].url
    },
    {
      icon: 'help_outline',
      link: spec.externalDocs && spec.externalDocs.url,
      title: 'Documentation',
      value: spec.externalDocs &&
      (spec.externalDocs.description || spec.externalDocs.url)
    },
    {
      icon: 'home',
      link: spec.schemes[0] + '://' + spec.host,
      title: 'Host',
      value: spec.schemes[0] + '://' + spec.host
    },
    {
      icon: 'link',
      link: (spec.schemes[0] ? (spec.schemes[0] + '://') : '') + spec.host + spec.basePath,
      title: 'Base URL',
      value: spec.basePath
    },
    {
      icon: 'developer_board',
      title: 'API version',
      value: info.version
    },
    {
      download: 'swagger.json',
      icon: 'file_download',
      link: '#',
      title: 'JSON'
    },
    {
      download: 'swagger.yaml',
      icon: 'file_download',
      link: '#',
      title: 'YAML'
    },
    {
      icon: 'cloud_download',
      link: (info as IExtra)['x-origin'] && (info as IExtra)['x-origin'].url,
      title: 'Origin',
      value: (info as IExtra)['x-origin'] && (info as IExtra)['x-origin'].url
    },
    {
      icon: 'code',
      image: validatorBadge,
      link: validatorDebug
    }
  ];
}
