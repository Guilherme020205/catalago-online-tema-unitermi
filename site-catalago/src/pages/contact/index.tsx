import { useState } from "react";
import FormContact from "./form";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";

function ScreenContact() {
  const [copiado, setCopiado] = useState<string | null>(null);

  const copiarTexto = async (texto: string) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(texto);

      setTimeout(() => setCopiado(null), 2000); // mensagem some depois de 2s
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  return (
    <div className="flex flex-row justify-center gap-96 mx-20 my-10">
      <section className="mt-20">
        <h1 className="text-2xl text-web-red font-bold">Redes sociais: </h1>
        <div className="flex flex-row gap-4 ml-5 my-5">
          <a href="https://www.facebook.com/unitermioficial" target="_blank">
            <FaFacebookSquare className="text-5xl text-[#00a4ff]" />
          </a>
          <a href="https://www.instagram.com/unitermi/" target="_blank">
            <FaInstagramSquare className="text-5xl text-[#ec4e4a]" />
          </a>
          <a
            href="https://www.linkedin.com/company/unitermi/posts/?feedView=all"
            target="_blank"
          >
            <FaLinkedin className="text-5xl text-[#0274b3]" />
          </a>
        </div>

        <h1 className="text-2xl text-web-red font-bold">Contatos: </h1>
        <div className="flex flex-col ml-5 my-5 cursor-pointer">
          <p
            onClick={() => copiarTexto("+55 (48) 3286-9093")}
            className="hover:text-blue-600"
          >
            +55 (48) 3286-9093
          </p>
          <p
            onClick={() => copiarTexto("sac@unitermi.com.br")}
            className="hover:text-blue-600"
          >
            sac@unitermi.com.br
          </p>
          <p
            onClick={() => copiarTexto("contato@unitermi.com.br")}
            className="hover:text-blue-600"
          >
            contato@unitermi.com.br
          </p>

          {copiado && (
            <span className="text-green-600 text-sm">Copiado: {copiado}</span>
          )}
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
