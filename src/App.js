
import './App.css';

import  {useState, useEffect} from 'react';
import {Button,TextField} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { updateDoc,setDoc,query,doc,collection, getDocs,addDoc,deleteDoc,serverTimestamp } from 'firebase/firestore';
import {ListItem, List, ListItemText} from '@material-ui/core'

import{ db} from './firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTodoData,setEditTodo] = useState("");
  const [newTodoDataAfterEdit,setAfterEditTodo] = useState("");
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

  async function edit(todo){
    setIsEditOpen(true);
    setEditTodo(todo);
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

  async function update(id,newTitle){
    console.log("update")
    const docRef = doc(db,collectionName, id);
    await updateDoc(docRef,{updated:true,title:newTitle});
    setIsEditOpen(false);
    fetchData();
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      {isEditOpen && <div>
        <TextField type="text"  variant="outlined" size='small' placeholder={editTodoData.item.title}
         style={{marginRight:10}} onChange={(event)=>{setAfterEditTodo(event.target.value)}}/>
        <Button variant='outlined' onClick={()=>{
          update(editTodoData.id,newTodoDataAfterEdit);
        }}>Edit</Button>
      </div>}
      {!isEditOpen&&<form>
        <TextField type="text" id="txt_todo" value={newTodo} label="Enter todo here" variant="outlined" size='small'
        onChange={event=>setNewTodo(event.target.value)} style={{marginRight:10}}/>
        <Button variant='outlined' color="secondary" type="submit" onClick={handleAddTodo} disabled={!newTodo}>Add todo</Button>
        {isLoading && <div>Loading....</div>}
        {!isLoading && <ul>
        {todos.map(todo =>{
          return <List key={todo.id} className="todo_list" >
            <ListItem>
             <ListItemText primary={todo.item.title} secondary={todo.id}/>
            </ListItem>
            <EditIcon onClick={()=>{edit(todo);}}/>
            <DeleteForeverIcon onClick={()=>{deleteData(todo.id)}}/>
          </List>})}
        </ul>}
      </form>}
    </div>
  );
}

export default App;
