import React from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./components/view-switcher";
import { getStartEndDateForProject } from "./DataContext";
const GanttChartPage = ({tasks,setTasks}) => {
  console.log("sjndsnjdssanthu",tasks)
  const [view, setView] = React.useState(ViewMode.Day);
  const [isChecked, setIsChecked] = React.useState(true);
  
  const getTaskColor = (status) => {
    console.log("Status:", status); 
    switch (status) {
      case 'Fundamental':
        return 'brown';
      case 'In Progress':
        return 'orange';
      case 'Stuck':
        return 'red';
      case 'Yet to Begin':
        return 'black';
      case 'Done':
        return 'green';
      default:
        return 'blue'; 
    }
  };
  
  
  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };
  console.log('taskstasks11',tasks)
  return (
    <div>
      {tasks!== undefined && (
        <>
      <ViewSwitcher
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <Gantt
        tasks={tasks}
        viewMode='Month'
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        barBackgroundColor={(task) => getTaskColor(task?.status)}
        columnWidth={200}
        rowHeight={60}
        fontSize={12}
      />
     
  </>
    )}
    </div>
  );
};
export default GanttChartPage;
