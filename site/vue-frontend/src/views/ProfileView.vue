<template>
  <div class="profile-page">
    <div class="background-overlay"></div>
    
    <div class="container">
      <div class="profile-header">
        <h1>Профиль игрока</h1>
        <div class="profile-actions">
          <button class="btn btn-back" @click="goBack">
            <i class="fas fa-arrow-left"></i> Назад
          </button>
          <button class="btn btn-logout" @click="logout">
            <i class="fas fa-sign-out-alt"></i> Выйти
          </button>
        </div>
      </div>
      
      <div class="profile-content">
        <div class="profile-sidebar">
          <div class="profile-avatar">
            <img :src="avatarUrl" :alt="username" />
            <button class="change-avatar-btn">
              <i class="fas fa-camera"></i>
            </button>
          </div>
          
          <div class="profile-info">
            <h2>{{ username }}</h2>
            <p class="profile-email">{{ email }}</p>
            
            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-value">0</span>
                <span class="stat-label">Часов игры</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">0</span>
                <span class="stat-label">Достижений</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ userLevel }}</span>
                <span class="stat-label">Уровень</span>
              </div>
            </div>
            
            <div class="profile-balance">
              <span class="balance-label">Баланс:</span>
              <span class="balance-value">{{ userBalance }} <i class="fas fa-coins"></i></span>
            </div>
            
            <button class="btn btn-add-balance">
              <i class="fas fa-plus-circle"></i> Пополнить баланс
            </button>
          </div>
        </div>
        
        <div class="profile-main">
          <div class="profile-tabs">
            <button 
              v-for="tab in tabs" 
              :key="tab.id" 
              :class="['tab-button', { active: activeTab === tab.id }]"
              @click="activeTab = tab.id"
            >
              <i :class="tab.icon"></i> {{ tab.name }}
            </button>
          </div>
          
          <div class="tab-content">
            <!-- Вкладка настроек -->
            <div v-if="activeTab === 'settings'" class="settings-tab">
              <h3>Настройки профиля</h3>
              
              <form @submit.prevent="saveSettings">
                <div class="form-group">
                  <label for="username">Имя пользователя</label>
                  <div class="input-group">
                    <span class="input-icon"><i class="fas fa-user"></i></span>
                    <input type="text" id="username" v-model="profileForm.username" placeholder="Имя пользователя">
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email">Email</label>
                  <div class="input-group">
                    <span class="input-icon"><i class="fas fa-envelope"></i></span>
                    <input type="email" id="email" v-model="profileForm.email" placeholder="Email">
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="current-password">Текущий пароль</label>
                  <div class="input-group">
                    <span class="input-icon"><i class="fas fa-lock"></i></span>
                    <input 
                      :type="showPassword ? 'text' : 'password'" 
                      id="current-password" 
                      v-model="profileForm.currentPassword" 
                      placeholder="Введите текущий пароль"
                    >
                    <button type="button" class="toggle-password" @click="togglePassword">
                      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="new-password">Новый пароль</label>
                  <div class="input-group">
                    <span class="input-icon"><i class="fas fa-lock"></i></span>
                    <input 
                      :type="showNewPassword ? 'text' : 'password'" 
                      id="new-password" 
                      v-model="profileForm.newPassword" 
                      placeholder="Введите новый пароль"
                    >
                    <button type="button" class="toggle-password" @click="toggleNewPassword">
                      <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                </div>
                
                <div class="form-group">
                  <label>Уведомления</label>
                  <div class="checkbox-group">
                    <label class="checkbox-label">
                      <input type="checkbox" v-model="profileForm.emailNotifications">
                      <span class="checkbox-text">Получать уведомления на email</span>
                    </label>
                  </div>
                </div>
                
                <button type="submit" class="btn btn-save">Сохранить изменения</button>
              </form>
            </div>
            
            <!-- Вкладка привилегий -->
            <div v-if="activeTab === 'privileges'" class="privileges-tab">
              <h3>Ваши привилегии</h3>
              
              <div class="no-privileges" v-if="privileges.length === 0">
                <img src="@/assets/images/minecraft-chest.png" alt="Minecraft Chest" />
                <p>У вас пока нет привилегий</p>
                <button class="btn btn-primary">Приобрести привилегии</button>
              </div>
              
              <div class="privileges-list" v-else>
                <div 
                  v-for="privilege in privileges" 
                  :key="privilege.id" 
                  class="privilege-item"
                >
                  <div class="privilege-icon">
                    <i :class="privilege.icon"></i>
                  </div>
                  <div class="privilege-info">
                    <h4>{{ privilege.name }}</h4>
                    <p>{{ privilege.description }}</p>
                    <div class="privilege-expiry">
                      <span>Истекает через: {{ privilege.expiresIn }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Вкладка скинов -->
            <div v-if="activeTab === 'skins'" class="skins-tab">
              <h3>Управление скинами</h3>
              
              <div class="skins-content">
                <div class="skin-preview">
                  <div class="skin-model">
                    <img src="@/assets/images/minecraft-skin.png" alt="Minecraft Skin" />
                  </div>
                  <div class="skin-upload">
                    <p>Загрузите свой скин в формате PNG (64x64)</p>
                    <label class="upload-button">
                      <input type="file" accept=".png" @change="onSkinFileSelected">
                      <i class="fas fa-upload"></i> Загрузить скин
                    </label>
                  </div>
                </div>
                
                <div class="skin-library">
                  <h4>Библиотека скинов</h4>
                  <div class="skins-grid">
                    <div class="skin-item" v-for="n in 6" :key="n">
                      <img src="@/assets/images/skin-thumbnail.png" alt="Skin thumbnail" />
                      <div class="skin-item-actions">
                        <button class="skin-action-btn apply">Применить</button>
                        <button class="skin-action-btn delete">Удалить</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'ProfileView',
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const username = computed(() => store.getters.username);
    const email = computed(() => store.getters.email);
    const avatarUrl = computed(() => store.getters.avatarUrl || 'https://mc-heads.net/avatar/' + username.value);
    
    const userBalance = ref(0);
    const userLevel = ref(1);
    
    const showPassword = ref(false);
    const showNewPassword = ref(false);
    const activeTab = ref('settings');
    
    const profileForm = ref({
      username: username.value,
      email: email.value,
      currentPassword: '',
      newPassword: '',
      emailNotifications: true
    });
    
    const tabs = [
      { id: 'settings', name: 'Настройки', icon: 'fas fa-cog' },
      { id: 'privileges', name: 'Привилегии', icon: 'fas fa-crown' },
      { id: 'skins', name: 'Скины', icon: 'fas fa-tshirt' }
    ];
    
    const privileges = ref([]);
    
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    
    const toggleNewPassword = () => {
      showNewPassword.value = !showNewPassword.value;
    };
    
    const saveSettings = () => {
      // Здесь будет обработка обновления профиля
      // Сейчас просто имитируем успешное сохранение
      alert('Настройки успешно сохранены');
    };
    
    const onSkinFileSelected = (event) => {
      // Здесь будет обработка загрузки скина
      // Сейчас просто имитируем успешную загрузку
      alert('Скин успешно загружен');
    };
    
    const logout = () => {
      store.dispatch('logout');
      router.push('/login');
    };
    
    const goBack = () => {
      router.push('/');
    };
    
    onMounted(() => {
      // Здесь можно получить данные пользователя с сервера
      // Сейчас просто имитируем загрузку данных
      setTimeout(() => {
        userBalance.value = 500;
        userLevel.value = 5;
      }, 1000);
    });
    
    return {
      username,
      email,
      avatarUrl,
      userBalance,
      userLevel,
      showPassword,
      showNewPassword,
      activeTab,
      profileForm,
      tabs,
      privileges,
      togglePassword,
      toggleNewPassword,
      saveSettings,
      onSkinFileSelected,
      logout,
      goBack
    };
  }
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding: 80px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.profile-header h1 {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
}

