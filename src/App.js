import React, { useState } from 'react'
import "./App.css";
import Alllist from './components/Alllist';
import TodoForm from './components/TodoForm';

const App = () => {
  
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) =>{
    e.preventDefault();
     
    if(editId){
      const editTodo = todos.find((etf) => etf.id === editId);
      const updateedTodos = todos.map((t) =>
        t.id === editTodo.id ?
        (t = {id: t.id, todo}) :
        {id: t.id, todo: t.todo}
      );

      setTodos(updateedTodos);
      setTodo("");
      setEditId(0);
      return;
    }


    if(todo !== ""){
      setTodos([{id: `${todo} - ${Date.now()}` , todo}, ...todos]);
      setTodo("");
    }


  }

  const handleDelete = (id) => {
    const delTodo = todos.filter((td) => td.id !== id);
    setTodos([...delTodo]);
  }

  const handleEdit = (id) => {
      const editTodo = todos.find((te) => te.id === id);
      setTodo(editTodo.todo);
      setEditId(id);
  }

  return (
    <div className='App'>
        <div className='container'>
          <h1>Todo List App</h1>
          <TodoForm 
          handleSubmit={handleSubmit} 
          todo={todo} 
          setTodo = {setTodo}
          editId={editId}
          />

          
          <Alllist todos={todos} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete}
          />
        </div>  
    </div>
  );
}

export default App