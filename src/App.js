import { useEffect, useState } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  // const [totalPages setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json();

    console.log('Data returned successfully');
    console.log(data);
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandle = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage !== page &&
      selectedPage <= products.length / 10
    )
      setPage(selectedPage);
  };

  return (
    <div className="">
      <h1 className="text-center text-4xl py-20 text-slate-600">
        React Pagination
      </h1>

      {products.length && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 p-20">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <div className="">
                <img className="" src={prod.thumbnail} alt="product img" />
                <p className="text-center">{prod.title}</p>
              </div>
            );
          })}
        </div>
      )}

      {products.length && (
        <div className="flex justify-center text-center gap-5 mt-20 mb-20 ">
          <span
            className="border px-5 py-2 cursor-pointer hover:bg-slate-200"
            onClick={() => selectPageHandle(page - 1)}
          >
            Prev
          </span>
          <div className="flex text-center gap-2 max-w-md w-full cursor-pointer ">
            {[...Array(products.length / 10)].map((_, i) => {
              return (
                <span
                  className={` border py-2 hover:bg-slate-200 flex-1 ${
                    page === i + 1 ? 'bg-slate-400' : ''
                  }`}
                  onClick={() => selectPageHandle(i + 1)}
                  key={i}
                >
                  {i + 1}
                </span>
              );
            })}
          </div>

          <span
            className="border px-5 py-2 cursor-pointer hover:bg-slate-200"
            onClick={() => selectPageHandle(page + 1)}
          >
            Next
          </span>
        </div>
      )}
    </div>
  );
}
