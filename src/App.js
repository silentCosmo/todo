import './App.css'
import { useState } from 'react'
import moment from 'moment'

function App() {
  const [toDo, setToDo] = useState('')
  const [toDos, setToDos] = useState([])
  return (
    <div>
      <div>
        <h1 className="bold">📝ToDoLIST</h1>
        <h2 className="tagline">Let youre task Live💫</h2>
      </div>
      <div>
        <div className="ctask">
          <input type="text" value={toDo} onChange={(event) => setToDo(event.target.value)} placeholder="  🖊️ Creat new task.." />
          <span className="add" onClick={() => {setToDos([...toDos, {id: Date.now(),time: Date(),text:toDo,status: false}]);setToDo('')}}>+</span>
        </div>
      </div>
      <div className="todos tc">
        {
          toDos.map((obj)=>{
            
            if(obj.text.length===0){
              return null
            }else{
              return(
              <div className="todo">
                
                <h3 className="task-title"><input type="checkbox" onChange={(e)=>{
                  
                  setToDos(toDos.filter(obj2=>{
                    if(obj2.id===obj.id){
                      obj2.status=e.target.checked
                      obj2.finish= Date()
                    }
                    return obj2
                  }))
                }} /> {obj.text} <span className="remove" onClick={()=>{
                  
                    setToDos(toDos.filter(obj3=>{
                      console.log('obj3',obj3);
                      console.log('id',obj3.id);
                      if(obj3.id===obj.id){
                        obj3 = null
                      }
                      return obj3
                    }))
                }}>x</span></h3>

                <p className='time'>Time {moment(obj.time).format("HH:mm")} {/* Date {moment(obj.time).format("DD:MM:YYYY") */}</p>
              </div>
            )
            }
            
          })
          
        }
      </div>
        {
          toDos.map((obj2)=>{
            if(obj2.status){
              return (<div><h1>{obj2.text}</h1><p>Completed Time: {moment(obj2.finish).format("HH:mm")}</p></div>)
            }
            return null
          })
        }

    </div>
  );
}

export default App;

