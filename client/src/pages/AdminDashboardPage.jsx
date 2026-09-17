import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import api from '../services/api';
import { Shield, Users, FileText, BarChart2, Activity } from 'lucide-react';
import { Github } from '../components/common/Icons';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 42,
    totalReadmes: 138,
    githubConnectedCount: 28,
    popularTemplates: [
      { name: 'Modern Full-Stack', count: 52 },
      { name: 'Minimalist Developer', count: 36 },
      { name: 'Animated Dynamic', count: 25 },
      { name: 'Frontend Artisan', count: 18 }
    ]
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        if (res.data?.data?.stats) {
          setStats(res.data.data.stats);
        }
      } catch (err) {
        console.warn('Admin stats endpoint fallback:', err);
      }
    };
    fetchAdminStats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Superadmin Control Center</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              System analytics, user distribution, and template popularity metrics.
            </p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-dark-card border border-dark-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Registered Developers</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats.totalUsers}</div>
          </div>

          <div className="p-5 rounded-xl bg-dark-card border border-dark-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">READMEs Generated</span>
              <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats.totalReadmes}</div>
          </div>

          <div className="p-5 rounded-xl bg-dark-card border border-dark-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">GitHub Connected Users</span>
              <Github className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats.githubConnectedCount}</div>
          </div>
        </div>

        {/* Popular Templates Chart Table */}
        <div className="p-6 rounded-2xl bg-dark-card border border-dark-border">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span>Top Performing Templates</span>
          </h3>

          <div className="space-y-4">
            {stats.popularTemplates.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 text-xs font-bold text-slate-500 font-mono">0{idx + 1}</span>
                  <span className="text-sm font-semibold text-white">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40 sm:w-64 bg-dark-bg rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full"
                      style={{ width: `${(item.count / 60) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-400">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboardPage;