import { Cell, Pie, PieChart } from 'recharts';

const RADIAN = Math.PI / 180;

// Needle Drawing Function
const needle = ({ value, data, cx, cy, iR, oR, color }) => {
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
        <circle key="needle-circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path
            key="needle-path"
            d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
            fill={color}
        />,
    ];
};

const ClassReportAverageNeedleChart = () => {
    const cx = 180;
    const cy = 200;
    const iR = 50;
    const oR = 100;

    // Example class performance (can be % average marks)
    const classAverage = 10;

    // Decide needle color based on classAverage
    let needleColor = 'green';
    if (classAverage <= 40) needleColor = 'red';
    else if (classAverage <= 70) needleColor = 'orange';

    // Slice chartData accordingly
    const chartData = [
        { name: 'Poor', value: 40, color: 'red' },
        { name: 'Average', value: 30, color: 'orange' },
        { name: 'Good', value: 30, color: 'green' },
    ];

    return (
        <PieChart width={400} height={500}>
            <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={chartData}
                cx={cx}
                cy={cy}
                innerRadius={iR}
                outerRadius={oR}
                stroke="none"
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
            </Pie>

            {/* Needle */}
            {needle({
                value: classAverage,
                data: chartData,
                cx,
                cy,
                iR,
                oR,
                color: '#00C49F',
            })}
        </PieChart>
    );
};

export default ClassReportAverageNeedleChart;
