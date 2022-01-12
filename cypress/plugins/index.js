/* eslint-disable global-require */
import injectDevServer from '@cypress/react/plugins/react-scripts';

module.exports = (on, config) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('@cypress/code-coverage/task')(on, config);
  injectDevServer(on, config);
  return config;
}
