import react from '@vitejs/plugin-react';

export default ({ command, mode }) => {
  const port = process.env.VITE_PORT || 3000;
  return {
    server: {
      port,
    },
    plugins: [react()],
  };
};
