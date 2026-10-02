export function successResponse<T> (
    data: T,
    message: string = "Success"
) {
    return {
        success: true,
        message,
        data
    }
}

export function errorResponse(
    message: string,
    code?: string,
) {
    return {
        success: false,
        message,
        ...(code ? { code }: {})
    }
}
