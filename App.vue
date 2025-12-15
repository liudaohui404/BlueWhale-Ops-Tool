<template>
  <div v-if="!isLoggedIn" class="login-container">
    <div class="login-card">
      <div class="login-icon">
        <el-icon :size="32"><Lock /></el-icon>
      </div>
      <h2 class="login-title">蓝鲸平台运维工具</h2>
      <p class="login-subtitle">请登录以继续访问系统</p>
      
      <el-form @submit.prevent="handleLogin" class="login-form">
        <el-form-item>
          <el-input
            v-model="username"
            placeholder="admin"
            prefix-icon="User"
          >
            <template #prepend>用户名</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="password"
            type="password"
            placeholder="••••••"
            prefix-icon="Lock"
            show-password
          >
            <template #prepend>密码</template>
          </el-input>
        </el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          class="login-button"
        >
          登 录
        </el-button>
      </el-form>
      <div class="login-footer">
        &copy; 2025 蓝鲸智云运维平台
      </div>
    </div>
  </div>
  <Layout v-else @logout="handleLogout">
    <router-view />
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Lock } from '@element-plus/icons-vue';
import Layout from './components/Layout.vue';

const isLoggedIn = ref(false);
const username = ref('');
const password = ref('');

const handleLogin = () => {
  if (username.value && password.value) {
    isLoggedIn.value = true;
  } else {
    ElMessage.warning('请输入用户名和密码 (Please enter username and password)');
  }
};

const handleLogout = () => {
  isLoggedIn.value = false;
  username.value = '';
  password.value = '';
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
}

.login-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 380px;
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: scale(1.01);
}

.login-icon {
  width: 64px;
  height: 64px;
  background: #dbeafe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
  margin: 0 auto 24px;
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #1e293b;
  margin: 0 0 8px;
}

.login-subtitle {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  margin: 0 0 32px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
}

.login-footer {
  margin-top: 24px;
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
}
</style>
