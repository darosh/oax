import {configuration} from '../services/configuration';

export default function limit(text: string) {
  return text.length > configuration.limitSpecButtonText
    ? text.substr(0, configuration.limitSpecButtonText - 1) + '\u2026'
    : text;
}
