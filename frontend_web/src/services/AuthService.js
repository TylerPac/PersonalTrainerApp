const API_BASE_URL = 'http://localhost:8081';

class AuthService {
  // Token management
  setToken(token) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  removeToken() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn() {
    const token = this.getToken();
    if (!token) return false;

    // Check if token is expired (simple check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  // API calls with JWT
  async makeAuthenticatedRequest(url, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Token expired or invalid
      this.removeToken();
      throw new Error('Authentication expired. Please log in again.');
    }

    return response;
  }

  // Authentication methods
  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Login failed');
    }

    const data = await response.json();
    this.setToken(data.token);
    return data.user;
  }

  async register(username, email, password) {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Registration failed');
    }

    const data = await response.json();
    this.setToken(data.token);
    return data.user;
  }

  async getCurrentUser() {
    const response = await this.makeAuthenticatedRequest('/users/me');
    
    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    return response.json();
  }

  async getAllUsers() {
    const response = await this.makeAuthenticatedRequest('/users');
    
    if (!response.ok) {
      throw new Error('Failed to get users');
    }

    return response.json();
  }

  logout() {
    this.removeToken();
  }
}

export default new AuthService();