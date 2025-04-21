<template>
  <div class="background-overlay"></div>

  <section class="auth-section">
    <div class="auth-card">
      <div class="auth-header">
        <h2>Регистрация аккаунта</h2>
        <p>Создайте свой аккаунт, чтобы присоединиться к нашему серверу</p>
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
          <label for="email">Email</label>
          <div :class="['input-group', emailError ? 'error' : '']">
            <span class="input-icon"><i class="fas fa-envelope"></i></span>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              @input="emailError = ''"
              placeholder="Введите email" 
              required
            >
          </div>
          <span class="error-message" v-if="emailError">{{ emailError }}</span>
        </div>
        
        <div class="form-group">
          <label for="password">Пароль</label>
          <div :class="['input-group', passwordError ? 'error' : '']">
            <span class="input-icon"><i class="fas fa-lock"></i></span>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="password" 
              @input="checkPasswordStrength"
              placeholder="Введите пароль" 
              required
            >
            <button type="button" class="toggle-password" @click="togglePassword(1)" aria-label="Показать пароль">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <div :class="['password-strength', strengthClass]">
            <div class="password-strength-meter"></div>
          </div>
          <span :class="['password-strength-text', strengthClass]">{{ strengthText }}</span>
          <span class="error-message" v-if="passwordError">{{ passwordError }}</span>
        </div>
        
        <div class="form-group">
          <label for="password-confirm">Подтверждение пароля</label>
          <div :class="['input-group', confirmError ? 'error' : '']">
            <span class="input-icon"><i class="fas fa-lock"></i></span>
            <input 
              :type="showConfirmPassword ? 'text' : 'password'" 
              id="password-confirm" 
              v-model="confirmPassword" 
              @input="checkPasswordMatch"
              placeholder="Подтвердите пароль" 
              required
            >
            <button type="button" class="toggle-password" @click="togglePassword(2)" aria-label="Показать пароль">
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <span class="error-message" v-if="confirmError">{{ confirmError }}</span>
        </div>
        
        <div class="form-options">
          <div class="remember-me">
            <input type="checkbox" id="agree-terms" v-model="agreeTerms" required>
            <label for="agree-terms">Я согласен с <a href="#">правилами сервера</a></label>
          </div>
        </div>
        
        <button type="submit" class="auth-button" :disabled="isLoading">
          <span v-if="!isLoading">Зарегистрироваться</span>
          <i v-else class="fas fa-spinner fa-spin"></i>
        </button>
      </form>
      
      <div class="auth-footer">
        <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
      </div>
    </div>
  </section>

  <div :class="['loading-overlay', isLoading ? 'active' : '']">
    <div class="loading-spinner"></div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterView',
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const agreeTerms = ref(false);
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const isLoading = ref(false);
    const usernameError = ref('');
    const emailError = ref('');
    const passwordError = ref('');
    const confirmError = ref('');
    const passwordStrength = ref(0);
    
    const strengthClass = computed(() => {
      if (password.value.length === 0) return '';
      if (passwordStrength.value < 2) return 'strength-weak';
      if (passwordStrength.value < 4) return 'strength-medium';
      return 'strength-strong';
    });
    
    const strengthText = computed(() => {
      if (password.value.length === 0) return 'Надежность пароля';
      if (passwordStrength.value < 2) return 'Слабый пароль';
      if (passwordStrength.value < 4) return 'Средний пароль';
      return 'Надежный пароль';
    });
    
    const togglePassword = (field) => {
      if (field === 1) {
        showPassword.value = !showPassword.value;
      } else {
        showConfirmPassword.value = !showConfirmPassword.value;
      }
    };
    
    const checkPasswordStrength = () => {
      passwordError.value = '';
      let strength = 0;
      
      if (password.value.length >= 8) strength += 1;
      if (password.value.match(/[A-Z]/)) strength += 1;
      if (password.value.match(/[0-9]/)) strength += 1;
      if (password.value.match(/[^a-zA-Z0-9]/)) strength += 1;
      
      passwordStrength.value = strength;
      
      // Also check match if confirm password is already filled
      if (confirmPassword.value) {
        checkPasswordMatch();
      }
    };
    
    const checkPasswordMatch = () => {
      confirmError.value = '';
      if (confirmPassword.value && password.value !== confirmPassword.value) {
        confirmError.value = 'Пароли не совпадают';
      }
    };
    
    const validateForm = () => {
      let isValid = true;
      
      // Проверка имени пользователя
      if (username.value.length < 3 || username.value.length > 16) {
        usernameError.value = 'Имя пользователя должно быть от 3 до 16 символов';
        isValid = false;
      }
      
      // Проверка email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        emailError.value = 'Пожалуйста, введите корректный email';
        isValid = false;
      }
      
      // Проверка надежности пароля
      if (password.value.length < 8) {
        passwordError.value = 'Пароль должен содержать минимум 8 символов';
        isValid = false;
      }
      
      // Проверка паролей на совпадение
      if (password.value !== confirmPassword.value) {
        confirmError.value = 'Пароли не совпадают';
        isValid = false;
      }
      
      // Проверка согласия с правилами
      if (!agreeTerms.value) {
        alert('Вы должны согласиться с правилами сервера');
        isValid = false;
      }
      
      return isValid;
    };
    
    const submitForm = async () => {
      if (!validateForm()) return;
      
      isLoading.value = true;
      
      try {
        // Simulating API call with setTimeout
        setTimeout(() => {
          // Register action
          store.dispatch('register', {
            username: username.value,
            email: email.value
          });
          
          // Redirect to profile page
          router.push('/profile');
        }, 1500);
      } catch (error) {
        console.error('Registration error:', error);
        isLoading.value = false;
      }
    };
    
    return {
      username,
      email,
      password,
      confirmPassword,
      agreeTerms,
      showPassword,
      showConfirmPassword,
      isLoading,
      usernameError,
      emailError,
      passwordError,
      confirmError,
      strengthClass,
      strengthText,
      togglePassword,
      checkPasswordStrength,
      checkPasswordMatch,
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
  width: 450px;
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

.remember-me label a {
  color: #8B5CF6;
  text-decoration: none;
  transition: all 0.3s;
}

.remember-me label a:hover {
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

/* Password strength indicator */
.password-strength {
  height: 5px;
  margin-top: 8px;
  border-radius: 3px;
  background: #e5e7eb;
  overflow: hidden;
  transition: all 0.3s ease;
}

.password-strength-meter {
  height: 100%;
  width: 0;
  transition: all 0.3s ease;
}

.strength-weak .password-strength-meter {
  width: 30%;
  background: #ef4444;
}

.strength-medium .password-strength-meter {
  width: 60%;
  background: #f59e0b;
}

.strength-strong .password-strength-meter {
  width: 100%;
  background: #10b981;
}

.password-strength-text {
  font-size: 0.8rem;
  margin-top: 0.3rem;
  color: #9CA3AF;
}

.strength-weak .password-strength-text {
  color: #ef4444;
}

.strength-medium .password-strength-text {
  color: #f59e0b;
}

.strength-strong .password-strength-text {
  color: #10b981;
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
</style>

<script>
onMounted(() => {
  setTimeout(() => {
    document.querySelector('.auth-card').style.opacity = '1';
  }, 100);
});
</script> 