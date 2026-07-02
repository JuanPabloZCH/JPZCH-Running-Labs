const JPZCH_Store = (() => {
  const STORAGE_KEY = 'jpzch_runner_profile';
  const SETTINGS_KEY = 'jpzch_app_settings';

  const defaultProfile = {
    name: '',
    age: '',
    weight: '',
    height: '',
    maxHR: '',
    restHR: '',
    gender: '',
    experience: '',
    preferredUnit: 'km',
    birthDate: ''
  };

  const defaultSettings = {
    theme: 'dark',
    animations: true,
    distanceUnit: 'km',
    language: 'es'
  };

  function getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? { ...defaultProfile, ...JSON.parse(data) } : { ...defaultProfile };
    } catch {
      return { ...defaultProfile };
    }
  }

  function saveProfile(data) {
    try {
      const current = getProfile();
      const updated = { ...current, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      dispatchEvent(new CustomEvent('jpzch-profile-update', { detail: updated }));
      return true;
    } catch {
      return false;
    }
  }

  function getSettings() {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? { ...defaultSettings, ...JSON.parse(data) } : { ...defaultSettings };
    } catch {
      return { ...defaultSettings };
    }
  }

  function saveSettings(data) {
    try {
      const current = getSettings();
      const updated = { ...current, ...data };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      dispatchEvent(new CustomEvent('jpzch-settings-update', { detail: updated }));
      return true;
    } catch {
      return false;
    }
  }

  function clearAll() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SETTINGS_KEY);
      return true;
    } catch {
      return false;
    }
  }

  function getToolData(toolId) {
    try {
      const data = localStorage.getItem(`jpzch_tool_${toolId}`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  function saveToolData(toolId, data) {
    try {
      localStorage.setItem(`jpzch_tool_${toolId}`, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  }

  function exportAllData() {
    const allKeys = Object.keys(localStorage).filter(k => k.startsWith('jpzch_'));
    const data = {};
    allKeys.forEach(key => {
      try {
        data[key] = JSON.parse(localStorage.getItem(key));
      } catch {
        data[key] = localStorage.getItem(key);
      }
    });
    return data;
  }

  function importAllData(data) {
    try {
      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
      return true;
    } catch {
      return false;
    }
  }

  return {
    getProfile,
    saveProfile,
    getSettings,
    saveSettings,
    clearAll,
    getToolData,
    saveToolData,
    exportAllData,
    importAllData
  };
})();
