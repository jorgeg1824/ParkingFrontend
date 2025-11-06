import { getRequest } from "./services-http"
import type { CellType } from "../interfaces/cell-type"

// ✅ Obtener todos los tipos de celda
export async function getAllCellTypes() {
  const response = await getRequest<CellType[]>("/cell-types")

  if (response.error) {
    console.error(`❌ Error al obtener tipos de celda: ${response.error}`)
  } else {
    console.log("📋 Tipos de celda obtenidos:", response.success)
  }

  return response
}
