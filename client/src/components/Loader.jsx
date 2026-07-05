export default function Loader({ size = 'md', className = '', text }) {
  const sizes = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`${sizes[size]} animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-500`}
      />
      {text && <p className="text-sm text-text-muted">{text}</p>}
    </div>
  );
}
