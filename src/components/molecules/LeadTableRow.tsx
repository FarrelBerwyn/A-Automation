// src/components/molecules/LeadTableRow.tsx
import React from 'react';
import type { Lead } from '../../types';
import { Badge } from '../atoms/Badge';
import { formatDate } from '../../lib/utils';
import { Eye, Trash2, MessageSquare } from 'lucide-react';

interface LeadTableRowProps {
  lead: Lead;
  index: number;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const LeadTableRow: React.FC<LeadTableRowProps> = ({
  lead,
  index,
  onView,
  onDelete,
}) => {
  const getServiceLabel = (type: string) => {
    switch (type) {
      case 'TRAINING':
        return 'Training';
      case 'JASA':
        return 'Jasa Sistem';
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

  // Build quick WhatsApp URL (Indonesian context)
  const getWhatsAppLink = (num: string) => {
    let clean = num.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '62' + clean.slice(1);
    }
    return `https://wa.me/${clean}`;
  };

  return (
    <tr
      style={{
        borderBottom: '1px solid var(--clr-border)',
        backgroundColor: 'transparent',
        transition: 'background-color var(--transition-fast)',
      }}
      className="hover:bg-[var(--clr-cement-lt)]"
    >
      {/* Row Index */}
      <td style={{ padding: '12px 8px', fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--clr-cement)' }}>
        {String(index).padStart(2, '0')}
      </td>

      {/* Name */}
      <td style={{ padding: '12px 8px', fontWeight: 500, color: 'var(--clr-black)' }}>
        {lead.name}
      </td>

      {/* WhatsApp Link */}
      <td style={{ padding: '12px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <a
            href={getWhatsAppLink(lead.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--ff-mono)',
              fontSize: '11px',
              color: 'var(--clr-green)',
            }}
          >
            <MessageSquare size={12} />
            {lead.whatsapp}
          </a>
        </div>
      </td>

      {/* Email */}
      <td style={{ padding: '12px 8px', color: 'var(--clr-cement)' }}>
        {lead.email}
      </td>

      {/* Service Type */}
      <td style={{ padding: '12px 8px' }}>
        <Badge variant="neutral">{getServiceLabel(lead.serviceType)}</Badge>
      </td>

      {/* Status Badge */}
      <td style={{ padding: '12px 8px' }}>
        {getStatusBadge(lead.status)}
      </td>

      {/* Submission Date */}
      <td style={{ padding: '12px 8px', fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--clr-cement)' }}>
        {formatDate(lead.createdAt)}
      </td>

      {/* Actions */}
      <td style={{ padding: '12px 8px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onView(lead.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--clr-charcoal)',
              padding: '4px',
            }}
            title="Lihat Detail"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => onDelete(lead.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--clr-red)',
              padding: '4px',
            }}
            title="Hapus"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};
