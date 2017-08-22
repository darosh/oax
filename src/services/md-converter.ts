import {Converter} from 'showdown';

export const converter = new Converter();

converter.setFlavor('github');

converter.setOption('noHeaderId', true as any as string);
converter.setOption('openLinksInNewWindow', true as any as string);
converter.setOption('smoothLivePreview', true as any as string);
converter.setOption('headerLevelStart', 4 as any as string);

export const el = document.createElement('div');

export function trim(v: string) {
  if(v) {
    el.innerHTML = converter.makeHtml(v.trim());
    return el.innerHTML.replace(/<p><\/p>$/g, '');
  } else {
    return '';
  }
}
