// src/pages/admin/LeadDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LeadDetailCard } from '../../components/molecules/LeadDetailCard';
import { Spinner } from '../../components/atoms/Spinner';
import { Button } from '../../components/atoms/Button';
import { Modal } from '../../components/atoms/Modal';
import { api } from '../../lib/api';
import { useToastStore } from '../../store/toastStore';
import type { Lead, LeadStatus } from '../../types';
import { ArrowLeft, Trash2 } from 'lucide-react';

export const LeadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Delete states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLeadDetail = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await api.getLeadById(id);
      if (res.success) {
        setLead(res.data);
      }
    } catch (e) {
      addToast('Data lead tidak ditemukan', 'error');
      navigate('/admin/leads');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadDetail();
  }, [id]);

  // Patch lead status
  const handleStatusUpdate = async (status: LeadStatus) => {
    if (!id || !lead) return;
    try {
      const res = await api.updateLead(id, { status });
      if (res.success) {
        setLead(res.data);
        addToast('Status lead berhasil diubah', 'success');
      }
    } catch (e) {
      addToast('Gagal merubah status lead', 'error');
    }
  };

  // Patch internal notes log
  const handleNotesUpdate = async (notes: string) => {
    if (!id || !lead) return;
    try {
      const res = await api.updateLead(id, { notes });
      if (res.success) {
        setLead(res.data);
        addToast('Catatan internal berhasil disimpan', 'success');
      }
    } catch (e) {
      addToast('Gagal menyimpan catatan', 'error');
    }
  };

  // Perform Deletion via API
  const handleDeleteConfirm = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      const res = await api.deleteLead(id);
      if (res.success) {
        addToast('Lead berhasil dihapus', 'success');
        setIsDeleteModalOpen(false);
        navigate('/admin/leads', { replace: true });
      }
    } catch (e) {
      addToast('Gagal menghapus lead', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Main Viewport Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Page Title */}
        <div style={{ borderBottom: '2px solid var(--clr-border)', paddingBottom: '12px' }}>
          <h2 style={{ fontFamily: 'var(--ff-mono)', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--clr-black)', margin: 0 }}>
            DETAIL PROSPEK
          </h2>
        </div>
        
        {/* Back Link Nav */}
        <div>
          <Link
            to="/admin/leads"
            style={{
              fontFamily: 'var(--ff-mono)',
              fontSize: '11px',
              fontWeight: 'bold',
              color: 'var(--clr-cement)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
            className="hover:text-[var(--clr-black)]"
          >
            <ArrowLeft size={12} />
            Kembali ke Daftar Leads
          </Link>
        </div>

        {/* Dynamic content rendering */}
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '260px', flexDirection: 'column', gap: '8px' }}>
            <Spinner />
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px' }}>Memuat profil lead...</span>
          </div>
        ) : lead ? (
          <LeadDetailCard
            lead={lead}
            onStatusUpdate={handleStatusUpdate}
            onNotesUpdate={handleNotesUpdate}
            onDelete={() => setIsDeleteModalOpen(true)}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--clr-cement)' }}>
            Data lead tidak ditemukan.
          </div>
        )}
      </div>

      {/* Retro Deletion Modal */}
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
    </div>
  );
};
export default LeadDetailPage;
