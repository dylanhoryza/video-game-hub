import decode from 'jwt-decode';

const TOKEN_KEY = 'id_token';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    return decoded.exp < Date.now() / 1000;
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  login(idToken) {
    localStorage.setItem(TOKEN_KEY, idToken);

     window.location.assign('/');
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);

    window.location.reload();
  }
}

export default new AuthService();
