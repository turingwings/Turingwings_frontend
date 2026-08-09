const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const result = await response.json().catch(() => ({}));
    
    if (!response.ok) {
      throw {
        status: response.status,
        message: result.message || 'Something went wrong',
        errors: result.errors || null,
        success: false,
      };
    }
    
    return result;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    throw {
      status: 500,
      message: error.message || 'Network error / Server offline',
      errors: null,
      success: false,
    };
  }
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body) => request(endpoint, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
};
