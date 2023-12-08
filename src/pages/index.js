"use client";
import React from "react";
import GetExecutedTransaction from "../components/GetExecutedTransaction";
import BuyCheck from "../components/BuyCheck";
import StockDetailsProvider from "../components/details";
import Form from "../components/Form";
import Link from "next/link";

export default function HomePage(props) {
  return (
    <div className="flex  space-x-6">
      <div className="container mx-20">
        <div className="px-12 py-5">List Of Executed Transactions</div>
        <GetExecutedTransaction />
      </div>
      <div>
        <h1>
          List Of Sellers
          <StockDetailsProvider />
        </h1>
      </div>
      <div className="h-16 ">
        <BuyCheck />
      </div>

      <div>
        <Form />
      </div>
    </div>
  );
}
