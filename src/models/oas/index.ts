import {IResource} from "./IResource";
import {IOperationExtended} from "./IOperationExtended";
import {Spec} from "swagger-schema-official";
import {IMeta} from "../metas/IMeta";
import {metas} from "../metas/index";
import {info} from "./info";
import {resources} from "./resources";
import {operations} from "./operations";
import {IMap} from "./IMap";

export class OAS {
  metas: IMeta[]
  resources: IResource[]
  operations: IOperationExtended[]
  map: IMap

  constructor(spec: Spec,
              url: string,
              defaultContentType: string = 'application/json',
              validatorUrl: string = 'http://online.swagger.io/validator') {
    info(spec, url, defaultContentType)
    this.map = {}
    this.metas = metas(spec, url, validatorUrl)
    this.resources = resources(spec, this.map)
    this.operations = operations(spec, this.resources, this.map)
  }
}
