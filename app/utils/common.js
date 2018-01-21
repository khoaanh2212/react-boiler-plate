/* eslint-disable jsx-a11y/no-static-element-interactions, array-callback-return, no-param-reassign */

import { isEqual } from 'lodash';
import config from 'config';

export const convertDateTimeFormat = (dateFormat) => {
  if (!dateFormat) return '';
  const replacements = {
    d: 'DD',
    D: 'ddd',
    j: 'D',
    l: 'dddd',
    N: 'E',
    S: 'o',
    w: 'e',
    z: 'DDD',
    W: 'W',
    F: 'MMMM',
    m: 'MM',
    M: 'MMM',
    n: 'M',
    t: '', // no equivalent
    L: '', // no equivalent
    o: 'YYYY',
    Y: 'YYYY',
    y: 'YY',
    a: 'a',
    A: 'A',
    B: '', // no equivalent
    g: 'h',
    G: 'H',
    h: 'hh',
    H: 'HH',
    i: 'mm',
    s: 'ss',
    u: 'SSS',
    e: 'zz', // deprecated since version 1.6.0 of moment.js
    I: '', // no equivalent
    O: '', // no equivalent
    P: '', // no equivalent
    T: '', // no equivalent
    Z: '', // no equivalent
    c: '', // no equivalent
    r: '', // no equivalent
    U: 'X',
  };
  const regEx = /^[a-zA-Z]$/; // eslint-disable-line
  const formats = dateFormat.split('');
  formats.map((char, index) => {
    if (!regEx.test(char) || replacements[char] === '' || replacements[char] === 'undefined') {
      formats[index] = char;
      return char;
    }
    formats[index] = replacements[char];
    return replacements[char];
  });
  return formats.join('');
};

export const sortText = (datas = [], sortField, sortType) => {
  if (!datas || datas.length === 0) {
    return [];
  }
  datas.sort((a, b) => {
    const strA = a[sortField].toUpperCase();
    const strB = b[sortField].toUpperCase();
    if (sortType === 'ASC') {
      if (strA < strB) {
        return -1;
      }
      if (strA > strB) {
        return 1;
      }
    } else {
      if (strA > strB) {
        return -1;
      }
      if (strA < strB) {
        return 1;
      }
    }
    return 0;
  });
  return datas;
};

export const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

export function blockScrollingOnBody() {
  const body = document.body;
  body.className += ' no-scrolling';
}

export function unBlockScrollingOnBody() {
  const body = document.body;
  body.classList.remove('no-scrolling');
}

export function isURL(url) {
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/; //eslint-disable-line
  return re.test(url);
}

export function nl2br(input, isXhtml) {
  const breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br />' : '<br>';
  return (input + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2'); //eslint-disable-line
}

export function subStringWhenTooLongOrBreakLine(text, limitCharacter = 80) {
  const indexOfNl = text.indexOf('\n');
  const firstLine = indexOfNl >= 0 ? text.substring(0, indexOfNl) : text;
  return firstLine.substr(0, limitCharacter);
}

export function checkStringHasBreakLineText(text, limitCharacter = 80) {
  const indexOfNl = text.indexOf('\n');
  return (indexOfNl >= 0 && text.substr(indexOfNl).trim() !== '') || text.length > limitCharacter ? true : false; //eslint-disable-line
}

export const containObject = (obj, list, fieldCompare = 'label') => {
  if (obj.id === -1) {
    return list.find((item) => item[fieldCompare].toLowerCase() === obj[fieldCompare].toLowerCase());
  }
  return list.find((item) => isEqual(obj, item));
};

export const validateFile = (file) => {
  const { avatar } = config.upload;
  const ext = avatar.ext.split(',');
  return file && ext.indexOf(file.type) !== -1 && file.size <= avatar.maxSize;
};

export const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4(); //eslint-disable-line
};

export const formatFileSize = (size) => {
  const CHANGE_KB = 1000;
  const CHANGE_MB = 1000000;
  if (size < 1000) return `${size} bytes`;
  if (size < 100000) return `${Math.round((size / CHANGE_KB) * 100) / 100} Kb`;
  return `${Math.round((size / CHANGE_MB) * 100) / 100} Mb`;
};

export const decorateUrl = (url) => {
  if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
    return url;
  }
  return `http://${url}`;
};

export const convertStringWithHyphenToCamelCase = (str) => {
  if (str.indexOf('-') === -1 || !str) {
    return str;
  }
  const arr = str.split('-');
  let result = '';
  arr.map((str, index) => { //eslint-disable-line
    if (index === 0) {
      result += str.toLowerCase();
    } else {
      result += capitalizeFirstLetter(str);
    }
  });
  return result;
};

export const capitalizeFirstLetter = (string) => (string.charAt(0).toUpperCase() + string.slice(1));

export function isNormalInteger(str) {
  const n = Math.floor(Number(str));
  return String(n) === str && n >= 0;
}

export const getGlobalFilterQuery = (globalFilter = {}) => {
  const { projectId, campaignIds } = globalFilter;
  const filters = [];

  if (projectId) {
    filters.push({
      field: 'projectId',
      operator: 'equal',
      value: projectId,
    });
  }

  if (campaignIds && campaignIds.length > 0) {
    filters.push({
      field: 'campaignIds',
      operator: 'in',
      value: campaignIds,
    });
  }

  return filters;
};

export const getProjectOpts = (projects) => {
  if (!projects) projects = [];
  return projects.map((p) => ({
    value: { id: p.id, label: p.urlPlain },
    label: p.urlPlain,
  }));
};

