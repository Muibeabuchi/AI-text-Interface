export default function LoadingSkeleton() {
  return (
    <>
      <div className="p-4 space-y-3">
        <div className="w-2/3 h-4 rounded bg-olive animate-pulse" />
        <div className="w-1/2 h-4 rounded bg-olive animate-pulse" />
        <div className="w-6/7 h-4 rounded bg-olive animate-pulse" />
      </div>
      <div className="p-4 space-y-3">
        <div className="w-2/3 h-4 rounded bg-olive animate-pulse" />
        <div className="w-1/2 h-4 rounded bg-olive animate-pulse" />
        <div className="w-6/7 h-4 rounded bg-olive animate-pulse" />
      </div>
      <div className="p-4 space-y-3">
        <div className="w-2/3 h-4 rounded bg-olive animate-pulse" />
        <div className="w-1/2 h-4 rounded bg-olive animate-pulse" />
        <div className="w-6/7 h-4 rounded bg-olive animate-pulse" />
      </div>
    </>
  );
}
