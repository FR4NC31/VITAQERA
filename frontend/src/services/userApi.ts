import {apiFetch} from '@/lib/api';

export type CurrentUser = {
    id: string
    clerkUserId: string
    email: string
    createdAt: string
}

export async function syncCurrentUser(token: string) {
  return apiFetch<CurrentUser>("/api/users/me/sync", {
    method: "POST",
    token,
  });
}

export async function getCurrentUser(token: string) {
  return apiFetch<CurrentUser>("/api/users/me", {
    method: "GET",
    token,
  });
}