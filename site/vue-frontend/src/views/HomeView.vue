<template>
  <div class="home">
    <main class="main-banner">
      <div class="container">
        <div class="banner-container">
          <div class="banner-content">
            <h1 class="banner-title animate-text">Добро пожаловать на Minecraft сервер</h1>
            <p class="banner-description animate-text animate-text-delay">
              Присоединяйтесь к нашему игровому сообществу и погружайтесь в мир приключений и безграничных возможностей
            </p>
            <div class="banner-buttons animate-text animate-text-delay-2">
              <a href="#" class="start-btn">Начать игру</a>
              <a href="#" class="more-btn">Узнать больше</a>
            </div>
          </div>
          <div class="banner-image animate-text animate-text-delay-3">
            <img src="@/assets/images/hero-image.png" alt="Minecraft Character" />
          </div>
        </div>
      </div>
    </main>
    
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <img src="@/assets/images/logo.png" alt="Minecraft Server Logo" />
            <p>© 2023 Minecraft Server. Все права защищены.</p>
          </div>
          <div class="footer-links">
            <h3>Ссылки</h3>
            <ul>
              <li><router-link to="/">Главная</router-link></li>
              <li><router-link to="/about">О сервере</router-link></li>
              <li><router-link to="/rules">Правила</router-link></li>
              <li><router-link to="/donate">Донат</router-link></li>
            </ul>
          </div>
          <div class="footer-contact">
            <h3>Связаться с нами</h3>
            <ul>
              <li><a href="#"><i class="fab fa-discord"></i> Discord</a></li>
              <li><a href="#"><i class="fab fa-vk"></i> ВКонтакте</a></li>
              <li><a href="#"><i class="fab fa-telegram"></i> Telegram</a></li>
              <li><a href="#"><i class="fas fa-envelope"></i> Email</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'HomeView',
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const username = computed(() => store.getters.username);
    
    const logout = () => {
      store.dispatch('logout');
      router.push('/');
    };
    
    return {
      isLoggedIn,
      username,
      logout
    };
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Banner Styles */
.main-banner {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0;
  overflow: hidden;
  padding-top: 120px; /* Add extra padding for navbar */
}

.banner-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.banner-content {
  flex: 1;
}

.banner-title {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.2;
}

.banner-description {
  font-size: 1.2rem;
  color: #9CA3AF;
  margin-bottom: 30px;
  line-height: 1.6;
}

.banner-buttons {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.start-btn {
  background: linear-gradient(90deg, #8B5CF6, #6366F1);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
}

.start-btn:hover {
  background: linear-gradient(90deg, #7c4edc, #5457db);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(139, 92, 246, 0.4);
}

.more-btn {
  background: transparent;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.more-btn:hover {
  border-color: #8B5CF6;
  color: #8B5CF6;
  transform: translateY(-2px);
}

.banner-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.banner-image img {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Animation Classes */
.animate-text {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.7s ease forwards;
}

.animate-text-delay {
  animation-delay: 0.3s;
}

.animate-text-delay-2 {
  animation-delay: 0.6s;
}

.animate-text-delay-3 {
  animation-delay: 0.9s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Footer Styles */
.footer {
  background-color: rgba(21, 24, 34, 0.95);
  padding: 60px 0;
  margin-top: auto;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
}

.footer-logo {
  flex: 1;
  min-width: 200px;
}

.footer-logo img {
  height: 40px;
  margin-bottom: 20px;
}

.footer-logo p {
  color: #9CA3AF;
  font-size: 0.9rem;
}

.footer-links, .footer-contact {
  flex: 1;
  min-width: 200px;
}

.footer-links h3, .footer-contact h3 {
  color: #ffffff;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.footer-links ul, .footer-contact ul {
  list-style: none;
}

.footer-links li, .footer-contact li {
  margin-bottom: 10px;
}

.footer-links a, .footer-contact a {
  color: #9CA3AF;
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-links a:hover, .footer-contact a:hover {
  color: #8B5CF6;
}

.footer-contact i {
  font-size: 1.2rem;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .banner-title {
    font-size: 2.5rem;
  }
  
  .banner-description {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .banner-container {
    flex-direction: column;
    text-align: center;
  }
  
  .banner-image {
    justify-content: center;
    order: -1;
    margin-bottom: 30px;
  }
  
  .banner-image img {
    max-height: 300px;
  }
  
  .banner-buttons {
    justify-content: center;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 40px;
  }
}
</style> 