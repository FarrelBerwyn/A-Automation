// src/pages/admin/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StatCard } from '../../components/molecules/StatCard';
import { Badge } from '../../components/atoms/Badge';
import { Spinner } from '../../components/atoms/Spinner';
import { formatDate } from '../../lib/utils';
import { api } from '../../lib/api';
import { useToastStore } from '../../store/toastStore';
import type { Lead, DashboardStats } from '../../types';
import { Eye, ArrowRight, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch stats counts and charts
      const statsRes = await api.getStats();
      if (statsRes.success) {
        setStats(statsRes.data);
      }

      // Fetch latest 5 leads
      const leadsRes = await api.getLeads({ page: 1, limit: 5, sort: 'createdAt', order: 'desc' });
      if (leadsRes.success) {
        setRecentLeads(leadsRes.data);
      }
    } catch (e) {
      addToast('Gagal memuat data dashboard', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getServiceLabel = (type: string) => {
    switch (type) {
      case 'TRAINING':
        return 'Training';
      case 'JASA':
        return 'Jasa';
      case 'KEDUANYA':
        return 'Keduanya';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <Badge variant="neutral">Baru</Badge>;
      case 'IN_PROCESS':
        return <Badge variant="amber">Diproses</Badge>;
      case 'DONE':
        return <Badge variant="green">Selesai</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Viewport Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Page Title */}
        <div style={{ borderBottom: '2px solid var(--clr-border)', paddingBottom: '12px' }}>
          <h2 style={{ fontFamily: 'var(--ff-mono)', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--clr-black)', margin: 0 }}>
            DASHBOARD UTAMA
          </h2>
        </div>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', flexDirection: 'column', gap: '12px' }}>
            <Spinner size="lg" />
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px' }}>Memuat metrics portal...</span>
          </div>
        ) : (
          <>
            {/* Stats Cards Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '16px',
              }}
              className="sm:grid-cols-2 lg:grid-cols-4"
            >
              <StatCard label="TOTAL LEAD MASUK" value={stats?.total || 0} trend="+12% bln ini" />
              <StatCard label="LEAD BARU (7 HARI)" value={stats?.new || 0} trend="Tindaklanjuti" />
              <StatCard label="SEDANG DIPROSES" value={stats?.inProcess || 0} />
              <StatCard label="SELESAI (DEAL)" value={stats?.done || 0} trend="Konversi 81%" />
            </div>

            {/* Grid Layout: Chart & Recent Table */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '24px',
              }}
              className="xl:grid-cols-[1.2fr_1fr]"
            >
              {/* Left Side: Weekly Chart */}
              <div
                style={{
                  backgroundColor: 'var(--clr-cream-dk)',
                  border: '1px solid var(--clr-border)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 className="text-h3" style={{ fontSize: '14px', fontFamily: 'var(--ff-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--clr-black)' }}>
                    Grafik Distribusi Lead (Mingguan)
                  </h3>
                  <TrendingUp size={16} className="text-muted" />
                </div>

                <div style={{ width: '100%', height: '240px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats?.weeklyChart || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--clr-border)" vertical={false} />
                      <XAxis
                        dataKey="week"
                        stroke="var(--clr-cement)"
                        fontSize={9}
                        fontFamily="var(--ff-mono)"
                        tickLine={false}
                      />
                      <YAxis
                        stroke="var(--clr-cement)"
                        fontSize={9}
                        fontFamily="var(--ff-mono)"
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--clr-cream)',
                          borderColor: 'var(--clr-border)',
                          fontFamily: 'var(--ff-body)',
                          fontSize: '11px',
                        }}
                      />
                      <Bar
                        dataKey="count"
                        fill="var(--clr-green)"
                        radius={[0, 0, 0, 0]}
                        maxBarSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Side: Recent Leads Table */}
              <div
                style={{
                  backgroundColor: 'var(--clr-cream-dk)',
                  border: '1px solid var(--clr-border)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 className="text-h3" style={{ fontSize: '14px', fontFamily: 'var(--ff-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--clr-black)' }}>
                      Leads Terbaru (Terakhir)
                    </h3>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--clr-border)', color: 'var(--clr-cement)' }} className="font-mono text-micro">
                          <th style={{ padding: '8px 4px' }}>Nama</th>
                          <th style={{ padding: '8px 4px' }}>Layanan</th>
                          <th style={{ padding: '8px 4px' }}>Status</th>
                          <th style={{ padding: '8px 4px' }}>Tanggal</th>
                          <th style={{ padding: '8px 4px', textAlign: 'right' }}>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentLeads.length === 0 ? (
                          <tr>
                            <td colSpan={5} style={{ padding: '24px 0', textAlign: 'center', color: 'var(--clr-cement)' }}>
                              Belum ada lead masuk.
                            </td>
                          </tr>
                        ) : (
                          recentLeads.map((lead) => (
                            <tr key={lead.id} style={{ borderBottom: '1px solid var(--clr-border)' }}>
                              <td style={{ padding: '10px 4px', fontWeight: 500, color: 'var(--clr-black)' }}>{lead.name}</td>
                              <td style={{ padding: '10px 4px' }}>
                                <Badge variant="neutral">{getServiceLabel(lead.serviceType)}</Badge>
                              </td>
                              <td style={{ padding: '10px 4px' }}>{getStatusBadge(lead.status)}</td>
                              <td style={{ padding: '10px 4px', fontFamily: 'var(--ff-mono)', fontSize: '10px' }}>
                                {formatDate(lead.createdAt)}
                              </td>
                              <td style={{ padding: '10px 4px', textAlign: 'right' }}>
                                <button
                                  onClick={() => navigate(`/admin/leads/${lead.id}`)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--clr-charcoal)',
                                    padding: '4px',
                                  }}
                                  title="Lihat"
                                >
                                  <Eye size={14} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--clr-border)', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <Link
                    to="/admin/leads"
                    style={{
                      fontFamily: 'var(--ff-mono)',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      color: 'var(--clr-charcoal)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none',
                    }}
                    className="hover:underline"
                  >
                    Lihat Semua Leads
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .sm\\:grid-cols-2 {
          grid-template-columns: 1fr;
        }
        .xl\\:grid-cols-\\[1\\.2fr_1fr\\] {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .sm\\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-4 {
            grid-template-columns: repeat(4, 1fr);
          }
          .stat-col {
            border-right: 1px solid var(--clr-border) !important;
          }
          .stat-col:last-child {
            border-right: none !important;
          }
        }
        @media (min-width: 1280px) {
          .xl\\:grid-cols-\\[1\\.2fr_1fr\\] {
            grid-template-columns: 1.2fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};
export default DashboardPage;
