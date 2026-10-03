const API_URL = process.env.EXPO_PUBLIC_API_URL

if(!API_URL) {
    throw new Error("Missing EXPO_PUBLIC_API_URL. Add it to your frontend environment variables.")
}

type ApiRequestOptions = RequestInit & {
    token?: string | null
}

export async function apiFetch<T>(
    path: string,
    options: ApiRequestOptions = {},
): Promise<T> {
    const {token, headers, ...requestOptions} = options
    const requestHeaders = new Headers(headers)
    if (!requestHeaders.has("Accept")) requestHeaders.set("Accept", "application/json")
    if (!requestHeaders.has("Content-Type")) requestHeaders.set("Content-Type", "application/json")
    if (token) requestHeaders.set("Authorization", `Bearer ${token}`)

    const response = await fetch(`${API_URL}${path}`, {
        ...requestOptions,
        headers: requestHeaders,
    })

    if(!response.ok) {
        const message = await getErrorMessage(response)

        throw new Error(message)
    }

    if(response.status === 204) {
        return undefined as T
    }
    return response.json() as Promise<T>
}

export async function getErrorMessage(response: Response): Promise<string> {
    try {
        const data = (await response.json()) as {
            error?: string,
            message?: string
        }

        return (
            data.message ??
            data.error ??
            `Request failed with status ${response.status}`
        )
    } catch {
        return `Request failed with status ${response.status}`
    }
}