<template>
  <main class="auth-section">
    <div class="auth-card">
      <!-- Форма восстановления пароля -->
      <div class="auth-form" v-if="!isSuccess">
        <div class="auth-header">
          <h1 class="auth-title">Восстановление пароля</h1>
          <p class="auth-subtitle">Введите адрес электронной почты, связанный с вашим аккаунтом, и мы вышлем вам инструкции по сбросу пароля.</p>
        </div>
        
        <form @submit.prevent="submitForm">
          <div class="input-group" :class="{ 'error': emailError }">
            <label for="email">Адрес электронной почты</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              @input="emailError = ''"
              placeholder="Введите ваш email" 
              required
            >
            <div class="error-message" v-if="emailError">{{ emailError }}</div>
          </div>
          
          <button type="submit" class="auth-button" :disabled="isLoading">
            <span v-if="!isLoading">Отправить инструкции</span>
            <i v-else class="fas fa-spinner fa-spin"></i>
          </button>
        </form>
        
        <div class="auth-footer">
          <p>Вспомнили пароль? <router-link to="/login">Войти</router-link></p>
        </div>
      </div>
      
      <!-- Сообщение об успешной отправке -->
      <div class="success-message" v-if="isSuccess">
        <div class="success-icon">✓</div>
        <h2 class="success-text">Инструкции отправлены!</h2>
        <p class="success-description">Мы отправили инструкции по сбросу пароля на указанный адрес электронной почты. Проверьте вашу почту.</p>
        <button class="auth-button" @click="goToLogin">Вернуться на страницу входа</button>
      </div>
      
      <!-- Оверлей загрузки -->
      <div class="loading-overlay" :class="{ 'active': isLoading }">
        <div class="loading-spinner"></div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ForgotPasswordView',
  setup() {
    const router = useRouter();
    
    const email = ref('');
    const emailError = ref('');
    const isLoading = ref(false);
    const isSuccess = ref(false);
    
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
    const submitForm = async () => {
      // Validate email
      if (!email.value || !validateEmail(email.value)) {
        emailError.value = 'Пожалуйста, введите корректный адрес электронной почты';
        return;
      }
      
      // Show loading animation
      isLoading.value = true;
      
      // Simulate API call
      setTimeout(() => {
        // Hide loading animation
        isLoading.value = false;
        
        // Show success message
        isSuccess.value = true;
      }, 1500);
    };
    
    const goToLogin = () => {
      router.push('/login');
    };
    
    return {
      email,
      emailError,
      isLoading,
      isSuccess,
      submitForm,
      goToLogin
    };
  }
};
</script>

<style scoped>
.auth-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.auth-card {
  background: rgba(30, 30, 30, 0.9);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
  padding: 30px;
  text-align: center;
  overflow: hidden;
  position: relative;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.auth-header {
  margin-bottom: 30px;
}

.auth-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #ffffff;
}

.auth-subtitle {
  font-size: 14px;
  color: #aaaaaa;
  line-height: 1.5;
}

.input-group {
  margin-bottom: 20px;
  position: relative;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #dddddd;
}

.input-group input {
  width: 100%;
  padding: 12px 15px;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid #333333;
  border-radius: 5px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: #584cff;
  box-shadow: 0 0 0 2px rgba(88, 76, 255, 0.2);
}

.input-group.error input {
  border-color: #ff5252;
  box-shadow: 0 0 0 2px rgba(255, 82, 82, 0.2);
}

.error-message {
  color: #ff5252;
  font-size: 12px;
  margin-top: 5px;
}

.auth-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #584cff 0%, #7570ff 100%);
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 15px;
}

.auth-button:hover:not(:disabled) {
  background: linear-gradient(90deg, #4a3ffd 0%, #6661ff 100%);
  transform: translateY(-1px);
}

.auth-button:active:not(:disabled) {
  transform: translateY(0);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 20px;
  font-size: 14px;
  color: #aaaaaa;
}

.auth-footer a {
  color: #584cff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.auth-footer a:hover {
  color: #7570ff;
  text-decoration: underline;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 30, 30, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 10;
}

.loading-overlay.active {
  opacity: 1;
  pointer-events: all;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #584cff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-message {
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

.success-icon {
  font-size: 48px;
  color: #4caf50;
  margin-bottom: 15px;
}

.success-text {
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.success-description {
  color: #aaaaaa;
  font-size: 14px;
  margin-bottom: 20px;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 20px;
  }
  
  .auth-title {
    font-size: 20px;
  }
}
</style> 