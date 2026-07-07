(function() {
  'use strict';

  const PROXY_URL = 'https://ai-coach-proxy.jpzch.workers.dev';

  let state = {
    inputMethod: 'gpx',
    gpxData: null,
    analyzing: false
  };

  const $ = id => document.getElementById(id);
  const fileInput = $('gpxFileInput');
  const dropZone = $('fileDropZone');
  const fileInfo = $('fileInfo');
  const analyzeBtn = $('analyzeBtn');
  const loadingSection = $('loadingSection');
  const resultSection = $('resultSection');
  const errorSection = $('errorSection');
  const errorMsg = $('errorMsg');

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const toRad = deg => deg * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function parseGPX(xmlText) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'text/xml');
    const trkpts = xml.querySelectorAll('trkpt');
    if (!trkpts.length) throw new Error('No se encontraron puntos en el archivo GPX');

    const points = [];
    trkpts.forEach(pt => {
      const lat = parseFloat(pt.getAttribute('lat'));
      const lon = parseFloat(pt.getAttribute('lon'));
      const ele = pt.querySelector('ele');
      const time = pt.querySelector('time');
      points.push({
        lat, lon,
        ele: ele ? parseFloat(ele.textContent) : null,
        time: time ? new Date(time.textContent) : null
      });
    });

    let totalDist = 0;
    let totalElevGain = 0;
    let totalElevLoss = 0;
    let prevEle = points[0].ele;
    const segments = [];
    let segDist = 0;
    let segStart = 0;

    for (let i = 1; i < points.length; i++) {
      const d = haversine(points[i-1].lat, points[i-1].lon, points[i].lat, points[i].lon);
      points[i].dist = d;
      totalDist += d;

      if (points[i].ele !== null && prevEle !== null) {
        const diff = points[i].ele - prevEle;
        if (diff > 0) totalElevGain += diff;
        else totalElevLoss += Math.abs(diff);
      }
      prevEle = points[i].ele !== null ? points[i].ele : prevEle;

      segDist += d;
      if (segDist >= 1000 || i === points.length - 1) {
        const end = i;
        const segPoints = points.slice(segStart, end + 1);
        const segTime = segPoints[0].time && segPoints[segPoints.length - 1].time
          ? (segPoints[segPoints.length - 1].time - segPoints[0].time) / 1000
          : null;
        const segElev = segPoints[0].ele !== null && segPoints[segPoints.length - 1].ele !== null
          ? segPoints[segPoints.length - 1].ele - segPoints[0].ele
          : null;
        segments.push({
          km: segments.length + 1,
          dist: segDist,
          time: segTime,
          pace: segTime ? segTime / 60 / (segDist / 1000) : null,
          elevGain: segElev || 0,
          startLat: segPoints[0].lat,
          startLon: segPoints[0].lon
        });
        segDist = 0;
        segStart = end;
      }
    }

    const totalTime = points[0].time && points[points.length - 1].time
      ? (points[points.length - 1].time - points[0].time) / 1000
      : null;

    const avgPace = totalTime ? totalTime / 60 / (totalDist / 1000) : null;

    return {
      points,
      segments,
      totalDistKm: totalDist / 1000,
      totalTimeSec: totalTime,
      totalTimeStr: totalTime ? formatTime(totalTime) : null,
      avgPaceMinKm: avgPace,
      avgPaceStr: avgPace ? formatPace(avgPace) : null,
      totalElevGain,
      totalElevLoss
    };
  }

  function formatTime(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    return `${m}:${String(s).padStart(2,'0')}`;
  }

  function formatPace(minPerKm) {
    const m = Math.floor(minPerKm);
    const s = Math.round((minPerKm - m) * 60);
    return `${m}:${String(s).padStart(2,'0')}`;
  }

  function buildPrompt(data) {
    const profile = JPZCH_Store ? JPZCH_Store.getProfile() : {};
    let userInfo = '';

    if (data.source === 'gpx') {
      const g = data.gpx;
      userInfo = `DATOS DE LA SESION (desde archivo GPX):
- Distancia: ${g.totalDistKm.toFixed(2)} km
- Tiempo: ${g.totalTimeStr}
- Ritmo promedio: ${g.avgPaceStr} min/km
- Desnivel positivo: ${g.totalElevGain.toFixed(0)} m
- Desnivel negativo: ${g.totalElevLoss.toFixed(0)} m

RITMO POR KM:
${g.segments.map(s => `  Km ${s.km}: ${s.pace ? formatPace(s.pace) : 'N/A'} min/km | Desnivel: ${(s.elevGain || 0) > 0 ? '+' : ''}${(s.elevGain || 0).toFixed(0)}m`).join('\n')}`;

      if (g.points.some(p => p.ele !== null)) {
        userInfo += `\n\nPERFIL DE ELEVACION (cada km):
${g.segments.map(s => `  Km ${s.km}: ${(s.elevGain || 0) > 0 ? '+' : ''}${(s.elevGain || 0).toFixed(0)}m`).join('\n')}`;
      }
    } else {
      const m = data.manual;
      userInfo = `DATOS DE LA SESION (ingresados manualmente):
- Distancia: ${m.dist} km
- Tiempo: ${m.time}
- Ritmo promedio: ${m.pace}
- Desnivel positivo: ${m.elev || 'No especificado'} m`;
      if (m.hr) userInfo += `\n- FC media: ${m.hr} lpm`;
      if (m.cad) userInfo += `\n- Cadencia media: ${m.cad} SPM`;
      if (m.rpe) userInfo += `\n- Esfuerzo percibido (RPE): ${m.rpe}/10`;
      if (m.type) {
        const types = { carrera: 'Carrera/Competencia', rodaje: 'Rodaje suave', intervalos: 'Intervalos/Series', tempo: 'Tempo/Umbral', larga: 'Rodaje largo', recuperacion: 'Recuperacion' };
        userInfo += `\n- Tipo de sesion: ${types[m.type] || m.type}`;
      }
    }

    const profileInfo = [];
    if (profile.name) profileInfo.push(`Nombre: ${profile.name}`);
    if (profile.age) profileInfo.push(`Edad: ${profile.age}`);
    if (profile.weight) profileInfo.push(`Peso: ${profile.weight} kg`);
    if (profile.height) profileInfo.push(`Altura: ${profile.height} cm`);
    if (profile.experience) {
      const exps = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado', elite: 'Elite' };
      profileInfo.push(`Experiencia: ${exps[profile.experience] || profile.experience}`);
    }
    if (profile.goal) profileInfo.push(`Objetivo: ${profile.goal}`);
    if (profile.mainDist) profileInfo.push(`Distancia principal: ${profile.mainDist}`);

    const profileStr = profileInfo.length ? `\n\nPERFIL DEL CORREDOR:\n${profileInfo.join('\n')}` : '';

    return `Eres un entrenador de running con 30 anos de experiencia entrenando desde corredores populares hasta atletas de elite. Tu especialidad es el analisis tecnico, fisiologico y estrategico profundo de sesiones de entrenamiento y carreras. Eres metodico, detallista y tienes un enfoque cientifico basado en evidencia.

INSTRUCCIONES:
- Analiza los datos proporcionados de forma SUPER DETALLADA.
- Identifica patrones, inconsistencias, fortalezas y areas de mejora.
- Tus recomendaciones deben ser concretas, accionables y personalizadas.
- Si falta informacion (como FC o cadencia), menciona que no esta disponible y centrate en lo que si tienes.
- Para sesiones sin datos de elevacion, omite ese analisis.
- El tono debe ser motivador pero honesto, como un entrenador de verdad.
- Piensa paso a paso antes de responder.

Debes responder UNICAMENTE con un objeto JSON valido. Sin markdown, sin texto adicional, solo el JSON. Usa esta estructura exacta:

{
  "puntuacion": <numero del 1 al 10, donde 10 es rendimiento de elite>,
  "resumen": "<texto: parrafo de 3-5 lineas con la impresion general de la sesion>",
  "analisisRitmo": {
    "texto": "<analisis detallado del ritmo: consistencia, estrategia (positive/negative/even split), km mas rapidos y lentos, donde se perdio o gano tiempo>",
    "tipoSplit": "<even|positive|negative|unknown>"
  },
  "analisisElevacion": {
    "disponible": <true|false>,
    "texto": "<analisis de como manejo las subidas y bajadas, si perdio tiempo en cuestas, estrategia de esfuerzo>"
  },
  "eficiencia": {
    "disponible": <true|false>,
    "texto": "<analisis de eficiencia basado en los datos disponibles>"
  },
  "frecuenciaCardiaca": {
    "disponible": <true|false>,
    "texto": "<analisis de FC si esta disponible>"
  },
  "puntosFuertes": [
    "<punto fuerte 1 con explicacion>",
    "<punto fuerte 2 con explicacion>",
    "<punto fuerte 3 con explicacion>"
  ],
  "puntosMejora": [
    "<punto de mejora 1 con explicacion del porque>",
    "<punto de mejora 2 con explicacion del porque>",
    "<punto de mejora 3 con explicacion del porque>"
  ],
  "recomendaciones": [
    "<recomendacion concreta 1: que hacer, como hacerlo y por que>",
    "<recomendacion concreta 2: que hacer, como hacerlo y por que>",
    "<recomendacion concreta 3: que hacer, como hacerlo y por que>",
    "<recomendacion concreta 4: que hacer, como hacerlo y por que>"
  ],
  "proximaSession": "<recomendacion especifica para la siguiente sesion de entrenamiento: tipo, duracion, intensidad, objetivo>"
}

DATOS A ANALIZAR:
${userInfo}${profileStr}`;
  }

  async function callGemini(prompt) {
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Error al conectar con el AI Coach');
    }
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('La IA no genero una respuesta valida');
    return text;
  }

  function renderDashboard(result, inputData) {
    const r = result;
    let html = '';

    const scoreColor = r.puntuacion >= 8 ? '#22C55E' : r.puntuacion >= 6 ? '#FBBF24' : '#FF5722';
    html += `
      <div class="card-glass p-6 md:p-8 text-center">
        <div class="score-ring" style="background: conic-gradient(${scoreColor} ${r.puntuacion * 10}%, rgba(255,255,255,0.03) 0); border: 4px solid ${scoreColor}40;">
          <span class="text-4xl font-black" style="color:${scoreColor}">${r.puntuacion}</span>
          <span class="text-[10px] font-medium text-[#64748B] mt-0.5">/ 10</span>
        </div>
        <p class="text-[#64748B] text-xs mt-2 font-medium">
          ${r.puntuacion >= 8 ? 'Rendimiento destacado' : r.puntuacion >= 6 ? 'Rendimiento solido' : 'Rendimiento con margen de mejora'}
        </p>
      </div>

      <div class="card-glass p-6 md:p-8">
        <h3 class="text-white font-bold text-sm mb-3">Resumen General</h3>
        <p class="text-[#94A3B8] text-sm leading-relaxed">${r.resumen}</p>
      </div>`;

    if (inputData.source === 'gpx') {
      const g = inputData.gpx;
      html += `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="card-glass text-center p-4">
          <span class="text-white font-black text-lg">${g.totalDistKm.toFixed(2)}</span>
          <span class="block text-[#64748B] text-[11px] font-medium mt-0.5">km</span>
        </div>
        <div class="card-glass text-center p-4">
          <span class="text-white font-black text-lg">${g.totalTimeStr}</span>
          <span class="block text-[#64748B] text-[11px] font-medium mt-0.5">tiempo</span>
        </div>
        <div class="card-glass text-center p-4">
          <span class="text-white font-black text-lg">${g.avgPaceStr}</span>
          <span class="block text-[#64748B] text-[11px] font-medium mt-0.5">min/km</span>
        </div>
        <div class="card-glass text-center p-4">
          <span class="text-white font-black text-lg">${g.totalElevGain.toFixed(0)}</span>
          <span class="block text-[#64748B] text-[11px] font-medium mt-0.5">m D+</span>
        </div>
      </div>`;

      const paces = g.segments.map(s => s.pace).filter(p => p);
      if (paces.length) {
        const maxPace = Math.max(...paces);
        const minPace = Math.min(...paces);
        const range = maxPace - minPace || 1;
        html += `
        <div class="card-glass p-5">
          <h3 class="text-white font-bold text-sm mb-3">Ritmo por kilometro</h3>
          <div class="mini-chart">`;
        g.segments.forEach(s => {
          if (s.pace) {
            const h = ((s.pace - minPace) / range) * 100;
            const isFastest = s.pace === minPace;
            const isSlowest = s.pace === maxPace;
            const color = isFastest ? '#22C55E' : isSlowest ? '#FF5722' : '#8B5CF6';
            html += `<div class="bar" style="height:${Math.max(8, h)}%;background:${color};opacity:${isFastest || isSlowest ? 1 : 0.6}" title="Km ${s.km}: ${formatPace(s.pace)}"></div>`;
          } else {
            html += `<div class="bar" style="height:4px;background:#475569;opacity:0.3"></div>`;
          }
        });
        html += `</div>
          <div class="flex justify-between text-[10px] text-[#475569] mt-1">
            <span>Km 1</span>
            <span class="text-[#22C55E] font-medium">Mas rapido: ${formatPace(minPace)}</span>
            <span class="text-[#FF5722] font-medium">Mas lento: ${formatPace(maxPace)}</span>
            <span>Km ${g.segments.length}</span>
          </div>
        </div>`;
      }

      if (g.segments.some(s => s.elevGain !== null)) {
        const elevs = g.segments.map(s => s.elevGain || 0);
        const maxElev = Math.max(...elevs.map(Math.abs));
        html += `
        <div class="card-glass p-5">
          <h3 class="text-white font-bold text-sm mb-3">Perfil de elevacion</h3>
          <div class="mini-chart">`;
        elevs.forEach(e => {
          const h = Math.abs(e) / (maxElev || 1) * 100;
          const color = e > 0 ? '#FF5722' : '#22D3EE';
          html += `<div class="bar" style="height:${Math.max(4, h)}%;background:${color};opacity:0.7"></div>`;
        });
        html += `</div>
          <div class="flex justify-between text-[10px] text-[#475569] mt-1">
            <span>Km 1</span>
            <span class="text-[#FF5722] font-medium">Subidas</span>
            <span class="text-[#22D3EE] font-medium">Bajadas</span>
            <span>Km ${elevs.length}</span>
          </div>
        </div>`;
      }
    } else {
      const m = inputData.manual;
      html += `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="card-glass text-center p-4">
          <span class="text-white font-black text-lg">${m.dist}</span>
          <span class="block text-[#64748B] text-[11px] font-medium mt-0.5">km</span>
        </div>
        <div class="card-glass text-center p-4">
          <span class="text-white font-black text-lg">${m.time}</span>
          <span class="block text-[#64748B] text-[11px] font-medium mt-0.5">tiempo</span>
        </div>
        <div class="card-glass text-center p-4">
          <span class="text-white font-black text-lg">${m.pace}</span>
          <span class="block text-[#64748B] text-[11px] font-medium mt-0.5">min/km</span>
        </div>
        <div class="card-glass text-center p-4">
          <span class="text-white font-black text-lg">${m.elev || '-'}</span>
          <span class="block text-[#64748B] text-[11px] font-medium mt-0.5">m D+</span>
        </div>
      </div>`;
    }

    html += `
      <div class="card-glass p-6 md:p-8">
        <h3 class="text-white font-bold text-sm mb-4">Analisis de Ritmo</h3>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.analisisRitmo.tipoSplit === 'negative' ? 'bg-[#22C55E]/10 text-[#22C55E]' : r.analisisRitmo.tipoSplit === 'positive' ? 'bg-[#FF5722]/10 text-[#FF5722]' : 'bg-[#FBBF24]/10 text-[#FBBF24]'}">${r.analisisRitmo.tipoSplit === 'negative' ? 'Negative Split' : r.analisisRitmo.tipoSplit === 'positive' ? 'Positive Split' : r.analisisRitmo.tipoSplit === 'even' ? 'Even Split' : 'Split no determinado'}</span>
        </div>
        <p class="text-[#94A3B8] text-sm leading-relaxed">${r.analisisRitmo.texto}</p>
      </div>`;

    if (r.analisisElevacion && r.analisisElevacion.disponible) {
      html += `<div class="card-glass p-6 md:p-8"><h3 class="text-white font-bold text-sm mb-3">Estrategia de Elevacion</h3><p class="text-[#94A3B8] text-sm leading-relaxed">${r.analisisElevacion.texto}</p></div>`;
    }
    if (r.eficiencia && r.eficiencia.disponible) {
      html += `<div class="card-glass p-6 md:p-8"><h3 class="text-white font-bold text-sm mb-3">Eficiencia y Biomecanica</h3><p class="text-[#94A3B8] text-sm leading-relaxed">${r.eficiencia.texto}</p></div>`;
    }
    if (r.frecuenciaCardiaca && r.frecuenciaCardiaca.disponible) {
      html += `<div class="card-glass p-6 md:p-8"><h3 class="text-white font-bold text-sm mb-3">Frecuencia Cardiaca</h3><p class="text-[#94A3B8] text-sm leading-relaxed">${r.frecuenciaCardiaca.texto}</p></div>`;
    }

    html += `
      <div class="grid md:grid-cols-2 gap-4">
        <div class="an-card green">
          <h3> Puntos Fuertes</h3>
          <ul>${r.puntosFuertes.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>
        <div class="an-card orange">
          <h3> Puntos a Mejorar</h3>
          <ul>${r.puntosMejora.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>
      </div>

      <div class="an-card purple">
        <h3> Recomendaciones Detalladas</h3>
        <ul>${r.recomendaciones.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>`;

    if (r.proximaSession) {
      html += `
      <div class="an-card cyan">
        <h3> Proxima Sesion Recomendada</h3>
        <p>${r.proximaSession}</p>
      </div>`;
    }

    html += `
      <div class="text-center pt-2">
        <button id="newAnalysisBtn" class="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all">Nuevo analisis</button>
      </div>`;

    resultSection.innerHTML = html;
    resultSection.classList.remove('hidden');
    resultSection.querySelector('#newAnalysisBtn').addEventListener('click', () => resetUI());
  }

  async function analyze() {
    if (state.analyzing) return;

    let inputData;
    if (state.inputMethod === 'gpx') {
      if (!state.gpxData) { showError('Selecciona un archivo GPX primero'); return; }
      inputData = { source: 'gpx', gpx: state.gpxData };
    } else {
      const dist = parseFloat($('manDist').value);
      const timeStr = $('manTime').value.trim();
      if (!dist || dist <= 0) { showError('Ingresa una distancia valida'); return; }
      if (!timeStr) { showError('Ingresa un tiempo valido'); return; }
      const parts = timeStr.split(':').map(s => parseFloat(s) || 0);
      let totalMin = 0;
      if (parts.length === 3) totalMin = parts[0] * 60 + parts[1] + parts[2] / 60;
      else if (parts.length === 2) totalMin = parts[0] + parts[1] / 60;
      else { showError('Formato de tiempo invalido. Usa hh:mm:ss o mm:ss'); return; }
      inputData = {
        source: 'manual',
        manual: {
          dist, time: timeStr, totalMin, pace: formatPace(totalMin / dist),
          elev: $('manElev').value || null, hr: $('manHr').value || null,
          cad: $('manCad').value || null, rpe: $('manRpe').value || null,
          type: $('manType').value || null
        }
      };
    }

    state.analyzing = true;
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analizando...';
    $('inputSection').classList.add('hidden');
    errorSection.classList.add('hidden');
    resultSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');

    try {
      const prompt = buildPrompt(inputData);
      const raw = await callGemini(prompt);

      let jsonStr = raw.trim();
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
      }
      const result = JSON.parse(jsonStr);

      if (!result.puntuacion || !result.resumen || !result.puntosFuertes) {
        throw new Error('La respuesta no tiene la estructura esperada');
      }

      loadingSection.classList.add('hidden');
      renderDashboard(result, inputData);
    } catch (err) {
      loadingSection.classList.add('hidden');
      showError(err.message);
    } finally {
      state.analyzing = false;
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = 'Analizar carrera';
    }
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorSection.classList.remove('hidden');
    $('inputSection').classList.remove('hidden');
    resultSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
  }

  function resetUI() {
    resultSection.classList.add('hidden');
    errorSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    $('inputSection').classList.remove('hidden');
    state.gpxData = null;
    fileInfo.classList.add('hidden');
    dropZone.classList.remove('has-file');
    $('fileInfoText').textContent = '';
    fileInput.value = '';
  }

  function init() {
    // Input tabs
    document.querySelectorAll('.input-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.input-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.input-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById(`panel-${tab.dataset.panel}`);
        if (panel) panel.classList.add('active');
        state.inputMethod = tab.dataset.panel;
      });
    });

    // GPX file handling
    fileInput.addEventListener('change', e => {
      if (e.target.files[0]) handleFile(e.target.files[0]);
    });
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });

    function handleFile(file) {
      if (!file.name.endsWith('.gpx')) { showError('Solo archivos .gpx son soportados'); return; }
      const reader = new FileReader();
      reader.onload = e => {
        try {
          state.gpxData = parseGPX(e.target.result);
          dropZone.classList.add('has-file');
          $('fileInfoText').textContent = `${file.name} (${state.gpxData.totalDistKm.toFixed(2)} km, ${state.gpxData.totalTimeStr}, ${state.gpxData.avgPaceStr} min/km)`;
          fileInfo.classList.remove('hidden');
        } catch (err) { showError('Error al leer GPX: ' + err.message); }
      };
      reader.readAsText(file);
    }

    analyzeBtn.addEventListener('click', analyze);
    $('retryBtn').addEventListener('click', analyze);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
