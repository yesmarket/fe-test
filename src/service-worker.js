import runtime from 'serviceworker-webpack-plugin/lib/runtime';

export const registerServiceWorkers = () => {
   if ('serviceWorker' in navigator) {
      const registration = runtime.register();
    }
}
