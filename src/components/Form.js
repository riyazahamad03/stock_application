import React, { useState } from "react";
import { postData } from "../http";
const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    lower: "",
    upper: "",
  });

  function handleChangeInput(event) {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  const handleSubmit = async () => {
    // const formData = {
    //   name: formData.name,
    //   lower: Number(formData.lower),
    //   upper: Number(formData.upper),
    // };

    postData(formData);
  };

  return (
    <div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 inline-block relative w-64">
          <select
            id="name"
            onChange={handleChangeInput}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Please choose the category</option>
            <option value="Apple">Apple</option>
            <option value="Microsoft"> Microsoft</option>
            <option value="Intel">Intel</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="text"
          >
            LowerBound
          </label>
          <input
            className="appearance-none bg border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="lower"
            onChange={handleChangeInput}
            type="text"
            placeholder="$1"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="text"
          >
            Upper Bound
          </label>
          <input
            className="appearance-none bg border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="upper"
            onChange={handleChangeInput}
            type="text"
            placeholder="$10"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            data-hs-overlay="#hs-slide-up-animation-modal"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
