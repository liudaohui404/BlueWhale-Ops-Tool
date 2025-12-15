import React from 'react';
import { ViewId, MenuItem } from '../types';
import { 
  Monitor, 
  ShieldCheck, 
  Activity, 
  List, 
  Bell, 
  Terminal, 
  ChevronDown, 
  ChevronRight,
  LogOut,
  User
} from 'lucide-react';

interface LayoutProps {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'ops',
    label: '蓝鲸平台运维',
    icon: <Monitor size={18} />,
    children: [
      { id: ViewId.DAILY_INSPECTION, label: '日常巡检' },
      { id: ViewId.OPERATION_VIEW, label: '运行视图' },
      { id: ViewId.ALARM_QUERY, label: '告警查询' },
    ]
  },
  {
    id: 'agent',
    label: '蓝鲸Agent检查',
    icon: <ShieldCheck size={18} />,
    children: [
      { id: ViewId.AGENT_STATUS, label: 'agent状态检查' },
      { id: ViewId.SCRIPT_EXEC, label: '脚本执行检查' },
    ]
  }
];

export const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, onLogout, children }) => {
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>(['ops', 'agent']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
    );
  };

  const getBreadcrumb = () => {
    for (const menu of MENU_ITEMS) {
      const found = menu.children?.find(c => c.id === currentView);
      if (found) {
        return `${menu.label} / ${found.label}`;
      }
    }
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a2b42] text-slate-300 flex flex-col shadow-xl z-20">
        <div className="h-14 flex items-center px-4 bg-[#142233] border-b border-slate-700 font-bold text-white tracking-wide">
          <Activity className="mr-2 text-blue-400" /> 蓝鲸平台运维工具
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {MENU_ITEMS.map((menu) => (
              <div key={menu.id}>
                <button 
                  onClick={() => toggleMenu(menu.id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md hover:bg-slate-700/50 hover:text-white transition-colors group"
                >
                  <div className="flex items-center">
                    <span className="mr-3 group-hover:text-blue-400 transition-colors">{menu.icon}</span>
                    {menu.label}
                  </div>
                  {expandedMenus.includes(menu.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>

                {/* Submenu */}
                {expandedMenus.includes(menu.id) && (
                  <div className="mt-1 space-y-1 pl-10 pr-2">
                    {menu.children?.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => onNavigate(child.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200
                          ${currentView === child.id 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                          }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${currentView === child.id ? 'bg-white' : 'bg-slate-500'}`}></span>
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-4 bg-[#142233] border-t border-slate-700">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white border border-blue-600">
                 <User size={16} />
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-sm font-medium text-white truncate">Admin User</p>
                 <p className="text-xs text-slate-400 truncate">System Admin</p>
              </div>
              <button onClick={onLogout} className="text-slate-400 hover:text-red-400 transition-colors" title="Logout">
                 <LogOut size={18} />
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-6 z-10">
          <h1 className="text-lg font-bold text-slate-800 flex items-center">
            {getBreadcrumb()}
          </h1>
          <div className="flex items-center gap-4 text-sm">
             <div className="hidden md:flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                System Operational
             </div>
             <div className="h-6 w-px bg-slate-300"></div>
             <button className="text-slate-500 hover:text-blue-600 relative">
               <Bell size={20} />
               <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#f3f5f8] p-0">
           {/* We pass children here */}
           <div className="min-h-full">
             {children}
           </div>
        </main>
      </div>

    </div>
  );
};