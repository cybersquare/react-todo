
import './App.css';

import  {useState, useEffect} from 'react';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import { collection, getDocs } from 'firebase/firestore/lite';
import { query, orderBy, limit, where } from "firebase/firestore";  



import{ db} from './firebase';


import Todo from './components/Todo';

function App() {
   useEffect( ()=>{
    async function fetchData(){
      const collectionRef = collection(db,'todo_list');
      const queryStatement = query(collectionRef)   
      const querySnapshots = await getDocs(queryStatement);
      querySnapshots.forEach((doc)=>{
        console.log(doc.data());
      });
    }
    fetchData();
  }, [])
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (event)=> {
      event.preventDefault();
      setTodos([...todos, newTodo]);
      setNewTodo("");
      console.log(todos);

  }

  return (
    <div className="App">
      <h1>to do app</h1>
      <form>
      <FormControl>
        <InputLabel htmlFor="txt_todo" >New todo</InputLabel>
        <Input type="text" id="txt_todo" value={newTodo}
        onChange={event=>setNewTodo(event.target.value)}/>
        </FormControl>
        <Button variant='contained' color="secondary" type="submit" onClick={handleAddTodo}>Add todo</Button>
        <ul>
        {/* {todos.map(todo => <li key={todo}>{todo}</li> )} */}
        {todos.map(todo => <Todo data={todo}/> )}

        </ul>

      </form>
    </div>
  );
}

export default App;
