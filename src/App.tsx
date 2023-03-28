import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";

// create
// read
// update
// delete
// CRUD operations
// interface => GUI (CLI, VUI, ....)

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [TodoListId: string]: Array<TaskType>
}


function App(): JSX.Element {

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListId_1, title: "What to learn", filter: "all" },
        { id: todoListId_2, title: "What to bye", filter: "all" }
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            { id: v1(), title: "HTML & CSS", isDone: true },
            { id: v1(), title: "CSS & SCSS", isDone: true },
            { id: v1(), title: "ES6/TS", isDone: false },
            { id: v1(), title: "REDUX", isDone: false },
        ],
        [todoListId_2]: [
            { id: v1(), title: "Water", isDone: true },
            { id: v1(), title: "Bread", isDone: true },
            { id: v1(), title: "Salt", isDone: false },
            { id: v1(), title: "Beer", isDone: false },
        ],
    })

    const removeTask = (taskId: string, todoListId: string) => {
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = tasksForUpdate.filter((task: TaskType) => task.id !== taskId)
        const copyTasks = { ...tasks }
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)

        // setTasks(tasks.filter((task) => task.id !== taskId))
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = { id: v1(), title, isDone: false }
        const tasksForUpdate: Array<TaskType> = tasks[todoListId]
        const resultOfUpdate: Array<TaskType> = [newTask, ...tasksForUpdate]
        const copyTasks = { ...tasks }
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)
        // const newTask: TaskType = {
        //     id: v1(), title: title, isDone: false
        // }
        // setTasks([newTask, ...tasks])

        setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] })
    }
    const changeTaskStatus = (taskId: string, todoListId: string, newIsDone: boolean) => {
        setTasks({ ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? { ...t, isDone: newIsDone } : t) })
        // setTasks(tasks.map(t => t.id === taskId ? { ...t, isDone: newIsDone } : t))
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? { ...tl, filter: filter } : tl))

        // setFilter(filter)
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }


    const todoListsComponents = todoLists.map(tl => {
        const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                removeTask={removeTask}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
                removeTodoList={removeTodoList}
            />
        )
    })


    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
