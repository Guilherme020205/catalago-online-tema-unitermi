import useCounter from "../../../functions/useCounter";
import { GiBrazilFlag } from "react-icons/gi";
import { BsThermometerLow } from "react-icons/bs";
import { GiCoffeePot } from "react-icons/gi";
import { PiUsersFourFill } from "react-icons/pi";
import { GiBrazil } from "react-icons/gi";
import { MdRocketLaunch } from "react-icons/md";
function About() {
  const counter1 = useCounter(0, 600, 1, 1300);
  const counter2 = useCounter(0, 250, 1, 1700);

  return (
    <div className="text-[12px] font-bold text-web-red">
      <section className="flex flex-row gap-8">
        <div className="cardAbout animate-fade-right animate-duration-1000 animate-delay-500">
          <p className="mb-2">Indústria Brasileira</p>
          <div className="py-2">
            <GiBrazilFlag className="text-6xl " />
          </div>
        </div>

        <div className="cardAbout animate-fade-right animate-duration-1000 animate-delay-800">
          <p className="mb-2">Somos Especialistas</p>
          <div className="py-2">
            <BsThermometerLow className="text-5xl" />
          </div>
          <p>em produtos térmicos</p>
        </div>

        <div className="cardAbout animate-fade-right animate-duration-1000 animate-delay-1100">
          <p className="mb-2">Com mais de</p>
          <div className="flex flex-row items-center py-2 gap-5">
            <GiCoffeePot className="text-5xl " />
            <span className="font-bold text-2xl">{counter1.value}</span>
          </div>
          <p>produtos diferentes</p>
        </div>

        <div className="cardAbout animate-fade-right animate-duration-1000 animate-delay-1400">
          <p className="mb-2">Cerca de</p>
          <div className="flex flex-row items-center py-2 gap-5">
            <PiUsersFourFill className="text-5xl " />
            <span className="font-bold text-2xl">{counter2.value}</span>
          </div>
          <p>colaboradores</p>
        </div>

        <div className="cardAbout animate-fade-right animate-duration-1000 animate-delay-1700">
          <p className="mb-2">com clientes</p>
          <div className="flex flex-row items-center py-2 gap-5">
            <GiBrazil className="text-5xl " />
            <p className="font-bold text-[16px]">
              EM TODO <p>O BRASIL</p>
            </p>
          </div>
        </div>

        <div className="cardAbout animate-fade-right animate-duration-1000 animate-delay-2000">
          <p className="mb-2">com clientes</p>
          <div className="flex flex-row items-center py-2 gap-5">
            <MdRocketLaunch className="text-5xl " />
            <p className="font-bold"><strong className="text-2xl">10</strong> Anos</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
