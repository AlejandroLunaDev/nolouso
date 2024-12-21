/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'example.com',
          'localhost',
          'res.cloudinary.com', // si usas Cloudinary
          'storage.googleapis.com', // si usas Google Cloud Storage
          'lh3.googleusercontent.com',
          'images.unsplash.com',
          'fakestoreapi.com'
    
       
        ],
      },
};

export default nextConfig;
