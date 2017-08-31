import {parseFragment, SAXParser, serialize} from 'parse5';
import {Converter} from 'showdown';

import hljs from './highlight';
import walk from './walk';

export const converter = new Converter();

converter.setFlavor('github');

converter.setOption('noHeaderId', true as any as string);
converter.setOption('openLinksInNewWindow', true as any as string);
converter.setOption('smoothLivePreview', true as any as string);
converter.setOption('headerLevelStart', 1 as any as string);
converter.setOption('parseImgDimensions', true as any as string);

let TEXT = '';

const sax = new SAXParser();

sax.on('text', (text) => {
  TEXT += text;
});

function syntax(tree: any) {
  walk(tree, (node: any) => {
    if ((node.tagName === 'code') && node.parentNode && (node.parentNode.tagName === 'pre')) {
      let h = serialize(node).replace(/&lt;/g, '<').replace(/&gt;/g, '>');

      if (node.attrs && node.attrs[0] && node.attrs[0].value) {
        const lang = node.attrs[0].value.split(' ')[0];
        h = hljs.highlight(lang, h).value;
        node.childNodes = (parseFragment(h) as any).childNodes;
      } else if (h.split('\n').length > 4) {
        h = hljs.highlightAuto(h).value;
        if (h.trim()) {
          node.childNodes = (parseFragment(h) as any).childNodes;
        }
      }
    }
  });
}

export function trim(v: string) {
  if (v) {
    const t = v.trim();

    if (t) {
      const parsed = parseFragment(converter.makeHtml(t));
      syntax(parsed);
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
