import logo from '../../assets/icon.png'

const LoadingIcon = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src={logo}
        alt="Carregando..."
        className="w-20 h-20 animate-spin"
      />
      <p className='text-xs text-web-red mt-2'>Carregando...</p>

    </div>
  );
};

export default LoadingIcon;
