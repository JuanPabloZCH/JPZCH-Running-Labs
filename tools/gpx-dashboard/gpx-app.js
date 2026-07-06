(() => {
    let map, routeLine, cursorMarker, startMarker, endMarker, elevChart;
    let currentPoints = [];
    let chartCursorVisible = false;

    const COLORS = { up: '#10B981', down: '#3B82F6', flat: '#64748B' };

    function haversine(lat1, lon1, lat2, lon2) {
      const R = 6371000;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    function parseGPX(text) {
      const xml = new DOMParser().parseFromString(text, 'text/xml');
      const pts = xml.querySelectorAll('trkpt');
      const pts2 = xml.getElementsByTagName('trkpt');
      const ptsFinal = pts.length ? pts : (pts2.length ? pts2 : null);
      if (!ptsFinal || !ptsFinal.length) throw new Error('No se encontraron puntos (trkpt) en el archivo GPX.');
      const points = [];
      Array.from(ptsFinal).forEach(p => {
        const lat = parseFloat(p.getAttribute('lat'));
        const lon = parseFloat(p.getAttribute('lon'));
        const ele = p.getElementsByTagName('ele')[0];
        const time = p.getElementsByTagName('time')[0];
        points.push({
          lat, lon,
          ele: ele !== undefined ? parseFloat(ele.textContent) : null,
          time: time !== undefined ? new Date(time.textContent) : null
        });
      });
      return points;
    }

    function computeDistances(points) {
      let cumDist = 0;
      return points.map((p, i) => {
        if (i === 0) return { ...p, dist: 0, ele: p.ele || 0 };
        const d = haversine(points[i-1].lat, points[i-1].lon, p.lat, p.lon);
        cumDist += d;
        return { ...p, dist: cumDist / 1000, ele: p.ele || 0 };
      });
    }

    function formatDuration(seconds) {
      if (!seconds || seconds <= 0) return '\u2014';
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.round(seconds % 60);
      if (h > 0) return `${h}h ${m}m ${s}s`;
      if (m > 0) return `${m}m ${s}s`;
      return `${s}s`;
    }

    function formatPace(secondsPerKm) {
      if (!secondsPerKm || secondsPerKm <= 0 || !isFinite(secondsPerKm)) return '\u2014';
      const m = Math.floor(secondsPerKm / 60);
      const s = Math.round(secondsPerKm % 60);
      return `${m}:${String(s).padStart(2,'0')} /km`;
    }

    function getGradeColor(grade) {
      if (grade > 8) return '#EF4444';
      if (grade > 4) return '#FF5722';
      if (grade > 2) return '#FBBF24';
      if (grade < -8) return '#3B82F6';
      if (grade < -4) return '#22D3EE';
      if (grade < -2) return '#34D399';
      return '#64748B';
    }

    function analyze(points) {
      const data = computeDistances(points);
      currentPoints = data;
      const totalDist = data[data.length - 1].dist;
      let totalSeconds = 0;
      if (data[0].time && data[data.length-1].time) {
        totalSeconds = (data[data.length-1].time - data[0].time) / 1000;
      }
      let gain = 0, loss = 0;
      for (let i = 1; i < data.length; i++) {
        const d = data[i].ele - data[i-1].ele;
        if (d > 0) gain += d; else loss -= d;
      }
      const maxEle = Math.max(...data.map(p => p.ele));
      const minEle = Math.min(...data.map(p => p.ele));
      const avgGrade = totalDist > 0 ? gain / (totalDist * 1000) * 100 : 0;
      const avgPace = totalDist > 0 && totalSeconds > 0 ? totalSeconds / totalDist : 0;

      document.getElementById('statDist').textContent = totalDist.toFixed(2) + ' km';
      document.getElementById('statDuration').textContent = formatDuration(totalSeconds);
      document.getElementById('statElevGain').textContent = Math.round(gain) + ' m';
      document.getElementById('statElevLoss').textContent = Math.round(loss) + ' m';
      document.getElementById('statAvgGrade').textContent = avgGrade.toFixed(1) + '%';
      document.getElementById('statMaxEle').textContent = Math.round(maxEle) + ' m';
      document.getElementById('statMinEle').textContent = Math.round(minEle) + ' m';
      document.getElementById('statPace').textContent = formatPace(avgPace);

      document.getElementById('analysisArea').style.display = 'block';
      renderMap(data);
      renderChart(data);
      renderSplits(data);
      renderGradeDist(data);

      document.getElementById('analysisArea').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function renderMap(data) {
      if (!map) {
        map = L.map('map', { zoomControl: false, attributionControl: false }).setView([data[0].lat, data[0].lon], 14);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
        L.control.zoom({ position: 'bottomright' }).addTo(map);
      }
      if (routeLine) map.removeLayer(routeLine);
      if (cursorMarker) map.removeLayer(cursorMarker);
      if (startMarker) map.removeLayer(startMarker);
      if (endMarker) map.removeLayer(endMarker);

      map.invalidateSize();
      const ll = data.map(p => [p.lat, p.lon]);
      routeLine = L.polyline(ll, { color: '#8B5CF6', weight: 3, opacity: 0.8 }).addTo(map);

      startMarker = L.circleMarker([data[0].lat, data[0].lon], { radius: 6, color: '#10B981', fillColor: '#10B981', fillOpacity: 1, weight: 2 }).addTo(map);
      endMarker = L.circleMarker([data[data.length-1].lat, data[data.length-1].lon], { radius: 6, color: '#EF4444', fillColor: '#EF4444', fillOpacity: 1, weight: 2 }).addTo(map);

      cursorMarker = L.circleMarker([data[0].lat, data[0].lon], {
        radius: 7, color: '#FBBF24', fillColor: '#FBBF24', fillOpacity: 0.8, weight: 2, className: 'cursor-marker'
      }).addTo(map);

      map.fitBounds(routeLine.getBounds().pad(0.1));

      routeLine.on('click', (e) => {
        const closest = findClosestPoint(e.latlng.lat, e.latlng.lng, data);
        updateChartCursor(closest);
      });
    }

    function findClosestPoint(lat, lng, data) {
      let minDist = Infinity, idx = 0;
      data.forEach((p, i) => {
        const d = haversine(lat, lng, p.lat, p.lon);
        if (d < minDist) { minDist = d; idx = i; }
      });
      return idx;
    }

    function renderChart(data) {
      const ctx = document.getElementById('elevChart').getContext('2d');
      if (elevChart) { elevChart.destroy(); }

      const labels = data.map(p => p.dist.toFixed(2));
      const eleData = data.map(p => Math.round(p.ele));
      const gradeData = data.map((p, i) => i > 0 ? ((p.ele - data[i-1].ele) / ((p.dist - data[i-1].dist) * 1000) * 100) : 0);

      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, 'rgba(139,92,246,0.25)');
      gradient.addColorStop(1, 'rgba(139,92,246,0.01)');

      elevChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data: eleData,
            borderColor: '#8B5CF6',
            borderWidth: 2,
            backgroundColor: gradient,
            fill: true,
            pointRadius: 0,
            pointHitRadius: 6,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 500 },
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              backgroundColor: 'rgba(11,15,25,0.95)',
              titleColor: '#F1F5F9',
              bodyColor: '#94A3B8',
              borderColor: 'rgba(255,255,255,0.06)',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
              displayColors: false,
              callbacks: {
                title: (items) => `KM ${items[0].label}`,
                label: (ctx) => {
                  const i = ctx.dataIndex;
                  const p = data[i];
                  const g = gradeData[i];
                  return [`Elevaci\u00f3n: ${Math.round(p.ele)} m`, `Pendiente: ${g.toFixed(1)}%`];
                }
              }
            }
          },
          scales: {
            x: {
              display: true,
              grid: { color: 'rgba(255,255,255,0.03)', tickLength: 4 },
              ticks: { color: '#475569', font: { size: 10, weight: '500' }, maxTicksLimit: 8, callback: v => v + ' km' }
            },
            y: {
              display: true,
              grid: { color: 'rgba(255,255,255,0.03)', tickLength: 4 },
              ticks: { color: '#475569', font: { size: 10, weight: '500' }, callback: v => v + ' m' }
            }
          },
          onHover: (e) => {
            const chart = e.chart;
            const points = chart.getElementsAtEventForMode(e, 'index', { intersect: false }, true);
            if (points.length) {
              const idx = points[0].index;
              updateChartCursor(idx);
            }
          }
        }
      });
    }

    function updateChartCursor(idx) {
      if (!currentPoints.length || !cursorMarker || !map) return;
      const p = currentPoints[idx];
      if (!p) return;
      cursorMarker.setLatLng([p.lat, p.lon]);

      const chart = elevChart;
      if (chart) {
        const meta = chart.getDatasetMeta(0);
        const point = meta.data[idx];
        if (point) {
          document.getElementById('chartCursor').style.display = 'block';
          document.getElementById('chartCursor').style.left = (point.x) + 'px';
          chartCursorVisible = true;
        }
      }

      document.getElementById('hoverDist').innerHTML = `
        <span class="text-[#FBBF24]">KM ${p.dist.toFixed(2)}</span>
        <span class="text-[#64748B] ml-2">${Math.round(p.ele)} m</span>
      `;
    }

    function renderSplits(data) {
      const body = document.getElementById('splitsBody');
      const totalKm = Math.floor(data[data.length-1].dist);
      let html = '';
      let lastIdx = 0;
      for (let km = 1; km <= totalKm; km++) {
        const idx = data.findIndex(p => p.dist >= km);
        if (idx < 0) break;
        const startIdx = lastIdx;
        lastIdx = idx;
        const seg = data.slice(startIdx, idx + 1);
        const gain = seg.length > 1 ? seg[seg.length-1].ele - seg[0].ele : 0;
        const segDist = seg[seg.length-1].dist - seg[0].dist;
        const grade = segDist > 0 ? (gain / (segDist * 1000) * 100) : 0;
        let segSeconds = 0;
        if (seg[0].time && seg[seg.length-1].time) {
          segSeconds = (seg[seg.length-1].time - seg[0].time) / 1000;
        }
        const pace = segDist > 0 && segSeconds > 0 ? segSeconds / segDist : 0;
        const gc = getGradeColor(grade);
        html += `<div class="split-row">
          <span class="km">${km}</span>
          <span class="ele">${gain > 0 ? '+' : ''}${Math.round(gain)} m</span>
          <span class="grade" style="color:${gc}">${grade.toFixed(1)}%</span>
          <span class="text-[#94A3B8]">${formatPace(pace)}</span>
        </div>`;
      }
      body.innerHTML = html || '<p class="text-[#475569] text-xs py-3 text-center">No hay suficientes datos para parciales.</p>';
    }

    function renderGradeDist(data) {
      const dists = { subidas: 0, bajadas: 0, plano: 0 };
      const pcts = { fuerte: 0, moderado: 0, suave: 0, plano: 0, bajada: 0 };
      for (let i = 1; i < data.length; i++) {
        const d = data[i].dist - data[i-1].dist;
        if (d === 0) continue;
        const grade = (data[i].ele - data[i-1].ele) / (d * 1000) * 100;
        if (grade > 2) dists.subidas += d;
        else if (grade < -2) dists.bajadas += d;
        else dists.plano += d;

        if (grade > 8) pcts.fuerte += d;
        else if (grade > 4) pcts.moderado += d;
        else if (grade > 2) pcts.suave += d;
        else if (grade < -2) pcts.bajada += d;
        else pcts.plano += d;
      }
      const totalD = dists.subidas + dists.bajadas + dists.plano || 1;
      document.getElementById('gradeDist').innerHTML = [
        { label: 'Subida fuerte (>8%)', key: 'fuerte', color: '#EF4444', pct: pcts.fuerte / totalD * 100 },
        { label: 'Subida moderada (4-8%)', key: 'moderado', color: '#FF5722', pct: pcts.moderado / totalD * 100 },
        { label: 'Subida suave (2-4%)', key: 'suave', color: '#FBBF24', pct: pcts.suave / totalD * 100 },
        { label: 'Plano (-2 a 2%)', key: 'plano', color: '#64748B', pct: pcts.plano / totalD * 100 },
        { label: 'Bajada (<-2%)', key: 'bajada', color: '#22D3EE', pct: pcts.bajada / totalD * 100 }
      ].map(g => `
        <div>
          <div class="flex items-center justify-between text-xs mb-0.5">
            <span class="text-[#94A3B8]"><span class="w-1.5 h-1.5 rounded-full inline-block mr-1.5" style="background:${g.color}"></span>${g.label}</span>
            <span class="text-white font-semibold">${g.pct.toFixed(1)}%</span>
          </div>
          <div class="grade-bar"><div class="grade-bar-fill" style="width:${Math.max(g.pct, 1)}%;background:${g.color}"></div></div>
        </div>
      `).join('');
    }

    function loadGPX(text, fileName) {
      document.getElementById('loadingArea').style.display = 'block';
      document.getElementById('analysisArea').style.display = 'none';
      document.getElementById('errorArea').style.display = 'none';
      setTimeout(() => {
        try {
          const pts = parseGPX(text);
          document.getElementById('loadingArea').style.display = 'none';
          analyze(pts);
          document.getElementById('fileNameDisplay').textContent = fileName || 'ruta.gpx';
          document.getElementById('fileInfo').classList.remove('hidden');
          document.getElementById('uploadPrompt').classList.add('hidden');
        } catch (e) {
          document.getElementById('loadingArea').style.display = 'none';
          document.getElementById('errorArea').style.display = 'block';
          document.getElementById('errorMsg').textContent = e.message || 'Error al procesar el archivo GPX.';
        }
      }, 300);
    }

    function loadSample(route) {
      const pts = MARATON_PTS;
      const name = 'Marat\u00f3n Lima 42K 2026';
      document.getElementById('loadingArea').style.display = 'block';
      document.getElementById('analysisArea').style.display = 'none';
      document.getElementById('errorArea').style.display = 'none';
      setTimeout(() => {
        try {
          analyze(pts);
          document.getElementById('loadingArea').style.display = 'none';
          document.getElementById('fileNameDisplay').textContent = name + '.gpx';
          document.getElementById('fileInfo').classList.remove('hidden');
          document.getElementById('uploadPrompt').classList.add('hidden');
        } catch (e) {
          document.getElementById('loadingArea').style.display = 'none';
          document.getElementById('errorArea').style.display = 'block';
          document.getElementById('errorMsg').textContent = 'Error al cargar la ruta de ejemplo.';
        }
      }, 300);
    }

    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');

    dropArea.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') fileInput.click();
    });

    dropArea.addEventListener('dragover', (e) => { e.preventDefault(); dropArea.classList.add('dragover'); });
    dropArea.addEventListener('dragleave', () => { dropArea.classList.remove('dragover'); });
    dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.classList.remove('dragover');
      if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });

    fileInput.addEventListener('change', () => { if (fileInput.files.length) handleFile(fileInput.files[0]); });

    document.getElementById('sampleBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('sampleModal').classList.remove('hidden');
    });

    document.getElementById('sampleBtn2').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('sampleModal').classList.remove('hidden');
    });

    document.getElementById('closeModal').addEventListener('click', () => {
      document.getElementById('sampleModal').classList.add('hidden');
    });

    document.querySelectorAll('[data-sample]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const route = btn.dataset.sample;
        document.getElementById('sampleModal').classList.add('hidden');
        loadSample(route);
      });
    });

    document.getElementById('changeFileBtn').addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });

    function handleFile(file) {
      if (!file.name.toLowerCase().endsWith('.gpx')) {
        document.getElementById('errorArea').style.display = 'block';
        document.getElementById('errorMsg').textContent = 'El archivo debe tener extensi\u00f3n .gpx';
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => loadGPX(e.target.result, file.name);
      reader.readAsText(file);
    }

    loadSample('full');
  })();
