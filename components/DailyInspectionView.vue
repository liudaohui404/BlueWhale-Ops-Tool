<template>
  <div class="daily-inspection">
    <!-- Top Bar Context -->
    <div class="context-bar">
      <div class="context-left">
        <span class="context-label">选择环境:</span>
        <el-select v-model="selectedEnv" placeholder="选择环境" size="small">
          <el-option label="公共蓝鲸" value="public" />
          <el-option label="生产环境" value="prod" />
          <el-option label="测试环境" value="test" />
        </el-select>
      </div>
      <div class="context-right">
        <span class="update-time">最后更新时间: 2025年12月4日 14:22:21</span>
        <el-button type="primary" size="small" :icon="Refresh">更新</el-button>
      </div>
    </div>

    <!-- Host Status Section -->
    <div class="section">
      <div class="section-header">主机运行情况</div>
      <el-table :data="hosts" border stripe style="width: 100%">
        <el-table-column prop="ip" label="主机IP" width="120" />
        <el-table-column prop="hostname" label="主机名" width="140" />
        <el-table-column prop="role" label="角色" width="100" />
        <el-table-column prop="cpu" label="CPU使用率" width="120">
          <template #default="{ row }">
            <span :class="{ 'text-danger': row.cpu > 80 }">{{ row.cpu }}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="memory" label="内存使用率" width="120">
          <template #default="{ row }">
            <span :class="{ 'text-danger': row.memory > 80 }">{{ row.memory }}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="diskRoot" label="/根目录使用率" width="140">
          <template #default="{ row }">
            {{ row.diskRoot }}%
          </template>
        </el-table-column>
        <el-table-column prop="diskData" label="/data使用率" width="120">
          <template #default="{ row }">
            {{ row.diskData }}%
          </template>
        </el-table-column>
        <el-table-column prop="processStatus" label="xx服务" width="120">
          <template #default="{ row }">
            <StatusBadge :status="row.processStatus" />
          </template>
        </el-table-column>
        <el-table-column prop="agentStatus" label="xx服务" width="120">
          <template #default="{ row }">
            <StatusBadge :status="row.agentStatus" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Component Status Section -->
    <div class="section">
      <div class="section-header">组件运行情况</div>
      <el-row :gutter="16">
        <el-col v-for="(comp, idx) in components" :key="idx" :xs="24" :sm="12" :lg="8">
          <el-card class="component-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>{{ comp.name }}</span>
                <el-button type="primary" size="small">操作</el-button>
              </div>
            </template>
            <div class="card-body">
              <div class="card-info">
                <p>节点: {{ comp.node }}</p>
                <p>IP: {{ comp.ip }}</p>
              </div>
              <el-tag :type="comp.status === 'running' ? 'success' : 'warning'" size="small">
                {{ comp.status === 'running' ? '运行中' : '警告' }}
              </el-tag>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- Service Status Section -->
    <div class="section">
      <div class="section-header">蓝鲸服务运行情况</div>
      <div class="empty-placeholder">
        <el-empty description="暂无数据展示" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Refresh } from '@element-plus/icons-vue';
import type { HostMetric, ComponentStatus } from '../types';
import StatusBadge from './StatusBadge.vue';

const selectedEnv = ref('public');

const hosts = ref<HostMetric[]>([
  { id: '1', ip: '1.1.1.1', hostname: 'bk-node-01', role: 'BlueKing', cpu: 99, memory: 55, diskRoot: 30, diskData: 33, processStatus: 'running', agentStatus: 'running' },
  { id: '2', ip: '1.1.1.2', hostname: 'bk-node-02', role: 'BlueKing', cpu: 12, memory: 45, diskRoot: 28, diskData: 40, processStatus: 'running', agentStatus: 'running' },
  { id: '3', ip: '1.1.1.3', hostname: 'bk-db-01', role: 'Database', cpu: 4, memory: 82, diskRoot: 45, diskData: 60, processStatus: 'running', agentStatus: 'running' },
]);

const components = ref<ComponentStatus[]>([
  { name: 'redis', status: 'running', node: 'bk-redis-01', ip: '10.0.0.5' },
  { name: 'rabbitmq', status: 'running', node: 'bk-rabbit-01', ip: '10.0.0.6' },
  { name: 'consul', status: 'running', node: 'bk-consul-01', ip: '10.0.0.7' },
  { name: 'zookeeper', status: 'warning', node: 'bk-zk-01', ip: '10.0.0.8' },
]);
</script>

<style scoped>
.daily-inspection {
  padding: 16px;
}

.context-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eff6ff;
  padding: 12px 16px;
  border: 1px solid #dbeafe;
  border-radius: 4px;
  margin-bottom: 16px;
}

.context-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.context-label {
  font-weight: bold;
  color: #334155;
}

.context-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.update-time {
  color: #64748b;
  font-size: 14px;
}

.section {
  margin-bottom: 24px;
}

.section-header {
  background: #f1f5f9;
  border-left: 4px solid #2563eb;
  padding: 8px 16px;
  margin-bottom: 16px;
  font-weight: bold;
  color: #334155;
  font-size: 14px;
}

.text-danger {
  color: #ef4444;
  font-weight: bold;
}

.component-card {
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-info {
  font-size: 12px;
  color: #64748b;
}

.card-info p {
  margin: 4px 0;
}

.empty-placeholder {
  height: 128px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
