import { useSelector } from "react-redux";
import { CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Legend, Bar } from "recharts";

function GraphStats() {
  const listOfTasks = useSelector((state: any) => state.tasksRelated.tasks);
  const completedTasks = listOfTasks.filter(
    (task: any) => task.stage === "completed"
  );

  const data = completedTasks.map((task: any) => {
    const positiveTime = Math.floor((Number(new Date(task.duedate)) - Number(new Date(task.completedDate))) / (60 * 60 * 24 * 1000));
    const originTime = Math.floor((Number(new Date(task.duedate)) - Number(new Date(task.creationDate))) / (60 * 60 * 24 * 1000))
    return {
      name: task.title,
      Result_Time: positiveTime,
      Dif_of_Planned_Time: originTime
    };
  });
  console.log(data);

  return (
    <>
      <div className="h-44">
        <p>Graph of completed tasks</p>
        <BarChart
          width={100 * completedTasks.length}
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
          <XAxis dataKey="name" angle={35} tickMargin={30} height={65} orientation="top"/>
          <YAxis />
          <Tooltip />
          <Legend align="right"/>
          <Bar dataKey="Result_Time" stackId="a" fill="rgb(8 145 178)" />
          <Bar dataKey="Dif_of_Planned_Time" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div>
    </>
  );
}

export default GraphStats;