.profile-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-back {
  background-color: #3f3f46;
  color: #ffffff;
}

.btn-back:hover {
  background-color: #52525b;
}

.btn-logout {
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.btn-logout:hover {
  background-color: #ef4444;
  color: #ffffff;
}

.profile-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  background-color: rgba(30, 41, 59, 0.8);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.profile-sidebar {
  background-color: rgba(15, 23, 42, 0.6);
  padding: 30px;
}

.profile-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.change-avatar-btn {
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #8B5CF6;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.change-avatar-btn:hover {
  background: #7c4edc;
  transform: scale(1.1);
}

.profile-info h2 {
  color: #ffffff;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 5px;
}

.profile-email {
  color: #9CA3AF;
  text-align: center;
  margin-bottom: 20px;
}

.profile-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px;
  background-color: rgba(30, 41, 59, 0.5);
  border-radius: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
}

.stat-label {
  font-size: 0.8rem;
  color: #9CA3AF;
}

.profile-balance {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  gap: 5px;
}

.balance-label {
  color: #9CA3AF;
}

.balance-value {
  color: #f59e0b;
  font-weight: 700;
  font-size: 1.2rem;
}

.btn-add-balance {
  width: 100%;
  background: linear-gradient(90deg, #f59e0b, #d97706);
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  font-weight: 600;
  margin-top: 10px;
}

.btn-add-balance:hover {
  background: linear-gradient(90deg, #d97706, #b45309);
  box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
}

.profile-main {
  padding: 30px;
}

.profile-tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  border-bottom: 1px solid #374151;
  padding-bottom: 15px;
}

.tab-button {
  background: transparent;
  border: none;
  color: #9CA3AF;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-button:hover {
  color: #ffffff;
}

.tab-button.active {
  color: #8B5CF6;
  border-bottom: 2px solid #8B5CF6;
}

.tab-content {
  padding: 20px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #e4e6eb;
  font-weight: 500;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(30, 41, 59, 0.7);
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s;
  border: 1px solid rgba(55, 65, 81, 0.5);
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
  padding: 12px 10px;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1rem;
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

.checkbox-group {
  margin-top: 5px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-label input {
  margin-right: 10px;
}

.checkbox-text {
  color: #e4e6eb;
}

.btn-save {
  background: linear-gradient(90deg, #8B5CF6, #6366F1);
  color: #ffffff;
  padding: 12px 20px;
  width: 100%;
  margin-top: 10px;
}

.btn-save:hover {
  background: linear-gradient(90deg, #7c4edc, #5457db);
  box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
}

.no-privileges {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.no-privileges img {
  width: 100px;
  margin-bottom: 20px;
}

.no-privileges p {
  color: #9CA3AF;
  margin-bottom: 20px;
}

.btn-primary {
  background: linear-gradient(90deg, #8B5CF6, #6366F1);
  color: #ffffff;
}

.privileges-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.privilege-item {
  display: flex;
  background-color: rgba(30, 41, 59, 0.5);
  border-radius: 10px;
  padding: 15px;
  transition: all 0.3s ease;
}

.privilege-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.privilege-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #8B5CF6, #6366F1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 20px;
  color: #ffffff;
}

.privilege-info h4 {
  color: #ffffff;
  margin-bottom: 5px;
}

.privilege-info p {
  color: #9CA3AF;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.privilege-expiry {
  font-size: 0.8rem;
  color: #f59e0b;
}

.skins-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
}

.skin-preview {
  background-color: rgba(30, 41, 59, 0.5);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.skin-model {
  margin-bottom: 20px;
}

.skin-model img {
  height: 200px;
}

.skin-upload p {
  color: #9CA3AF;
  margin-bottom: 15px;
}

.upload-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(90deg, #8B5CF6, #6366F1);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-button:hover {
  background: linear-gradient(90deg, #7c4edc, #5457db);
  transform: translateY(-2px);
}

.upload-button input {
  display: none;
}

.skin-library h4 {
  color: #ffffff;
  margin-bottom: 15px;
}

.skins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 15px;
}

.skin-item {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.skin-item img {
  width: 100%;
  display: block;
}

.skin-item:hover .skin-item-actions {
  opacity: 1;
}

.skin-item-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skin-action-btn {
  flex: 1;
  padding: 5px;
  border: none;
  font-size: 0.7rem;
  cursor: pointer;
}

.skin-action-btn.apply {
  background-color: #10b981;
  color: white;
}

.skin-action-btn.delete {
  background-color: #ef4444;
  color: white;
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
  }
  
  .skins-content {
    grid-template-columns: 1fr;
  }
}
</style> 