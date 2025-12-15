export enum ViewId {
  DAILY_INSPECTION = 'daily_inspection',
  OPERATION_VIEW = 'operation_view',
  ALARM_QUERY = 'alarm_query',
  AGENT_STATUS = 'agent_status',
  SCRIPT_EXEC = 'script_exec'
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  children?: {
    id: ViewId;
    label: string;
  }[];
}

export interface HostMetric {
  id: string;
  ip: string;
  hostname: string;
  role: string;
  cpu: number;
  memory: number;
  diskRoot: number;
  diskData: number;
  processStatus: 'running' | 'stopped' | 'warning';
  agentStatus: 'running' | 'stopped';
}

export interface AgentRecord {
  id: string;
  businessName: string;
  systemName: string;
  hostName: string;
  ip: string;
  cloudArea: string;
  execStatus: 'Success' | 'Failed' | 'Pending';
  execResult: string;
}

export interface ComponentStatus {
  name: string;
  status: 'running' | 'stopped' | 'warning';
  node: string;
  ip: string;
}