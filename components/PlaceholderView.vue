<template>
  <div class="placeholder-view">
    <el-icon :size="48" class="placeholder-icon"><Monitor /></el-icon>
    <h2 class="placeholder-title">{{ title || $route.meta.title }}</h2>
    <p class="placeholder-desc">该模块正在开发中...</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Monitor } from '@element-plus/icons-vue';

defineProps<{
  title?: string;
}>();

const $route = useRoute();
</script>

<style scoped>
.placeholder-view {
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 16px;
  border-radius: 4px;
  border: 1px dashed #e2e8f0;
  background: #f8fafc;
}

.placeholder-icon {
  color: #cbd5e1;
  margin-bottom: 16px;
}

.placeholder-title {
  font-size: 20px;
  font-weight: 600;
  color: #64748b;
  margin: 0;
}

.placeholder-desc {
  margin-top: 8px;
  font-size: 14px;
  color: #94a3b8;
}
</style>
