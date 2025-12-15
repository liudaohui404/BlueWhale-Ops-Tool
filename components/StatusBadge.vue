<template>
  <span :class="['status-badge', statusClass]">
    <el-icon v-if="status === 'running' || status === 'Success'"><CircleCheck /></el-icon>
    <el-icon v-else-if="status === 'stopped' || status === 'Failed'"><CircleClose /></el-icon>
    <el-icon v-else><Warning /></el-icon>
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CircleCheck, CircleClose, Warning } from '@element-plus/icons-vue';

const props = defineProps<{
  status: string;
}>();

const statusClass = computed(() => {
  if (props.status === 'running' || props.status === 'Success') {
    return 'status-success';
  }
  if (props.status === 'stopped' || props.status === 'Failed') {
    return 'status-error';
  }
  return 'status-warning';
});
</script>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  font-size: 14px;
}

.status-success {
  color: #16a34a;
}

.status-error {
  color: #dc2626;
}

.status-warning {
  color: #ca8a04;
}
</style>
