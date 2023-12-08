import { useEffect, useState } from "react";
import { getStockDetails } from "../http";
import "tailwindcss/tailwind.css";
const GetExecutedTransaction = () => {
  const [stockDetails, setStockDetails] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStockDetails();
        setStockDetails(data);
      } catch (err) {
        console.log("Error in getting executed transaction");
      }
    };
    fetchData();
  }, []);
  console.log(stockDetails);

  const filteredStocks = stockDetails
    ? stockDetails.map((stock) => {
        if (stock.isTransacted === "Y") {
          return (
            <tr
              key={stock.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {stock.name}
              </th>
              <td className="px-6 py-4">{`$${stock.lower}`}</td>
              <td className="px-6 py-4">{`$${stock.upper}`}</td>
            </tr>
          );
        }
        return null;
      })
    : [];

  console.log(filteredStocks);

  return (
    <div className="container">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Product name
              </th>
              <th scope="col" className="px-3 py-3">
                LowerBound
              </th>
              <th scope="col" className="px-3 py-3">
                UpperBound
              </th>
            </tr>
          </thead>
          <tbody>{filteredStocks}</tbody>
        </table>
      </div>
    </div>
  );
};

export default GetExecutedTransaction;
