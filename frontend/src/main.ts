import { ViteSSG } from 'vite-ssg/single-page';
import '@/assets/styles/global.scss';
import App from './App.vue';

export const createApp = ViteSSG(App);
