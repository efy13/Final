import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const MapSection = () => {
  return (
    <div className="w-full bg-white py-10 px-4 flex flex-col items-center relative">
      {/* Xəritə */}
      <div className="w-[1470px] h-[644px] overflow-hidden rounded-xl shadow-lg z-0">
        <img
          src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Map-min.jpg"
          alt="Map"
          className="w-[1470px] h-[644px] object-cover"
        />
      </div>

      {/* Üçlü bloklar xəritənin üstündə */}
      <div className="absolute top-10 z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1470px] w-full px-4">
        {/* Email */}
        <div className="bg-black text-white p-8 flex flex-col items-center rounded-xl h-[304.61px] w-full">
          <Mail size={32} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">Email:</h3>
          <p className="text-sm">Oil_Painting@Company.com</p>
          <p className="text-sm">OrderTrack@paint.com</p>
        </div>

        {/* Call */}
        <div className="bg-black text-white p-8 flex flex-col items-center rounded-xl h-[304.61px] w-full">
          <Phone size={32} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">Call:</h3>
          <p className="text-sm">+11 (0)22 3333 4444</p>
          <p className="text-sm">+22 (0)33 7777 5555</p>
        </div>

        {/* Address */}
        <div className="bg-black text-white p-8 flex flex-col items-center rounded-xl h-[304.61px] w-full">
          <MapPin size={32} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">Address:</h3>
          <p className="text-sm text-center">11111 Piermont Dr NE</p>
          <p className="text-sm text-center">Albuquerque, NM 0000</p>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
