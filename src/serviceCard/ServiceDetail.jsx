import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import LazyImage from '../components/LazyImage';
import { useBooking } from '../context/BookingContext';
import { services } from '../data/services';
import { trackEvent } from '../utils/analytics';

const PHONE = '9324881345';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  const service = useMemo(
    () => services.find((item) => String(item.id) === String(id)),
    [id]
  );

  const relatedServices = useMemo(
    () => services.filter((item) => String(item.id) !== String(id)).slice(0, 3),
    [id]
  );

  if (!service) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header showBack title="Service Not Found" />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold text-neutral-900">Service Not Found</h1>
          <p className="mb-8 text-neutral-600">
            The service you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex rounded-full bg-pink-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-pink-700"
          >
            Back to Home
          </Link>
        </main>
      </div>
    );
  }

  const handleBookNow = () => {
    const variant = {
      id: service.id,
      name: service.name,
      image: service.image,
      price: service.price,
      duration: service.duration,
    };

    startBooking(service, variant);
    trackEvent('begin_checkout', {
      service_id: service.id,
      service_name: service.name,
      value: service.price,
      currency: 'INR',
    });
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      <Header showBack title={service.name} />

      <main className="container mx-auto px-4 py-6">
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
          <Link to="/" className="hover:text-pink-600">Home</Link>
          <span>/</span>
          <span className="font-medium text-neutral-900">{service.name}</span>
        </nav>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="md:flex">
            <div className="md:w-1/2">
              <LazyImage
                src={service.image}
                alt={`${service.name} preview`}
                className="h-80 w-full object-cover md:h-full"
                priority
              />
            </div>

            <div className="space-y-5 p-6 md:w-1/2 md:p-8">
              <div className="flex flex-wrap gap-2">
                {service.availability && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {service.availability}
                  </span>
                )}
                {service.category && (
                  <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
                    {service.category}
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-neutral-900">{service.name}</h1>
                <p className="mt-3 leading-relaxed text-neutral-600">{service.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-neutral-50 p-4">
                  <p className="text-neutral-500">Duration</p>
                  <p className="mt-1 font-semibold text-neutral-900">{service.duration || 'Custom'}</p>
                </div>
                <div className="rounded-xl bg-neutral-50 p-4">
                  <p className="text-neutral-500">Price</p>
                  <p className="mt-1 font-semibold text-neutral-900">
                    {service.price ? `INR ${service.price}` : 'Custom'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:+91${PHONE}`}
                    className="rounded-xl border-2 border-pink-600 py-3 text-center font-semibold text-pink-600 transition-colors hover:bg-pink-50"
                  >
                    Call
                  </a>
                  <a
                    href={`https://wa.me/91${PHONE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-green-500 py-3 text-center font-semibold text-white transition-colors hover:bg-green-600"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-5 text-2xl font-bold text-neutral-900">More Services</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedServices.map((item) => (
                <Link
                  key={item.id}
                  to={`/service/${item.id}`}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <LazyImage
                    src={item.image}
                    alt={item.name}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-neutral-900">{item.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ServiceDetail;
