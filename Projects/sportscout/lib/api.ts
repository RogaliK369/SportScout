import type { Sport } from '@/constants';

/**
 * Placeholder for future API calls.
 * When you connect a backend, add functions here (fetch clubs, sessions, etc.).
 */

export type LoginPayload = {
  email: string;
  sports: Sport[];
};

export async function loginUser(payload: LoginPayload): Promise<{ ok: true }> {
  // Simulate a short network request.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ok: true };
}
