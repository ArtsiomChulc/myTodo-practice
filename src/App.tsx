import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { MyTodoList } from './Todolist/MyTodoList/MyTodoList';
import { Todolist } from './Todolist/Todolist';

function App() {

  const [error, setError] = useState<boolean>(false)


  let [infoArr, setInfoArr] = useState(
    [
      { id: v1(), title: 'HTML & CSS', isDone: true },
      { id: v1(), title: 'JavaScript', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'Angular', isDone: false },
      { id: v1(), title: 'BackEnd', isDone: false },
    ])
  let [myTasks, setmyTasks] = useState(
    [
      { id: v1(), title: 'Купить хлеб', isDone: false },
      { id: v1(), title: 'Купить молоко', isDone: false },
      { id: v1(), title: 'Купить сыр', isDone: false },
      { id: v1(), title: 'Купить масло', isDone: false },
      { id: v1(), title: 'Убрать квартиру', isDone: false },
      { id: v1(), title: 'Сделать уроки', isDone: false },
    ])

  const removeMyTask = (id: string) => {
    setmyTasks(myTasks.filter(el => el.id !== id))
  }

  const removeTask = (id: string) => {
    setInfoArr(infoArr.filter(el => el.id !== id))
  }

  const callBackInput = (title: string) => {
    if (title.length > 0) {
      let newTask = { id: v1(), title: title, isDone: false }
      setmyTasks([newTask, ...myTasks])
    } else {
      setError(true)
    }


  }

  const changeStatusCheckBox = (infoId: string, newIsDone: boolean) => {
    setInfoArr(infoArr.map(el => el.id === infoId ? { ...el, isDone: newIsDone } : el))
  }

  const changeStatusMyToDo = (taskId: string, newIsDone: boolean) => {
    setmyTasks(myTasks.map(task => task.id === taskId ? { ...task, isDone: newIsDone } : task))
  }

  return (
    <div className="App">
      <Todolist changeStatusCheckBox={changeStatusCheckBox} infoArr={infoArr} callBack={removeTask} title={"What to learn"} />
      <MyTodoList name={'Список дел'} setError={setError}
        error={error} changeStatusMyToDo={changeStatusMyToDo}
        callBackInput={callBackInput} removeMyTask={removeMyTask}
        myTasks={myTasks} />
    </div>
  );
}

export default App;
