'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cabinas } from '../../data/sitio';

export default function CabinaDetailPage() {
  const params = useParams<{ id: string }>();
  const cabina = cabinas.find((item) => item.id === params.id) ?? cabinas[0];

  if (!cabina) {
    return (
      <main className="detail-state">
        <Link href="/#cabinas">- Volver a cabinas</Link>
        <p>No encontramos esta cabina.</p>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <Link className="detail-back" href="/#cabinas">
        - Volver a cabinas
      </Link>

      <header className="detail-header">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line" />
            Tu espacio privado
          </p>
          <h1>{cabina.nombre}</h1>
        </div>
        <span className="detail-status">Disponible</span>
      </header>

      <section className="detail-gallery" aria-label={`Galeria de ${cabina.nombre}`}>
        <div
          className="detail-main-image"
          style={{ backgroundImage: `url(${cabina.imagenes[0]})` }}
          role="img"
          aria-label={`${cabina.nombre}, fotografía principal`}
        />
        <div className="detail-thumbs">
          {cabina.imagenes.slice(0, 3).map((image, index) => (
            <div
              key={`${cabina.id}-${index}`}
              className="detail-thumb"
              style={{ backgroundImage: `url(${image})` }}
              role="img"
              aria-label={`${cabina.nombre}, fotografía ${index + 2}`}
            />
          ))}
        </div>
      </section>

      <section className="detail-layout">
        <div className="detail-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            Sobre la cabina
          </p>
          <h2>
            Un lugar para <em>quedarte.</em>
          </h2>
          <p>{cabina.descripcion}</p>
        </div>

        <aside className="detail-facts">
          <div>
            <span>Capacidad</span>
            <strong>{cabina.capacidad} huespedes</strong>
          </div>
          <div>
            <span>Habitaciones</span>
            <strong>{cabina.habitaciones}</strong>
          </div>
          <div>
            <span>Banos</span>
            <strong>{cabina.banos}</strong>
          </div>
          <div>
            <span>Precio</span>
            <strong>{cabina.precio}</strong>
          </div>
        </aside>
      </section>

      <section className="detail-service-list">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line" />
            Servicios
          </p>
          <h2>
            Todo lo que necesitas <em>al alcance.</em>
          </h2>
        </div>

        <ul>
          {cabina.servicios.map((servicio) => (
            <li key={`${cabina.id}-${servicio}`}>{servicio}</li>
          ))}
        </ul>
      </section>

      <div className="detail-actions">
        <Link className="button button-primary" href="/#reservar">
          Reservar esta cabina <span aria-hidden="true">&gt;</span>
        </Link>
      </div>
    </main>
  );
}
