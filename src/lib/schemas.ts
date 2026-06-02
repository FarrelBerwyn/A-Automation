// src/lib/schemas.ts
import { z } from 'zod';

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),

  whatsapp: z
    .string()
    .min(10, 'Nomor WhatsApp tidak valid')
    .max(15, 'Nomor WhatsApp tidak valid')
    .regex(/^\+62[0-9]{8,12}$/, 'Format: +62 diikuti 8–12 angka (Contoh: +628123456789)'),

  email: z
    .string()
    .email('Format email tidak valid'),

  serviceType: z
    .enum(['TRAINING', 'JASA', 'KEDUANYA'], {
      message: 'Pilih jenis layanan',
    }),

  projectDetail: z
    .string()
    .min(20, 'Deskripsi minimal 20 karakter')
    .max(2000, 'Deskripsi maksimal 2000 karakter'),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password tidak boleh kosong'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Password saat ini wajib diisi'),
    newPassword: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
