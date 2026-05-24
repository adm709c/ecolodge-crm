import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyufapuftaucdkescfig.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5dWZhcHVmdGF1Y2RrZXNjZmlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MjUzOTYsImV4cCI6MjA5NTIwMTM5Nn0.ambHIYQktt2GokOYhlr_UgQJV7g_FkialYXy8B-32jw';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Reservation {
  id?: string;
  guest_name: string;
  check_in: string;
  check_out: string;
  people: number;
  value?: number;
  phone?: string;
  gclid?: string;
  source: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

// Funções de Reservações
export async function getReservationsByStatus(status: string) {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getAllReservations() {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createReservation(reservation: Reservation) {
  const { data, error } = await supabase
    .from('reservations')
    .insert([reservation])
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function updateReservation(id: string, updates: Partial<Reservation>) {
  const { data, error } = await supabase
    .from('reservations')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data?.[0];
}

// Funções de Meta
export async function getMeta() {
  try {
    const { data, error } = await supabase
      .from('meta_reservas')
      .select('meta_value, id')
      .limit(1);

    if (error) {
      console.warn('Erro ao carregar meta:', error);
      return 0;
    }

    return data?.[0]?.meta_value || 0;
  } catch (error) {
    console.warn('Erro ao carregar meta:', error);
    return 0;
  }
}

export async function updateMeta(value: number) {
  try {
    // Primeiro, tenta buscar o registro existente
    const { data: existing, error: fetchError } = await supabase
      .from('meta_reservas')
      .select('id')
      .limit(1);

    if (fetchError) throw fetchError;

    // Se existe, atualiza
    if (existing && existing.length > 0) {
      const { data, error } = await supabase
        .from('meta_reservas')
        .update({ meta_value: value, updated_at: new Date().toISOString() })
        .eq('id', existing[0].id)
        .select();

      if (error) throw error;
      return data?.[0];
    }

    // Se não existe, cria novo
    const { data, error } = await supabase
      .from('meta_reservas')
      .insert([{ meta_value: value, updated_at: new Date().toISOString() }])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Erro ao atualizar meta:', error);
    throw error;
  }
}
