import { useNavigate } from "react-router-dom";

import { IoBagHandle } from "react-icons/io5";

import About from "./components/about";
import Carrossel from "./components/carrossel";
import logo from "../../assets/6Uu1ixeg.png";
import WhoWeAre from "./components/whoWeAre";

const slides = [
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503842/Cad0B2fA_e2ogty.png",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503724/SDJ4IUKw_wug7pa.png",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503750/wtmb4_ZA_tivhif.png",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503755/xrLOqWHw_wnz1ba.jpg",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503769/X1Ty9WMQ_ho7kts.jpg",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503775/NMWhRCiw_evhfze.png",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503781/qJ6gMMuQ_to7kmb.jpg",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503785/pQTwxHGA_wmiw9s.jpg",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503792/XEfX7jPw_bndfqt.jpg",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503797/msmRlbAw_jlhoif.jpg",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503803/oDgaq8Ow_nsy2rn.png",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503810/JhkW-CEQ_obdfr1.png",
  "https://res.cloudinary.com/dts3okbt6/image/upload/v1756503830/WrszgZFw_jowba3.png",
];
function ScreenHome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center my-10 mx-10 lg:mx-20 select-none">
      <About />
      <div
        className="flex flex-col justify-center gap-20 my-10 animate-fade animate-duration-1000 animate-delay-2000
        lg:flex-row
      "
      >
        <div className="w-96">
          <Carrossel autoSlide={true} autoSlideInterval={5000}>
            {slides.map((s, i) => (
              <img key={i} src={s} className="object-cover rounded-lg" />
            ))}
          </Carrossel>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <p
            className="mx-5 text-[20px]
          lg:mx-0 lg:w-[500px] lg:text-[20px]
          "
          >
            <strong className="text-web-red">Unitermi</strong> oferece uma linha
            completa de produtos térmicos e utilitários, combinando inovação,
            qualidade e design sofisticado, para que você tenha praticidade,
            durabilidade e estilo em cada momento do seu dia — seja mantendo
            suas bebidas na temperatura ideal, conservando alimentos ou
            garantindo conforto e funcionalidade em qualquer situação.
          </p>
          <img src={logo} alt="logo" className="w-96 mt-14" />
        </div>
      </div>
      <button
        onClick={() => navigate("/produtos")}
        className="flex flex-row items-center gap-5 cursor-pointer text-web-red my-32 py-5 px-10 rounded-2xl shadow-[2px_2px_7px_-2px_#ff0000] hover:bg-web-pink hover:shadow-[2px_2px_7px_-2px_#000] transition-all duration-700 animate-fade-up animate-once animate-duration-1000 animate-delay-1000
            xl:px-36
        "
      >
        <IoBagHandle className="text-5xl" />
        <p className="flex flex-col items-start gap-0 text-2xl">
          Conheça nossos <strong className="text-3xl">Produtos</strong>
        </p>
      </button>
      <WhoWeAre />
    </div>
  );
}

export default ScreenHome;
