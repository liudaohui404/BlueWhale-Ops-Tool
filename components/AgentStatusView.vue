<template>
  <div class="agent-status">
    <!-- Filter & Action Bar -->
    <div class="filter-bar">
      <div class="filter-left">
        <span class="filter-label">选择环境:</span>
        <el-select v-model="selectedEnv" placeholder="选择环境" size="default">
          <el-option label="公共蓝鲸" value="public" />
          <el-option label="私有环境 A" value="private" />
        </el-select>
      </div>
      <div class="filter-right">
        <span class="update-time">最后更新时间: 2025年12月4日 14:22:21</span>
        <el-button type="primary">更新</el-button>
      </div>
    </div>

    <!-- Table -->
    <el-table
      :data="agents"
      border
      stripe
      style="width: 100%"
      :row-class-name="tableRowClassName"
      header-cell-class-name="table-header"
    >
      <el-table-column prop="businessName" label="业务名称" min-width="180" />
      <el-table-column prop="systemName" label="系统名称" min-width="140" />
      <el-table-column prop="hostName" label="主机名称" min-width="140" />
      <el-table-column prop="ip" label="主机IP" min-width="140">
        <template #default="{ row }">
          <span class="ip-cell">{{ row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cloudArea" label="云区域" min-width="100" />
      <el-table-column prop="execStatus" label="执行状态" min-width="120">
        <template #default="{ row }">
          <el-tag
            :type="getStatusType(row.execStatus)"
            size="small"
          >
            {{ row.execStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="execResult" label="执行结果" min-width="160" />
    </el-table>

    <!-- Pagination -->
    <div class="pagination-wrapper">
      <span class="pagination-info">共 {{ agents.length }} 条记录</span>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="10"
        :total="agents.length"
        layout="prev, pager, next"
        small
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { AgentRecord } from '../types';

const selectedEnv = ref('public');
const currentPage = ref(1);

const agents = ref<AgentRecord[]>([
  { id: '1', businessName: '浦发银行20251215', systemName: '核心交易系统', hostName: 'app-node-01', ip: '10.20.1.5', cloudArea: 'Default', execStatus: 'Success', execResult: 'Normal' },
  { id: '2', businessName: '浦发银行20251215', systemName: '网银前端', hostName: 'web-node-02', ip: '10.20.1.6', cloudArea: 'Default', execStatus: 'Success', execResult: 'Normal' },
  { id: '3', businessName: '浦发银行20251215', systemName: '大数据分析', hostName: 'data-node-01', ip: '10.20.2.10', cloudArea: 'Area-1', execStatus: 'Failed', execResult: 'Connection Timeout' },
  { id: '4', businessName: '浦发银行20251215', systemName: '支付网关', hostName: 'gw-node-05', ip: '10.20.3.8', cloudArea: 'Default', execStatus: 'Pending', execResult: '-' },
  { id: '5', businessName: '浦发银行20251215', systemName: '日志审计', hostName: 'audit-node-01', ip: '10.20.4.2', cloudArea: 'Area-2', execStatus: 'Success', execResult: 'Normal' },
]);

const getStatusType = (status: string) => {
  if (status === 'Success') return 'success';
  if (status === 'Failed') return 'danger';
  return 'info';
};

const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  return rowIndex % 2 === 0 ? 'row-even' : 'row-odd';
};
</script>

<style scoped>
.agent-status {
  padding: 16px;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  margin-bottom: 16px;
}

.filter-left {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

@media (min-width: 640px) {
  .filter-left {
    margin-bottom: 0;
  }
}

.filter-label {
  font-weight: bold;
  color: #334155;
  font-size: 14px;
}

.filter-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.update-time {
  color: #64748b;
  font-size: 14px;
}

:deep(.table-header) {
  background-color: #0e74bc !important;
  color: white !important;
  font-weight: 600;
}

.ip-cell {
  font-family: monospace;
  color: #64748b;
}

:deep(.row-even) {
  background-color: rgba(239, 246, 255, 0.3);
}

:deep(.row-odd) {
  background-color: white;
}

:deep(.el-table__row:hover > td) {
  background-color: #eff6ff !important;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-top: none;
}

.pagination-info {
  font-size: 12px;
  color: #64748b;
}
</style>
