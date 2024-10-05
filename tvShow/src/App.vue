<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>&copy; 2024 StreamSaga</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style scoped>

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden; 
  box-sizing: border-box;
}

#app {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #2c3e50;
  padding: 20px;
}

nav {
  display: flex;
  justify-content: center;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
}

nav a:hover {
  text-decoration: underline;
}

main {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 100vw; 
}

footer {
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  width: 100%;
  text-align: center;
}

* {
  box-sizing: border-box;
}
</style>
