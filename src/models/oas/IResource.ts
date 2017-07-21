import {Tag} from "swagger-schema-official";
import {IOperationExtended} from "./IOperationExtended";

export interface IResource extends Tag {
  _operations?: IOperationExtended[]
  _opened?: boolean
  _display?: boolean
}
