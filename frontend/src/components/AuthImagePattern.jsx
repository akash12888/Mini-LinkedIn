const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-blue-50 w-full h-full p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${
                i % 2 === 0
                  ? "bg-blue-400 animate-pulse"
                  : "bg-blue-200"
              }`}
              style={{ minWidth: "40px", minHeight: "40px" }} // ensures visibility
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-blue-900">{title}</h2>
        <p className="text-blue-800/80">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
