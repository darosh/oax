// import {parseFragment, SAXParser, serialize} from 'parse5';

// tslint:disable-next-line:no-var-requires
const p5 = (process as any).OAX_FEATURE_MARKDOWN ? require('parse5') : null;

// tslint:disable-next-line:no-var-requires
const Converter = (process as any).OAX_FEATURE_MARKDOWN ? require('showdown').Converter : null;

// tslint:disable-next-line:no-var-requires
const hljs = (process as any).OAX_FEATURE_HIGHLIGHT ? require('../utils/highlight') as any : null;

// tslint:disable-next-line:no-var-requires
const walk = require('walk-parse5');

const cache: { [index: string]: { html: string, summary: string } | any } = {};

export const converter = Converter ? new Converter() : null;

if (converter) {
  converter.setFlavor('github');
  converter.setOption('noHeaderId', true as any as string);
  converter.setOption('openLinksInNewWindow', true as any as string);
  converter.setOption('smoothLivePreview', true as any as string);
  converter.setOption('headerLevelStart', 1 as any as string);
  converter.setOption('parseImgDimensions', true as any as string);
}

let TEXT = '';

const sax = p5 ? new p5.SAXParser() : null;

if (sax) {
  sax.on('text', (t: any) => {
    TEXT += t;
  });
}

function syntax(tree: any) {
  if (!hljs || !p5) {
    return;
  }

  walk(tree, (node: any) => {
    if ((node.tagName === 'code') && node.parentNode && (node.parentNode.tagName === 'pre')) {
      let h = p5.serialize(node).replace(/&lt;/g, '<').replace(/&gt;/g, '>');

      if (node.attrs && node.attrs[0] && node.attrs[0].value) {
        const lang = node.attrs[0].value.split(' ')[0];

        if (hljs.getLanguage(lang)) {
          h = hljs.highlight(lang, h).value;
          node.childNodes = (p5.parseFragment(h) as any).childNodes;
          return;
        }
      }

      if (h.split('\n').length > 4) {
        h = hljs.highlightAuto(h).value;
        if (h.trim()) {
          node.childNodes = (p5.parseFragment(h) as any).childNodes;
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
      if (converter) {
        const parsed = p5.parseFragment(converter.makeHtml(t));
        syntax(parsed);
        const h = p5.serialize(parsed);
        cache[v] = cache[v] || {};
        return cache[v].html = h.replace(/<p><\/p>$/g, '').replace(/^<p><\/p>/g, '');
      } else {
        cache[v] = cache[v] || {};
        return cache[v].html = t;
      }
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

export function text(html: string) {
  if (!sax) {
    return html;
  }

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
