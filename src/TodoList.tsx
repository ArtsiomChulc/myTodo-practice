import React, { ChangeEvent, KeyboardEvent, FC, useRef, useState } from 'react';
import { FilterValuesType } from "./App";

// rsc

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, todoListId: string, newIsDone: boolean) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)


    let isAllTasksNotIsDone = true // все не выполенные
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"


    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)

        return (
            <li>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={task.isDone}
                />
                <span
                    className={task.isDone ? "task-done" : "task"}>
                    {task.title}
                </span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const isAddTaskNotPossible: boolean = !title.length || title.length > maxTitleLength || error


    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const removeToDoList = () => props.removeTodoList(props.todoListId)

    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()

    const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <div style={{ color: "red" }}>Title should be shorter</div>
    const longTitleErrorMessage = title.length > maxTitleLength &&
        <div style={{ color: "red", background: "yellow", border: "1px solid red" }}>Title is too long!!!</div>
    const errorMessage = error && <div style={{ color: "red" }}>Title is hard required!</div>


    return (
        <div className={todoClasses}>
            <h3>
                {props.title}
                <button onClick={removeToDoList}>X</button>
            </h3>
            <div>
                <input
                    placeholder="Enter task title, please"
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={error ? "input-error" : ""}
                />
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}
                >+
                </button>
                {longTitleWarningMessage}
                {longTitleErrorMessage}
                {errorMessage}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("all", props.todoListId)
                    }}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("active", props.todoListId)
                    }}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={() => {
                        props.changeTodoListFilter("completed", props.todoListId)
                    }}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;