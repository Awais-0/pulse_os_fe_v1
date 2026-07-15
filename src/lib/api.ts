/**
 * API Utility for PulseOS
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch health status:', error);
    throw error;
  }
}

export async function fetchRoot() {
  try {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch API root:', error);
    throw error;
  }
}

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');

  const headers = new Headers(options.headers || {});
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || result.detail || 'Request failed');
  }

  return result.data;
}

export async function login(formData: FormData) {
  return apiCall('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(formData as any),
  });
}

export async function signup(userData: any) {
  return apiCall('/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function getProfile() {
  return apiCall('/api/v1/users/me/profile', {
    method: 'GET',
  });
}

export async function updateProfile(profileData: any) {
  return apiCall('/api/v1/users/me/profile', {
    method: 'PATCH',
    body: JSON.stringify(profileData),
  });
}

export async function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return apiCall('/api/v1/users/me/avatar', {
    method: 'POST',
    body: formData,
  });
}

export async function uploadBanner(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return apiCall('/api/v1/users/me/banner', {
    method: 'POST',
    body: formData,
  });
}

// Media Library API endpoints
export async function getMedia(type?: string) {
  const url = type && type !== 'all' ? `/api/v1/media?type=${type}` : '/api/v1/media';
  return apiCall(url, {
    method: 'GET',
  });
}

export async function addMedia(mediaData: any) {
  return apiCall('/api/v1/media', {
    method: 'POST',
    body: JSON.stringify(mediaData),
  });
}

export async function updateMedia(mediaId: string | number, updateData: any) {
  return apiCall(`/api/v1/media/${mediaId}`, {
    method: 'PATCH',
    body: JSON.stringify(updateData),
  });
}

export async function deleteMedia(mediaId: string | number) {
  const token = localStorage.getItem('token');
  const headers = new Headers();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Note: delete returns no content (204), so apiCall which does result.json() might fail.
  // We can fetch directly or handle it. Let's look at apiCall logic:
  // result = await response.json()
  // if not ok, error. Else returns result.data.
  // Since DELETE /media/{id} returns status 204 (No Content), calling response.json() will throw.
  // Let's implement deleteMedia with a custom fetch to handle 204 status safely:
  const response = await fetch(`${API_URL}/api/v1/media/${mediaId}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    let errMessage = 'Delete failed';
    try {
      const result = await response.json();
      errMessage = result.error?.message || result.detail || errMessage;
    } catch (_) { }
    throw new Error(errMessage);
  }
  return true;
}

export async function searchTMDB(query: string) {
  return apiCall(`/api/v1/media/search-tmdb?query=${encodeURIComponent(query)}`, {
    method: 'GET',
  });
}

// Gaming / RAWG API endpoints
export async function getGames(status?: string) {
  const url = status && status !== 'all' ? `/api/v1/games?status=${status}` : '/api/v1/games';
  return apiCall(url, { method: 'GET' });
}

export async function addGame(gameData: any) {
  return apiCall('/api/v1/games', {
    method: 'POST',
    body: JSON.stringify(gameData),
  });
}

export async function updateGame(gameId: string | number, updateData: any) {
  return apiCall(`/api/v1/games/${gameId}`, {
    method: 'PATCH',
    body: JSON.stringify(updateData),
  });
}

export async function deleteGame(gameId: string | number) {
  const token = localStorage.getItem('token');
  const headers = new Headers();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}/api/v1/games/${gameId}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    let errMessage = 'Delete failed';
    try {
      const result = await response.json();
      errMessage = result.error?.message || result.detail || errMessage;
    } catch (_) {}
    throw new Error(errMessage);
  }
  return true;
}

export async function searchRAWG(query: string) {
  return apiCall(`/api/v1/games/search-rawg?query=${encodeURIComponent(query)}`, {
    method: 'GET',
  });
}

export async function getAchievements(gameId: string | number) {
  return apiCall(`/api/v1/games/${gameId}/achievements`, { method: 'GET' });
}

export async function toggleAchievement(gameId: string | number, achievementId: number) {
  return apiCall(`/api/v1/games/${gameId}/achievements/${achievementId}`, {
    method: 'PATCH',
  });
}
