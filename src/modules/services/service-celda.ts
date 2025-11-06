import type { Cell } from "../interfaces/celda"
import { postRequest } from "./services-http"

function validateDataCell(data: Cell): boolean {
  const invalidFields = Object.entries(data)
    .filter(([_, value]) => value === null || value === undefined || value === "")
    .map(([key]) => key)

  if (invalidFields.length > 0) {
    console.error(`Faltan los siguientes campos: ${invalidFields.join(", ")}`)
    return false
  }

  console.log("✅ Datos de celda válidos")
  return true
}

export async function createCelda(data: Cell) {
  if (!validateDataCell(data)) {
    console.warn("No se creó la celda: faltan datos obligatorios.")
    return { error: "Datos incompletos" }
  }

  const response = await postRequest<Cell, Cell>("/cells", data)

  if (response.error) {
    console.error(`❌ Error al registrar la celda: ${response.error}`)
  } else {
    console.log("✅ Celda registrada correctamente:", response.success)
  }

  return response
}
