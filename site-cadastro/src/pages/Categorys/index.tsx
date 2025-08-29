import { api } from "../../service/api";
import { IoTrashBin } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { useEffect, useState } from "react";

const ScreenCategorys = () => {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [nameCategoria, setNameCategoria] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  async function getCategorys() {
    const response = await api.get("/listCategory");
    setCategorias(response.data.Categorys);
  }

  async function createCategory() {
    try {
      if (!nameCategoria.trim()) return;
      await api.post("/creatCategory", { name: nameCategoria });
      setNameCategoria("");
      getCategorys();
    } catch (error) {
      alert("Erro ao criar categoria");
    }
  }

  async function deleteCategory(id: string) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta categoria?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/deleteCategory/${id}`);
      getCategorys();
    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao excluir categoria");
    }
  }

  function startEdit(category: any) {
    setEditId(category.id);
    setEditName(category.name);
  }

  async function saveEdit() {
    if (!editId || !editName.trim()) return;
    await api.put(`/editCategory/${editId}`, { name: editName });
    setEditId(null);
    setEditName("");
    getCategorys();
  }

  useEffect(() => {
    getCategorys();
  }, []);

  return (
    <div className="flex flex-col m-20">
      <p className="text-2xl font-bold select-none">Categorias</p>

      <div className="flex flex-row gap-2 mt-6">
        <input
          type="text"
          value={nameCategoria}
          onChange={(e) => setNameCategoria(e.target.value)}
          placeholder="Nova categoria..."
          className="border p-2 rounded-lg"
        />
        <button
          onClick={createCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Criar
        </button>
      </div>

      <div className="flex flex-row justify-between mt-10">
        <section className="bg-web-gray rounded-2xl p-4">
          <ul>
            {categorias.map((categoria: any) => (
              <li key={categoria.id} className="w-[600px]">
                <div className="flex justify-between w-full my-2">
                  {editId === categoria.id ? (
                    <div className="flex gap-2 w-full">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border p-1 rounded-lg flex-1"
                      />
                      <button
                        onClick={saveEdit}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg cursor-pointer"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setEditId(null);
                          setEditName("");
                        }} // Cancela a edição
                        className="bg-gray-400 text-white px-3 py-1 rounded-lg cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    // Modo normal
                    <>
                      <p>{categoria.name}</p>
                      <div className="flex flex-row items-center gap-5">
                        <button
                          onClick={() => startEdit(categoria)}
                          className="cursor-pointer text-blue-500"
                        >
                          <FaPencil />
                        </button>
                        <button
                          onClick={() => deleteCategory(categoria.id)}
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
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ScreenCategorys;
