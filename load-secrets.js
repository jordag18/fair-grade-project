const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

async function accessSecretVersion(name) {
  const [version] = await client.accessSecretVersion({ name });
  const payload = version.payload.data.toString('utf8');
  return payload;
}

async function loadSecrets() {
  const secrets = [
    'DATABASE_URL',
    'GOOGLE_APPLICATION_CREDENTIALS',
    'AUTH_SECRET',
    'AUTH_GITHUB_ID',
    'AUTH_GITHUB_SECRET',
    'AUTH_GOOGLE_ID',
    'AUTH_GOOGLE_SECRET',
  ];

  for (const secret of secrets) {
    const secretValue = await accessSecretVersion(`projects/symmetric-ray-425503-d6/secrets/${secret}/versions/latest`);
    process.env[secret] = secretValue;
  }
}

module.exports = loadSecrets;
