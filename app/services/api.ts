const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Error ${response.status}: ${response.statusText}`,
    );
  }

  return response.json();
}

// ==========================================
// CABINAS
// ==========================================

export async function obtenerCabinas() {
  return apiFetch('/cabinas');
}

// ==========================================
// SERVICIOS
// ==========================================

export async function obtenerServicios() {
  return apiFetch('/servicios');
}

// ==========================================
// TARIFA VIGENTE
// ==========================================

export async function obtenerTarifaVigente() {
  return apiFetch('/tarifas/vigente');
}

// ==========================================
// MÉTODOS DE PAGO
// ==========================================

export async function obtenerMetodosPago() {
  return apiFetch('/metodospago');
}

// ==========================================
// IMÁGENES DE CABINA
// ==========================================

export async function obtenerImagenesCabina(
  cabinaId: number,
) {
  return apiFetch(`/imagenes/cabina/${cabinaId}`);
}

// ==========================================
// SERVICIOS DE UNA CABINA
// ==========================================

export async function obtenerServiciosCabina(
  cabinaId: number,
) {
  return apiFetch(
    `/cabinaservicios/cabina/${cabinaId}`,
  );
}