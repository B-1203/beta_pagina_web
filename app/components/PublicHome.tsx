'use client';

import Image from 'next/image';
import { useMemo, useState, type FormEvent } from 'react';
import { cabinas, galeria, servicios, sitio } from '../data/sitio';
import CabinGallery from './CabinGallery';

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  cabinId: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  notes: string;
  privacyAccepted: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const today = new Date();
const todayISO = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);

export default function PublicHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    cabinId: cabinas[0]?.id ?? '',
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    notes: '',
    privacyAccepted: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const selectedCabin = useMemo(
    () => cabinas.find((cabin) => cabin.id === form.cabinId) ?? cabinas[0],
    [form.cabinId],
  );

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const scrollToBooking = (cabinId?: string) => {
    if (cabinId) {
      updateField('cabinId', cabinId);
    }

    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const adultsValue = Number(form.adults);
    const childrenValue = Number(form.children || '0');

    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Escribe tu nombre completo.';
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Ingresa un número de teléfono.';
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Ingresa un correo electrónico válido.';
    }

    if (!form.checkIn) {
      nextErrors.checkIn = 'Selecciona la fecha de entrada.';
    } else {
      const entryDate = new Date(`${form.checkIn}T00:00:00`);
      const todayDate = new Date(`${todayISO}T00:00:00`);
      if (entryDate < todayDate) {
        nextErrors.checkIn = 'La fecha de entrada no puede ser anterior al día actual.';
      }
    }

    if (!form.checkOut) {
      nextErrors.checkOut = 'Selecciona la fecha de salida.';
    } else if (form.checkIn && form.checkOut <= form.checkIn) {
      nextErrors.checkOut = 'La salida debe ser posterior a la entrada.';
    }

    if (!Number.isInteger(adultsValue) || adultsValue < 1) {
      nextErrors.adults = 'La cantidad de adultos debe ser válida.';
    }

    if (!Number.isInteger(childrenValue) || childrenValue < 0) {
      nextErrors.children = 'La cantidad de niños debe ser válida.';
    }

    if (!form.privacyAccepted) {
      nextErrors.privacyAccepted = 'Debes aceptar la política de privacidad.';
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const formattedPhone = sitio.whatsappHost.replace(/\D/g, '');
    const cabinName = selectedCabin?.nombre ?? 'cabina seleccionada';
    const message = [
      `Hola ${sitio.nombreNegocio},`,
      `Me gustaría consultar disponibilidad para la ${cabinName}.`,
      '',
      `Nombre: ${form.fullName}`,
      `Teléfono: ${form.phone}`,
      form.email ? `Correo: ${form.email}` : undefined,
      `Fecha de entrada: ${form.checkIn}`,
      `Fecha de salida: ${form.checkOut}`,
      `Adultos: ${form.adults}`,
      `Niños: ${form.children || '0'}`,
      form.notes ? `Comentarios: ${form.notes}` : undefined,
      '',
      'Gracias.',
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <Image
            src="/imagenes/logo.png"
            alt="Logo de El Artesano Beach House"
            width={100}
            height={40}
            priority
            className="brand-logo"
          />
          <span>
            {sitio.nombreNegocio}
            <span className="brand-dot">.</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          id="main-navigation"
          className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}
          aria-label="Navegación principal"
        >
          <a href="#quienes-somos" onClick={() => setIsMenuOpen(false)}>Quiénes somos</a>
          <a href="#cabinas" onClick={() => setIsMenuOpen(false)}>Cabinas</a>
          <a href="#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a>
          <a href="#ubicacion" onClick={() => setIsMenuOpen(false)}>Ubicación</a>
          <a href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>
          <a
            className="nav-cta"
            href="#reservar"
            onClick={() => {
              setIsMenuOpen(false);
              scrollToBooking();
            }}
          >
            Reservar <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {sitio.lema}
            </p>
            <h1>
              Un espacio
              <em> para descansar.</em>
            </h1>
            <p className="hero-text">{sitio.descripcionBreve}</p>

            <a className="hero-location" href={sitio.mapsUrl} target="_blank" rel="noreferrer">
              📍 {sitio.ubicacion}
              <span aria-hidden="true">↗</span>
            </a>

            <div className="hero-actions">
              <a className="button button-primary" href="#cabinas">
                Conoce nuestras cabinas <span aria-hidden="true">↗</span>
              </a>
              <button type="button" className="button button-secondary" onClick={() => scrollToBooking()}>
                Reservar por WhatsApp <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>

          <div className="hero-visual" aria-label="Vista principal de las cabinas" role="img">
            <div className="hero-card">
              <span>Estadía equilibrada</span>
              <strong>Calidez, descanso y naturaleza</strong>
            </div>
          </div>
        </section>

        <section className="section cabins-section" id="cabinas">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-line" />
                Nuestras cabinas
              </p>
              <h2>
                Elige tu <em>espacio ideal.</em>
              </h2>
            </div>
            <p className="section-intro">
              Texto provisional: cada cabina se puede adaptar a tus necesidades y preferencias para una estadía más cómoda.
            </p>
          </div>

          <div className="cabins-grid">
            {cabinas.map((cabin) => (
              <article className="cabin-card" key={cabin.id}>
                <CabinGallery cabinName={cabin.nombre} images={cabin.imagenes} />
                <div className="cabin-card-body">
                  <div>
                    <h3>{cabin.nombre}</h3>
                    <p>
                      {cabin.capacidad} huéspedes · {cabin.habitaciones} habitaciones · {cabin.banos} baños
                    </p>
                  </div>
                  <div className="cabin-price">
                    <span>Desde</span>
                    <strong>{cabin.precio}</strong>
                  </div>
                </div>
                <div className="cabin-detail-list">
                  {cabin.servicios.map((servicio) => (
                    <span key={`${cabin.id}-${servicio}`}>{servicio}</span>
                  ))}
                </div>
                <button type="button" className="card-link" onClick={() => scrollToBooking(cabin.id)}>
                  Consultar esta cabina <span aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="services-section" id="servicios">
          <div className="services-copy">
            <p className="eyebrow eyebrow-light">
              <span className="eyebrow-line" />
              Servicios y comodidades
            </p>
            <h2>
              Todo lo necesario para <em>vivir bien.</em>
            </h2>
            <p>
              Una experiencia pensada para que cada visita se sienta cómoda, tranquila y cercana a la naturaleza.
            </p>
          </div>

          <div className="services-list">
            {servicios.map((servicio, index) => (
              <article className="service-item" key={servicio.titulo}>
                <span className="service-icon" aria-hidden="true">{servicio.icono}</span>
                <div>
                  <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{servicio.titulo}</h3>
                  <p>{servicio.descripcion}</p>
                </div>
                <span className="service-arrow" aria-hidden="true">→</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section location-section" id="ubicacion">
          <div className="info-panel">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              Ubicación
            </p>
            <h2>
              Un destino <em>cercano a la naturaleza.</em>
            </h2>
            <p>{sitio.ubicacion}</p>
            <a className="button button-primary" href={sitio.mapsUrl} target="_blank" rel="noreferrer">
              Cómo llegar <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="map-card" aria-label="Mapa de la ubicación">
            <div className="map-pin"></div>
            <strong>Playa Lagarto</strong>
            <span>Santa Cruz, Guanacaste</span>
          </div>
        </section>

        <section className="section gallery-section" id="galeria">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-line" />
                Galería
              </p>
              <h2>
                Inspiración de <em>la experiencia.</em>
              </h2>
            </div>
          </div>

          <div className="gallery-grid">
            {galeria.map((image, index) => (
              <div key={`${image}-${index}`} className={`gallery-item gallery-item-${index + 1}`} style={{ backgroundImage: `url(${image})` }} aria-label="Fotografía del lugar" role="img" />
            ))}
          </div>
        </section>

             <section className="section about-section" id="quienes-somos">
          <div className="about-image" aria-label="Fotografía del lugar" role="img" />

          <div className="about-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              Quiénes somos
            </p>
            <h2>
              Un lugar pensado para <em>disfrutar.</em>
            </h2>
            <p>{sitio.quienesSomos}</p>
            <p>{sitio.historia}</p>

            <div className="mission-block">
              <div>
                <span>Misión</span>
                <p>{sitio.mision}</p>
              </div>
              <div>
                <span>Valores</span>
                <ul>
                  {sitio.valores.map((valor) => (
                    <li key={valor}>{valor}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contacto">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-line" />
                Información de contacto
              </p>
              <h2>
                Estamos para <em>ayudarte.</em>
              </h2>
            </div>
          </div>

          <div className="contact-grid">
            <article className="contact-card">
              <span>WhatsApp</span>
              <strong>{sitio.telefono}</strong>
              <p>Consulta disponibilidad o solicita información en cualquier momento.</p>
            </article>
            <article className="contact-card">
              <span>Correo</span>
              <strong>{sitio.correo}</strong>
              <p>Envía tus dudas y te responderemos con gusto.</p>
            </article>
            <article className="contact-card">
              <span>Horario</span>
              <strong>{sitio.horario}</strong>
              <p>Atención para responder consultas y coordinar tu visita.</p>
            </article>
          </div>
        </section>

        <section className="section booking-section" id="reservar">
          <div className="booking-layout">
            <div className="booking-copy">
              <p className="eyebrow">
                <span className="eyebrow-line" />
                Reservar
              </p>
              <h2>
                Solicita tu <em>reservación.</em>
              </h2>
              <p>
                Se abrirá WhatsApp con un mensaje precargado para que puedas revisarlo y enviarlo. La reserva será gestionada por el anfitrión posteriormente.
              </p>
            </div>

            <form className="booking-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <label className="field">
                  <span>Nombre completo</span>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) => updateField('fullName', event.target.value)}
                    placeholder="Tu nombre completo"
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName ? <small>{errors.fullName}</small> : null}
                </label>

                <label className="field">
                  <span>Número de teléfono</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    placeholder="8888-8888"
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone ? <small>{errors.phone}</small> : null}
                </label>

                <label className="field">
                  <span>Correo electrónico</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder="correo@ejemplo.com"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email ? <small>{errors.email}</small> : null}
                </label>

                <label className="field">
                  <span>Cabina de interés</span>
                  <select
                    value={form.cabinId}
                    onChange={(event) => updateField('cabinId', event.target.value)}
                    aria-invalid={Boolean(errors.cabinId)}
                  >
                    {cabinas.map((cabin) => (
                      <option key={cabin.id} value={cabin.id}>
                        {cabin.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Fecha de entrada</span>
                  <input
                    type="date"
                    min={todayISO}
                    value={form.checkIn}
                    onChange={(event) => updateField('checkIn', event.target.value)}
                    aria-invalid={Boolean(errors.checkIn)}
                  />
                  {errors.checkIn ? <small>{errors.checkIn}</small> : null}
                </label>

                <label className="field">
                  <span>Fecha de salida</span>
                  <input
                    type="date"
                    min={form.checkIn || todayISO}
                    value={form.checkOut}
                    onChange={(event) => updateField('checkOut', event.target.value)}
                    aria-invalid={Boolean(errors.checkOut)}
                  />
                  {errors.checkOut ? <small>{errors.checkOut}</small> : null}
                </label>

                <label className="field">
                  <span>Cantidad de adultos</span>
                  <input
                    type="number"
                    min="1"
                    value={form.adults}
                    onChange={(event) => updateField('adults', event.target.value)}
                    aria-invalid={Boolean(errors.adults)}
                  />
                  {errors.adults ? <small>{errors.adults}</small> : null}
                </label>

                <label className="field">
                  <span>Cantidad de niños</span>
                  <input
                    type="number"
                    min="0"
                    value={form.children}
                    onChange={(event) => updateField('children', event.target.value)}
                    aria-invalid={Boolean(errors.children)}
                  />
                  {errors.children ? <small>{errors.children}</small> : null}
                </label>

                <label className="field field-full">
                  <span>Comentarios o solicitudes especiales</span>
                  <textarea
                    value={form.notes}
                    onChange={(event) => updateField('notes', event.target.value)}
                    rows={4}
                    placeholder="Escribe cualquier detalle que quieras compartir"
                  />
                </label>
              </div>

              <label className="privacy-row">
                <input
                  type="checkbox"
                  checked={form.privacyAccepted}
                  onChange={(event) => updateField('privacyAccepted', event.target.checked)}
                />
                <span>{sitio.politicaPrivacidad}</span>
              </label>
              {errors.privacyAccepted ? <small className="privacy-error">{errors.privacyAccepted}</small> : null}

              <button type="submit" className="button button-primary submit-button">
                Enviar solicitud por WhatsApp <span aria-hidden="true">↗</span>
              </button>
            </form>

            <aside className="booking-summary" aria-live="polite">
              <span className="summary-tag">Cabina seleccionada</span>
              <h3>{selectedCabin?.nombre ?? 'Selecciona una cabina'}</h3>
              <p>{selectedCabin?.descripcion ?? 'Texto provisional: descripción de la cabina seleccionada.'}</p>
              <ul>
                <li>
                  <strong>Capacidad:</strong> {selectedCabin?.capacidad ?? 0} huéspedes
                </li>
                <li>
                  <strong>Habitaciones:</strong> {selectedCabin?.habitaciones ?? 0}
                </li>
                <li>
                  <strong>Baños:</strong> {selectedCabin?.banos ?? 0}
                </li>
                <li>
                  <strong>Precio:</strong> {selectedCabin?.precio ?? 'Consultar'}
                </li>
              </ul>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="brand brand-footer" href="#inicio">
            <span className="brand-mark">C</span>
            <span>
              {sitio.nombreNegocio}
              <span className="brand-dot">.</span>
            </span>
          </a>
          <p>{sitio.descripcionBreve}</p>
          <a className="footer-link" href="#reservar">
            Reservar ahora <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="footer-bottom">
          <span>© 2026 {sitio.nombreNegocio}</span>
          <div>
            <a href={`tel:${sitio.whatsappHost}`}>{sitio.telefono}</a>
            <a href={`mailto:${sitio.correo}`}>{sitio.correo}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
