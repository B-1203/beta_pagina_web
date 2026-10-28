export type Cabina = {
  id: string;
  nombre: string;
  descripcion: string;
  capacidad: number;
  habitaciones: number;
  banos: number;
  precio: string;
  servicios: string[];
  imagenes: string[];
  infoAdicional: string;
};

export type Servicio = {
  titulo: string;
  descripcion: string;
  icono: string;
};

const URL_FACEBOOK = 'https://www.facebook.com/share/1cwD3VyFoN/?mibextid=wwXIfr';
const URL_INSTAGRAM = 'https://www.instagram.com/el.artesano.beach.house.cr?vrfl=OTdsMGR6Y2hra2Fo';

export const sitio = {
  nombreNegocio: 'EL ARTESANO BEACH HOUSE',
  lema: 'Tu pausa ideal en la costa de Guanacaste',
  descripcionBreve:
    'Un refugio tranquilo para descansar, disfrutar de la naturaleza y vivir una experiencia cercana al mar en Playa Lagarto.',
  quienesSomos:
    'Somos anfitriones locales que cuidamos cada detalle para que cada huésped viva una estadía cómoda, auténtica y relajante.',
  historia:
    'El proyecto nació para compartir la belleza de la zona con viajeros que buscan desconectarse y disfrutar de un alojamiento con carácter local.',
  mision:
    'Brindar una experiencia cálida, personalizada y memorable, con espacios inspirados en la tranquilidad del paisaje costarricense.',
  valores: ['Atención cercana', 'Calidez humana', 'Naturaleza y descanso'],
  ubicacion: 'Playa Lagarto, Santa Cruz, Guanacaste, Costa Rica',
  mapsUrl:
    'https://maps.app.goo.gl/7dndTs6uVTcnMCRk8',
  telefono: '506 8752 8879',
  whatsappHost: '506 8752 8879',
  horario: 'Lunes a Domingo · 7:00 a.m. a 8:00 p.m.',
  correo: 'alejandro.merino@gmail.com',
  politicaPrivacidad:
    'Agradecemos tu confianza. Los datos de esta solicitud se usarán únicamente para gestionar tu consulta de reservación mediante WhatsApp.',
};

export const redesSociales = {
  facebook: URL_FACEBOOK,
  instagram: URL_INSTAGRAM,
};

export const servicios: Servicio[] = [
  {
    titulo: 'Cocina equipada',
    descripcion: 'Espacio cómodo para preparar desayunos, cenas sencillas y momentos de convivencia.',
    icono: '🍳',
  },
  {
    titulo: 'Wi‑Fi',
    descripcion: 'Conexión para trabajar o relajarse desde una vista serena y tranquila.',
    icono: '📶',
  },
  {
    titulo: 'Aire acondicionado',
    descripcion: 'Confort durante los días más calurosos de la zona.',
    icono: '❄️',
  },
  {
    titulo: 'Terraza o patio',
    descripcion: 'Área exterior para tomar aire fresco y vivir la experiencia de la costa.',
    icono: '🌿',
  },
  {
    titulo: 'Parqueo',
    descripcion: 'Facilidad para llegar con tu vehículo y disfrutar sin complicaciones.',
    icono: '🚗',
  },
  {
    titulo: 'Atención personalizada',
    descripcion: 'Apoyo cercano para ayudarte a preparar la mejor experiencia según tus necesidades.',
    icono: '🤝',
  },
];

export const galeria: string[] = [
  '/imagenes/inicio.jpg',
  '/imagenes/Galeria/info_mascotas.jpg',
  '/imagenes/Galeria/ARDILLA.jpeg',
  '/imagenes/Galeria/ATARDECER.jpeg',
  '/imagenes/Galeria/CONGOS.jpeg',
  '/imagenes/Galeria/PARRILLA.jpeg',
  '/imagenes/Galeria/DRON.jpeg',
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
    precio: 'Consultar precio',
    servicios: ['Cocina equipada', 'Wi‑Fi', 'TV'],
    imagenes: [
      '/imagenes/Casa/Imagen_artesano.jpg',
      '/imagenes/Casa/artesano_cocina.jpg',
      '/imagenes/Casa/bano_habitacion_principal.jpg',
      '/imagenes/Casa/artesano_habitacion_principal.jpg',
      '/imagenes/Casa/artesano_habitacion2.jpg',
      '/imagenes/Casa/Banos2.jpeg',
      '/imagenes/Casa/Amaca.jpeg',
      '/imagenes/Casa/Entrada.jpeg',
      '/imagenes/Casa/Exterior.jpeg',
      '/imagenes/Casa/CASA.jpeg',
    ],
    infoAdicional: 'Texto provisional: disponible para estadías cortas o largas según la temporada.',
  },
  {
    id: 'lagarto-02',
    nombre: 'Bungalow El Artesano #1',
    descripcion:
      'Texto provisional: espacio pensado para descansar en pareja o con amigos, con una distribución práctica y una sensación de tranquilidad.',
    capacidad: 2,
    habitaciones: 1,
    banos: 1,
    precio: 'Consultar precio',
    servicios: ['Patio', 'Parqueo', 'Atención personalizada'],
    imagenes: ['/imagenes/CABINA/BUNGALOW.jpeg',
      '/imagenes/CABINA/CAMA.jpeg',
      '/imagenes/CABINA/EXTERIOR.jpeg',
      '/imagenes/CABINA/INTERIOR_BUNGALOW.jpeg',
      '/imagenes/CABINA/INTERIOR.jpeg',
      '/imagenes/CABINA/BONGALOW_NOCHE.jpeg'],
    infoAdicional: 'Texto provisional: ideal para estancias de descanso o viajes de trabajo remoto.',
  },
  {
    id: 'lagarto-03',
    nombre: 'Bungalow El Artesano #2',
    descripcion:
      'Texto provisional: opción más amplia para familias o grupos pequeños que desean disfrutar de un alojamiento tranquilo y cercano a la naturaleza.',
    capacidad: 2,
    habitaciones: 1,
    banos: 1,
    precio: 'Consultar precio',
    servicios: ['Terraza', 'Cocina', 'Wi‑Fi'],
    imagenes: ['/imagenes/CABINA/BONGALOW_NOCHE.jpeg',
      '/imagenes/CABINA/CAMA.jpeg',
      '/imagenes/CABINA/EXTERIOR.jpeg',
      '/imagenes/CABINA/INTERIOR_BUNGALOW.jpeg',
      '/imagenes/CABINA/INTERIOR.jpeg',
      '/imagenes/CABINA/BUNGALOW.jpeg'
    ],
    infoAdicional: 'Texto provisional: el espacio se puede adaptar según la cantidad de huéspedes y la temporada.',
  },
];
