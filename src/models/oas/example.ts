import {Schema} from 'swagger-schema-official';
import {IOperationExtended} from './IOperationExtended';

export function schema(operation: IOperationExtended) {
  for (const code in operation.responses) {
    const response = operation.responses[code];

    if (response.schema) {
      return response.schema
    }
  }
}

export function example(schema: Schema | any) {
  let obj: any;

  if (schema.default || schema.example) {
    obj = schema.default || schema.example;
  } else if (schema.properties) {
    obj = {};

    for (const name in schema.properties) {
      obj[name] = example(schema.properties[name]);
    }
  } else if (schema.type === 'array') {
    obj = [example(schema.items)];
  } else if (schema.type === 'object') {
    obj = {};
  } else {
    obj = schema.example || value(type(schema));
  }

  return obj;
}

function value(type: string): any {
  let result;

  switch (type) {
    case 'long':
    case 'integer':
      result = 0;
      break;
    case 'boolean':
      result = false;
      break;
    case 'double':
    case 'number':
      result = 0.0;
      break;
    case 'string':
      result = 'string';
      break;
    case 'date':
      result = (new Date()).toISOString().split('T')[0];
      break;
    case 'date-time':
      result = (new Date()).toISOString();
      break;
  }
  return result;
}

function type(item: Schema): string {
  let format = item.format;

  switch (format) {
    case 'int32':
      format = item.type;
      break;
    case 'int64':
      format = 'long';
      break;
  }
  return format || item.type;
}

/*
function generateModel(swagger: Spec, schema: Schema, modelName: string, currentGenerated: any = {}) {
  var model = '';
  var buffer;
  var subModels;
  var hasProperties = false;
  var name;
  var className;
  var def;
  var sub;

  if (schema.properties) {
    modelName = modelName || ('Inline Model' + countInLine++);
    currentGenerated[modelName] = true;
    buffer = ['<div><strong>' + modelName + ' {</strong>'];
    subModels = [];

    angular.forEach(schema.properties, function (property, propertyName) {
      hasProperties = true;
      buffer.push('<div class="pad"><strong>', propertyName, '</strong> (<span class="type">');

      // build type
      if (property.properties) {
        name = 'Inline Model' + countInLine++;
        buffer.push(name);
        subModels.push(generateModel(swagger, property, name, currentGenerated));
      } else if (property.$ref) {
        buffer.push(getClassName(property));
        subModels.push(generateModel(swagger, property, null, currentGenerated));
      } else if (property.type === 'array') {
        buffer.push('Array[');
        if (property.items.properties) {
          name = 'Inline Model' + countInLine++;
          buffer.push(name);
          subModels.push(generateModel(swagger, property, name, currentGenerated));
        } else if (property.items.$ref) {
          buffer.push(getClassName(property.items));
          subModels.push(generateModel(swagger, property.items, null, currentGenerated));
        } else {
          buffer.push(type(property.items));
        }
        buffer.push(']');
      } else {
        buffer.push(type(property));
      }

      buffer.push('</span>');

      // is required ?
      if (!isRequired(schema, propertyName)) {
        buffer.push(', ', '<em>optional</em>');
      }

      buffer.push(')');

      // has description
      if (property.description) {
        buffer.push(': ', property.description);
      }

      // is enum
      if (property.enum) {
        buffer.push(' = ', angular.toJson(property.enum).replace(/,/g, ' or '));
      }

      buffer.push(',</div>');
    });

    if (hasProperties) {
      buffer.pop();
      buffer.push('</div>');
    }

    buffer.push('<div><strong>}</strong></div>');
    buffer.push(subModels.join(''), '</div>');
    model = buffer.join('');
  } else if (schema.type === 'array') {
    buffer = ['<strong>Array ['];
    sub = '';

    if (schema.items.properties) {
      name = 'Inline Model' + countInLine++;
      buffer.push(name);
      sub = generateModel(swagger, schema.items, name, currentGenerated);
    } else if (schema.items.$ref) {
      buffer.push(getClassName(schema.items));
      sub = generateModel(swagger, schema.items, null, currentGenerated);
    } else {
      buffer.push(type(schema.items));
    }

    buffer.push(']</strong><br><br>', sub);
    model = buffer.join('');
  } else if (schema.type === 'object') {
    model = '<strong>Inline Model {<br>}</strong>';
  }

  return model;
}

function isRequired(item, name) {
  return item.required && item.required.indexOf(name) !== -1;
}

function getClassName (item) {
  var parts = item.$ref.split('/');
  return parts[parts.length - 1];
}
*/
