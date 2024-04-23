import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();
export function getStartEndDateForProject(tasks, projectId) {
  const projectTasks = tasks.filter((t) => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;
  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}

export const DataProvider = ({ children }) => {
  
  const currentDate = new Date();
  const tasks = [
    {
           start: new Date(2024, 3, 1),

      end: new Date(2024, 3, 30),
      name: "Some Project",
      id: "ProjectSample",
      type: "project",
      hideChildren: false,
      item: 'verbal and non verbal', person: 'Laddu', status: 'Fundamental', timeline: [new Date(2024, 3, 1), new Date(2024, 3, 3)], dependency: 'email etiqutte', tags: 'Written Communication',
      styles: { backgroundColor: "blue", progressColor: "blue" },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28
      ),
      name: "Idea",
      id: "Task 0",
      type: "task",
      project: "ProjectSample",
      item: 'verbal and non verbal', person: 'anji', status: 'In Progress', timeline: [new Date(2024, 3, 1), new Date(2024, 3, 3)], dependency: 'Communication Basics', tags: 'Interpersonal Communication',
      styles: { backgroundColor: "orange", progressColor: "orange" },

    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "Research",
      id: "Task 1",
     
      type: "task",
      project: "ProjectSample",
      item: 'verbal and non verbal', person: 'rama', status: 'Done', timeline: [new Date(2024, 3, 1), new Date(2024, 3, 3)], dependency: 'Technical Research', tags: 'Public Speaking',
      styles: { backgroundColor: "green", progressColor: "green" },

    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: "Discussion with team",
      id: "Task 2",
      type: "task",
      project: "ProjectSample",
      item: 'verbal and non verbal', person: 'santhu', status: 'Stuck', timeline: [new Date(2024, 3, 1), new Date(2024, 3, 3)], dependency: 'email etiqutte', tags: 'Innovation',
      styles: { backgroundColor: "red", progressColor: "red" },

    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: "Developing",
      id: "Task 3",
      type: "task",
      project: "ProjectSample",
      item: 'verbal and non verbal', person: 'Deepu', status: 'Done', timeline: [new Date(2024, 3, 1), new Date(2024, 3, 3)], dependency: 'Communication Basics', tags: 'Interpersonal Communication',
      styles: { backgroundColor: "green", progressColor: "green" },

    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Review",
      id: "Task 4",
      type: "task",
      project: "ProjectSample",
      item: 'verbal and non verbal', person: 'sree', status: 'Yet to Begin', timeline: [new Date(2024, 3, 1), new Date(2024, 3, 3)], dependency: 'email etiqutte', tags: 'Written Communication',
      styles: { backgroundColor: "black", progressColor: "Black" },

    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      id: "Task 6",
      type: "task",
      project: "ProjectSample",
      item: 'verbal and non verbal', person: 'John Doe', status: 'In Progress', timeline: [new Date(2024, 3, 1), new Date(2024, 3, 3)], dependency: 'email etiqutte', tags: 'Creativity',
      styles: { backgroundColor: "orange", progressColor: "orange" },

    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 9",
      type: "task",
      project: "ProjectSample",
      item: 'verbal and non verbal', person: 'John Doe', status: 'In Progress', timeline: [new Date(2024, 3, 1), new Date(2024, 3, 3)], dependency: 'Technical Research', tags: 'Public Speaking',
      styles: { backgroundColor: "orange", progressColor: "orange" },

    }
  ];
  const [data, setData] = useState(tasks);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
    