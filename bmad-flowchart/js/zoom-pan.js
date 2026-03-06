// === zoom-pan.js ===
// 줌/팬 및 캔버스 인터랙션

(function(B) {
  'use strict';
  var S = B.state;

  B.zoomPan.applyTransform = function() {
    B.dom.root.setAttribute('transform', 'translate(' + S.panX + ',' + S.panY + ') scale(' + S.zoom + ')');
    document.getElementById('zoom-level').textContent = Math.round(S.zoom * 100) + '%';
  };

  B.zoomPan.zoomAt = function(factor, cx, cy) {
    var newZoom = Math.min(3, Math.max(0.15, S.zoom * factor));
    var scale = newZoom / S.zoom;
    S.panX = cx - scale * (cx - S.panX);
    S.panY = cy - scale * (cy - S.panY);
    S.zoom = newZoom;
    B.zoomPan.applyTransform();
  };

  B.zoomPan.fitToView = function() {
    if (!S.layoutCache) return;
    var b = S.layoutCache.bounds;
    var vw = B.dom.canvasWrap.clientWidth;
    var vh = B.dom.canvasWrap.clientHeight;
    var scale = Math.min(vw / b.w, vh / b.h, 1.5) * 0.9;
    S.zoom = scale;
    S.panX = (vw - b.w * scale) / 2;
    S.panY = (vh - b.h * scale) / 2;
    B.zoomPan.applyTransform();
  };

  // === Event Bindings ===
  B.zoomPan.bindEvents = function() {
    // Mouse wheel zoom
    B.dom.canvasWrap.addEventListener('wheel', function(e) {
      e.preventDefault();
      var rect = B.dom.canvasWrap.getBoundingClientRect();
      var cx = e.clientX - rect.left;
      var cy = e.clientY - rect.top;
      var factor = e.deltaY < 0 ? 1.1 : 0.9;
      B.zoomPan.zoomAt(factor, cx, cy);
    }, { passive: false });

    // Pan via drag
    B.dom.canvasWrap.addEventListener('mousedown', function(e) {
      if (e.button !== 0) return;
      S.dragging = true;
      S.dragStartX = e.clientX;
      S.dragStartY = e.clientY;
      S.panStartX = S.panX;
      S.panStartY = S.panY;
    });
    window.addEventListener('mousemove', function(e) {
      if (!S.dragging) return;
      S.panX = S.panStartX + (e.clientX - S.dragStartX);
      S.panY = S.panStartY + (e.clientY - S.dragStartY);
      B.zoomPan.applyTransform();
    });
    window.addEventListener('mouseup', function() { S.dragging = false; });

    // Touch support
    B.dom.canvasWrap.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        S.dragging = true;
        S.dragStartX = e.touches[0].clientX;
        S.dragStartY = e.touches[0].clientY;
        S.panStartX = S.panX;
        S.panStartY = S.panY;
      } else if (e.touches.length === 2) {
        S.dragging = false;
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        S.touchStartDist = Math.hypot(dx, dy);
        S.touchStartZoom = S.zoom;
      }
    }, { passive: true });
    B.dom.canvasWrap.addEventListener('touchmove', function(e) {
      e.preventDefault();
      if (e.touches.length === 1 && S.dragging) {
        S.panX = S.panStartX + (e.touches[0].clientX - S.dragStartX);
        S.panY = S.panStartY + (e.touches[0].clientY - S.dragStartY);
        B.zoomPan.applyTransform();
      } else if (e.touches.length === 2) {
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        var dist = Math.hypot(dx, dy);
        var newZoom = Math.min(3, Math.max(0.15, S.touchStartZoom * (dist / S.touchStartDist)));
        var rect = B.dom.canvasWrap.getBoundingClientRect();
        var cx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
        var cy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
        var scale = newZoom / S.zoom;
        S.panX = cx - scale * (cx - S.panX);
        S.panY = cy - scale * (cy - S.panY);
        S.zoom = newZoom;
        B.zoomPan.applyTransform();
      }
    }, { passive: false });
    B.dom.canvasWrap.addEventListener('touchend', function() { S.dragging = false; });

    // === Button Handlers ===
    document.getElementById('zoom-in').addEventListener('click', function() {
      var rect = B.dom.canvasWrap.getBoundingClientRect();
      B.zoomPan.zoomAt(1.25, rect.width / 2, rect.height / 2);
    });
    document.getElementById('zoom-out').addEventListener('click', function() {
      var rect = B.dom.canvasWrap.getBoundingClientRect();
      B.zoomPan.zoomAt(0.8, rect.width / 2, rect.height / 2);
    });
    document.getElementById('zoom-reset').addEventListener('click', function() {
      S.zoom = 1; S.panX = 0; S.panY = 0;
      B.zoomPan.applyTransform();
    });
    document.getElementById('btn-fit').addEventListener('click', B.zoomPan.fitToView);
    document.getElementById('btn-collapse').addEventListener('click', function() {
      Object.keys(S.expanded).forEach(function(k) { S.expanded[k] = false; });
      B.flowchart.render();
      setTimeout(B.zoomPan.fitToView, 50);
    });

    // Close detail panel on background click
    B.dom.canvasWrap.addEventListener('click', function(e) {
      if (e.target === B.dom.svg || e.target === B.dom.canvasWrap) B.detailPanel.hide();
    });
    document.getElementById('detail-close').addEventListener('click', B.detailPanel.hide);

    // Keyboard
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { B.detailPanel.hide(); B.fileViewer.hide(); }
    });
  };

})(window.BMAD);
