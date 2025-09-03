import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import LoadingPulse from "../../../components/loadings/loadingPulse";

type MenuProps = {
  categorys: any[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  loadingCategories: boolean;
};

function Menu({
  categorys,
  selectedCategory,
  setSelectedCategory,
  loadingCategories,
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false); // controla se os botões estão desativados

  const handleClick = (id: string) => {
    if (disabled) return; // se já está desativado, não faz nada

    setDisabled(true); // desativa todos
    setSelectedCategory(id);
    setOpen(false); // fecha no mobile

    // reativa após 1 segundo (1000ms)
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-3 m-5 md:hidden h-min top-20 left-4 z-40 bg-web-red rounded-lg shadow-md text-white"
        >
          <TiThMenu size={24} />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen md:h-auto w-64 bg-gradient-to-b from-web-pink to-white p-4 z-40 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold text-web-red">Categorias</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg bg-white text-web-red shadow"
          >
            <TiThMenu size={20} />
          </button>
        </div>

        <h2 className="text-xl font-bold text-web-red mb-6 text-center hidden md:block">
          Categorias
        </h2>

        {loadingCategories ? (
          <div className="flex justify-center">
            <LoadingPulse />
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {categorys.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleClick(category.id)}
                  disabled={disabled} // 🔒 desativa todos os botões
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer
                    ${
                      selectedCategory === category.id
                        ? "bg-white text-web-red font-semibold shadow"
                        : "text-black hover:bg-white hover:text-web-red"
                    }
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  );
}

export default Menu;
