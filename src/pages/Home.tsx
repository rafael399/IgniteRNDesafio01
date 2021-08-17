import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

interface EditTaskDto {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle.trim() === "")
      return Alert.alert("Titulo inválido", "Adicione um título para a task");

    if (tasks.find((task) => task.title === newTaskTitle))
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

    let novoSkill: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState: Task[]) => [...oldState, novoSkill]);
  }

  function handleToggleTaskDone(id: number) {
    const taskIndex = tasks.findIndex((task: Task) => task.id === id);
    if (taskIndex < 0)
      return Alert.alert("ID Inválido", "Task com ID informado não existe");

    let tmpArray: Task[] = tasks;
    tmpArray[taskIndex].done = !tmpArray[taskIndex].done;

    setTasks([...tmpArray]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Você tem certeza que deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((oldState: Task[]) =>
              oldState.filter((task) => task.id !== id)
            ),
        },
      ]
    );
  }

  function handleEditTask(newTaskInfo: EditTaskDto) {
    const taskIndex: number = tasks.findIndex(
      (task: Task) => task.id === newTaskInfo.taskId
    );

    if (taskIndex < 0)
      return Alert.alert("ID Inválido", "Task com ID informado não existe");
    if (newTaskInfo.taskNewTitle.trim() === "")
      return Alert.alert("Título Inválido", "Adicione um título para a task");
    if (newTaskInfo.taskNewTitle.trim() === tasks[taskIndex].title) return;

    let tmpArray: Task[] = tasks;
    tmpArray[taskIndex].title = newTaskInfo.taskNewTitle;

    setTasks([...tmpArray]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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
