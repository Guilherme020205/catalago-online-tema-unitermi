import { api } from "../../service/api";
import { IoTrashBin } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { useEffect, useState } from "react";

const ScreenCorLine = () => {
  const [colors, setColors] = useState<any[]>([]);
  const [nameColor, setNameColor] = useState("");
  const [codeColor, setCodeColor] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");

  async function getColors() {
    const response = await api.get("/listColorLine");
    setColors(response.data.colorLines);
  }

  async function createColor() {
    if (!nameColor.trim() || !codeColor.trim()) return;
    await api.post("/creatColorLine", { name: nameColor, code: codeColor });
    setNameColor("");
    setCodeColor("");
    getColors();
  }

  async function deleteColor(id: string) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta cor?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/deleteColorLine/${id}`);
      getColors();
    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao excluir cor");
    }
  }

  function startEdit(color: any) {
    setEditId(color.id);
    setEditName(color.name);
    setEditCode(color.code);
  }

  async function saveEdit() {
    if (!editId || !editName.trim() || !editCode.trim()) return;
    await api.put(`/editColorLine/${editId}`, {
      name: editName,
      code: editCode,
    });
    setEditId(null);
    setEditName("");
    setEditCode("");
    getColors();
  }

  useEffect(() => {
    getColors();
  }, []);

  return (
    <div className="flex flex-col m-20">
      <p className="text-2xl font-bold select-none">Cores</p>

      <div className="flex flex-row gap-2 mt-6">
        <input
          type="text"
          value={nameColor}
          onChange={(e) => setNameColor(e.target.value)}
          placeholder="Nome da cor..."
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          value={codeColor}
          onChange={(e) => setCodeColor(e.target.value)}
          placeholder="Código da cor (ex: #FF0000)"
          className="border p-2 rounded-lg"
        />
        <button
          onClick={createColor}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Criar
        </button>
      </div>

      <div className="flex flex-row justify-between mt-10">
        <section className="bg-web-gray rounded-2xl p-4">
          <ul>
            {colors.map((color: any) => (
              <li key={color.id} className="w-[600px]">
                <div className="flex justify-between items-center w-full my-2">
                  {editId === color.id ? (
                    <div className="flex gap-2 w-full">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border p-1 rounded-lg flex-1"
                      />
                      <input
                        type="text"
                        value={editCode}
                        onChange={(e) => setEditCode(e.target.value)}
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
                      <div className="flex gap-4 items-center">
                        <p>{color.name}</p>
                        <div
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: color.code }}
                        ></div>
                        <p className="text-sm text-gray-600">{color.code}</p>
                      </div>
                      <div className="flex flex-row items-center gap-5">
                        <button
                          onClick={() => startEdit(color)}
                          className="cursor-pointer text-blue-500"
                        >
                          <FaPencil />
                        </button>
                        <button
                          onClick={() => deleteColor(color.id)}
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
        <div></div>
      </div>
    </div>
  );
};

export default ScreenCorLine;
