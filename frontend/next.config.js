/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'example.com',
      'localhost',
      'res.cloudinary.com', // si usas Cloudinary
      'storage.googleapis.com', // si usas Google Cloud Storage
      // añade otros dominios según necesites
    ],
  },
};

module.exports = nextConfig; 