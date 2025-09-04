import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
          ${x + width / 2},${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height}
          ${x + width},${y + height}
          Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const ClassReportSubject = () => {
    const data = [
        { name: 'Science', pass: 40 },
        { name: 'English', pass: 30 },
        { name: 'Mathematics', pass: 20 },
        { name: 'Hindi', pass: 27 },
        { name: 'Social Science', pass: 18 },
        { name: 'Computer', pass: 19 },
    ];

    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        tickFormatter={(value) => value.substring(0, 4)} // Show only first 3 letters
                    />
                    <YAxis domain={[0, 50]} // total number of students
                        allowDecimals={false} />
                    <Bar
                        dataKey="pass"
                        shape={<TriangleBar />}
                        label={{ position: 'top' }}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ClassReportSubject;
