export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
  );
}