import { supabase } from './supabaseClient';
import type { Region, Distrito, Iglesia } from '../types/Database';

export async function getRegiones(): Promise<Region[]> {
  const { data, error } = await supabase
    .from('regiones')
    .select('*');

  if (error) {
    throw new Error(`Error al obtener regiones: ${error.message}`);
  }

  return data;
}

export async function getDistritos(): Promise<Distrito[]> {
  const { data, error } = await supabase
    .from('distritos')
    .select('*, regiones(nombre)');

  if (error) {
    throw new Error(`Error al obtener distritos: ${error.message}`);
  }

  return data;
}

export async function getIglesias(): Promise<Iglesia[]> {
  const { data, error } = await supabase
    .from('iglesias')
    .select('*, distritos(nombre, regiones(nombre))');

  if (error) {
    throw new Error(`Error al obtener iglesias: ${error.message}`);
  }

  return data;
}

export async function insertRegion(nombre: string): Promise<Region> {
  const { data, error } = await supabase
    .from('regiones')
    .insert([{ nombre }])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al insertar región: ${error.message}`);
  }

  return data;
}

export async function insertDistrito(nombre: string, region_id: number): Promise<Distrito> {
  const { data, error } = await supabase
    .from('distritos')
    .insert([{ nombre, region_id }])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al insertar distrito: ${error.message}`);
  }

  return data;
}

export async function insertIglesia(
  nombre: string,
  distrito_id: number,
  direccion?: string
): Promise<Iglesia> {
  const { data, error } = await supabase
    .from('iglesias')
    .insert([{ nombre, distrito_id, direccion }])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al insertar iglesia: ${error.message}`);
  }

  return data;
}

export async function updateIglesia(
  id: number,
  data: Partial<{ nombre: string; direccion: string }>
): Promise<Iglesia> {
  const { data: updated, error } = await supabase
    .from('iglesias')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al actualizar iglesia: ${error.message}`);
  }

  return updated;
}

export async function deleteIglesia(id: number): Promise<void> {
  const { error } = await supabase
    .from('iglesias')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Error al eliminar iglesia: ${error.message}`);
  }
}