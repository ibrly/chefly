import initializeSocket from './socket';

export default ({ strapi }) => {
  // Initialize Socket.io
  const io = initializeSocket(strapi.server.httpServer, strapi);
  
  // Make io accessible in strapi
  strapi.io = io;

  console.log('✅ Socket.io initialized and ready for connections');
};

