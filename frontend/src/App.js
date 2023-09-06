import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';


function App() {
  const [todoList, setTodoList] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/todos/')
    .then((res) =>  {
      setTodoList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  })

  // This will change depending on my project
  return (
    <>
      <AddTodo todoList={todoList}/>
    </>
  );
}

export default App;
