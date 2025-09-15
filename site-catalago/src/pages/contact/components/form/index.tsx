import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import "./FormContact.css";
import { useLocation } from "react-router-dom";

function FormContact() {
  const location = useLocation();
  const subjectFromVacancy =
    (location.state as { subject?: string })?.subject || "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [subject, setSubject] = useState(subjectFromVacancy);

  const [mensagem, setMensagem] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  async function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!captchaValue) {
      toast.error("Por favor, confirme o reCAPTCHA!");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Email inválido");
      return;
    }

    const templateParams = {
      name,
      email,
      tel,
      CNPJ: cnpj,
      UF: uf,
      Cidade: cidade,
      subject,
      mensagem,
    };

    try {
      setIsSending(true);
      const response = await emailjs.send(
        "service_t8ht1ut",
        "template_mhkuela",
        templateParams,
        "BBYHR2ney7UO0Cryo"
      );
      console.log("email enviado", response.status, response.text);

      // Limpa campos
      setName("");
      setEmail("");
      setTel("");
      setCnpj("");
      setUf("");
      setCidade("");
      setSubject("");
      setMensagem("");
      setCaptchaValue(null);

      toast.success("Email enviado com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao enviar o email.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex flex-col border-1 border-web-red px-5 md:px-10 pt-10  w-min">
      <ToastContainer />
      <h1 className="text-2xl text-web-red font-bold mb-5">Entre em Contato</h1>

      <form onSubmit={sendEmail}>
        <div className="inputGroup ">
          <input
            id="name"
            type="text"
            required
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">Nome</label>
        </div>

        <div className="inputGroup ">
          <input
            id="email"
            type="text"
            required
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="inputGroup ">
          <input
            id="tel"
            type="text"
            required
            autoComplete="off"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <label htmlFor="tel">Telefone</label>
        </div>
        <div className="inputGroup ">
          <input
            id="cnpj"
            type="text"
            required
            autoComplete="off"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
          <label htmlFor="cnpj">CNPJ / CPF</label>
        </div>

        <div className="inputGroup ">
          <input
            id="uf"
            type="text"
            required
            autoComplete="off"
            value={uf}
            onChange={(e) => setUf(e.target.value)}
          />
          <label htmlFor="uf">UF</label>
        </div>

        <div className="inputGroup ">
          <input
            id="cidade"
            type="text"
            required
            autoComplete="off"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <label htmlFor="cidade">Cidade</label>
        </div>

        <div className="inputGroup ">
          <input
            id="subject"
            type="text"
            required
            autoComplete="off"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <label htmlFor="subject">Assunto</label>
        </div>

        <div className="inputGroup ">
          <input
            id="mensagem"
            type="text"
            required
            autoComplete="off"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
          <label htmlFor="mensagem">Mensagem</label>
        </div>
        <ReCAPTCHA
          sitekey="6LeiHLUrAAAAAGSZQOhJEfZEXNda-XPKmZojbD9G"
          onChange={(value) => setCaptchaValue(value)}
        />

        <button
          type="submit"
          disabled={isSending}
          className={`cursor-pointer text-web-red my-20 py-5 px-36 rounded-2xl shadow-[2px_2px_7px_-2px_#ff0000] hover:bg-web-pink hover:shadow-[2px_2px_7px_-2px_#000] transition-all duration-700 ${
            isSending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSending ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default FormContact;
