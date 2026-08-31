'use client';

import { useEffect, useState } from 'react';
import { obtenerCabinas } from '../services/api';

type Cabin = {
  name: string;
  detail: string;
  price: string;
  image: string;
  tag: string;
};

type ApiCabina = {
  Id?: number;
  id?: number;
  Nombre?: string;
  nombre?: string;
  Descripcion?: string;
  descripcion?: string;
  Portada?: string | null;
  portada?: string | null;
  Capacidad?: number | string | null;
  capacidad?: number | string | null;
  PrecioBase?: number | string | null;
  precioBase?: number | string | null;
  Estado?: string | null;
  estado?: string | null;
  Activa?: boolean;
  activa?: boolean;
};

type Service = {
  number: string;
  title: string;
  text: string;
  icon: string;
};

function mapCabinaData(apiCabin: ApiCabina): Cabin | null {
  const nombre = apiCabin.Nombre ?? apiCabin.nombre ?? '';
  const descripcion = apiCabin.Descripcion ?? apiCabin.descripcion ?? 'Cabina privada';
  const capacidad = Number(apiCabin.Capacidad ?? apiCabin.capacidad ?? 2);
  const precioBase = Number(apiCabin.PrecioBase ?? apiCabin.precioBase ?? 0);
  const portada = apiCabin.Portada ?? apiCabin.portada ?? '';
  const estado = apiCabin.Estado ?? apiCabin.estado ?? 'Disponible';

  if (!nombre) {
    return null;
  }

  const normalizedNumber = Number.isFinite(capacidad) && capacidad > 0 ? capacidad : 2;
  const normalizedPrice = Number.isFinite(precioBase) && precioBase >= 0 ? precioBase : 0;

  return {
    name: nombre,
    detail: `Para ${normalizedNumber} ${normalizedNumber === 1 ? 'persona' : 'personas'} · 2 horas`,
    price: `$${Math.round(normalizedPrice).toLocaleString('es-CL')}`,
    image:
      portada ||
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    tag: estado || 'Disponible',
  };
}

