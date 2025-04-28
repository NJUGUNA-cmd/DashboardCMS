<script setup lang="ts">
//import { RouterLink, RouterView } from 'vue-router'
// lazy load components

import { defineAsyncComponent } from 'vue';

const HelloWorld= defineAsyncComponent(()=>import( './components/HelloWorld.vue'));
const RobotList= defineAsyncComponent(()=>import( './components/RobotList.vue'));
//import RobotList from "./components/RobotList.vue";
</script>

<template>
  <div class="app-container">
    <header class="header">
      <div class="header-content">
        <h1>Robot Management System</h1>
        <nav class="nav-menu">
          <router-link to="/" class="nav-link">Dashboard</router-link>
          <router-link to="/robots" class="nav-link">Robots</router-link>
          <router-link to="/simulation" class="nav-link">Simulation</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background: var(--primary-dark);
  color: var(--neutral-100);
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(26, 27, 46, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--neutral-400);
  padding: 0 24px;
  height: 80px;
  display: flex;
  align-items: center;
}

.header-content {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 1.8rem;
  font-weight: 600;
  background: linear-gradient(120deg, var(--accent-cyan), var(--accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: var(--neutral-300);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--neutral-100);
  background: rgba(107, 75, 255, 0.1);
}

.nav-link.router-link-active {
  color: var(--accent-purple);
  background: rgba(107, 75, 255, 0.15);
}

.main-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 24px;
  position: relative;
  min-height: calc(100vh - 80px);
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: var(--neutral-300);
  font-size: 1.1rem;
  background: rgba(107, 75, 255, 0.1);
  border-radius: 12px;
  margin: 20px 0;
}

@media (max-width: 768px) {
  .header {
    height: auto;
    padding: 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 16px;
  }

  .nav-menu {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .main-content {
    padding: 24px 16px;
  }
}
</style>
