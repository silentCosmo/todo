import './css/App.css';
import { useState, useRef } from 'react';
import moment from 'moment';
import Confetti from 'react-confetti';
import successSound from './sounds/success.ogg';
import failSound from './sounds/fail.mp3';
import newTodoSound from './sounds/new_todo.ogg';

function App() {
  const [toDo, setToDo] = useState('');
  const [toDos, setToDos] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const successSoundRef = useRef(null);
  const failSoundRef = useRef(null);
  const newTodoSoundRef = useRef(null);

  const addTodo = () => {
    if (toDo.length !== 0) {
      setToDos([...toDos, { id: Date.now(), time: new Date(), text: toDo, status: false, faild: false }]);
      setToDo('');
      newTodoSoundRef.current.play();
    }
    if (toDo === 'silentcosmo') {
      setToDos([...toDos, { id: Date.now(), time: new Date(), text: toDo, status: true, faild: false }]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Show confetti for 3 seconds
      successSoundRef.current.play();
    }
  };

  return (
    <div>
      {showConfetti && <Confetti />}
      <audio ref={successSoundRef} src={successSound} />
      <audio ref={failSoundRef} src={failSound} />
      <audio ref={newTodoSoundRef} src={newTodoSound} />
      <div>
        <h1 className="app-name">📝ToDoLIST</h1>
        <h2 className="tagline">Let your task Live💫</h2>
      </div>
      <div>
        <div className="ctask">
          <input
            type="text"
            value={toDo}
            onChange={(event) => setToDo(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                addTodo();
              }
            }}
            placeholder="  🖊️ Create new task.."
            maxLength={21}
          />
          <span className="add" onClick={addTodo}>+</span>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* success */}
          <div className="col-md-4">
            <div className="todos">
              {toDos.map((obj2) => {
                if (obj2.status) {
                  return (
                    <div className="todo-done mx-auto" key={obj2.id}>
                      <h4 className="ttlr">{obj2.text}</h4>
                      <p className="time">Completed Time: {moment(obj2.finish).format('HH:mm')}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          {/* New todo */}
          <div className="col-md-4">
            <div className="todos mx-auto">
              {toDos.map((obj) => {
                if (obj.faild === false && obj.status === false) {
                  return (
                    <div className="todo mx-auto" key={obj.id}>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          setToDos(
                            toDos.map((obj2) => {
                              if (obj2.id === obj.id) {
                                obj2.status = e.target.checked;
                                obj2.finish = new Date();
                                if (e.target.checked) {
                                  setShowConfetti(true);
                                  setTimeout(() => setShowConfetti(false), 3000); // Show confetti for 3 seconds
                                  successSoundRef.current.play();
                                }
                              }
                              return obj2;
                            })
                          );
                        }}
                      />
                      <p className="task-title fw-bold">{obj.text}</p>
                      <h2
                        className="remove"
                        onClick={() => {
                          setToDos(
                            toDos.map((obj3) => {
                              if (obj3.id === obj.id && obj3.text !== 'silentcosmo' && obj3.text !== 'SilentCosmo') {
                                obj3.faild = true;
                                failSoundRef.current.play();
                              }
                              if (obj3.text === 'silentcosmo') {
                                obj3.status = true;
                              }
                              return obj3;
                            })
                          );
                        }}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </h2>
                      <p className="time-main">Time {moment(obj.time).format('HH:mm')}</p>
                    </div>
                  );
                } else {
                  /* If todo status true */
                  return (
                    <div className="todo mx-auto" key={obj.id}>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          setToDos(
                            toDos.map((obj2) => {
                              if (obj2.id === obj.id && obj.faild === false) {
                                obj2.status = e.target.checked;
                                obj2.finish = new Date();
                                if (e.target.checked) {
                                  setShowConfetti(true);
                                  setTimeout(() => setShowConfetti(false), 3000); // Show confetti for 3 seconds
                                  successSoundRef.current.play();
                                }
                              }
                              return obj2;
                            })
                          );
                        }}
                      />
                      <p className="task-title remove-title">{obj.text}</p>
                      <h2
                        className="remove-false"
                        onClick={() => {
                          setToDos(
                            toDos.map((obj3) => {
                              if (obj3.id === obj.id && obj3.status === false) {
                                obj3.faild = true;
                                failSoundRef.current.play();
                              }
                              return obj3;
                            })
                          );
                        }}
                      >
                        <i className="fa-regular fa-circle-check"></i>
                      </h2>
                      <p className="time-main">Time {moment(obj.time).format('HH:mm')}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          {/* Failed */}
          <div className="col-md-4">
            <div className="todos">
              <div>
                {toDos.map((obj3) => {
                    if (obj3.faild) {
                      return (
                        <div className="todo-fail mx-auto" key={obj3.id}>
                          <h5 className="ttlr">{obj3.text}</h5>
                          <h2
                            className="redo"
                            onClick={() => {
                              setToDos(
                                toDos.map((faild) => {
                                  if (faild.id === obj3.id) {
                                    faild.faild = false;
                                    newTodoSoundRef.current.play();
                                  }
                                  return faild;
                                })
                              );
                            }}
                          >
                            <i className="fa-solid fa-arrow-rotate-left"></i>
                          </h2>
                          <p className="time">Failed Time: {moment(obj3.finish).format('HH:mm')}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default App;
  