export type Cabina = {
  id: string;
  nombre: string;
  descripcion: string;
  capacidad: number;
  habitaciones: number;
  banos: number;
  precio: string;
  servicios: string[];
  imagen: string;
  galeria: string[];
  infoAdicional: string;
};

export type Servicio = {
  titulo: string;
  descripcion: string;
  icono: string;
};

export const sitio = {
  nombreNegocio: 'EL ARTESANO BEACH HOUSE',
  lema: 'Tu pausa ideal en la costa de Guanacaste',
  descripcionBreve:
    'Texto provisional: un refugio tranquilo para descansar, disfrutar de la naturaleza y vivir una experiencia cercana al mar en Playa Lagarto.',
  quienesSomos:
    'Texto provisional: somos anfitriones locales que cuidamos cada detalle para que cada huésped viva una estadía cómoda, auténtica y relajante.',
  historia:
    'Texto provisional: el proyecto nació para compartir la belleza de la zona con viajeros que buscan desconectarse y disfrutar de un alojamiento con carácter local.',
  mision:
    'Texto provisional: brindar una experiencia cálida, personalizada y memorable, con espacios inspirados en la tranquilidad del paisaje costarricense.',
  valores: ['Atención cercana', 'Calidez humana', 'Naturaleza y descanso'],
  ubicacion: 'Playa Lagarto, Santa Cruz, Guanacaste, Costa Rica',
  mapsUrl:
    'https://maps.app.goo.gl/7dndTs6uVTcnMCRk8',
  telefono: '506 8752 8879',
  whatsappHost: '506 8752 8879',
  horario: 'Lunes a Domingo · 7:00 a.m. a 8:00 p.m.',
  correo: 'hola@cabinasplayalagarto.com',
  politicaPrivacidad:
    'Agradecemos tu confianza. Los datos de esta solicitud se usarán únicamente para gestionar tu consulta de reservación mediante WhatsApp.',
};

export const servicios: Servicio[] = [
  {
    titulo: 'Cocina equipada',
    descripcion: 'Texto provisional: espacio cómodo para preparar desayunos, cenas sencillas y momentos de convivencia.',
    icono: '🍳',
  },
  {
    titulo: 'Wi‑Fi',
    descripcion: 'Texto provisional: conexión para trabajar o relajarse desde una vista serena y tranquila.',
    icono: '📶',
  },
  {
    titulo: 'Aire acondicionado',
    descripcion: 'Texto provisional: confort durante los días más calurosos de la zona.',
    icono: '❄️',
  },
  {
    titulo: 'Terraza o patio',
    descripcion: 'Texto provisional: área exterior para tomar aire fresco y vivir la experiencia de la costa.',
    icono: '🌿',
  },
  {
    titulo: 'Parqueo',
    descripcion: 'Texto provisional: facilidad para llegar con tu vehículo y disfrutar sin complicaciones.',
    icono: '🚗',
  },
  {
    titulo: 'Atención personalizada',
    descripcion: 'Texto provisional: apoyo cercano para ayudarte a preparar la mejor experiencia según tus necesidades.',
    icono: '🤝',
  },
];

export const galeria: string[] = [
  '/imagenes/inicio.jpg',
  '/imagenes/Galeria/info_mascotas.jpg',
  '/imagenes/imagen_frontend.jpeg',
  '/imagenes/imagen_frontend.jpeg',
  '/imagenes/imagen_frontend.jpeg',
  '/imagenes/imagen_frontend.jpeg',
];

export const cabinas: Cabina[] = [
  {
    id: 'lagarto-01',
    nombre: 'Casa el Artesano',
    descripcion:
      'Texto provisional: cabina acogedora con ambiente natural, ideal para parejas o viajeros que buscan descansar con comodidad y un estilo sencillo.',
    capacidad: 6,
    habitaciones: 2,
    banos: 2,
    precio: '₡50,000 X noche',
    servicios: ['Cocina equipada', 'Wi‑Fi', 'TV'],
    imagen: '/imagenes/Casa/imagen_artesano.jpg',
    galeria: [
      '/imagenes/Casa/imagen_artesano.jpg',
      '/imagenes/Casa/artesano_cocina.jpg',
      '/imagenes/Casa/bano_habitacion_principal.jpg',
      '/imagenes/Casa/artesano_habitacion_principal.jpg',
      '/imagenes/Casa/artesano_habitacion2.jpg',
    ],
    infoAdicional: 'Texto provisional: disponible para estadías cortas o largas según la temporada.',
  },
  {
    id: 'lagarto-02',
    nombre: 'Bungalow El Artesano #1',
    descripcion:
      'Texto provisional: espacio pensado para descansar en pareja o con amigos, con una distribución práctica y una sensación de tranquilidad.',
    capacidad: 4,
    habitaciones: 2,
    banos: 1,
    precio: 'Consultar precio',
    servicios: ['Patio', 'Parqueo', 'Atención personalizada'],
    imagen: '/imagenes/imagen_frontend.jpeg',
    galeria: [
      '/imagenes/imagen_frontend.jpeg',
      '/imagenes/imagen_frontend.jpeg',
      '/imagenes/imagen_frontend.jpeg',
    ],
    infoAdicional: 'Texto provisional: ideal para estancias de descanso o viajes de trabajo remoto.',
  },
  {
    id: 'lagarto-03',
    nombre: 'Bungalow El Artesano #2',
    descripcion:
      'Texto provisional: opción más amplia para familias o grupos pequeños que desean disfrutar de un alojamiento tranquilo y cercano a la naturaleza.',
    capacidad: 5,
    habitaciones: 2,
    banos: 2,
    precio: 'Consultar precio',
    servicios: ['Terraza', 'Cocina', 'Wi‑Fi'],
    imagen: '/imagenes/imagen_frontend.jpeg',
    galeria: [
      '/imagenes/imagen_frontend.jpeg',
      '/imagenes/imagen_frontend.jpeg',
      '/imagenes/imagen_frontend.jpeg',
    ],
    infoAdicional: 'Texto provisional: el espacio se puede adaptar según la cantidad de huéspedes y la temporada.',
  },
];
