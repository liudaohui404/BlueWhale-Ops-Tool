import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { ViewId } from './types';
import DailyInspectionView from './components/DailyInspectionView.vue';
import AgentStatusView from './components/AgentStatusView.vue';
import PlaceholderView from './components/PlaceholderView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: `/${ViewId.DAILY_INSPECTION}`
  },
  {
    path: `/${ViewId.DAILY_INSPECTION}`,
    name: ViewId.DAILY_INSPECTION,
    component: DailyInspectionView,
    meta: { title: '日常巡检' }
  },
  {
    path: `/${ViewId.OPERATION_VIEW}`,
    name: ViewId.OPERATION_VIEW,
    component: PlaceholderView,
    meta: { title: '运行视图 (Operation View)' }
  },
  {
    path: `/${ViewId.ALARM_QUERY}`,
    name: ViewId.ALARM_QUERY,
    component: PlaceholderView,
    meta: { title: '告警查询 (Alarm Query)' }
  },
  {
    path: `/${ViewId.AGENT_STATUS}`,
    name: ViewId.AGENT_STATUS,
    component: AgentStatusView,
    meta: { title: 'agent状态检查' }
  },
  {
    path: `/${ViewId.SCRIPT_EXEC}`,
    name: ViewId.SCRIPT_EXEC,
    component: PlaceholderView,
    meta: { title: '脚本执行检查 (Script Check)' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
