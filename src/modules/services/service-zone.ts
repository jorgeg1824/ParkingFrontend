import { getRequest } from "./services-http"
import type { Zone } from "../interfaces/zone"

// ✅ Obtener todas las zonas
export async function getAllZones() {
  const response = await getRequest<Zone[]>("/zones")

  if (response.error) {
    console.error(`❌ Error al obtener zonas: ${response.error}`)
  } else {
    console.log("📋 Zonas obtenidas:", response.success)
  }

  return response
}
