 import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../service/api";

const VacancyFormScreen = () => {
  const { id } = useParams(); // id da vaga (para edição)
  const navigate = useNavigate();

  // Estados dos campos da vaga
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [wage, setWage] = useState("");

  // Carrega vaga existente se for edição
  useEffect(() => {
    if (!id) return;

    api.get(`/DetailVacancy/${id}`).then((res) => {
      const v = res.data[0]; // DetailVacancy retorna um array
      if (!v) return;

      setTitle(v.title);
      setDescription(v.description);
      setRequirements(v.requirements);
      setBenefits(v.benefits);
      setWage(String(v.wage));
    });
  }, [id]);

  // Salvar/editar vaga
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !description || !requirements || !benefits || !wage) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const payload = { title, description, requirements, benefits, wage };

    try {
      if (id) {
        await api.put(`/EditVacancy/${id}`, payload);
      } else {
        await api.post("/CreateVacancy", payload);
      }
      navigate("/vagas"); // Redireciona para a lista de vagas
    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao salvar vaga");
    }
  }

  return (
    <div className="flex flex-col m-20">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold select-none">
          {id ? "Editar Vaga" : "Criar Vaga"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-lg">
        <input
          type="text"
          placeholder="Título da vaga"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded-lg"
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded-lg"
          rows={3}
          required
        />
        <textarea
          placeholder="Requisitos"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="border p-2 rounded-lg"
          rows={3}
          required
        />
        <textarea
          placeholder="Benefícios"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          className="border p-2 rounded-lg"
          rows={2}
          required
        />
        <input
          type="number"
          placeholder="Salário"
          value={wage}
          onChange={(e) => setWage(e.target.value)}
          className="border p-2 rounded-lg"
          required
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            {id ? "Salvar Alterações" : "Criar Vaga"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/vagas")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default VacancyFormScreen;
