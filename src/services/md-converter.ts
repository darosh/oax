import {parseFragment, SAXParser, serialize} from 'parse5';
import {Converter} from 'showdown';

import walk from './walk';
import hljs from './highlight';

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

function hl(tree: any) {
  walk(tree, (node: any) => {
    if ((node.tagName === 'code') && node.parentNode && (node.parentNode.tagName === 'pre')) {
      let h = serialize(node).replace(/&lt;/g, '<').replace(/&gt;/g, '>')

      console.log(h);

      if (node.attrs && node.attrs[0] && node.attrs[0].value) {
        let lang = node.attrs[0].value.split(' ')[0]
        h = hljs.highlight(lang, h).value
      } else {
        h = hljs.highlightAuto(h).value
      }

      node.childNodes = (parseFragment(h) as any).childNodes
    }
  })
}

export function trim(v: string) {
  if (v) {
    const t = v.trim();

    if (t) {
      // console.log(++counter);
      let parsed = parseFragment(converter.makeHtml(t));
      hl(parsed)
      const h = serialize(parsed);
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
