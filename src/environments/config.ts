export const config = {
  production: false,
  apiUrl: function () {
    return this.production ? 'https://dotrack-api.vercel.app/api/v1/' : 'http://localhost:5000/api/v1/';
  }
};