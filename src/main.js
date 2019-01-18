import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.filter('title', function(value) {
    if(value) {
        return value.split(' ')
                .map(word => word.substring(0,1).toUpperCase() + word.substring(1))
                .join(' ')
                .trim();
    } else {
        return '';
    }
});

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
