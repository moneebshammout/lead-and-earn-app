import './LoadingOverlay.css';

/**
 * LoadingOverlay component
 *
 * @returns {JSX.Element} LoadingOverlay component
 */
function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default LoadingOverlay;
