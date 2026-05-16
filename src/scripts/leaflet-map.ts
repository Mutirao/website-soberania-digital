type LatLng = [number, number];

interface LeafletLayer {
  addTo(map: LeafletMap): LeafletLayer;
  bindPopup(html: string): LeafletLayer;
}

interface LeafletMap {
  setView(latlng: LatLng, zoom: number): LeafletMap;
}

interface LeafletIcon {
  _brand?: 'leaflet-icon';
}

interface LeafletStatic {
  map(id: string): LeafletMap;
  tileLayer(url: string, options: { attribution?: string; maxZoom?: number }): LeafletLayer;
  marker(latlng: LatLng, options?: { icon?: LeafletIcon }): LeafletLayer;
  divIcon(options: {
    className?: string;
    html?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
  }): LeafletIcon;
}

declare const L: LeafletStatic;

function mkIcon(bg: string, fg: string, emoji: string, size: number) {
  size = size || 30;
  return L.divIcon({
    className: '',
    html:
      '<div style="background:' +
      bg +
      ';color:' +
      fg +
      ';width:' +
      size +
      'px;height:' +
      size +
      'px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:' +
      Math.round(size * 0.5) +
      'px;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.35)">' +
      emoji +
      '</div>',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export function initMap() {
  const mapEl = document.getElementById('osm-map');
  if (!mapEl) return;

  function buildMap() {
    const map = L.map('osm-map').setView([-15.79, -47.888], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    L.marker([-15.826094, -47.924214], { icon: mkIcon('#E31B23', '#fff', '📍', 34) })
      .addTo(map)
      .bindPopup(
        '<strong>Sindicato e Teatro dos Bancários</strong><br>EQS 314/315, Asa Sul<br>📍 Local do 2º Encontro'
      );

    const hiconH = mkIcon('#45a2ca', '#fff', '🏨', 24);
    [
      { name: 'LIKE U HOTEIS', lat: -15.7895, lng: -47.885, desc: 'SHS Quadra 04 — 30% desc SESC' },
      { name: 'Joy Hostels', lat: -15.7779, lng: -47.892, desc: 'SCRN 702/703, Asa Norte' },
      { name: 'Freeway Hostels', lat: -15.767, lng: -47.888, desc: 'SHCGN 708, Asa Norte' },
    ].forEach(function (h) {
      L.marker([h.lat, h.lng], { icon: hiconH })
        .addTo(map)
        .bindPopup('<strong>' + h.name + '</strong><br>' + h.desc);
    });

    L.marker([-15.8697, -47.9177], { icon: mkIcon('#77b978', '#fff', '✈️', 28) })
      .addTo(map)
      .bindPopup('<strong>✈️ Aeroporto de Brasília (BSB)</strong><br>~15 km | 20–30 min');

    L.marker([-15.7934, -47.8826], { icon: mkIcon('#FFD400', '#010101', '🚌', 28) })
      .addTo(map)
      .bindPopup('<strong>🚌 Rodoviária do Plano Piloto</strong><br>~7 km | 15 min');
  }

  if (typeof L === 'undefined') {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.onload = buildMap;
    document.head.appendChild(s);
  } else {
    buildMap();
  }
}
