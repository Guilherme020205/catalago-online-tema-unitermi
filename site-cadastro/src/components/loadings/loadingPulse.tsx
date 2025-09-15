const LoadingPulse = () => {
  return (
    <div className="flex flex-row items-center justify-center"> 
      <div className="w-3 h-3 bg-black rounded-full m-1 animate-pulse"></div>
      <div className="w-3 h-3 bg-black rounded-full m-1 animate-pulse [animation-delay:0.2s]"></div>
      <div className="w-3 h-3 bg-black rounded-full m-1 animate-pulse [animation-delay:0.4s]"></div>
    </div>
  );
};

export default LoadingPulse;
