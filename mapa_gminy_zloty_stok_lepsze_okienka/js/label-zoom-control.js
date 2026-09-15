/* Stable scale-dependent labels for the qgis2web Leaflet export.
   QGIS scale-dependent labeling stays OFF; this file handles web zoom only.
   Leaflet zoom 12 is roughly the 1:40k neighborhood here; zoom 13 ~ 1:20k.
*/
(function () {
    'use strict';

    var LINE_LABEL_MIN_ZOOM = 12;
    var POINT_LABEL_MIN_ZOOM = 13;

    function setVisible(selector, visible) {
        var nodes = document.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].style.display = visible ? '' : 'none';
        }
    }

    function updateLabelVisibility() {
        if (typeof map === 'undefined' || !map) return;
        var zoom = map.getZoom();
        setVisible('.css_nazwy_liniowe_2', zoom >= LINE_LABEL_MIN_ZOOM);
        setVisible('.css_nazwy_punktowe_1', zoom >= POINT_LABEL_MIN_ZOOM);
    }

    function updateSoon() {
        // Permanent Leaflet tooltips can be recreated/repositioned after zoom.
        // Two animation frames ensure we act on the final tooltip DOM nodes.
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(updateLabelVisibility);
        });
    }

    map.on('zoomend', updateSoon);
    map.on('moveend', updateSoon);
    map.on('layeradd', updateSoon);
    map.on('layerremove', updateSoon);
    window.addEventListener('resize', updateSoon);

    updateSoon();
})();
