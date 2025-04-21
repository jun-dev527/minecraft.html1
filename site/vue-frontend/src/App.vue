<template>
  <div class="app">
    <div class="background-overlay"></div>
    <TheNavbar />
    <router-view />
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue';

export default {
  name: 'App',
  components: {
    TheNavbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(135deg, #121212 0%, #2a2a2a 100%);
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app {
  width: 100%;
  height: 100%;
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/minecraft-bg.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.4;
}
</style> 