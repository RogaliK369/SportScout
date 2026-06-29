import type { Sport } from '@/constants/sports';

/**
 * Placeholder for future API calls.
 * When you connect a backend, add functions here (fetch clubs, sessions, etc.).
 */

export type LoginPayload = {
  name: string;
  email: string;
  sports: Sport[];
  photoUri?: string | null;
};

export type UpdateProfilePayload = LoginPayload;

export async function loginUser(payload: LoginPayload): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ok: true };
}

export async function updateUserProfile(payload: UpdateProfilePayload): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { ok: true };
}
