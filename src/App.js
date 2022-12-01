
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
  const data = collection(db, 'todo_list');
  // // console.log(data);
  // const dataSnapshot = await getDocs(data);
  // const todo_list = dataSnapshot.docs.map(doc => doc.data());
  // // console.log(todo_list);

  const q = query(collection(db, "todo_list"), where("title", "==", "Learn angular"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  
});

    }
    fetchData();
    // db.collection("todo_list").onSnapshot(item=>{
    //   console.log(item.docs);
    // })
  

  }, [])
  const [todos, setTodos] = useState(["Todo1", "Todo2"]);
  const [newTodo, setNewTodo] = useState("nt");

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
