interface Product {
  img: string;
  name: string;
}

function BoxProduct({ img, name }: Product) {
  return (
    <div className="flex flex-col items-center p-4 rounded-2xl shadow-[2px_2px_7px_-4px_#ff0000] hover:shadow-[-4px_-4px_10px_-4px_#ff0000] duration-700 transition-all cursor-pointer">
      <img src={img} alt={name} className="w-36" />
      <h1 className="text-[18px] font-bold">{name}</h1>
    </div>
  );
}

export default BoxProduct;
