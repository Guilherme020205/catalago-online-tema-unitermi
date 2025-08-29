import { api } from "../../service/api";
import { IoTrashBin } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { useEffect, useState } from "react";

const ScreenProductCapacity = () => {
  const [capacities, setCapacities] = useState<any[]>([]);
  const [newCapacity, setNewCapacity] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  async function getCapacities() {
    const response = await api.get("/listProductCapacity");
    setCapacities(response.data.productCapacitys);
  }

  async function createCapacity() {
    if (!newCapacity.trim()) return;
    await api.post("/creatProductCapacity", { capacity: newCapacity });
    setNewCapacity("");
    getCapacities();
  }

  async function deleteCapacity(id: string) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta capacidade?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/deleteProductCapacity/${id}`);
      getCapacities();
    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao excluir capacidade");
    }
  }

  function startEdit(capacity: any) {
    setEditId(capacity.id);
    setEditValue(capacity.capacity);
  }

  async function saveEdit() {
    if (!editId || !editValue.trim()) return;
    await api.put(`/editProductCapacity/${editId}`, { capacity: editValue });
    setEditId(null);
    setEditValue("");
    getCapacities();
  }

  useEffect(() => {
    getCapacities();
  }, []);

  return (
    <div className="flex flex-col m-20">
      <p className="text-2xl font-bold select-none">Capacidades</p>

      <div className="flex flex-row gap-2 mt-6">
        <input
          type="text"
          value={newCapacity}
          onChange={(e) => setNewCapacity(e.target.value)}
          placeholder="Nova capacidade..."
          className="border p-2 rounded-lg"
        />
        <button
          onClick={createCapacity}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Criar
        </button>
      </div>

      <div className="flex flex-row justify-between mt-10">
        <section className="bg-web-gray rounded-2xl p-4">
          <ul>
            {capacities.map((capacity: any) => (
              <li key={capacity.id} className="w-[600px]">
                <div className="flex justify-between w-full my-2">
                  {editId === capacity.id ? (
                    <div className="flex gap-2 w-full">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border p-1 rounded-lg flex-1"
                      />
                      <button
                        onClick={saveEdit}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg cursor-pointer"
                      >
                        Salvar
                      </button>
                    </div>
                  ) : (
                    <>
                      <p>{capacity.capacity}</p>
                      <div className="flex flex-row items-center gap-5">
                        <button
                          onClick={() => startEdit(capacity)}
                          className="cursor-pointer text-blue-500"
                        >
                          <FaPencil />
                        </button>
                        <button
                          onClick={() => deleteCapacity(capacity.id)}
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

export default ScreenProductCapacity;
