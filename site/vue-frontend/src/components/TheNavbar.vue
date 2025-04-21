<template>
  <header class="site-header">
    <div class="container">
      <nav class="navbar">
        <router-link to="/" class="nav-logo" aria-label="HydraCraft">
          <span class="logo-text">HydraCraft</span>
        </router-link>
        
        <button class="menu-toggle" aria-expanded="false" aria-controls="primary-menu">
          <span class="screen-reader-text">Меню</span>
          <div class="hamburger">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </button>
        
        <div id="primary-menu" class="nav-wrapper">
          <ul class="nav-links">
            <li class="nav-item"><router-link to="/" class="nav-link">ГЛАВНАЯ</router-link></li>
            <li class="nav-item"><router-link to="/rules" class="nav-link">ПРАВИЛА</router-link></li>
            <li class="nav-item"><router-link to="/shop" class="nav-link">МАГАЗИН</router-link></li>
            <li class="nav-item"><router-link to="/forum" class="nav-link">ФОРУМ</router-link></li>
            <li class="nav-item"><router-link to="/profile" class="nav-link">ПРОФИЛЬ</router-link></li>
          </ul>
          
          <div class="nav-auth">
            <router-link to="/profile" class="login-btn">Личный кабинет</router-link>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheNavbar',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      const menuToggle = document.querySelector('.menu-toggle');
      const navWrapper = document.querySelector('.nav-wrapper');
      
      if (this.mobileMenuOpen) {
        menuToggle.setAttribute('aria-expanded', 'true');
        navWrapper.classList.add('active');
      } else {
        menuToggle.setAttribute('aria-expanded', 'false');
        navWrapper.classList.remove('active');
      }
    }
  },
  mounted() {
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', this.toggleMobileMenu);
  },
  beforeUnmount() {
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.removeEventListener('click', this.toggleMobileMenu);
  }
}
</script>

<style scoped>
.screen-reader-text {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(8, 8, 12, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  position: relative;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 20;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 800;
  color: #8B5CF6;
  text-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
}

.menu-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 20;
}

.hamburger {
  width: 30px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bar {
  width: 100%;
  height: 2px;
  background-color: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nav-links {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 15px;
}

.nav-link {
  position: relative;
  color: #fff;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 1px;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #8B5CF6;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #8B5CF6;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-auth {
  display: flex;
  align-items: center;
}

.login-btn {
  background: linear-gradient(90deg, #8B5CF6, #6366F1);
  color: #fff;
  text-decoration: none;
  padding: 0.6rem 1.25rem;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
}

.login-btn:hover {
  background: linear-gradient(90deg, #7c4edc, #5457db);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(139, 92, 246, 0.4);
}

@media (max-width: 1024px) {
  .nav-item {
    margin: 0 10px;
  }
  
  .nav-link {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  
  .nav-wrapper {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 320px;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    background-color: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(10px);
    padding: 80px 20px 40px;
    transition: right 0.3s ease;
    overflow-y: auto;
  }
  
  .nav-wrapper.active {
    right: 0;
  }
  
  .nav-links {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 30px;
  }
  
  .nav-item {
    margin: 10px 0;
    width: 100%;
  }
  
  .nav-link {
    display: block;
    padding: 10px 0;
    font-size: 1rem;
  }
  
  .nav-auth {
    width: 100%;
  }
  
  .login-btn {
    width: 100%;
    text-align: center;
  }
  
  .menu-toggle[aria-expanded="true"] .bar:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  
  .menu-toggle[aria-expanded="true"] .bar:nth-child(2) {
    opacity: 0;
  }
  
  .menu-toggle[aria-expanded="true"] .bar:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
}
</style> 