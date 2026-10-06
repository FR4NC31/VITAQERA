import {apiFetch} from '@/lib/api';

export type CurrentUser = {
    id: string
    clerkUserId: string
    email: string
    firstName: string | null
    lastName: string | null
    createdAt: string
    updatedAt: string
}

type ApiResponse<T> = {
  success: true
  message: string
  data: T
}

export async function syncCurrentUser(token: string) {
  const response = await apiFetch<ApiResponse<CurrentUser>>(
    "/api/users/me/sync",
    {
      method: "POST",
      token
    }
  )
  return response.data
}

export async function getCurrentUser(token: string) {
  const response = await apiFetch<ApiResponse<CurrentUser>>(
    "/api/users/me",
    {
      method: "GET",
      token
    }
  )
  return response.data
}