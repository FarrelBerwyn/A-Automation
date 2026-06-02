// src/components/molecules/LeadDetailCard.tsx
import React, { useState } from 'react';
import type { Lead, LeadStatus } from '../../types';
import { Button } from '../atoms/Button';
import { formatFullDate } from '../../lib/utils';
import { MessageSquare, Mail, Trash2, Save } from 'lucide-react';

interface LeadDetailCardProps {
  lead: Lead;
  onStatusUpdate: (status: LeadStatus) => Promise<void>;
  onNotesUpdate: (notes: string) => Promise<void>;
  onDelete: () => void;
}

export const LeadDetailCard: React.FC<LeadDetailCardProps> = ({
  lead,
  onStatusUpdate,
  onNotesUpdate,
  onDelete,
}) => {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState<string>(lead.notes || '');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Clean WhatsApp formatting
  const getWhatsAppLink = (num: string) => {
    let clean = num.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '62' + clean.slice(1);
    }
    return `https://wa.me/${clean}`;
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as LeadStatus;
    setStatus(newStatus);
    setIsUpdatingStatus(true);
    try {
      await onStatusUpdate(newStatus);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleNotesSave = async () => {
    setIsSavingNotes(true);
    try {
      await onNotesUpdate(notes);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const getServiceLabel = (type: string) => {
    switch (type) {
      case 'TRAINING':
        return 'Training A Automation';
      case 'JASA':
        return 'Jasa Pembuatan Sistem';
      case 'KEDUANYA':
        return 'Keduanya (Training & Jasa)';
      default:
        return type;
    }
  };

  return (
    <div
      style={{
        border: '1px solid var(--clr-border)',
        backgroundColor: 'var(--clr-cream-dk)',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px',
      }}
      className="md:grid-cols-[1.5fr_1fr]"
    >
      {/* Left Column: Data Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <span className="text-label text-muted" style={{ fontSize: '11px' }}>ID Prospek: {lead.id}</span>
          <h2 className="text-h2" style={{ fontSize: '28px', color: 'var(--clr-black)', marginTop: '4px' }}>
            {lead.name}
          </h2>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--clr-border)' }} />

        {/* Detailed Info Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <span className="text-label text-muted" style={{ display: 'block', fontSize: '10px' }}>Layanan Diminati</span>
            <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--clr-black)' }}>
              {getServiceLabel(lead.serviceType)}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <span className="text-label text-muted" style={{ display: 'block', fontSize: '10px' }}>WhatsApp</span>
              <a
                href={getWhatsAppLink(lead.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--clr-green)' }}
              >
                <MessageSquare size={14} />
                {lead.whatsapp}
              </a>
            </div>

            <div>
              <span className="text-label text-muted" style={{ display: 'block', fontSize: '10px' }}>Email</span>
              <a
                href={`mailto:${lead.email}`}
                style={{ fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--clr-charcoal)' }}
              >
                <Mail size={14} />
                {lead.email}
              </a>
            </div>
          </div>

          <div>
            <span className="text-label text-muted" style={{ display: 'block', fontSize: '10px', marginBottom: '4px' }}>
              Detail Project / Tujuan
            </span>
            <div
              style={{
                backgroundColor: 'var(--clr-cream)',
                border: '1px solid var(--clr-border)',
                padding: '16px',
                fontSize: '13px',
                color: 'var(--clr-charcoal)',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
                fontFamily: 'var(--ff-body)',
              }}
            >
              {lead.projectDetail}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Actions / Updates */}
      <div
        style={{
          borderLeft: '1px solid var(--clr-border)',
          paddingLeft: '0px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        className="md:pl-6 md:border-l"
      >
        {/* Status update box */}
        <div>
          <span className="text-label text-muted" style={{ display: 'block', marginBottom: '8px' }}>
            Status Saat Ini
          </span>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              value={status}
              onChange={handleStatusChange}
              disabled={isUpdatingStatus}
              className="retro-select"
              style={{
                backgroundColor: 'var(--clr-cream)',
                border: '1px solid var(--clr-border)',
                padding: '8px 12px',
                fontFamily: 'var(--ff-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
              }}
            >
              <option value="NEW">Baru</option>
              <option value="IN_PROCESS">Diproses</option>
              <option value="DONE">Selesai</option>
            </select>
            {isUpdatingStatus && <span className="text-micro text-muted">Updating...</span>}
          </div>
        </div>

        {/* Action Buttons Group */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a
            href={getWhatsAppLink(lead.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="retro-btn retro-btn-primary"
            style={{ width: '100%', textDecoration: 'none' }}
          >
            <MessageSquare size={16} />
            Hubungi via WhatsApp
          </a>

          <a
            href={`mailto:${lead.email}?subject=Tanggapan Layanan A Automation`}
            className="retro-btn"
            style={{ width: '100%', textDecoration: 'none' }}
          >
            <Mail size={16} />
            Kirim Email
          </a>
        </div>

        {/* Internal notes widget */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="text-label text-muted">Catatan Internal</span>
            <button
              onClick={handleNotesSave}
              disabled={isSavingNotes}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--ff-mono)',
                fontSize: '10px',
                fontWeight: 'bold',
                color: 'var(--clr-charcoal)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Save size={12} />
              {isSavingNotes ? 'Saving...' : 'Simpan'}
            </button>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tambahkan catatan khusus admin di sini..."
            className="retro-textarea"
            style={{
              backgroundColor: 'var(--clr-cream)',
              border: '1px solid var(--clr-border)',
              padding: '10px',
              fontSize: '12px',
              minHeight: '80px',
            }}
          />
        </div>

        {/* Timestamps */}
        <div
          style={{
            marginTop: 'auto',
            borderTop: '1px dashed var(--clr-border)',
            paddingTop: '16px',
            fontSize: '10px',
            color: 'var(--clr-cement)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span>Diterima: {formatFullDate(lead.createdAt)}</span>
          <span>Diperbarui: {formatFullDate(lead.updatedAt)}</span>
        </div>

        {/* Danger zone delete button */}
        <div style={{ marginTop: '10px' }}>
          <Button variant="danger" size="sm" style={{ width: '100%' }} onClick={onDelete}>
            <Trash2 size={12} />
            Hapus Lead Ini
          </Button>
        </div>
      </div>
      
      <style>{`
        .md\\:grid-cols-\\[1\\.5fr_1fr\\] {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .md\\:grid-cols-\\[1\\.5fr_1fr\\] {
            grid-template-columns: 1.5fr 1fr;
          }
          .md\\:pl-6 {
            padding-left: 24px;
          }
          .md\\:border-l {
            border-left: 1px solid var(--clr-border);
          }
        }
      `}</style>
    </div>
  );
};
