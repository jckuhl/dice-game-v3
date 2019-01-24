import Vue from 'vue';
import Router from 'vue-router';
import Intro from './components/Intro.vue';
import store from './store';

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
            component: () => import( /* webpackChunkName: "Stud Muffin" */ './components/StudMuffin.vue'),
            beforeEnter: ((to, from, next)=> {
                if(!store.state.players.length) {
                    next({ path: '/'})
                } else {
                    next();
                }
            })
        },
        {
            path: '/about',
            name: 'About',
            component: () => import( /* webpackChunkName: "About" */ './components/About.vue')
        }
    ]
})