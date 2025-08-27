import logo from '../../assets/KwGSNasQ.png'
function Footer() {
  return (
    <div className="w-full h-60 flex flex-col mt-20 bg-web-red justify-center items-center">
      <img src={logo} alt="logo" className='w-80 mb-10'/>
      <span className="flex flex-col items-center text-white">
        <strong>ONDE ESTAMOS:</strong>
        <p className='underline'>
          Rua Juvêncio Rodrigues, 290 – Costa do Morro – Paulo Lopes/SC – CEP:
          88490-000
        </p>
      </span>
    </div>
  );
}

export default Footer;
