import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ModalPortal,
} from "react-native-modals";

export default function App() {
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [checked, setChecked] = useState(false);

  const addList = () => {
    if (text.trim().length > 0) {
      const listItemId = uuid.v4();

      const newList = {
        id: listItemId,
        content: text,
        checked: false,
      };

      setTodoList([...todoList, newList]);
      console.log(todoList);
      setText("");
    }
  };

  const deleteTodo = (item) => {
    setTodoList((todos) => todos.filter((todo) => todo.id !== item.id));
    // console.log(item.content);
  };

  const handleOpen = (item) => {
    setVisible(true);
    setEditText(item.content);
    setSelectedId(item.id);
  };

  const editTodo = () => {
    const selectedItem = todoList.filter((item) => item.id == selectedId);
    selectedItem[0].content = editText;
    setVisible(false);
  };

  const isChecked = (todo) => {
    setTodoList((prevTodos) =>
      prevTodos.map((item) =>
        item.id === todo.id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-cyan-900">
      <View className="px-4">
        <Text className="text-white text-center mt-8 mb-8 text-xl">
          To-Do List
        </Text>
        <View className="flex-row items-center gap-4">
          <TextInput
            className="bg-white text-xl w-3/4 justify-start rounded-md p-2"
            onChangeText={(value) => setText(value)}
            value={text}
          />
          <TouchableOpacity
            className="bg-white text-xl justify-end  rounded-md px-4 py-2"
            onPress={() => addList()}
          >
            <Text className="text-lg ">Add</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-center mt-6 text-white text-2xl mb-3">List</Text>
        <ScrollView className="space-y-4 mb-60">
          {todoList.map((todo) => (
            <TouchableOpacity key={todo.id} onPress={() => isChecked(todo)}>
              <View className="flex-row items-center justify-between border border-white p-1 rounded-md">
                <Text
                  className="text-white text-xl"
                  style={
                    todo.checked
                      ? { textDecorationLine: "line-through" }
                      : { textDecorationLine: "none" }
                  }
                >
                  {todo.content}
                </Text>

                <View className="flex-row gap-2">
                  <TouchableOpacity
                    className="bg-black px-4 py-1 rounded-md"
                    onPress={() => handleOpen(todo)}
                  >
                    <Text className="text-white text-lg">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-black px-4 py-1 rounded-md"
                    onPress={() => deleteTodo(todo)}
                  >
                    <Text className="text-white text-lg">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Modal
          visible={visible}
          onTouchOutside={() => setVisible(false)}
          modalAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
          footer={
            <ModalFooter>
              <ModalButton text="CLOSE" onPress={() => setVisible(false)} />
              <ModalButton text="EDIT" onPress={() => editTodo()} />
            </ModalFooter>
          }
        >
          <ModalContent>
            <View className="flex-row items-center gap-2">
              <TextInput
                className="bg-white text-xl w-11/12 justify-start rounded-md p-2 border border-black"
                onChangeText={(value) => setEditText(value)}
                value={editText}
                autoFocus={true}
              />
            </View>
          </ModalContent>
        </Modal>
        <ModalPortal />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
