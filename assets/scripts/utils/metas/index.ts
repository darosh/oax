import {Contact, Info, License} from 'swagger-schema-official';
import {countBy} from '../../../../plugins/lodash';
import {IExtra} from '../../specification/interfaces/IExtra';
import {ISpecExtended} from '../../specification/interfaces/ISpecExtended';
import {IMeta} from './interfaces/IMeta';

export function metas(spec: ISpecExtended): IMeta[] {
  const info: Info = spec.info;
  const contact: Contact = info.contact || {};
  const license: License = info.license || {} as any;

  function origin() {
    const o = (info as IExtra)['x-origin'];
    return (o && o[0] && o[0].url) || (o && o.url);
  }

  function stats() {
    const c = countBy(spec._operations, '_method');
    return {
      chart: [
        ['get', c.get],
        ['post', c.post],
        ['put', c.put],
        ['patch', c.patch],
        ['delete', c.delete],
        ['head', c.head],
        ['options', c.options]
      ].filter((d) => d[1]),
      total: spec._operations.length
    };
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
      icon: 'cloud_download',
      link: origin(),
      title: 'Origin',
      value: origin()
    },
    {
      dialog: 'download',
      download: 'JSON / YAML',
      icon: 'file_download',
      title: 'Specification'
    },
    {
      dialog: 'generator',
      download: 'Client / Server',
      icon: 'file_download',
      title: 'Code generator'
    },
    {
      icon: 'fake',
      stats: stats(),
      title: spec._operations.length === 1 ? 'Operation' : 'Operations',
      value: 'fake'
    }
  ];
}
