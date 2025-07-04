import React from 'react';

interface AirlineLogoProps {
  src: string;
  alt: string;
}

const AirlineLogo: React.FC<AirlineLogoProps> = ({ src, alt }) => (
  <img src={src} alt={alt} style={{ height: 22, width: 22, objectFit: 'contain', borderRadius: 4 }} />
);

export default AirlineLogo; 