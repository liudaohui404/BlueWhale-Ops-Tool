import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ViewId } from './types';
import { DailyInspectionView, AgentStatusView, PlaceholderView } from './components/Views';
import { Shield } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewId>(ViewId.DAILY_INSPECTION);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      alert("请输入用户名和密码 (Please enter username and password)");
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewId.DAILY_INSPECTION:
        return <DailyInspectionView />;
      case ViewId.AGENT_STATUS:
        return <AgentStatusView />;
      case ViewId.OPERATION_VIEW:
        return <PlaceholderView title="运行视图 (Operation View)" />;
      case ViewId.ALARM_QUERY:
        return <PlaceholderView title="告警查询 (Alarm Query)" />;
      case ViewId.SCRIPT_EXEC:
        return <PlaceholderView title="脚本执行检查 (Script Check)" />;
      default:
        return <DailyInspectionView />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-200" style={{ backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all hover:scale-[1.01] duration-300">
          <div className="flex justify-center mb-6">
             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
               <Shield size={32} />
             </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">蓝鲸平台运维工具</h2>
          <p className="text-center text-slate-500 text-sm mb-8">请登录以继续访问系统</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
            >
              登 录
            </button>
          </form>
          <div className="mt-6 text-center text-xs text-slate-400">
            &copy; 2025 蓝鲸智云运维平台
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={setCurrentView}
      onLogout={() => setIsLoggedIn(false)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;