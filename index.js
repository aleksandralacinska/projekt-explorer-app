import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// Rejestracja Service Workera dla aplikacji webowej
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker zarejestrowany z zakresem:', registration.scope);
        })
        .catch((error) => {
          console.error('Rejestracja Service Workera nie powiodła się:', error);
        });
    });
  }