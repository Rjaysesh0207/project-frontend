import { useEffect, useState } from "react"
import API from './API'

export default function AddTodo(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
  const [todoList, setTodoList] = useState(props.todoList)

  useEffect(() => {
    refreshTodos()
  }, [])

  const refreshTodos = () => {
    API.get('/')
    .then((res) => {
      setTodoList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let todo = {
      title, description, completed
    }
    API.post('/', todo).then(() => refreshTodos())
  }

  const onUpdate = (id) => {
    let todo = {
      title, description, completed
    }
    API.patch(`/${id}/`, todo).then(() => refreshTodos())
  }

  const onDelete = (id) => {
    API.delete(`/${id}/`).then(() => refreshTodos())
  }

  const onSelectTodo = (id) => {
    let todo = todoList.filter((todo) => todo.id === id)
    setTitle(todo.title)
    setDescription(todo.description)
    setCompleted(todo.completed)
  }

  return (
    <>
        {todoList.map((todo) => {
          return(
            <div key={todo.id} style={{color: todo.completed ? 'green' : 'red'}}>
              <h3>{todo.title} </h3>
              <p>{todo.description}</p>
              <button onClick={() => onDelete(todo.id)}>DELETE</button>
              <button onClick={() => onSelectTodo(todo.id)}>Select for edit</button>
              <button onClick={() => setCompleted(true)}>Completed!</button>
              <button onClick={() => setCompleted(false)}>Incomplete</button>
              <button onClick={() => onUpdate(todo.id)}> edit</button>
            </div>
          )
        })}
      <h2>Add/Edit</h2>

      <form>
        <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        type='text'
        name='title'
        />

        <input 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
        type='text'
        name='description'
        />
      </form>
      <button onClick={onSubmit}>Add Todo</button>
    </>
  )
}