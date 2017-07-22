import {Converter} from 'showdown';

const converter = new Converter();

export function toHtml(md: string) {
  return converter.makeHtml(md);
}
