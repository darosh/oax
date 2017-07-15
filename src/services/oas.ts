import {Contact, Info, License, Operation, Parameter, Path, Spec, Tag} from "swagger-schema-official";

interface X {
  [key: string]: any
}

interface Meta {
  title?: string,
  icon: string,
  value?: string,
  link?: string
  download?: string,
  image?: string
}

interface Resource extends Tag {
  _operations?: OperationExtended[]
}

const HttpMethods: { [httpMethod: string]: boolean } = {
  get: true,
  put: true,
  post: true,
  'delete': true,
  options: true,
  head: true,
  patch: true
}

interface OperationExtended extends Operation {
  _id: number,
  _method: string,
  _pathName: string
}

interface Map {
  [tag: string]: number
}

export class OAS {
  meta: Meta[]
  resources: Resource[]
  map: Map

  constructor(spec: Spec,
              url: string,
              defaultContentType: string = 'application/json',
              validatorUrl: string = 'http://online.swagger.io/validator') {
    OAS.fixInfo(spec, url, defaultContentType)
    this.map = {}
    this.meta = OAS.getMeta(spec, url, validatorUrl)
    this.resources = OAS.getResources(spec, this.map)
    OAS.getOperations(spec, this.resources, this.map)
  }

  static fixInfo(spec: Spec, url: string, defaultContentType: string) {
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

  static getResources(spec: Spec, map: Map): Resource[] {
    const resources: Resource[] = []

    if (!spec.tags || (spec.tags.length === 0)) {
      resources.push({
        name: 'default'
        // open: true
      })
      map['default'] = 0;
    } else {
      for (let i = 0, l = spec.tags.length; i < l; i++) {
        let tag = spec.tags[i];
        resources.push(tag);
        map[tag.name] = i;
      }
    }

    return resources
  }

  static getOperations(spec: Spec, resources: Resource[], map: Map/*, form, map, defaultContentType, openPath*/) {
    let operationId: number = 0;

    for (const pathName in spec.paths) {
      const path: Path = spec.paths[pathName]
      // const pathParameters: Parameter[] = path.parameters || [];

      // delete pathObject.parameters;

      for (const httpMethod in path) {
        if (!HttpMethods[httpMethod]) {
          continue;
        }

        const operation: OperationExtended = (path as X)[httpMethod]

        operation._id = operationId;

        operation.produces = operation.produces || spec.produces;
        // form[operationId] = {
        //   responseType: defaultContentType
        // };

        operation._method = httpMethod;
        operation._pathName = pathName;

        // parseParameters(spec, operation, pathParameters, form, defaultContentType);
        // parseResponses(spec, operation);

        operation.tags = (!operation.tags || !operation.tags.length) ? ['default'] : operation.tags;

        const tag = operation.tags[0];

        if (typeof map[tag] === 'undefined') {
          map[tag] = resources.length;
          resources.push({
            name: tag
          });
        }

        const resource: Resource = resources[map[operation.tags[0]]];

        // operation.open = openPath && openPath === operation.operationId || openPath === resource.name + '*';

        resource._operations = resource._operations || [];
        resource._operations.push(operation);

        // if (operation.open) {
        //   resource.open = true;
        // }

        operationId++;
      }
    }
  }

  static computeParameters(pathParameters: Parameter[], operation: OperationExtended): Parameter[] {
    let operationParameters: Parameter[] = operation.parameters || [];
    let parameters: Parameter[] = [].concat(operationParameters);

    for (let i = 0, l = pathParameters.length; i < l; i++) {
      let found: boolean = false;
      let pathParameter = pathParameters[i];

      for (let j = 0, k = operationParameters.length; j < k; j++) {
        let operationParameter = operationParameters[j]
        if (pathParameter.name === operationParameter.name && pathParameter.in === operationParameter.in) {
          // overridden parameter
          found = true;
          break;
        }
      }
      if (!found) {
        // add path parameter to operation ones
        parameters.push(pathParameter);
      }
    }
    return parameters;
  }

  static parseParameters(spec: Spec, operation: OperationExtended, pathParameters: Parameter[]/*, form, defaultContentType*/) {
    const parameters: Parameter[] = operation.parameters = OAS.computeParameters(pathParameters, operation);

    for (let i = 0, l = parameters.length; i < l; i++) {
      // TODO manage 'collectionFormat' (csv, multi etc.) ?
      // TODO manage constraints (pattern, min, max etc.) ?
      let param = parameters[i];
      // param.id = paramId;
      // param.type = model.getType(param);
      // param.description = trustHtml(param.description);

      // if (param.items && param.items.enum) {
      //   param.enum = param.items.enum;
      //   param.default = param.items.default;
      // }

      // param.subtype = param.enum ? 'enum' : param.type;

      // put param into form scope
      // form[operationId][param.name] = param.default || '';

      // if (param.schema) {
      // param.schema.display = 1; // display schema
      // param.schema.json = model.generateSampleJson(spec, param.schema);
      // param.schema.model = $sce.trustAsHtml(model.generateModel(spec, param.schema));
      // }

      if (param.in === 'body' || param.in === 'formData') {
        operation.consumes = operation.consumes || spec.consumes;
        // form[operationId].contentType = operation.consumes.length === 1 ? operation.consumes[0] : defaultContentType;
      }

      // paramId++;
    }
  }

  static getMeta(spec: Spec, url: string, validatorUrl: string): Meta[] {
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
        value: (info as X)['x-apiClientRegistration'] && (info as X)['x-apiClientRegistration'].url,
        link: (info as X)['x-apiClientRegistration'] && (info as X)['x-apiClientRegistration'].url
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
        value: (info as X)['x-origin'] && (info as X)['x-origin'].url,
        link: (info as X)['x-origin'] && (info as X)['x-origin'].url
      },
      {
        icon: 'code',
        link: validatorDebug,
        image: validatorBadge
      }
    ]
  }
}
