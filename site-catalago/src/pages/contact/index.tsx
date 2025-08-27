import FormContact from "./form";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";

function ScreenContact() {
  return (
    <div className="flex flex-row justify-center gap-96 mx-20 my-10">
      <section className="mt-20">
        <h1 className="text-2xl text-web-red font-bold">Redes sociais: </h1>
        <div className="flex flex-row gap-4 ml-5 my-5">
          <FaFacebookSquare className="text-5xl text-[#00a4ff]" />
          <FaInstagramSquare className="text-5xl text-[#ec4e4a]" />
          <FaLinkedin className="text-5xl text-[#0274b3]" />
        </div>
        <h1 className="text-2xl text-web-red font-bold">Contatos: </h1>
        <div className="flex flex-col ml-5 my-5">
          <p>+55 (48) 3286-9093</p>
          <p>sac@unitermi.com.br</p>
          <p>contato@unitermi.com.br</p>
        </div>
        <h1 className="text-2xl text-web-red font-bold">Nossa localização:</h1>
        <div className="ml-5 my-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3523.857335800934!2d-48.668304899999995!3d-27.967655099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952734f2eee24629%3A0x821ded38b70a4964!2sUnitermi!5e0!3m2!1spt-BR!2sbr!4v1756337557952!5m2!1spt-BR!2sbr"
            width="400"
            height="400"
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <FormContact />
    </div>
  );
}

export default ScreenContact;
