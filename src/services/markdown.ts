import {parseFragment, SAXParser, serialize} from 'parse5';
import {Converter} from 'showdown';

import hljs from '../utils/highlight';

const walk = require('walk-parse5');

const cache: { [index: string]: { html: string, summary: string } | any } = {};

export const converter = new Converter();

converter.setFlavor('github');

converter.setOption('noHeaderId', true as any as string);
converter.setOption('openLinksInNewWindow', true as any as string);
converter.setOption('smoothLivePreview', true as any as string);
converter.setOption('headerLevelStart', 1 as any as string);
converter.setOption('parseImgDimensions', true as any as string);

let TEXT = '';

const sax = new SAXParser();

sax.on('text', (t) => {
  TEXT += t;
});

function syntax(tree: any) {
  walk(tree, (node: any) => {
    if ((node.tagName === 'code') && node.parentNode && (node.parentNode.tagName === 'pre')) {
      let h = serialize(node).replace(/&lt;/g, '<').replace(/&gt;/g, '>');

      if (node.attrs && node.attrs[0] && node.attrs[0].value) {
        const lang = node.attrs[0].value.split(' ')[0];

        if (hljs.getLanguage(lang)) {
          h = hljs.highlight(lang, h).value;
          node.childNodes = (parseFragment(h) as any).childNodes;
          return;
        }
      }

      if (h.split('\n').length > 4) {
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
    if (cache[v] && cache[v].html) {
      return cache[v].html;
    }

    const t = v.trim();

    if (t) {
      const parsed = parseFragment(converter.makeHtml(t));
      syntax(parsed);
      const h = serialize(parsed);
      cache[v] = cache[v] || {};
      return cache[v].html = h.replace(/<p><\/p>$/g, '').replace(/^<p><\/p>/g, '');
    }
  }

  return '';
}

export function summary(h: string, range = [3, 120]) {
  if (cache[h] && cache[h].summary) {
    return cache[h].summary;
  }

  const t = text(h);
  const dot = t.indexOf('.') + 1;
  cache[h] = cache[h] || {};
  return cache[h].summary = t.substr(0, (dot > range[0] && dot < range[1]) ? dot : range[1]);
}

function text(html: string) {
  TEXT = '';
  sax.write(html);

  return TEXT;
}

export function description(_: { description?: string, description_html?: boolean }) {
  if (_.description && !_.description_html) {
    _.description = trim(_.description);
    _.description_html = true;
  }
}

export function summaryHtml(_: { summary?: string, summary_html?: boolean }) {
  if (_.summary && !_.summary_html) {
    // _.summary = trim(_.summary);
    _.summary_html = true;
  }
}
