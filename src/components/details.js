import React, { useState, useEffect } from "react";
import { getStockDetails } from "../http";
import "tailwindcss/tailwind.css";

const StockDetailsProvider = ({ children }) => {
  const [stockDetails, setStockDetails] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStockDetails();
        setStockDetails(data);
      } catch (error) {
        console.error("Error fetching stock details:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(stockDetails);
  }, [stockDetails]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredStockElements = stockDetails
    ? stockDetails
        .filter((stock) =>
          stock.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map((stock) => {
          
          if (stock.isTransacted === "N") {
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

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-0 right-0 p-4 bg-white z-10 mx-auto">
        <input
          type="text"
          placeholder="Search stock..."
          className="p-2 border border-gray-300 rounded"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="container  pt-16">
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
            <tbody>{filteredStockElements}</tbody>
          </table>
        </div>
        {children}
      </div>
    </div>
  );
};

export default StockDetailsProvider;
