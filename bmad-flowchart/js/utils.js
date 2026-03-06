// === utils.js ===
// 유틸리티 함수들

(function(B) {
  'use strict';

  B.utils.el = function(tag, attrs) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    if (attrs) Object.entries(attrs).forEach(function(entry) { e.setAttribute(entry[0], entry[1]); });
    return e;
  };

  B.utils.esc = function(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  };

  B.utils.hexToRgba = function(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  };

  B.utils.makeText = function(str, x, y, cls, maxWidth) {
    var t = B.utils.el('text', { x: x, y: y, class: cls });
    t.textContent = str;
    if (maxWidth) {
      requestAnimationFrame(function() {
        while (t.getComputedTextLength && t.getComputedTextLength() > maxWidth && t.textContent.length > 3) {
          t.textContent = t.textContent.slice(0, -4) + '...';
        }
      });
    }
    return t;
  };

  B.utils.countFiles = function(mod) {
    var total = 0;
    (mod.workflows || []).forEach(function(wf) {
      total += B.utils.countFilesDeep(wf.files || []);
    });
    return total;
  };

  B.utils.countFilesDeep = function(files) {
    var count = 0;
    (files || []).forEach(function(f) {
      count++;
      if (f.children) count += B.utils.countFilesDeep(f.children);
    });
    return count;
  };

  B.utils.fileTypeIcon = function(ext) {
    switch (ext) {
      case 'md': return '&#128196;';
      case 'yaml': case 'yml': return '&#9881;';
      case 'xml': return '&#128204;';
      case 'csv': return '&#128202;';
      case 'groovy': return '&#9874;';
      default: return '&#128196;';
    }
  };

  B.utils.fileTypeIconText = function(ext) {
    switch (ext) {
      case 'md': return '\uD83D\uDCC4';
      case 'yaml': case 'yml': return '\u2699';
      case 'xml': return '\uD83D\uDCCC';
      case 'csv': return '\uD83D\uDCCA';
      case 'groovy': return '\u2692';
      default: return '\uD83D\uDCC4';
    }
  };

  B.utils.getIcon = function(iconName) {
    var icons = {
      rocket: '&#9757;',
      lightbulb: '&#9728;',
      cube: '&#9724;',
      user: '&#9786;',
      flow: '&#8634;',
      terminal: '&#9002;',
      book: '&#9733;',
      recipe: '&#9752;'
    };
    return icons[iconName] || '&#9632;';
  };

})(window.BMAD);
