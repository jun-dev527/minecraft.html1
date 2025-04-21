<template>
  <div class="background-overlay"></div>
  
  <section class="auth-section">
    <div class="auth-card">
      <div class="auth-header">
        <h2>Вход в аккаунт</h2>
        <p>Добро пожаловать снова! Войдите в свой аккаунт</p>
      </div>
      
      <form @submit.prevent="submitForm" class="auth-form">
        <div class="form-group">
          <label for="username">Имя пользователя</label>
          <div :class="['input-group', usernameError ? 'error' : '']">
            <span class="input-icon"><i class="fas fa-user"></i></span>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              @input="usernameError = ''"
              placeholder="Введите имя пользователя" 
              required
            >
          </div>
          <span class="error-message" v-if="usernameError">{{ usernameError }}</span>
        </div>
        
        <div class="form-group">
          <label for="password">Пароль</label>
          <div :class="['input-group', passwordError ? 'error' : '']">
            <span class="input-icon"><i class="fas fa-lock"></i></span>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="password" 
              @input="passwordError = ''"
              placeholder="Введите пароль" 
              required
            >
            <button type="button" class="toggle-password" @click="togglePassword" aria-label="Показать пароль">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <span class="error-message" v-if="passwordError">{{ passwordError }}</span>
        </div>
        
        <div class="form-options">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="rememberMe">
            <label for="remember">Запомнить меня</label>
          </div>
          <router-link to="/forgot-password" class="forgot-password">Забыли пароль?</router-link>
        </div>
        
        <button type="submit" class="auth-button" :disabled="isLoading">
          <span v-if="!isLoading">Войти</span>
          <i v-else class="fas fa-spinner fa-spin"></i>
        </button>
      </form>
      
      <div class="auth-footer">
        <p>Еще нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link></p>
      </div>
    </div>
  </section>

  <div :class="['loading-overlay', isLoading ? 'active' : '']">
    <div class="loading-spinner"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const username = ref('');
    const password = ref('');
    const rememberMe = ref(false);
    const showPassword = ref(false);
    const isLoading = ref(false);
    const usernameError = ref('');
    const passwordError = ref('');
    const formError = ref(false);
    
    // Check if user selected "Remember me" before
    onMounted(() => {
      if (localStorage.getItem('rememberMe') === 'true') {
        rememberMe.value = true;
      }
      
      // Make the auth card visible after component mounted
      setTimeout(() => {
        document.querySelector('.auth-card').style.opacity = '1';
      }, 100);
    });
    
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    
    const validateForm = () => {
      let isValid = true;
      
      if (!username.value.trim()) {
        usernameError.value = 'Пожалуйста, введите имя пользователя';
        isValid = false;
      }
      
      if (!password.value) {
        passwordError.value = 'Пожалуйста, введите пароль';
        isValid = false;
      }
      
      if (!isValid) {
        formError.value = true;
        setTimeout(() => {
          formError.value = false;
        }, 500);
      }
      
      return isValid;
    };
    
    const submitForm = async () => {
      if (!validateForm()) return;
      
      isLoading.value = true;
      
      try {
        // Simulating API call with setTimeout
        setTimeout(() => {
          // Login action
          store.dispatch('login', {
            username: username.value,
            rememberMe: rememberMe.value
          });
          
          // Redirect to profile page
          router.push('/profile');
        }, 1500);
      } catch (error) {
        console.error('Login error:', error);
      }
    };
    
    return {
      username,
      password,
      rememberMe,
      showPassword,
      isLoading,
      usernameError,
      passwordError,
      formError,
      togglePassword,
      submitForm
    };
  }
};
</script>

<style scoped>
.auth-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.auth-card {
  background: rgba(27, 32, 44, 0.85);
  border-radius: 10px;
  padding: 2.5rem;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-width: 100%;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.auth-header h2 {
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: #9CA3AF;
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #e4e6eb;
  font-weight: 500;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(48, 54, 67, 0.8);
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s;
  border: 1px solid rgba(86, 86, 105, 0.3);
}

.input-group:focus-within {
  border-color: #8B5CF6;
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.4);
}

.input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 100%;
  color: #9CA3AF;
  font-size: 1rem;
}

.input-group input {
  width: 100%;
  padding: 0.9rem 0.5rem;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1rem;
}

.input-group input::placeholder {
  color: #6B7280;
}

.toggle-password {
  background: transparent;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0 15px;
  font-size: 1rem;
  transition: color 0.3s;
}

.toggle-password:hover {
  color: #8B5CF6;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #6B7280;
  border-radius: 4px;
  margin-right: 8px;
  background: rgba(48, 54, 67, 0.5);
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
}

.remember-me input[type="checkbox"]:checked {
  background: #8B5CF6;
  border-color: #8B5CF6;
}

.remember-me input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.remember-me label {
  color: #9CA3AF;
  font-size: 0.9rem;
  cursor: pointer;
}

.forgot-password {
  color: #8B5CF6;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s;
}

.forgot-password:hover {
  color: #a78bfa;
  text-decoration: underline;
}

.auth-button {
  width: 100%;
  background: linear-gradient(90deg, #8B5CF6, #6366F1);
  border: none;
  padding: 1rem;
  border-radius: 5px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
  margin-top: 1.5rem;
}

.auth-button:hover:not(:disabled) {
  background: linear-gradient(90deg, #7c4edc, #5457db);
  box-shadow: 0 6px 15px rgba(139, 92, 246, 0.4);
  transform: translateY(-2px);
}

.auth-button:active:not(:disabled) {
  transform: translateY(0);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 2rem;
  text-align: center;
  color: #9CA3AF;
  font-size: 0.9rem;
}

.auth-footer a {
  color: #8B5CF6;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.auth-footer a:hover {
  color: #a78bfa;
  text-decoration: underline;
}

/* Form validation styles */
.input-group.error {
  border-color: #ef4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.3);
}

.error-message {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

/* Loading animation */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.loading-overlay.active {
  opacity: 1;
  visibility: visible;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #8B5CF6;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Form animations */
.auth-form {
  animation: formAppear 0.5s ease;
}

@keyframes formAppear {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Form shake animation when error */
:deep(.form-shake) {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
</style> 