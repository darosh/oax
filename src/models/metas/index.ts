import {Contact, Info, License, Spec} from 'swagger-schema-official';
import {IExtra} from '../oas/interfaces/IExtra';
import {IMeta} from './interfaces/IMeta';

export function metas(spec: Spec): IMeta[] {
  const info: Info = spec.info;
  const contact: Contact = info.contact || {};
  const license: License = info.license || {} as any;

  function origin() {
    const o = (info as IExtra)['x-origin'];
    return (o && o[0] && o[0].url) || (o && o.url)
  }

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
      download: 'JSON / YAML',
      icon: 'file_download',
      title: 'Specification',
      dialog: 'download'
    },
    {
      download: 'Client / Server',
      icon: 'file_download',
      title: 'Generate code',
      dialog: 'generator'
    },
    {
      icon: 'cloud_download',
      link: origin(),
      title: 'Origin',
      value: origin()
    }
  ];
}
