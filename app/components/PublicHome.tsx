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

function mapCabinaData(apiCabin: ApiCabina): Cabin | null {
  const nombre = apiCabin.Nombre ?? apiCabin.nombre ?? '';
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
    detail: `Para ${normalizedNumber} ${normalizedNumber === 1 ? 'persona' : 'personas'} · 1 noche`,
    price: `₡${Math.round(normalizedPrice).toLocaleString('es-CR')}`,
    image:
      portada ||
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    tag: estado || 'Disponible',
  };
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Cabina, inicio">
        <span className="brand-mark">C</span>
        <span>El Artesano Beach House<span className="brand-dot">.</span></span>
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
        <p className="hero-text">Casa y cabinas privadas para desconectarse del mundo, celebrar, trabajar o simplemente disfrutar a la orilla del mar.</p>
        <a className="hero-location"href="https://maps.app.goo.gl/3uKnZF1eAVDxF74c8"target="_blank" rel="noopener noreferrer" >
  📍 Playa Lagarto, Santa Cruz, Guanacaste, Costa Rica
  <span>↗</span>
</a>

        <a className="button button-primary" href="#cabinas">Explora las cabinas <Arrow /></a>
      </div>
      <div className="hero-art" aria-label="Interior de una cabina privada" role="img" />
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
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="brand brand-footer" href="#inicio">
          <span className="brand-mark">C</span>
          <span>El Artesano Beach House<span className="brand-dot">.</span></span>
        </a>
        <p>Espacios privados para vivir momentos únicos.</p>
      </div>
      <div className="footer-bottom">
        <span>© 2026 El Artesano Beach House</span>
        <a href="mailto:hola@cabina.local">Contacto</a>
      </div>
    </footer>
  );
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

  return <><Navbar /><main><Hero /><Cabins cabins={cabins} loading={loading} error={error} /></main><Footer /></>;
}
