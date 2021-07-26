const SentryCli = require('@sentry/cli');
const { version } = require('../package.json');

async function createReleaseAndUpload() {
  const sentryProject = process.env.SENTRY_PROJECT;
  // const appVersion = process.env.REACT_APP_VERSION;
  const appVersion = version;
  const isUsingSentry = process.env.REACT_APP_SENTRY_IS_ACTIVE === "1";
  let release = "";
  if (!sentryProject || !isUsingSentry || !appVersion) {
    console.warn('Sentry is not set');
    return;
  } else {
      release = `${process.env.SENTRY_PROJECT}@${appVersion}-build:${process.env.REACT_APP_JENKINS_BUILD_NUMBER}`;
  }

  const cli = new SentryCli();
  try {
    console.log('Creating sentry release ' + release);
    await cli.releases.new(release);
    console.log('Uploading source maps');
    await cli.releases.uploadSourceMaps(release, {
      include: ['build/static/js'],
      urlPrefix: '~/static/js',
      rewrite: false,
    });
    console.log('Finalizing release');
    await cli.releases.finalize(release);
  } catch (e) {
    console.error('Source maps uploading failed:', e);
  }
}
createReleaseAndUpload();