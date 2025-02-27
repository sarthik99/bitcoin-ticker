"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true";

export default function BitcoinTicker() {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchPrice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.bitcoin) {
        setChange(data.bitcoin.usd_24h_change.toFixed(2));
        setPrice(data.bitcoin.usd);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed w-screen p-4 h-screen mx-auto justify-center flex items-center">
      {/* Bitcoin Logo & Background */}
      <div className="relative py-10 px-2 hidden sm:flex bg-gradient-to-br from-yellow-400 to-orange-400 items-center justify-center shadow-lg">
        <Image className="-ml-12 lg:-ml-20 shadow-2xl block rounded-full" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1468070/btc.svg" alt="Bitcoin" width={200} height={200} />
      </div>

      {/* Card UI */}
      <Card className="relative w-96 h-64 p-6 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        <div className="absolute -bottom-30 -right-30 rotate-45 w-50 h-50 bg-orange-500 clip-path-custom"></div>
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-normal text-gray-700 flex justify-between">
            <div>
              <h1 className="text-3xl font-extralight">
                BITCOIN
              </h1>
              <span className="font-light text-orange-500 text-lg">BTC</span>
            </div> <span className="text-gray-400">RANK 1</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 p-0">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <p
                className={cn(
                  "text-3xl font-bold",
                  change > 0 ? "text-green-500" : "text-red-500"
                )}
              >
                ${price ? price.toFixed(2) : "--"}
                <span className="text-sm ml-2 text-green-500">
                  {change > 0 ? `+${change}%` : `${change}%`}
                </span>
              </p>
              <p className="text-gray-500 text-xs mt-1">Last updated: {lastUpdated || "--"}</p>
              <button
                onClick={fetchPrice}
                disabled={loading}
                className="mt-4 px-4 py-2 cursor-pointer bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center justify-center"
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4zm2 5.291A7.96 7.96 0 014 12H2a9.96 9.96 0 003.106 7.07l1.414-1.414z"
                    ></path>
                  </svg>
                )}
                Refresh
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}