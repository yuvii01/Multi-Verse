import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = ['#00C49F', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const ClassReprtPieChart = () => {
  const data = [
    { name: 'Pass', value: 40 },
    { name: 'Fail', value: 10 },
  ];

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {data.map((entry, index) => (
          <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{ backgroundColor: COLORS[index % COLORS.length], width: "16px", height: "16px", borderRadius: "100%" }}
            ></div>
            <span className="text-sm font-medium" style={{ fontSize: "14px", lineHeight: "20px", fontWeight: "500" }}>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassReprtPieChart;
