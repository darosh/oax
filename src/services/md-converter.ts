import {parseFragment, SAXParser, serialize} from 'parse5';
import {Converter} from 'showdown';

export const converter = new Converter();

converter.setFlavor('github');

converter.setOption('noHeaderId', true as any as string);
converter.setOption('openLinksInNewWindow', true as any as string);
converter.setOption('smoothLivePreview', true as any as string);
converter.setOption('headerLevelStart', 1 as any as string);

let TEXT = '';

const sax = new SAXParser();

sax.on('text', (text) => {
  TEXT += text;
});

// let counter = 0;

export function trim(v: string) {
  if (v) {
    const t = v.trim();

    if (t) {
      // console.log(++counter);
      const h = serialize(parseFragment(converter.makeHtml(t)));
      return h.replace(/<p><\/p>$/g, '').replace(/^<p><\/p>/g, '');
    }
  }
  return '';
}

export function summary(t: string, range = [3, 120]) {
  const dot = t.indexOf('.') + 1;
  return t.substr(0, (dot > range[0] && dot < range[1]) ? dot : range[1]);
}

export function text(html: string) {
  TEXT = '';
  sax.write(html);

  return TEXT;
}
