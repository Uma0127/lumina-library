export default function LoadingSpinner({ size = 'md', text = '' }) {
  return (
    <div className="loading-screen">
      <div className={`spinner ${size === 'lg' ? 'spinner-lg' : ''}`} />
      {text && <span>{text}</span>}
    </div>
  );
}
