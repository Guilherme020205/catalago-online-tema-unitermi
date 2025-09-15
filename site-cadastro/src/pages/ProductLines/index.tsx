import { api } from "../../service/api";
import { IoTrashBin } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { useEffect, useState } from "react";
import LoadingPulse from "../../components/loadings/loadingPulse";

const ScreenProductLines = () => {
  const [loading, setLoading] = useState(false);

  const [lines, setLines] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Estados para criar nova linha
  const [newLine, setNewLine] = useState("");
  const [newLineCategory, setNewLineCategory] = useState("");

  // Estados para editar linha existente
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editCategory, setEditCategory] = useState("");

  async function getLines() {
    setLoading(true)
    const response = await api.get("/listProductLine");
    try {
      setLines(response.data.productLines);
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  async function getCategories() {
    const response = await api.get("/listCategory");
    setCategories(response.data.Categorys);
  }

  async function createLine() {

    if (!newLine.trim() || !newLineCategory) {
      alert("Preencha o nome e selecione uma categoria!");
      return;
    }

    await api.post("/creatProductLine", {
      name: newLine,
      idCategory: newLineCategory,
    });

    setNewLine("");
    setNewLineCategory("");
    getLines();
  }

  async function deleteLine(id: string) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta linha de produto?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/deleteProductLine/${id}`);
      getLines();
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Erro ao excluir linha de produto"
      );
    }
  }

  function startEdit(line: any) {
    setEditId(line.id);
    setEditValue(line.name);
    setEditCategory(line.idCategory); // só altera o select da edição
  }

  async function saveEdit() {
    if (!editId || !editValue.trim() || !editCategory) {
      alert("Preencha todos os campos antes de salvar!");
      return;
    }

    await api.put(`/editProductLine/${editId}`, {
      name: editValue,
      idCategory: editCategory,
    });

    setEditId(null);
    setEditValue("");
    setEditCategory("");
    getLines();
  }

  useEffect(() => {
    getLines();
    getCategories();
  }, []);

  return (
    <div className="flex flex-col m-5 md:m-20">
      <p className="text-2xl font-bold select-none">Linhas de Produto</p>

      {/* Criar nova linha */}
      <div className="flex flex-col md:flex-row gap-2 mt-6">
        <input
          type="text"
          value={newLine}
          onChange={(e) => setNewLine(e.target.value)}
          placeholder="Nova linha..."
          className="border p-2 rounded-lg"
        />

        <select
          value={newLineCategory}
          onChange={(e) => setNewLineCategory(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          onClick={createLine}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Criar
        </button>
      </div>

      {/* Lista de linhas */}
      <div className="flex flex-row justify-between mt-10">
        <section className="bg-web-gray rounded-2xl p-4">
          <ul>
            {loading ? (
              <LoadingPulse/>
            ) : lines.length === 0 ? (
              <p className="text-gray-500 text-lg">
                Nenhuma linha de produto encontrado.
              </p>
            ) : (
              <div>
                {lines.map((line: any) => (
                  <li key={line.id} className="w-80 md:w-[600px]">
                    <div className="flex justify-between w-full my-2">
                      {editId === line.id ? (
                        <div className="flex flex-col gap-2 w-full">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="border p-1 rounded-lg flex-1"
                          />

                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="border p-1 rounded-lg"
                          >
                            <option value="">Selecione uma categoria</option>
                            {categories.map((cat: any) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={saveEdit}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg cursor-pointer"
                          >
                            Salvar
                          </button>

                          <button
                            onClick={() => {
                              setEditId(null);
                              setEditValue("");
                              setEditCategory("");
                            }}
                            className="bg-gray-400 text-white px-3 py-1 rounded-lg cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <>
                          <p>
                            {line.name}{" "}
                            <span className="text-sm text-gray-500">
                              (Categoria:{" "}
                              {
                                categories.find((c) => c.id === line.idCategory)
                                  ?.name
                              }
                              )
                            </span>
                          </p>
                          <div className="flex flex-row items-center gap-5">
                            <button
                              onClick={() => startEdit(line)}
                              className="cursor-pointer text-blue-500"
                            >
                              <FaPencil />
                            </button>
                            <button
                              onClick={() => deleteLine(line.id)}
                              className="cursor-pointer text-red-500"
                            >
                              <IoTrashBin />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <hr />
                  </li>
                ))}
              </div>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ScreenProductLines;
