
import './App.css';

import  {useState, useEffect} from 'react';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { query,doc,collection, getDocs,addDoc,deleteDoc,serverTimestamp } from 'firebase/firestore';

import {ListItem, List, ListItemText} from '@material-ui/core'



import{ db} from './firebase';


import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const collectionName = 'todo_list';
  const collectionRef = collection(db,collectionName);

  useEffect( ()=>{
    console.log("fetching......")
    fetchData();
  }, []);

  async function deleteData(id){
    const docRef = doc(db,collectionName, id);
    await deleteDoc(docRef);
    await fetchData();
  }
  
  async function fetchData(){
    const queryStatement = query(collectionRef)   
    const querySnapshots = await getDocs(queryStatement);
    const data = [];
    querySnapshots.forEach((doc)=>{
      data.push({item:doc.data(),id:doc.id, ref:doc.ref});
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
        title: newTodo,
        createdAt: serverTimestamp()
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
        <Button variant='outlined' color="secondary" type="submit" onClick={handleAddTodo} disabled={!newTodo}>Add todo</Button>
        {isLoading && <div>Loading....</div>}
        {!isLoading && <ul>
        {todos.map(todo =>{
          return <List key={todo.id}>
            <ListItem>
             <ListItemText primary={todo.item.title} secondary={todo.id}/>
            </ListItem>
            <DeleteForeverIcon onClick={()=>{deleteData(todo.id)}}/>
          </List>})}
        </ul>}
      </form>
    </div>
  );
}

export default App;
