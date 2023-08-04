import react from '@vitejs/plugin-react';

export default ({ command, mode }) => {
  const port = process.env.VITE_PORT || 3000;
  return {
    server: {
      host: '0.0.0.0',
      port,
    },
    plugins: [react()],
    host: true, // Here
    build: {
      rollupOptions: {
        external: [
          '@mui/base/ModalUnstyled',
          '@mui/base/BadgeUnstyled',
          '@mui/base/PopperUnstyled',
          '@mui/base/SliderUnstyled',
          '@mui/base/AutocompleteUnstyled',
        ],
      },
    },
  };
};
