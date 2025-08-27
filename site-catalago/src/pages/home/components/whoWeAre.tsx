import imagem1 from "../../../assets/tela-quem-somos2-1024x840.png";
import imagem2 from "../../../assets/Sustentabilidade.jpg";

function whoWeAre() {
  return (
    <div>
      <h1 className="ml-5 text-2xl text-web-red">Quem somos</h1>

      <div className="flex flex-row gap-10">
        <div className="flex flex-col my-5 gap-10">
          <div className="flex flex-col w-[700px]">
            <p className="text-web-red text-3xl font-bold ml-2 mb-3">
              Nós preservamos o que é bom!
            </p>
            <p className="mb-2">
              A Unitermi é uma empresa inovadora no ramo de utilidades
              domésticas como garrafas térmicas, isotérmicos e utilidades.
              Atuamos neste mercado desde 2015, já realizamos muito e com o
              esforço e a dedicação do nosso time, queremos realizar ainda mais.
            </p>

            <p className="mb-2">
              Cada produto que lançamos é cuidadosamente estudado, avaliado e
              projetado para proporcionar uma experiência especial aos nossos
              usuários.
            </p>
            <p className="mb-2">
              Dessa forma, nos mantemos um passo à frente da evolução de
              tendências de consumo e perpetuamos a nossa constante proposta de
              preservar os bons momentos da vida.
            </p>
          </div>
          <div>
            <img src={imagem2} alt="imagem" className="w-[700px]" />
          </div>
        </div>

        <div className="flex flex-col my-5 gap-10">
          <div>
            <img src={imagem1} alt="imagem" className="w-[700px]" />
          </div>
          <div className="flex flex-col w-[700px]">
            <p className="text-web-red text-3xl font-bold ml-2 mb-3">
              SUSTENTABILIDADE
            </p>
            <p className="mb-2">
              Para nós, preservar bons momentos vai além da proposta de nossos
              produtos. Acreditamos que é nosso papel, como empresa, desenvolver
              e propor formas de preservar tudo que é bom, como a natureza e a
              sociedade.
            </p>
            <p className="mb-2">
              Estamos envolvidos em diversos projetos sociais de cunho
              educacional e solidário visando desenvolver comunidades e
              indivíduos conscientes.
            </p>
            <p className="mb-2">
              Também estamos a frente de ações para preservar meio ambiente, já
              possuímos projetos para migrar para uma matriz energética 100%
              sustentável. Além disso, mais de 50% do nossa matéria-prima é
              reciclada, utilizando mais de 600 toneladas de plástico reciclado
              anualmente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default whoWeAre;
