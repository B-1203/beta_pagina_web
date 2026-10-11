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

export interface BuscarCabinaParams {
  FechaEntrada?: string;
  FechaSalida?: string;
  Capacidad?: number;
  PrecioMin?: number;
  PrecioMax?: number;
}

export interface CabinasDisponiblesParams {
  FechaEntrada: string;
  FechaSalida: string;
}

function construirQuery(params: object) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string' || typeof value === 'number') {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

// ==========================================
// CABINAS
// ==========================================

export async function obtenerCabinas() {
  return apiFetch('/cabinas');
}

export async function buscarCabinas(params: BuscarCabinaParams = {}) {
  return apiFetch(`/cabinas/buscar${construirQuery(params)}`);
}

export async function obtenerCabinasDisponibles(
  params: CabinasDisponiblesParams,
) {
  return apiFetch(
    `/cabinas/disponibles${construirQuery(params)}`,
  );
}

export async function obtenerCabinaPorId(cabinaId: number) {
  return apiFetch(`/cabinas/${cabinaId}`);
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