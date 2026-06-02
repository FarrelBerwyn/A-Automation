// src/lib/utils.ts

/**
 * Formats an ISO date string to a human-readable DD MMM YYYY format.
 * Example: '2025-01-12T14:32:00.000Z' -> '12 Jan 2025'
 */
export function formatDate(dateString: string | Date): string {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Formats a date to full details: DD MMM YYYY, HH:MM
 */
export function formatFullDate(dateString: string | Date): string {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  const base = formatDate(date);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${base}, ${hours}:${minutes} WIB`;
}

/**
 * Generates and triggers browser download of a CSV file.
 */
export function downloadCSV(headers: string[], rows: string[][], filename: string): void {
  const escapeCSV = (val: string) => {
    if (val === null || val === undefined) return '';
    const text = String(val);
    if (text.includes(',') || text.includes('"') || text.includes('\n')) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map(row => row.map(escapeCSV).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
