import Vue from 'vue';
import App from './components/app';

new Vue({
  el: '.app',
  render: h => h(App)
});

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
}
