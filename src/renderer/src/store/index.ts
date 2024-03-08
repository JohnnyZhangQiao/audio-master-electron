import { createPinia } from 'pinia';

const store = createPinia();

export { store };

export * from './event';
export * from './user';

export default store;
