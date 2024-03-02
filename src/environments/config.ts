export const config = {
  production: true,
  apiUrl: function () {
    return this.production ? 'https://dotrack-api.vercel.app/api/v1/' : 'http://localhost:5000/api/v1/';
  },
  github: {
    clientId: '${GITHUB_CLIENT_ID}',
    redirectURL: '${GITHUB_REDIRECT_URL}'
  }
};
