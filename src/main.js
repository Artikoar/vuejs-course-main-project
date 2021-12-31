import { createApp } from 'vue';

import App from './App.vue';
import Router from './router.js';
import Store from './store/index.js';

import BaseCard from './components/layout/BaseCard.vue';
import BaseButton from './components/layout/BaseButton.vue';
import BaseBadge from './components/layout/BaseBadge.vue';
import BaseSpinner from './components/layout/BaseSpinner.vue';
import BaseDialog from './components/layout/BaseDialog.vue';

const app = createApp(App);

app.use(Router);
app.use(Store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
