import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import LoadingIcon from "../../components/loadings/loadingIcon";

interface Vacancy {
  id: string;
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  wage: number;
  createAt: string;
}

function ScreenVacantys() {
  const [loadingVacantys, setLoadingVacantys] = useState(false);

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const limit = 10;

  async function getVacancies() {
    setLoadingVacantys(true);
    try {
      const response = await api.get("/ListVacancys/search", {
        params: { title: search, page, limit },
      });
      setVacancies(response.data.vacancys);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingVacantys(false);
    }
  }

  useEffect(() => {
    getVacancies();
  }, [search, page]);
  return (
    <div className="flex flex-col m-5 md:m-20">
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Pesquisar vagas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          onClick={() => {
            setPage(1);
            getVacancies();
          }}
          className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded"
        >
          Buscar
        </button>
      </div>

      <ul>
        {loadingVacantys ? (
          <LoadingIcon />
        ) : vacancies.length === 0 ? (
          <p className="text-gray-500 text-lg">Nenhuma vaga encontrada.</p>
        ) : (
          vacancies.map((vacancy) => (
            <details
              key={vacancy.id}
              className="flex flex-col gap-4 my-2 p-4 border rounded-lg "
            >
              <summary className="font-bold text-xl cursor-pointer">
                {vacancy.title}
              </summary>
              <div>
                <div className="whitespace-pre-wrap break-words mt-2 text-gray-700">
                  <p className="font-bold">Descrição:</p>
                  <p>{vacancy.description}</p>
                </div>
                <div className="whitespace-pre-wrap break-words mt-2 text-gray-700">
                  <p className="font-bold">Requisitos:</p>
                  <p>{vacancy.requirements}</p>
                </div>
                <div className="whitespace-pre-wrap break-words mt-2 text-gray-700">
                  <p className="font-bold">Benefícios:</p>
                  <p>{vacancy.benefits}</p>
                </div>
                <div className="whitespace-pre-wrap break-words mt-2 text-gray-700">
                  <p className="font-bold">Salário:</p>
                  <p>R${vacancy.wage}</p>
                </div>
              </div>

              <div className="flex flex-col items-center border-2 p-5 my-5 rounded-2xl w-max">
                <p>Enviar o curriculo pelo formulario de contato!</p>
                <p>Escrever no campo "Assunto" o titulo da vaga</p>
                <button
                  onClick={() => navigate("/contatos")}
                  className="bg-web-pink px-8 py-2 mt-2 rounded-2xl cursor-pointer hover:font-bold transition-all duration-700"
                >
                  Contato
                </button>
              </div>
            </details>
          ))
        )}
      </ul>
      <div>
        {vacancies.length > 0 && (
          <div className="mt-6 flex justify-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 border cursor-pointer rounded disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border cursor-pointer rounded ${
                  p === page ? "bg-blue-500 text-white" : ""
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1 border rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScreenVacantys;
