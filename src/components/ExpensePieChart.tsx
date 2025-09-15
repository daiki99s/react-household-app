import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

type ChartData = {
    category: string;
    amount: number;
};

const ExpensePieChart = ({ data }: { data: ChartData[] }) => (
    <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
            <PieChart>
                <Pie data={data} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
);

export default ExpensePieChart;
