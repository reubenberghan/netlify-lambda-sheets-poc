module.exports = function makeCredentials() {
  return {
    type: process.env.TYPE || 'service_account',
    project_id: process.env.PROJECT_ID || '',
    private_key_id: process.env.PRIVATE_KEY_ID || '',
    private_key: process.env.PRIVATE_KEY.replace(/(\\r)|(\\n)/g, '\n') || '',
    client_email: process.env.CLIENT_EMAIL || '',
    client_id: process.env.CLIENT_ID || '',
    auth_uri: process.env.AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
    token_uri: process.env.TOKEN_URI || 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url:
      process.env.AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL || '',
  }
}
