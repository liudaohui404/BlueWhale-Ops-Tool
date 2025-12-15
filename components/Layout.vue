<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <el-icon><DataLine /></el-icon>
        <span>蓝鲸平台运维工具</span>
      </div>

      <el-menu
        :default-openeds="['ops', 'agent']"
        :default-active="currentRoute"
        class="sidebar-menu"
        background-color="#1a2b42"
        text-color="#94a3b8"
        active-text-color="#ffffff"
        @select="handleMenuSelect"
      >
        <el-sub-menu index="ops">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>蓝鲸平台运维</span>
          </template>
          <el-menu-item :index="ViewId.DAILY_INSPECTION">
            <span class="menu-dot" :class="{ active: currentRoute === ViewId.DAILY_INSPECTION }"></span>
            日常巡检
          </el-menu-item>
          <el-menu-item :index="ViewId.OPERATION_VIEW">
            <span class="menu-dot" :class="{ active: currentRoute === ViewId.OPERATION_VIEW }"></span>
            运行视图
          </el-menu-item>
          <el-menu-item :index="ViewId.ALARM_QUERY">
            <span class="menu-dot" :class="{ active: currentRoute === ViewId.ALARM_QUERY }"></span>
            告警查询
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="agent">
          <template #title>
            <el-icon><ShieldCheck /></el-icon>
            <span>蓝鲸Agent检查</span>
          </template>
          <el-menu-item :index="ViewId.AGENT_STATUS">
            <span class="menu-dot" :class="{ active: currentRoute === ViewId.AGENT_STATUS }"></span>
            agent状态检查
          </el-menu-item>
          <el-menu-item :index="ViewId.SCRIPT_EXEC">
            <span class="menu-dot" :class="{ active: currentRoute === ViewId.SCRIPT_EXEC }"></span>
            脚本执行检查
          </el-menu-item>
        </el-sub-menu>
      </el-menu>

      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar">
            <el-icon><User /></el-icon>
          </div>
          <div class="user-details">
            <p class="user-name">Admin User</p>
            <p class="user-role">System Admin</p>
          </div>
          <el-button
            type="danger"
            :icon="SwitchButton"
            circle
            size="small"
            @click="$emit('logout')"
            title="退出登录"
          />
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="main-area">
      <!-- Top Header -->
      <header class="top-header">
        <h1 class="breadcrumb">{{ breadcrumb }}</h1>
        <div class="header-actions">
          <div class="status-badge">
            <span class="status-dot"></span>
            System Operational
          </div>
          <el-divider direction="vertical" />
          <el-badge :value="3" :max="99">
            <el-button :icon="Bell" circle />
          </el-badge>
        </div>
      </header>

      <!-- Page Content -->
      <main class="page-content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { 
  Monitor, 
  DataLine, 
  User, 
  Bell, 
  SwitchButton 
} from '@element-plus/icons-vue';
import { ViewId } from '../types';

// ShieldCheck is not in element-plus icons, we'll use a different icon
const ShieldCheck = Monitor;

defineEmits<{
  logout: []
}>();

const router = useRouter();
const route = useRoute();

const currentRoute = computed(() => route.name as string);

const menuConfig = [
  {
    id: 'ops',
    label: '蓝鲸平台运维',
    children: [
      { id: ViewId.DAILY_INSPECTION, label: '日常巡检' },
      { id: ViewId.OPERATION_VIEW, label: '运行视图' },
      { id: ViewId.ALARM_QUERY, label: '告警查询' },
    ]
  },
  {
    id: 'agent',
    label: '蓝鲸Agent检查',
    children: [
      { id: ViewId.AGENT_STATUS, label: 'agent状态检查' },
      { id: ViewId.SCRIPT_EXEC, label: '脚本执行检查' },
    ]
  }
];

const breadcrumb = computed(() => {
  for (const menu of menuConfig) {
    const found = menu.children?.find(c => c.id === currentRoute.value);
    if (found) {
      return `${menu.label} / ${found.label}`;
    }
  }
  return 'Dashboard';
});

const handleMenuSelect = (index: string) => {
  router.push(`/${index}`);
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #f1f5f9;
}

.sidebar {
  width: 256px;
  background: #1a2b42;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 20;
}

.sidebar-header {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #142233;
  border-bottom: 1px solid #334155;
  font-weight: bold;
  color: white;
  letter-spacing: 0.5px;
  gap: 8px;
}

.sidebar-header .el-icon {
  color: #60a5fa;
  font-size: 20px;
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  border-right: none;
  padding: 16px 0;
}

.sidebar-menu :deep(.el-sub-menu__title) {
  font-weight: 500;
}

.sidebar-menu :deep(.el-menu-item) {
  padding-left: 48px !important;
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  background: #2563eb !important;
}

.menu-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #64748b;
  margin-right: 8px;
  display: inline-block;
}

.menu-dot.active {
  background: white;
}

.sidebar-footer {
  padding: 16px;
  background: #142233;
  border-top: 1px solid #334155;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1e40af;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 1px solid #3b82f6;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-role {
  font-size: 12px;
  color: #94a3b8;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.top-header {
  height: 56px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 10;
}

.breadcrumb {
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  background: #f1f5f9;
  padding: 6px 12px;
  border-radius: 9999px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.page-content {
  flex: 1;
  overflow: auto;
  background: #f3f5f8;
  padding: 0;
}
</style>
