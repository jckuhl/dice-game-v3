<template>
    <div id="app">
        <Header/>
        <router-view />
    </div>
</template>

<script>

import Header from './components/Header';
import store from './store.js';

export default {
    name: 'App',
    components: {
        Header,
    }
}
</script>

<style>

body {
  background: #ff5555;
}

.container {
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    width: 90%;
}

.center {
    margin: 0 auto;
}

</style>
