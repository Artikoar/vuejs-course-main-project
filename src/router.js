import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/CoachDetail.vue';
import CoachesList from './pages/CoachesList.vue';
import CoachRegistration from './pages/CoachRegistration.vue';
import ContactCoach from './pages/ContactCoach.vue';
import RequestsList from './pages/RequestsList.vue';
import NotFound from './pages/NotFound.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    { path: '/register', component: CoachRegistration },
    { path: '/requests', component: RequestsList },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});
