import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeadTableRow } from '../../components/molecules/LeadTableRow';
import { Spinner } from '../../components/atoms/Spinner';
import { Button } from '../../components/atoms/Button';
import { Modal } from '../../components/atoms/Modal';
import { api } from '../../lib/api';
import { useToastStore } from '../../store/toastStore';
import { downloadCSV } from '../../lib/utils';
import type { Lead } from '../../types';
import { Search, Download, Trash2 } from 'lucide-react';

export const LeadsPage: React.FC = () => {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  // Leads state list
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  // Filters State
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await api.getLeads({
        page: currentPage,
        limit: 10,
        search,
        status,
        serviceType,
        dateFrom,
        dateTo,
        sort: 'createdAt',
        order: 'desc',
      });
      if (response.success) {
        setLeads(response.data);
        setTotalPages(response.meta.totalPages);
        setTotalLeads(response.meta.total);
      }
    } catch (e) {
      addToast('Gagal memuat data leads', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [currentPage, status, serviceType, dateFrom, dateTo]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchLeads();
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatus('');
    setServiceType('');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  // Trigger Deletion Modal Prompt
  const handleDeleteTrigger = (id: string) => {
    setLeadToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Execute Deletion via API
  const handleDeleteConfirm = async () => {
    if (!leadToDelete) return;
    setIsDeleting(true);
    try {
      const res = await api.deleteLead(leadToDelete);
      if (res.success) {
        addToast('Lead berhasil dihapus', 'success');
        setIsDeleteModalOpen(false);
        setLeadToDelete(null);
        // Refresh grid
        fetchLeads();
      }
    } catch (e) {
      addToast('Gagal menghapus lead', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Compile Leads to downloadable CSV
  const handleExportCSV = async () => {
    addToast('Mempersiapkan data CSV...', 'info');
    try {
      // Fetch all filtered records without pagination limit
      const response = await api.getLeads({
        limit: 1000, // Large number to fetch all
        search,
        status,
        serviceType,
        dateFrom,
        dateTo,
        sort: 'createdAt',
        order: 'desc',
      });

      if (response.success && response.data.length > 0) {
        const headers = ['ID', 'Nama', 'WhatsApp', 'Email', 'Jenis Layanan', 'Detail Project', 'Status', 'Tanggal Submit'];
        const rows = response.data.map((l: Lead) => [
          l.id,
          l.name,
          l.whatsapp,
          l.email,
          l.serviceType,
          l.projectDetail,
          l.status,
          l.createdAt
        ]);
        const dateStr = new Date().toISOString().slice(0, 10);
        downloadCSV(headers, rows, `leads_${dateStr}.csv`);
        addToast('CSV berhasil diunduh', 'success');
      } else {
        addToast('Tidak ada data untuk diekspor', 'error');
      }
    } catch (e) {
      addToast('Gagal mengekspor data CSV', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Main Container Viewport */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Page Title */}
        <div style={{ borderBottom: '2px solid var(--clr-border)', paddingBottom: '12px' }}>
          <h2 style={{ fontFamily: 'var(--ff-mono)', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--clr-black)', margin: 0 }}>
            MANAJEMEN LEADS
          </h2>
        </div>
        
        {/* Filters and Actions Toolbar panel */}
        <div
          style={{
            backgroundColor: 'var(--clr-cream-dk)',
            border: '1px solid var(--clr-border)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Row 1: Search Form & Export */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexGrow: 1, maxWidth: '400px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="retro-input"
                style={{
                  backgroundColor: 'var(--clr-cream)',
                  border: '1px solid var(--clr-border)',
                  padding: '8px 12px 8px 36px',
                  fontSize: '13px',
                }}
              />
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--clr-cement)',
                }}
              />
              <Button type="submit" variant="ghost" size="sm" style={{ display: 'none' }}>
                Search
              </Button>
            </form>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button onClick={handleExportCSV} variant="ghost" size="sm">
                <Download size={14} />
                Ekspor CSV
              </Button>
              <Button onClick={handleClearFilters} variant="ghost" size="sm">
                Reset Filter
              </Button>
            </div>
          </div>

          {/* Row 2: Select Filters */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '12px',
            }}
            className="sm:grid-cols-2 md:grid-cols-4"
          >
            <div>
              <span className="text-micro text-muted" style={{ display: 'block', marginBottom: '4px' }}>STATUS</span>
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
                className="retro-select"
                style={{ backgroundColor: 'var(--clr-cream)', border: '1px solid var(--clr-border)', padding: '6px 10px', fontSize: '12px', fontFamily: 'var(--ff-mono)' }}
              >
                <option value="">Semua Status</option>
                <option value="NEW">Baru</option>
                <option value="IN_PROCESS">Diproses</option>
                <option value="DONE">Selesai</option>
              </select>
            </div>

            <div>
              <span className="text-micro text-muted" style={{ display: 'block', marginBottom: '4px' }}>LAYANAN</span>
              <select
                value={serviceType}
                onChange={(e) => { setServiceType(e.target.value); setCurrentPage(1); }}
                className="retro-select"
                style={{ backgroundColor: 'var(--clr-cream)', border: '1px solid var(--clr-border)', padding: '6px 10px', fontSize: '12px', fontFamily: 'var(--ff-mono)' }}
              >
                <option value="">Semua Layanan</option>
                <option value="TRAINING">Training</option>
                <option value="JASA">Jasa Sistem</option>
                <option value="KEDUANYA">Keduanya</option>
              </select>
            </div>

            <div>
              <span className="text-micro text-muted" style={{ display: 'block', marginBottom: '4px' }}>DARI TANGGAL</span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
                className="retro-input"
                style={{ backgroundColor: 'var(--clr-cream)', border: '1px solid var(--clr-border)', padding: '4px 8px', fontSize: '12px', fontFamily: 'var(--ff-mono)' }}
              />
            </div>

            <div>
              <span className="text-micro text-muted" style={{ display: 'block', marginBottom: '4px' }}>SAMPAI TANGGAL</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
                className="retro-input"
                style={{ backgroundColor: 'var(--clr-cream)', border: '1px solid var(--clr-border)', padding: '4px 8px', fontSize: '12px', fontFamily: 'var(--ff-mono)' }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic leads grid data table */}
        <div
          style={{
            backgroundColor: 'var(--clr-cream-dk)',
            border: '1px solid var(--clr-border)',
            padding: '8px',
          }}
        >
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '240px', flexDirection: 'column', gap: '8px' }}>
              <Spinner />
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px' }}>Loading leads table...</span>
            </div>
          ) : (
            <>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--clr-border)', color: 'var(--clr-cement)' }} className="font-mono text-micro">
                      <th style={{ padding: '12px 8px' }}>#</th>
                      <th style={{ padding: '12px 8px' }}>Nama</th>
                      <th style={{ padding: '12px 8px' }}>WhatsApp</th>
                      <th style={{ padding: '12px 8px' }}>Email</th>
                      <th style={{ padding: '12px 8px' }}>Layanan</th>
                      <th style={{ padding: '12px 8px' }}>Status</th>
                      <th style={{ padding: '12px 8px' }}>Tanggal</th>
                      <th style={{ padding: '12px 8px' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ padding: '48px 0', textAlign: 'center', color: 'var(--clr-cement)' }}>
                          Belum ada leads masuk dengan kriteria filter tersebut.
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead, index) => (
                        <LeadTableRow
                          key={lead.id}
                          lead={lead}
                          index={(currentPage - 1) * 10 + index + 1}
                          onView={(id) => navigate(`/admin/leads/${id}`)}
                          onDelete={handleDeleteTrigger}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls footer */}
              {leads.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 8px 8px 8px',
                    borderTop: '1px solid var(--clr-border)',
                    marginTop: '8px',
                  }}
                >
                  <span className="text-micro text-muted">
                    Total: {totalLeads} leads · Halaman {currentPage} dari {totalPages}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Sebelumnya
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Selanjutnya
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal Box */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="KONFIRMASI HAPUS"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
              Batal
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteConfirm} loading={isDeleting}>
              <Trash2 size={12} />
              Hapus Permanen
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px', color: 'var(--clr-black)' }}>
            Apakah Anda yakin ingin menghapus data lead ini?
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--clr-cement)' }}>
            Tindakan ini bersifat permanen dan data lead yang terhapus tidak dapat dikembalikan lagi.
          </p>
        </div>
      </Modal>

      <style>{`
        .sm\\:grid-cols-2 {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .sm\\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          .md\\:grid-cols-4 {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
};
export default LeadsPage;
