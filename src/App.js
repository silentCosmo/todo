import './css/App.css'
import { useState } from 'react'
import moment from 'moment'

function App() {
  const [toDo, setToDo] = useState('')
  const [toDos, setToDos] = useState([])

  return (
    <div>
      <div>
        <h1 className="app-name">📝ToDoLIST</h1>
        <h2 className="tagline">Let youre task Live💫</h2>
      </div>
      <div>
        <div className="ctask">
          <input type="text" value={toDo} onChange={(event) => setToDo(event.target.value)} placeholder="  🖊️ Creat new task.." />
          <span className="add" onClick={() => {
            if (toDo.length !== 0) {
              setToDos([...toDos, { id: Date.now(), time: Date(), text: toDo, status: false, faild: false }]); setToDo('')
            } if (toDo === "silentcosmo") { setToDos([...toDos, { id: Date.now(), time: Date(), text: toDo, status: true, faild: false }]) }
          }}>+</span>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* success */}
          <div className="col-md-4">
            <div className="todos">
              

              {
                toDos.map((obj2) => {
                  if (obj2.status) {
                    return (
                      <div className="todo-done mx-auto">
                        <h1 className='ttlr'>{obj2.text}</h1>
                        <p className='time'>Completed Time: {moment(obj2.finish).format("HH:mm")}</p>
                      </div>
                    )
                  }
                  return null
                })
              }

            </div>
          </div>
          {/* New todo */}
          <div className="col-md-4">
            <div className="todos mx-auto">
              {/* <div className='dph'></div> */}
              {
                toDos.map((obj) => {

                  if (obj.faild === false && obj.status === false) {
                    return (
                      <div className="todo mx-auto">
                        <input type="checkbox" onChange={(e) => {

                          setToDos(toDos.filter(obj2 => {
                            if (obj2.id === obj.id) {
                              obj2.status = e.target.checked
                              obj2.finish = Date()
                            }
                            return obj2
                          }))
                        }} />


                        <h3 className="task-title"> {obj.text}</h3>

                        <h2 className="remove" onClick={() => {
                          setToDos(toDos.filter(obj3 => {

                            if (obj3.id === obj.id && obj3.text !== "silentcosmo" && obj3.text !== "SilentCosmo" && obj3.text !== "SilentCosmo" && obj3.text !== "silentCosmo") {


                              obj3.faild = true

                            }
                            if (obj3.text === "silentcosmo") {
                              obj3.status = true
                            }
                            console.log("new: ", obj3);
                            return obj3
                          }))
                        }}>
                           <i className="fa-solid fa-xmark"></i>
                        </h2>

                        <p className='time-main'>Time {moment(obj.time).format("HH:mm")}</p>
                      </div>
                    )
                  } else {
                    /* If todo status true */
                    return (
                      <div className="todo mx-auto">
                        <input type="checkbox" onChange={(e) => {

                          setToDos(toDos.filter(obj2 => {
                            if (obj2.id === obj.id && obj.faild === false) {
                              obj2.status = e.target.checked
                              obj2.finish = Date()
                            }
                            return obj2
                          }))
                        }} />


                        <h3 className="task-title remove-title"> {obj.text}</h3>

                        <h2 className="remove-false" onClick={() => {
                          setToDos(toDos.filter(obj3 => {

                            if (obj3.id === obj.id && obj3.status === false) {

                              obj3.faild = true
                            }
                            console.log("new: ", obj3);
                            return obj3
                          }))
                        }}>
                          <i className="fa-regular fa-circle-check"></i>
                        </h2>

                        <p className='time-main'>Time {moment(obj.time).format("HH:mm")} {/* Date {moment(obj.time).format("DD:MM:YYYY") */}</p>
                      </div>
                    )
                  }

                })

              }
            </div>

          </div>
          {/* Failed */}
          <div className="col-md-4">
            <div className="todos">

              <div>
                {
                  toDos.map((obj3) => {
                    if (obj3.faild) {
                      return (
                        <div className="todo-fail mx-auto">
                          <h1 className='ttlr'>{obj3.text}</h1>

                          <h2 className="redo" onClick={() => {
                            setToDos(toDos.filter(faild => {
                              console.log(obj3);
                              if (faild.id === obj3.id) {
                                faild.faild = false
                              }
                              console.log("new: ", obj3);
                              return faild
                            }))
                          }}>
                            <i className="fa-solid fa-arrow-rotate-left"></i>
                          </h2>

                          <p className='time'>Failed Time: {moment(obj3.finish).format("HH:mm")}</p>
                        </div>
                      )
                    }
                    return null
                  })
                }
              </div>

            </div>


          </div>
        </div>
        </div>
      </div>
    
  );
}

export default App;

