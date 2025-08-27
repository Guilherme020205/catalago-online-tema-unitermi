import { useState } from "react";
import emailjs from "@emailjs/browser";

function FormContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [subject, setSubject] = useState("");
  const [mensagem, setMensagem] = useState("");

  function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("Preencha todos os campos");
      return;
    }
    if (!email.includes("@")) {
      alert("Email inválido");
      return;
    }

    const templateParams = {
      name: name,
      email: email,
      tel: tel,
      CNPJ: cnpj,
      UF: uf,
      Cidade: cidade,
      subject: subject,
      mensagem: mensagem,
    };

    emailjs
      .send(
        "service_t8ht1ut",
        "template_mhkuela",
        templateParams,
        "BBYHR2ney7UO0Cryo"
      )
      .then(
        (response) => {
          console.log("email enviado", response.status, response.text);
          setName("");
          setEmail("");
          setTel("");
          setCnpj("");
          setUf("");
          setCidade("");
          setSubject("");
          setMensagem("");
        },
        (err) => {
          console.log(err);
        }
      );
  }

  return (
    <div className="container">
      <h1 className="title">Contato</h1>

      <form
        className="flex flex-col items-center "
        onSubmit={(e) => sendEmail(e)}
      >
        <input
          className="input"
          type="text"
          placeholder="Digite seu nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          className="input"
          type="text"
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="input"
          type="text"
          placeholder="Digite seu telefone"
          onChange={(e) => setTel(e.target.value)}
          value={tel}
        />
        <input
          className="input"
          type="text"
          placeholder="Digite seu CNPJ"
          onChange={(e) => setCnpj(e.target.value)}
          value={cnpj}
        />
        <input
          className="input"
          type="text"
          placeholder="Digite seu UF"
          onChange={(e) => setUf(e.target.value)}
          value={uf}
        />
        <input
          className="input"
          type="text"
          placeholder="Digite seu cidade"
          onChange={(e) => setCidade(e.target.value)}
          value={cidade}
        />
        <input
          className="input"
          type="text"
          placeholder="Digite seu subject"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
        />
        <input
          className="input"
          type="text"
          placeholder="Digite seu mensagem"
          onChange={(e) => setMensagem(e.target.value)}
          value={mensagem}
        />

        <input className="button" type="submit" value="Enviar" />
      </form>
    </div>
  );
}

export default FormContact;
