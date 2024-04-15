import { useSelector } from "react-redux";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function GraphStats() {
  const listOfTasks = useSelector((state: any) => state.tasksRelated.tasks);
  const filtredLengths = useSelector(
    (state: any) => state.tasksRelated.filtredLengths
  );
  const completedTasks = listOfTasks.filter(
    (task: any) => task.stage === "completed"
  );

  const data = completedTasks.map((task: any) => {
    const positiveTime = Math.floor(
      (Number(new Date(task.duedate)) - Number(new Date(task.completedDate))) /
        (60 * 60 * 24 * 1000)
    );
    const originTime = Math.floor(
      (Number(new Date(task.duedate)) - Number(new Date(task.creationDate))) /
        (60 * 60 * 24 * 1000)
    );
    return {
      name: task.title,
      Result_Time: positiveTime,
      Planned_Time: originTime,
    };
  });

  const data4Round = [
    { name: "Completed", value: filtredLengths.completed },
    { name: "Failed", value: filtredLengths.failed },
    { name: "Active", value: filtredLengths.active },
  ];

  const COLORS = ["green", "red", "blue"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-wrap justify-center">
      <div className="h-44">
        <p>Graph of saved time with completed tasks</p>
        <BarChart
          width={115 * completedTasks.length}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="name"
            angle={35}
            tickMargin={30}
            height={65}
            orientation="top"
          />
          <YAxis />
          <Tooltip />
          <Legend align="right" />
          <Bar dataKey="Result_Time" stackId="a" fill="rgb(8 145 178)" />
          <Bar dataKey="Planned_Time" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div>
      <div>
        <p>Graph of total tasks</p>
        <PieChart width={400} height={300}>
          <Pie
            data={data4Round}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry?:any, index?: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index! % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default GraphStats;
