const JPZCH_ProfileModal = (() => {
  let isOpen = false;

  function getModalHTML(profile) {
    return `
    <div id="profileModal" class="modal-overlay">
      <div class="modal-content">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CCFF00]/20 to-[#99CC00]/10 border border-[#CCFF00]/20 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#CCFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg">Mi Perfil Runner</h3>
              <p class="text-[#64748B] text-xs">Estos datos se comparten entre todas las herramientas</p>
            </div>
          </div>
          <button id="closeProfileModal" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form id="profileForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="form-label">Nombre</label>
              <input type="text" name="name" class="form-input" placeholder="Tu nombre" value="${escapeHtml(profile.name || '')}">
            </div>
            <div>
              <label class="form-label">Edad</label>
              <input type="number" name="age" class="form-input" placeholder="30" min="10" max="120" value="${profile.age || ''}">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="form-label">Peso (kg)</label>
              <input type="number" name="weight" class="form-input" placeholder="70" min="30" max="250" step="0.1" value="${profile.weight || ''}">
            </div>
            <div>
              <label class="form-label">Altura (cm)</label>
              <input type="number" name="height" class="form-input" placeholder="175" min="100" max="250" value="${profile.height || ''}">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="form-label">FC Máxima (lpm)</label>
              <input type="number" name="maxHR" class="form-input" placeholder="195" min="100" max="250" value="${profile.maxHR || ''}">
            </div>
            <div>
              <label class="form-label">FC Reposo (lpm)</label>
              <input type="number" name="restHR" class="form-input" placeholder="60" min="30" max="120" value="${profile.restHR || ''}">
            </div>
          </div>
          <div>
            <label class="form-label">Género</label>
            <select name="gender" class="form-input">
              <option value="" ${!profile.gender ? 'selected' : ''} disabled>Seleccionar</option>
              <option value="male" ${profile.gender === 'male' ? 'selected' : ''}>Masculino</option>
              <option value="female" ${profile.gender === 'female' ? 'selected' : ''}>Femenino</option>
            </select>
          </div>
          <div>
            <label class="form-label">Nivel de experiencia</label>
            <select name="experience" class="form-input">
              <option value="" ${!profile.experience ? 'selected' : ''} disabled>Seleccionar</option>
              <option value="beginner" ${profile.experience === 'beginner' ? 'selected' : ''}>Principiante</option>
              <option value="intermediate" ${profile.experience === 'intermediate' ? 'selected' : ''}>Intermedio</option>
              <option value="advanced" ${profile.experience === 'advanced' ? 'selected' : ''}>Avanzado</option>
              <option value="elite" ${profile.experience === 'elite' ? 'selected' : ''}>Élite</option>
            </select>
          </div>
          <div class="flex gap-3 pt-2">
            <button type="submit" class="btn-primary flex-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Guardar Perfil
            </button>
            <button type="button" id="clearProfileBtn" class="btn-ghost text-red-400 hover:text-red-300 hover:bg-red-500/10">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </form>
        <p id="profileSaveStatus" class="text-xs text-center mt-3 text-[#64748B] opacity-0 transition-opacity duration-300"></p>
      </div>
    </div>`;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    const profile = JPZCH_Store.getProfile();
    const overlay = document.createElement('div');
    overlay.innerHTML = getModalHTML(profile);
    document.body.appendChild(overlay.firstElementChild);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      document.getElementById('profileModal')?.classList.add('open');
    });
    bindEvents();
  }

  function close() {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.remove();
      isOpen = false;
    }, 300);
  }

  function bindEvents() {
    const modal = document.getElementById('profileModal');
    if (!modal) return;

    const closeBtn = document.getElementById('closeProfileModal');
    if (closeBtn) closeBtn.addEventListener('click', close);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', handleEsc);

    const form = document.getElementById('profileForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {};
        const formData = new FormData(form);
        formData.forEach((value, key) => {
          data[key] = value;
        });
        JPZCH_Store.saveProfile(data);
        showStatus('Perfil guardado correctamente', true);
      });
    }

    const clearBtn = document.getElementById('clearProfileBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        JPZCH_Store.saveProfile({});
        form?.reset();
        showStatus('Perfil eliminado', false);
      });
    }
  }

  function handleEsc(e) {
    if (e.key === 'Escape') close();
    document.removeEventListener('keydown', handleEsc);
  }

  function showStatus(msg, success) {
    const el = document.getElementById('profileSaveStatus');
    if (!el) return;
    el.textContent = msg;
    el.style.color = success ? '#22C55E' : '#EF4444';
    el.style.opacity = '1';
    setTimeout(() => { el.style.opacity = '0'; }, 2500);
  }

  return { open, close };
})();
