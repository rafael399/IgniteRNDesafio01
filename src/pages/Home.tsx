import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle.trim() === "") return "Adicione um título para a task";

    let novoSkill: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState: Task[]) => [...oldState, novoSkill]);
  }

  function handleToggleTaskDone(id: number) {
    const taskIndex = tasks.findIndex((task: Task) => task.id === id);
    if (taskIndex < 0) return "Task com ID informado não existe";

    let tmpArray: Task[] = tasks;
    tmpArray[taskIndex].done = !tmpArray[taskIndex].done;

    setTasks([...tmpArray]);
  }

  function handleRemoveTask(id: number) {
    setTasks((oldState: Task[]) => oldState.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
