import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import { IoTrashBin } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import LoadingPulse from "../../components/loadings/loadingPulse";

interface Vacancy {
  id: string;
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  wage: number;
  createAt: string;
}

const ScreenVacancy = () => {
  const [loading, setLoading] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const limit = 30;

  async function getVacancies() {
    setLoading(true);

    try {
      const response = await api.get("/ListVacancys/search", {
        params: { title: search, page, limit },
      });
      setVacancies(response.data.vacancys);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error: any) {
      console.error(error);
      alert("Erro ao buscar vagas");
    } finally {
      setLoading(false);
    }
  }

  async function deleteVacancy(id: string) {
    const confirmDelete = window.confirm("Deseja excluir esta vaga?");
    if (!confirmDelete) return;
    setLoading(true);

    try {
      await api.delete(`/DeleteVacancy/${id}`);
      getVacancies();
    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao deletar vaga");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getVacancies();
  }, [search, page]);

  return (
    <div className="flex flex-col m-5 md:m-20">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold select-none">Vagas</p>
        <button
          onClick={() => navigate("/create-vacancy")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Nova Vaga
        </button>
      </div>

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
        {loading ? (
          <LoadingPulse />
        ) : vacancies.length === 0 ? (
          <p className="text-gray-500 text-lg">
            Nenhuma vaga encontrado.
          </p>
        ) : (
          <div>
            {vacancies.map((vacancy) => (
              <details
                key={vacancy.id}
                className="flex flex-col gap-4 my-2 p-4 border rounded-lg"
              >
                <summary className="font-bold text-xl">{vacancy.title}</summary>
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
                    <p>{vacancy.wage}</p>
                  </div>
                </div>

                <div className="flex gap-5 mt-10 p-5 items-center">
                  <button
                    onClick={() => navigate(`/edit-vacancy/${vacancy.id}`)}
                    className="text-blue-500 cursor-pointer"
                  >
                    <FaPencil />
                  </button>
                  <button
                    onClick={() => deleteVacancy(vacancy.id)}
                    className="text-red-500 cursor-pointer"
                  >
                    <IoTrashBin />
                  </button>
                </div>
              </details>
            ))}
          </div>
        )}
      </ul>

      <div className="mt-6 flex justify-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 border cursor-pointer rounded disabled:opacity-50"
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
          className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default ScreenVacancy;
