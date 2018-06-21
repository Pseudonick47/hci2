import Schedule from 'Components/scheduling/home.component';
// import Welcome from 'Components/welcome.component';
import Entities from 'Components/entities.component';

export const routes = [
  {
    path: '/',
    redirect: '/schedule',
    // name: 'welcome',
    // component: Welcome,
    // meta: {
    //   guest: true,
    // },
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule,
    meta: {
      guest: true,
    },
  },
  {
    path: '/entities',
    name: 'entities',
    component: Entities,
    meta: {
      guest: true,
    },
  },
];
