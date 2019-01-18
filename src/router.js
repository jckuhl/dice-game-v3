import Vue from 'vue';
import Router from 'vue-router';
import Intro from './components/Intro.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Intro',
            component: Intro
        },
        {
            path: '/game',
            name: 'StudMuffin',
            component: () => import( /* webpackChunkName: "Stud Muffin" */ './components/StudMuffin.vue')
        }
    ]
})