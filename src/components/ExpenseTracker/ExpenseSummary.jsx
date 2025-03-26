import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import { useExpense } from "./ExpenseContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ExpenseSummary = () => {
  const { expenses } = useExpense();
  const [categoryData, setCategoryData] = useState([]);
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    processChartData(expenses);
  }, [expenses]);

  const processChartData = (data) => {
    const categoryMap = {};
    data.forEach((item) => {
      const category = item.category;
      const amount = parseFloat(item.amount);
      categoryMap[category] = (categoryMap[category] || 0) + amount;
    });

    const categoryChartData = Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));

    const monthMap = {};
    data.forEach((item) => {
      const month = item.date.slice(0, 7);
      const amount = parseFloat(item.amount);
      monthMap[month] = (monthMap[month] || 0) + amount;
    });

    const monthChartData = Object.keys(monthMap).map((key) => ({
      name: key,
      expense: monthMap[key],
    }));

    setCategoryData(categoryChartData);
    setMonthData(monthChartData);
  };
  const renderLabel = (entry) => {
    return `${entry.name}: ${entry.value}`;
  };

  return (
    <div className="container text-center">
      <div
        className="card p-4 mb-4"
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ width: "100%" }}>
            <h5 className="mt-4">Category-wise Expenses</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={renderLabel}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ width: "100%" }}>
            <h5 className="mt-4">Month-wise Expenses</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                label={renderLabel}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expense" fill="#0088FE" barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
