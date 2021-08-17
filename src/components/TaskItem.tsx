import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/pen.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface EditTaskDto {
  taskId: number;
  taskNewTitle: string;
}

interface TaskProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (newTaskInfo: EditTaskDto) => void;
}

export function TaskItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    if (newTaskTitle.trim() === "") {
      Alert.alert("Título Inválido", "Adicione um título para a task");
      handleCancelEditing();
      return;
    }

    let editInfo: EditTaskDto = {
      taskId: task.id,
      taskNewTitle: newTaskTitle,
    };

    editTask(editInfo);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={newTaskTitle}
            style={task.done ? styles.taskTextDone : styles.taskText}
            editable={isEditing}
            onChangeText={setNewTaskTitle}
            onSubmitEditing={handleSubmitEditing}
          ></TextInput>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={() => handleCancelEditing()}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleStartEditing()}>
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.buttonsDivider}></View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{
            paddingRight: 24,
            opacity: isEditing ? 0.2 : 1,
          }}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 12,
  },
});
