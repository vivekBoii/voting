"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Result = () => {
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5328/api/data-analysis");

      if (response.ok) {
        const json = await response.json();
        setData(json.data);
        setAnalysis(json.analysis);
        const filteredData = json.data.filter((item) => item.totvotpoll > (json.analysis.total_votes/json.analysis.total_parties));
        setChartData({
          labels: filteredData.map((item) => item.partyname),
          datasets: [
            {
              label: "Total Votes",
              data: filteredData.map((item) => item.totvotpoll),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-purple-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Data Analysis</h1>

        {chartData ? (
          <div className="mb-8">
            <Bar data={chartData} options={{ responsive: true }} />
          </div>
        ) : (
          <p className="text-gray-600">Loading chart...</p>
        )}

        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-800">Analysis:</h3>
          <p className="text-gray-700 mt-2">
            <strong>Total number of parties:</strong> {analysis?.total_parties}
          </p>
          <p className="text-gray-700 mt-2">
            <strong>
              Party with the highest votes:{" "}
            </strong>
            {analysis?.max_votes_party.partyname} ({analysis?.max_votes_party.totvotpoll} votes)
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Total votes across all parties:</strong> {analysis?.total_votes}
          </p>
        </div>

        <div className="mb-5 text-xl font-medium text-blue-800">
        <Link
          href="/know-by-state?state=Andaman & Nicobar Islands"
          className="underline hover:no-underline"
        >
          Check Result of a State & UT
        </Link>
      </div>

        <div>
          <h2 className="text-xl font-medium text-gray-800 mb-4">Total Votes by Party</h2>
          {data?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Party Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Total Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4 text-sm text-gray-700">{item.partyname}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.totvotpoll}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">Loading data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