const services: Service[] = [
  {
    number: '01',
    title: 'Audio envolvente',
    text: 'Sonido nítido para que cada canción se sienta cerca.',
    icon: '◒',
  },
  {
    number: '02',
    title: 'Menú en tu mesa',
    text: 'Snacks, bebidas y favoritos de la casa sin interrumpir tu plan.',
    icon: '✦',
  },
  {
    number: '03',
    title: 'Privacidad real',
    text: 'Tu espacio, tu ritmo. Atención cuando la necesitas.',
    icon: '⌁',
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Cabina, inicio">
        <span className="brand-mark">C</span>
        <span>Cabinas el Artesano<span className="brand-dot">.</span></span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span />
        <span />
      </button>
      <nav className={`main-nav ${isOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
        <a href="#cabinas" onClick={() => setIsOpen(false)}>Cabinas</a>
        <a href="#experiencia" onClick={() => setIsOpen(false)}>La experiencia</a>
        <a href="#info" onClick={() => setIsOpen(false)}>Encuéntranos</a>
        <a className="nav-cta" href="#cabinas" onClick={() => setIsOpen(false)}>Reserva tu cabina <Arrow /></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> Tu lugar para desconectar</p>
        <h1>Un espacio<br /><em>solo para ti.</em></h1>
        <p className="hero-text">Cabinas privadas para cantar, celebrar, trabajar o simplemente bajar el volumen del mundo.</p>
        <a className="button button-primary" href="#cabinas">Explora las cabinas <Arrow /></a>
        <div className="hero-note"><span>✺</span> Abierto hoy hasta las 02:00</div>
      </div>
      <div className="hero-art" aria-label="Interior de una cabina privada" role="img">
        <div className="hero-badge"><strong>4.9</strong><span>★ ★ ★ ★ ★</span><small>Más de 200 visitas</small></div>
        <span className="hero-caption">La noche empieza aquí <Arrow /></span>
      </div>
      <div className="hero-scroll"><span>01</span><span className="scroll-line" /><span>Descubre</span></div>
    </section>
  );
}

function CabinCard({ cabin }: { cabin: Cabin }) {
  return (
    <article className="cabin-card">
      <div className="cabin-image" style={{ backgroundImage: `url(${cabin.image})` }}>
        <span className="image-tag">{cabin.tag}</span>
        <button className="favorite" type="button" aria-label={`Guardar ${cabin.name}`}>♡</button>
      </div>
      <div className="cabin-card-body">
        <div><h3>{cabin.name}</h3><p>{cabin.detail}</p></div>
        <div className="cabin-price"><span>desde</span><strong>{cabin.price}</strong><small>/ hr</small></div>
      </div>
      <a className="card-link" href="#info">Ver detalles <Arrow /></a>
    </article>
  );
}

function Cabins({
  cabins,
  loading,
  error,
}: {
  cabins: Cabin[];
  loading: boolean;
  error: string | null;
}) {
  const message = error ?? 'No hay cabinas disponibles en este momento.';

  return (
    <section className="section cabins-section" id="cabinas">
      <div className="section-heading">
        <div><p className="eyebrow"><span className="eyebrow-line" /> Elige tu atmósfera</p><h2>Tu cabina,<br /><em>tu momento.</em></h2></div>
        <p className="section-intro">Cada espacio fue pensado para que te sientas cómodo desde que cierras la puerta.</p>
      </div>
      <div className="cabins-grid">
        {loading ? (
          <p>{'Cargando cabinas...'}</p>
        ) : error ? (
          <p>{message}</p>
        ) : cabins.length === 0 ? (
          <p>{message}</p>
        ) : (
          cabins.map((cabin) => <CabinCard cabin={cabin} key={cabin.name} />)
        )}
      </div>
      <div className="center-link"><a className="text-link" href="#cabinas">Ver todas las cabinas <Arrow /></a></div>
    </section>
  );
}

function Services() {
  return (
    <section className="section services-section" id="experiencia">
      <div className="services-heading"><p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Todo lo que necesitas</p><h2>Los detalles hacen<br /><em>la diferencia.</em></h2></div>
      <div className="services-list">{services.map((service) => <article className="service-item" key={service.number}><span className="service-icon">{service.icon}</span><span className="service-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.text}</p></div><span className="service-arrow"><Arrow /></span></article>)}</div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="info">
      <div className="about-image" role="img" aria-label="Amigos disfrutando una noche en Cabina" />
      <div className="about-copy"><p className="eyebrow"><span className="eyebrow-line" /> La idea detrás de Cabina</p><h2>Menos ruido.<br /><em>Más conexión.</em></h2><p>Creemos que los mejores recuerdos aparecen cuando el teléfono deja de ser protagonista. Por eso creamos un lugar íntimo para compartir lo que importa.</p><a className="text-link" href="mailto:hola@cabina.local">Conoce más sobre nosotros <Arrow /></a><div className="location-note"><span className="location-pin">⌖</span><div><strong>Visítanos</strong><span>Av. de los Álamos 124 · Centro</span></div></div></div>
    </section>
  );
}

function Footer() {
  return <footer className="site-footer"><div className="footer-top"><a className="brand brand-footer" href="#inicio"><span className="brand-mark">C</span><span>Cabinas el Artesano<span className="brand-dot">.</span></span></a><p>Un espacio para estar<br />presente.</p><a className="footer-booking" href="#cabinas">Reserva tu momento <Arrow /></a></div><div className="footer-bottom"><span>© 2024 Cabina</span><div><a href="#info">Instagram</a><a href="mailto:hola@cabina.local">Contacto</a><a href="#inicio">Volver arriba ↑</a></div></div></footer>;
}

export default function PublicHome() {
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCabins() {
      try {
        setLoading(true);
        setError(null);

        const response = await obtenerCabinas();
        const rawCabins = Array.isArray(response)
          ? response
          : Array.isArray((response as { data?: ApiCabina[] })?.data)
            ? (response as { data: ApiCabina[] }).data
            : [];

        const mappedCabins = rawCabins
          .map((cabin) => mapCabinaData(cabin as ApiCabina))
          .filter((cabin): cabin is Cabin => Boolean(cabin));

        if (!isMounted) {
          return;
        }

        setCabins(mappedCabins);

        if (mappedCabins.length === 0) {
          setError('No hay cabinas disponibles en este momento.');
        }
      } catch (fetchError) {
        if (!isMounted) {
          return;
        }

        setCabins([]);
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'No pudimos cargar las cabinas en este momento.',
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void fetchCabins();

    return () => {
      isMounted = false;
    };
  }, []);

  return <><Navbar /><main><Hero /><Cabins cabins={cabins} loading={loading} error={error} /><Services /><About /></main><Footer /></>;
}
