const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    </div>
  );
};

export default Loader;
