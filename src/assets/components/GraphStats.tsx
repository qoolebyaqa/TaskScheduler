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
import { TaskItem, TaskRelatedState } from "../util/types";

function GraphStats() {
  const listOfTasks = useSelector((state: TaskRelatedState) => state.tasksRelated.tasks);
  const filtredLengths = useSelector(
    (state: TaskRelatedState) => state.tasksRelated.filtredLengths
  );
  const completedTasks = listOfTasks.filter(
    (task: TaskItem) => task.stage === "completed"
  );
  let positiveTime: number | string = '';
  let originTime: number | string = '';
  const data = completedTasks.map((task: TaskItem) => {
    if (task.completedDate) {
      positiveTime = Math.floor(
        (Number(new Date(task.duedate)) - Number(new Date(task.completedDate))) /
          (60 * 60 * 24 * 1000)
      );
    }
    if (task.creationDate) {
      originTime = Math.floor(
        (Number(new Date(task.duedate)) - Number(new Date(task.creationDate))) /
          (60 * 60 * 24 * 1000)
      );
    }
    return {
      name: task.title,
      Result_Time: positiveTime,
      Diff: Number(originTime) - Number(positiveTime),
    };
  });

  const data4Round = [
    { name: "Completed", value: filtredLengths.completed },
    { name: "Failed", value: filtredLengths.failed },
    { name: "Active", value: filtredLengths.active },
  ];

  const COLORS = ["#7E7BC8", "#E4415C", "#32AE7C"];

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
    <div className="flex flex-wrap justify-center gap-24 mb-4">
      {completedTasks.length > 1 && <div className="h-44">
        <BarChart
          width={300}
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
          <Bar dataKey="Diff" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div> }
      {(filtredLengths.completed > 0 && filtredLengths.failed > 0 && filtredLengths.active > 0) && <div>
        <PieChart width={300} height={300}>
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
                key={`cell-${index}${entry}`}
                fill={COLORS[index! % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>}
    </div>
  );
}

export default GraphStats;
