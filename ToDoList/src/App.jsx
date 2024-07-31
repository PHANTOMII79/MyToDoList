import { useState, useEffect } from 'react'
import { arrayMoveImmutable } from 'array-move';



function Main(){
  
  const [tasks, setTasks] = useState([]);

  function AddTask(newTask){
    setTasks((tasks) => ([... tasks , newTask]));
  }

  useEffect(() =>{
    if(tasks.length === 0 && localStorage.getItem("0") !== 'null' ){
      setTasks(JSON.parse(localStorage.getItem("0")));
    }
    else{
      const local = JSON.stringify(tasks);
      localStorage.setItem("0", local);
    }

  

    //tasks = JSON.parse(localStorage.getItem("0"));
    //console.log(tasks);
  },[tasks]);


  function deleteTask(index){
    setTasks(tasks.filter((_ , i) => i!== index));
    if(tasks.length===1){
       localStorage.setItem("0", null)
      console.log("we have no Task");

    }
  }
  function MoveUp(i){
    console.log( i , "is Moved Up");
    setTasks(arrayMoveImmutable(tasks,i,(i-1)));
  }
  function MoveDown(i){
    console.log( i , "is Moved Down");
    setTasks(arrayMoveImmutable(tasks,i,(i+1)));
  }

  return(
    <>
      <div className="Main">
        <AddSpace AddTask={AddTask} />
        <ToDoListSpace 
        tasks={tasks}
        deleteTask={deleteTask}
        MoveDown={MoveDown}
        MoveUp={MoveUp} />
      </div>
    </>
  );
}

function AddSpace({AddTask}){
  const [value, setValue] = useState('');
  const AddingTask = () =>{
    AddTask(value);
    setValue("");
  }
  
  return(
    <>
      <div className="AddSpace">
        <div className="AddText">
          <input 
            type="text" 
            className="AddTaskText" 
            placeholder="Add your task 😊" 
            value={value}
            onChange={(e) =>{setValue(e.target.value)}}
            />
        </div>
        <div className="AddButton">
          <button className="AddTaskButton" onClick={AddingTask}>Add</button>
        </div>
      </div>
    </>
  );
}

function ToDoListSpace({tasks, deleteTask, MoveUp, MoveDown}){

  
  return(
    <>
      <div className="ToDoListSpace">

        
          {tasks.map((task , index) =>(<div key={index}>
        <ToDoTask index={index} task={task} MoveDown={MoveDown} MoveUp={MoveUp} deleteTask={deleteTask}/>
        
          </div>
         
          ))}
        

      </div>
      
    </>
  );
}

function ToDoTask({index, task, deleteTask, MoveUp, MoveDown}){

  return(
    <>
      <input type="text" className='TaskText'  value={task} readOnly/>
      <button className="UpButton" onClick={() => MoveUp(index) }>👆</button>
      <button className="DownButton" onClick={() =>MoveDown(index) }>👇</button>
      <button className="DeleteButton" onClick={() =>deleteTask(index) }>🗑️</button>
    
    </>

  );
};



export default function App(){

  return(
    <>
      <Main />
    
    </>
  );
};