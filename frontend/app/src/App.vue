<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="app-header">
    <div class="logo">
      <RouterLink to="/">
        <span class="logo-text">新艾利都信标</span>
        <span class="logo-subtext">New Eridu Beacon</span>
      </RouterLink>
    </div>
    <nav class="main-nav">
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/characters">角色图鉴</RouterLink>
      <RouterLink to="/calculator">伤害计算器</RouterLink>
      <!-- Add more links here as we build more features -->
    </nav>
  </header>

  <main class="main-content">
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo a {
  text-decoration: none;
}

.logo-text {
  font-family: 'Teko', sans-serif;
  font-size: 2.5rem;
  color: var(--color-accent-green);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.logo-subtext {
  display: block;
  font-size: 0.8rem;
  color: var(--color-text);
  margin-top: -10px;
  letter-spacing: 0.1em;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.main-nav a {
  font-family: 'Teko', sans-serif;
  font-size: 1.5rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-text);
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
  transition: color 0.3s, border-color 0.3s;
}

.main-nav a:hover,
.main-nav a.router-link-exact-active {
  color: var(--color-accent-green);
  border-bottom-color: var(--color-accent-green);
}

.main-content {
  /* This ensures the content area isn't hidden behind the sticky header */
  /* padding-top is not needed if header is not sticky, but good practice */
}
</style>
