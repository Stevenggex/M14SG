import { supabase } from './supabaseClient';

export async function signUp(
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return [data, error];
}

export async function signInWithPassword(
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return [data, error];
}

export async function signInWithOGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  return [data, error];
}