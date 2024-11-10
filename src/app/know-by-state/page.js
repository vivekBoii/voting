"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Bar , Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import states_of_india from "./state_data";

const knowByState = () => {
  const [data, setData] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedState, setSelectedState] = useState("Assam");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [district, setDistrict] = useState([]);
  const [chartData, setChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});

  const fetchCandidates = async (state) => {
    try {
      const response = await fetch(
        `http://localhost:5328/api/candidates-by-state?state=${state}`
      );
      const result = await response.json();
      setDistrict(result.map((entry) => entry.district));
      setData(result);
      setCandidates(result[0].candidates);
      generateChartData(result[0].candidates);
      generateBarChartData(result[0].candidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates(selectedState);
  }, []);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    if (state) {
      fetchCandidates(states_of_india[state]);
    } else {
      setCandidates([]);
    }
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    const filteredCandidates = data.filter(
      (entry) => entry.district === district
    );
    setCandidates(filteredCandidates[0]?.candidates || []);
    generateChartData(filteredCandidates[0]?.candidates || []);
    generateBarChartData(filteredCandidates[0]?.candidates || []);
  };

  const generateChartData = (candidates) => {
    const labels = candidates?.map((candidate) => candidate.partyname);
    const data = candidates?.map((candidate) => candidate.totvotpoll);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Votes Share",
          data: data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#FF9F40",
            "#9966FF",
            "#FFCD56",
            "#C9CBCF",
            "#FF5733",
            "#FFC300",
          ],
          hoverOffset: 4,
        },
      ],
    });
  };

  const generateBarChartData = (candidates) => {
    const labels = candidates?.map((candidate) => candidate.cand_name);
    const data = candidates?.map((candidate) => candidate.totvotpoll);

    setBarChartData({
      labels: labels,
      datasets: [
        {
          label: "Votes Received",
          data: data,
          backgroundColor: "#4BC0C0",
          borderColor: "#36A2EB",
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="bg-purple-800 text-white min-h-screen py-10 px-6">
      <div className="mb-5 text-2xl font-semibold">Check Result of a State</div>

      <div className="mb-4">
        <label htmlFor="state" className="block text-lg font-medium">
          Select State:
        </label>
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          className="p-2 border border-gray-300 rounded-md text-black w-full"
        >
          {Object.keys(states_of_india).map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="district" className="block text-lg font-medium">
          Select District:
        </label>
        <select
          id="district"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="p-2 border border-gray-300 rounded-md text-black w-full"
        >
          {district.length === 0 ? (
            <option>No districts available</option>
          ) : (
            district.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="mt-6 max-w-8xl mx-auto bg-white p-8 rounded-lg shadow-xl flex justify-evenly">
        <div className="mt-6">
          <h3 className="text-xl text-black font-semibold mb-4 text-center">
            Votes Distribution
          </h3>
          {candidates.length > 0 && (
            <Pie
              data={chartData}
              options={{ responsive: false }}
              height={400}
              width={400}
            />
          )}
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-black text-center">
            Votes Comparison
          </h3>
          {candidates.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1000, 
                      },
                    },
                  },
                }}
                height={400} 
                width={600} 
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        {candidates.length > 0 ? (
          <div>
            <h3 className="text-xl font-semibold mb-4">Candidates:</h3>
            <ul>
              {candidates.map((candidate, index) => (
                <li key={index} className="border-b py-2">
                  <strong>{candidate.cand_name}</strong> from{" "}
                  <strong>{candidate.partyname}</strong> received{" "}
                  <strong>{candidate.totvotpoll}</strong> votes.
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-400">
            No candidates found for the selected district.
          </p>
        )}
      </div>
    </div>
  );
};

export default knowByState;
