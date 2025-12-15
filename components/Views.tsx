import React, { useState } from 'react';
import { RefreshCw, Play, AlertCircle, Server, CheckCircle, XCircle } from 'lucide-react';
import { HostMetric, AgentRecord, ComponentStatus } from '../types';

// --- Shared Components ---

const SectionHeader = ({ title }: { title: string }) => (
  <div className="bg-slate-100 border-l-4 border-blue-600 px-4 py-2 mb-4 font-bold text-slate-700 text-sm">
    {title}
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'running' || status === 'Success') {
    return <span className="text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> {status}</span>;
  }
  if (status === 'stopped' || status === 'Failed') {
    return <span className="text-red-600 font-medium flex items-center gap-1"><XCircle size={14} /> {status}</span>;
  }
  return <span className="text-yellow-600 font-medium flex items-center gap-1"><AlertCircle size={14} /> {status}</span>;
};

// --- View: Daily Inspection (Imitating Screenshot 2) ---

export const DailyInspectionView: React.FC = () => {
  const [hosts] = useState<HostMetric[]>([
    { id: '1', ip: '1.1.1.1', hostname: 'bk-node-01', role: 'BlueKing', cpu: 99, memory: 55, diskRoot: 30, diskData: 33, processStatus: 'running', agentStatus: 'running' },
    { id: '2', ip: '1.1.1.2', hostname: 'bk-node-02', role: 'BlueKing', cpu: 12, memory: 45, diskRoot: 28, diskData: 40, processStatus: 'running', agentStatus: 'running' },
    { id: '3', ip: '1.1.1.3', hostname: 'bk-db-01', role: 'Database', cpu: 4, memory: 82, diskRoot: 45, diskData: 60, processStatus: 'running', agentStatus: 'running' },
  ]);

  const [components] = useState<ComponentStatus[]>([
    { name: 'redis', status: 'running', node: 'bk-redis-01', ip: '10.0.0.5' },
    { name: 'rabbitmq', status: 'running', node: 'bk-rabbit-01', ip: '10.0.0.6' },
    { name: 'consul', status: 'running', node: 'bk-consul-01', ip: '10.0.0.7' },
    { name: 'zookeeper', status: 'warning', node: 'bk-zk-01', ip: '10.0.0.8' },
  ]);

  return (
    <div className="p-4 space-y-6">
      
      {/* Top Bar Context */}
      <div className="flex justify-between items-center bg-blue-50 p-2 border border-blue-100 rounded text-sm mb-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-slate-700">选择环境:</span>
          <select className="bg-white border border-slate-300 rounded px-2 py-1 text-slate-600 focus:outline-none focus:border-blue-500">
            <option>公共蓝鲸</option>
            <option>生产环境</option>
            <option>测试环境</option>
          </select>
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <span>最后更新时间: 2025年12月4日 14:22:21</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-xs flex items-center gap-1">
            <RefreshCw size={12} /> 更新
          </button>
        </div>
      </div>

      {/* Host Status Section */}
      <div>
        <SectionHeader title="主机运行情况" />
        <div className="overflow-x-auto border border-slate-200 shadow-sm">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="bg-slate-200 text-slate-700 font-bold uppercase text-xs">
              <tr>
                <th className="px-4 py-3">主机IP</th>
                <th className="px-4 py-3">主机名</th>
                <th className="px-4 py-3">角色</th>
                <th className="px-4 py-3">CPU使用率</th>
                <th className="px-4 py-3">内存使用率</th>
                <th className="px-4 py-3">/根目录使用率</th>
                <th className="px-4 py-3">/data使用率</th>
                <th className="px-4 py-3">xx服务</th>
                <th className="px-4 py-3">xx服务</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {hosts.map((host) => (
                <tr key={host.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium">{host.ip}</td>
                  <td className="px-4 py-3">{host.hostname}</td>
                  <td className="px-4 py-3">{host.role}</td>
                  <td className={`px-4 py-3 font-bold ${host.cpu > 80 ? 'text-red-500' : 'text-slate-600'}`}>
                    {host.cpu}%
                  </td>
                  <td className={`px-4 py-3 font-bold ${host.memory > 80 ? 'text-red-500' : 'text-slate-600'}`}>
                    {host.memory}%
                  </td>
                  <td className="px-4 py-3">{host.diskRoot}%</td>
                  <td className="px-4 py-3">{host.diskData}%</td>
                  <td className="px-4 py-3"><StatusBadge status={host.processStatus} /></td>
                  <td className="px-4 py-3"><StatusBadge status={host.agentStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Component Status Section */}
      <div>
        <SectionHeader title="组件运行情况" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map((comp, idx) => (
            <div key={idx} className="border border-slate-200 rounded-sm bg-white shadow-sm flex flex-col">
               <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700 flex justify-between items-center text-sm border-b border-slate-200">
                 <span>{comp.name}</span>
                 {/* Simulate the blue button in screenshot */}
                 <button className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded hover:bg-blue-600">操作</button>
               </div>
               <div className="p-4 flex items-center justify-between">
                 <div className="text-xs text-slate-500 space-y-1">
                    <p>节点: {comp.node}</p>
                    <p>IP: {comp.ip}</p>
                 </div>
                 {comp.status === 'running' ? (
                   <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">运行中</span>
                 ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">警告</span>
                 )}
               </div>
            </div>
          ))}
        </div>
      </div>
       
       {/* Service Status Section (Empty Placeholder as per screenshot bottom) */}
       <div>
         <SectionHeader title="蓝鲸服务运行情况" />
         <div className="h-32 bg-slate-50 border border-slate-200 rounded flex items-center justify-center text-slate-400 text-sm">
            暂无数据展示
         </div>
       </div>

    </div>
  );
};

// --- View: Agent Status (Imitating Screenshot 1) ---

export const AgentStatusView: React.FC = () => {
    const [agents] = useState<AgentRecord[]>([
        { id: '1', businessName: '浦发银行20251215', systemName: '核心交易系统', hostName: 'app-node-01', ip: '10.20.1.5', cloudArea: 'Default', execStatus: 'Success', execResult: 'Normal' },
        { id: '2', businessName: '浦发银行20251215', systemName: '网银前端', hostName: 'web-node-02', ip: '10.20.1.6', cloudArea: 'Default', execStatus: 'Success', execResult: 'Normal' },
        { id: '3', businessName: '浦发银行20251215', systemName: '大数据分析', hostName: 'data-node-01', ip: '10.20.2.10', cloudArea: 'Area-1', execStatus: 'Failed', execResult: 'Connection Timeout' },
        { id: '4', businessName: '浦发银行20251215', systemName: '支付网关', hostName: 'gw-node-05', ip: '10.20.3.8', cloudArea: 'Default', execStatus: 'Pending', execResult: '-' },
        { id: '5', businessName: '浦发银行20251215', systemName: '日志审计', hostName: 'audit-node-01', ip: '10.20.4.2', cloudArea: 'Area-2', execStatus: 'Success', execResult: 'Normal' },
    ]);

    return (
        <div className="p-4">
             {/* Filter & Action Bar */}
             <div className="flex flex-wrap justify-between items-center bg-slate-50 p-3 border border-slate-200 rounded mb-4">
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                    <span className="font-bold text-slate-700 text-sm">选择环境:</span>
                    <div className="relative">
                        <select className="appearance-none bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-8">
                            <option>公共蓝鲸</option>
                            <option>私有环境 A</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600">
                    <span>最后更新时间: 2025年12月4日 14:22:21</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-4 rounded transition-colors shadow-sm active:scale-95">
                        更新
                    </button>
                </div>
             </div>

             {/* Table */}
             <div className="overflow-hidden rounded border border-slate-300 shadow-sm">
                 <table className="w-full text-sm text-left">
                     <thead className="bg-[#0e74bc] text-white">
                         <tr>
                             <th className="px-4 py-3 font-semibold tracking-wide">业务名称</th>
                             <th className="px-4 py-3 font-semibold tracking-wide">系统名称</th>
                             <th className="px-4 py-3 font-semibold tracking-wide">主机名称</th>
                             <th className="px-4 py-3 font-semibold tracking-wide">主机IP</th>
                             <th className="px-4 py-3 font-semibold tracking-wide">云区域</th>
                             <th className="px-4 py-3 font-semibold tracking-wide">执行状态</th>
                             <th className="px-4 py-3 font-semibold tracking-wide">执行结果</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-200 bg-white">
                         {agents.map((agent, index) => (
                             <tr key={agent.id} className={`${index % 2 === 0 ? 'bg-blue-50/30' : 'bg-white'} hover:bg-blue-50`}>
                                 <td className="px-4 py-2.5">{agent.businessName}</td>
                                 <td className="px-4 py-2.5">{agent.systemName}</td>
                                 <td className="px-4 py-2.5">{agent.hostName}</td>
                                 <td className="px-4 py-2.5 font-mono text-slate-600">{agent.ip}</td>
                                 <td className="px-4 py-2.5">{agent.cloudArea}</td>
                                 <td className="px-4 py-2.5">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                        ${agent.execStatus === 'Success' ? 'bg-green-100 text-green-800' :
                                          agent.execStatus === 'Failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {agent.execStatus}
                                    </span>
                                 </td>
                                 <td className="px-4 py-2.5 text-slate-500">{agent.execResult}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
                 {/* Pagination Mock */}
                 <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex justify-end items-center text-xs text-slate-500 gap-2">
                     <span>共 5 条记录</span>
                     <div className="flex gap-1">
                        <button className="px-2 py-1 border rounded bg-white hover:bg-slate-100 disabled:opacity-50" disabled>&lt;</button>
                        <button className="px-2 py-1 border rounded bg-blue-600 text-white">1</button>
                        <button className="px-2 py-1 border rounded bg-white hover:bg-slate-100">&gt;</button>
                     </div>
                 </div>
             </div>
        </div>
    );
};

// --- View: Placeholder ---

export const PlaceholderView: React.FC<{ title: string }> = ({ title }) => (
    <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 m-4 rounded border border-slate-200 border-dashed">
        <Server size={48} className="mb-4 text-slate-300" />
        <h2 className="text-xl font-semibold text-slate-500">{title}</h2>
        <p className="mt-2 text-sm">该模块正在开发中...</p>
    </div>
);