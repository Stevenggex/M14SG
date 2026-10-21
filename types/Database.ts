export interface Region {
  id: number;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface Distrito {
  id: number;
  nombre: string;
  region_id: number;
  created_at: string;
  updated_at: string;
}

export interface Iglesia {
  id: number;
  nombre: string;
  distrito_id: number;
  direccion?: string;
  created_at: string;
  updated_at: string;
}