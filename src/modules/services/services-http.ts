type HttpResponse<T> = {
  success?: T
  error?: string
}

const BASE_URL = "http://localhost:8080"

// GET
export async function getRequest<T>(
  endpoint: string
): Promise<HttpResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
    })

    if (response.status !== 200) {
      return { error: `Error: ${response.status} - ${response.statusText}` }
    }

    const data = (await response.json()) as T
    return { success: data }
  } catch (error) {
    return { error: `Error: ${String(error)}` }
  }
}

// POST (genérico y flexible)
export async function postRequest<T, B = unknown>(
  endpoint: string,
  body: B
): Promise<HttpResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (![200, 201, 204].includes(response.status)) {
      return { error: `Error: ${response.status} - ${response.statusText}` }
    }

    const data =
      response.status !== 204 ? ((await response.json()) as T) : undefined

    return { success: data }
  } catch (error) {
    return { error: `Error: ${String(error)}` }
  }
}
