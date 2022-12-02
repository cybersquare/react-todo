
import './App.css';

import  {useState, useEffect} from 'react';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import { collection, getDocs,addDoc } from 'firebase/firestore/lite';
import { query, orderBy, limit, where } from "firebase/firestore";  

import {ListItem, List, ListItemText} from '@material-ui/core'



import{ db} from './firebase';


import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect( ()=>{
    console.log("fetching......")
    fetchData();
  }, []);
  
  async function fetchData(){
    const collectionRef = collection(db,'todo_list');
    const queryStatement = query(collectionRef)   
    const querySnapshots = await getDocs(queryStatement);
    const data = [];
    querySnapshots.forEach((doc)=>{
      data.push({item:doc.data(),id:doc.id});
    });
    setTodos(data);
    setIsLoading(false);
  }

  const handleAddTodo = (event)=> {
      event.preventDefault();
      setIsLoading(true);
      setNewTodo("");
      async function post(){
      await addDoc(collection(db, 'todo_list'), {
        title: newTodo
      })
      fetchData();
    }
    post();

  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form>
      <FormControl>
        <InputLabel htmlFor="txt_todo" >New todo</InputLabel>
        <Input type="text" id="txt_todo" value={newTodo}
        onChange={event=>setNewTodo(event.target.value)}/>
        </FormControl>
        <Button variant='contained' color="secondary" type="submit" onClick={handleAddTodo}>Add todo</Button>
        {isLoading && <div>Loading....</div>}
        {!isLoading && <ul>
        {todos.map(todo =>{
          return <List key={todo.id}>{todo.item.title}</List>})}
        </ul>}
      </form>
    </div>
  );
}

export default App;
