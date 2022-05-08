/* eslint-disable global-require */
// eslint-disable-next-line import/no-import-module-exports
import injectDevServer from '@cypress/react/plugins/react-scripts';

module.exports = (/** @type {Cypress.PluginEvents} */ on, /** @type {Cypress.PluginConfigOptions} */ config) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // @ts-ignore
  require('@cypress/code-coverage/task')(on, config);
  injectDevServer(on, config);
  return config;
}
