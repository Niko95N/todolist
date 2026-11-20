import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState,useEffect } from 'react';
import { Task } from './types/Task';
import  Row  from './components/Row';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
  async function loadTodos() {
      
      const saved = await AsyncStorage.getItem('todos');
      if (saved) {
        setTasks(JSON.parse(saved))
      };
    };
  loadTodos();
}, []);

  const addTask = async () => {
  if (!input.trim()) return

  const newTask: Task = {
    id: Date.now(),
    text: input.trim(),
    completed: 0
  };

  const updatedTasks = [...tasks, newTask];

  setTasks(updatedTasks);

  await AsyncStorage.setItem('todos', JSON.stringify(updatedTasks));

  setInput("");
};

const completeTodo = (id:number) => {
  const updatedTasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: task.completed === 0 ? 1 : 0 }
      : task
  );

  setTasks(updatedTasks);
  AsyncStorage.setItem('todos', JSON.stringify(updatedTasks));
};

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
        value={input}
        onChangeText={setInput}
        placeholder='Add new task...'
        onSubmitEditing={addTask}
        />
      </View>
      <FlatList<Task>
        data={tasks}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item}) => <Row item={item} onToggle={() => completeTodo(item.id)}/>}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});
