export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-950 text-white">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🚧</div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          We'll Be Back Soon
        </h1>

        <p className="text-slate-400 text-sm sm:text-base">
          CodeLens-AI is currently under maintenance.
          We're working to improve your experience.
        </p>

        <div className="mt-8">
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-blue-500 animate-pulse rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
