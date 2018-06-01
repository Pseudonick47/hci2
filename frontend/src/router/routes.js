import Schedule from 'Components/scheduling/home.component';
import Welcome from 'Components/welcome.component';

export const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
    meta: {
      guest: true,
    },
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule,
    meta: {
      guest: true,
    },
  },
];
