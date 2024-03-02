export const config = {
  production: true,
  apiUrl: function () {
    return this.production ? 'https://dotrack-api.vercel.app/api/v1/' : 'http://localhost:5000/api/v1/';
  },
  github: {
    clientId: '7add717cd26af2976ae8',
    redirectURL: 'https://dotrack.vercel.app/auth/callback',
  }
};
