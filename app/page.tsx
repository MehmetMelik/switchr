"use client";
import Head from "next/head";
import { useState, FormEvent } from "react";

export default function Home() {
  const [currentWage, setCurrentWage] = useState("");
  const [dailyCommuteCost, setDailyCommuteCost] = useState("");
  const [timeCost, setTimeCost] = useState("");
  const [onerousPercent, setOnerousPercent] = useState("");
  const [jobChangeCost, setJobChangeCost] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculateExtra = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const wage = parseFloat(currentWage);
    const commuteCost = parseFloat(dailyCommuteCost);
    const timeCostNum = parseFloat(timeCost);
    const onerous = parseFloat(onerousPercent);
    const jobChange = parseFloat(jobChangeCost);

    if (
      isNaN(wage) ||
      isNaN(commuteCost) ||
      isNaN(timeCostNum) ||
      isNaN(onerous) ||
      isNaN(jobChange)
    ) {
      alert("Please fill in all fields with valid numbers.");
      return;
    }

    const workingDays = 200;
    const rawCommuteCost = commuteCost * workingDays;
    const taxMultiplier = wage > 100000 ? 1.67 : 1;
    const adjustedCommuteCost = rawCommuteCost * taxMultiplier;
    const onerousCost = (onerous / 100) * wage;
    const totalExtra = adjustedCommuteCost + timeCostNum + onerousCost + jobChange;

    setResult(totalExtra.toFixed(2));
  };

  return (
    <>
      <Head>
        <title>Job Offer Calculator</title>
        <meta name="description" content="Calculate the required salary increase" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-black">
            Job Offer Calculator
          </h2>
          <form onSubmit={calculateExtra} className="space-y-4">
            <div>
              <label htmlFor="currentWage" className="block text-sm font-medium text-gray-800">
                Current Annual Wage (£)
              </label>
              <input
                type="number"
                id="currentWage"
                placeholder="e.g., 150000"
                value={currentWage}
                onChange={(e) => setCurrentWage(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label htmlFor="dailyCommuteCost" className="block text-sm font-medium text-gray-800">
                Daily Commute Cost (£)
              </label>
              <input
                type="number"
                id="dailyCommuteCost"
                placeholder="e.g., 30"
                value={dailyCommuteCost}
                onChange={(e) => setDailyCommuteCost(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label htmlFor="timeCost" className="block text-sm font-medium text-gray-800">
                Annual Cost of Time Spent on Commute (£)
              </label>
              <input
                type="number"
                id="timeCost"
                placeholder="e.g., 20000"
                value={timeCost}
                onChange={(e) => setTimeCost(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label htmlFor="onerousPercent" className="block text-sm font-medium text-gray-800">
                Extra Job Onerousness (%)
              </label>
              <input
                type="number"
                id="onerousPercent"
                placeholder="e.g., 10"
                value={onerousPercent}
                onChange={(e) => setOnerousPercent(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label htmlFor="jobChangeCost" className="block text-sm font-medium text-gray-800">
                Cost of Changing Jobs (£)
              </label>
              <input
                type="number"
                id="jobChangeCost"
                placeholder="e.g., 15000"
                value={jobChangeCost}
                onChange={(e) => setJobChangeCost(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow transition-colors"
            >
              Calculate
            </button>
          </form>
          {result && (
            <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md text-center font-bold">
              Required salary increase: £{result}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
