import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { services } from '../../data/Andaman and Nicobar/AndamanIslandsservices';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { trackEvent } from '../../utils/analytics';

const phone = "07633807420";

const AndamanIslandsServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  const service = useMemo(
    () => services.find((s) => String(s.id) === String(id)),
    [id]
  );

  if (!service) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header showBack title="Service Not Found" />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Service Not Found</h1>
          <p className="text-neutral-600 mb-8">The service you are looking for does not exist or has been removed.</p>
          <Link to="/andaman-and-nicobar/andaman-islands" className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors">
            Back to Andaman Islands
          </Link>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    startBooking(service, { id: service.id, name: service.name });
    trackEvent('begin_checkout', {
      service_id: service.id,
      service_name: service.name,
      city: 'Andaman Islands',
      state: 'Andaman and Nicobar',
    });
    navigate('/andaman-and-nicobar/andaman-islands/booking');
  };

  const allImages = useMemo(() => {
    const imgs = service.gallery && service.gallery.length > 0
      ? [service.image, ...service.gallery]
      : [service.image];
    return imgs;
  }, [service]);

  const [selectedImg, setSelectedImg] = useState(0);

  const relatedServices = services.filter((s) => String(s.id) !== String(id)).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header showBack title={service.name} />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-4">
        <nav className="text-sm text-neutral-500 mb-4">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/andaman-and-nicobar" className="hover:underline">Andaman and Nicobar</Link>
          <span className="mx-2">›</span>
          <Link to="/andaman-and-nicobar/andaman-islands" className="hover:underline">Andaman Islands</Link>
          <span className="mx-2">›</span>
          <span className="text-neutral-900">{service.name}</span>
        </nav>
      </div>

      {/* Service Hero */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="md:flex">
            {/* Image Gallery */}
            <div className="md:w-1/2 flex flex-col">
              {/* Main Image */}
              <div className="relative group">
                <LazyImage
                  src={allImages[selectedImg]}
                  alt={`${service.name} in Andaman Islands, Andaman and Nicobar - Photo ${selectedImg + 1}`}
                  className="w-full h-72 md:h-96 object-cover"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImg((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Previous image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      onClick={() => setSelectedImg((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Next image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {selectedImg + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>
              {/* Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-neutral-100">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(idx)}
                      className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === selectedImg ? 'border-pink-600 ring-2 ring-pink-300' : 'border-transparent hover:border-neutral-300'
                      }`}
                    >
                      <LazyImage src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {service.availability}
                  </span>
                  <span className="bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Andaman Islands, Andaman and Nicobar
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                  {service.name} in Andaman Islands
                </h1>

                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-neutral-700">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    100% Verified Andaman Islands Profiles
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-700">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Complete Privacy &amp; Discretion
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-700">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 Andaman Islands Area Support
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-700">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Safe &amp; Secure Booking
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBookNow}
                  className="w-full bg-pink-600 text-white py-3.5 rounded-xl font-semibold hover:bg-pink-700 transition-colors text-center"
                >
                  Book Now
                </button>
                <div className="flex gap-3">
                  <a
                    href={`tel:+91${phone}`}
                    className="flex-1 border-2 border-pink-600 text-pink-600 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-colors text-center inline-flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </a>
                  <a
                    href={`https://wa.me/91${phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors text-center inline-flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div className="container mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            More Services in Andaman Islands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((s) => (
              <Link
                key={s.id}
                to={`/andaman-and-nicobar/andaman-islands/service/${s.id}`}
                className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <LazyImage
                    src={s.image}
                    alt={s.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      View Profiles
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-pink-600 transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-neutral-600 text-sm line-clamp-2">{s.description}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-neutral-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {s.availability}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Contact Bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 safe-bottom z-50 md:hidden">
        <div className="flex gap-3">
          <button
            onClick={handleBookNow}
            className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-pink-700 transition-colors"
          >
            Book Now
          </button>
          <a
            href={`https://wa.me/91${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default AndamanIslandsServiceDetail;
