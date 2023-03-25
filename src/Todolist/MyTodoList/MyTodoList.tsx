import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import s from './myTodoList.module.css'

type PropsType = {
	myTasks: TaskPropsType[]
	removeMyTask: (id: string) => void
	callBackInput: (title: string) => void
	changeStatusMyToDo: (taskId: string, newIsDone: boolean) => void
}

type TaskPropsType = {
	id: string
	title: string
	isDone: boolean
}


export const MyTodoList = (props: PropsType) => {
	let [filterName, setFilterName] = useState<string>('All')
	let [title, setTitle] = useState('')

	const filterTasks = (name: string) => {
		setFilterName(name)
	}

	let filteredTasks = props.myTasks
	if (filterName === 'Active') {
		filteredTasks = props.myTasks.filter(el => !el.isDone)
	}
	if (filterName === 'Completed') {
		filteredTasks = props.myTasks.filter(el => el.isDone)
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const addTask = (title: string) => {
		props.callBackInput(title)
		setTitle('')
	}
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addTask(title)
		}
	}



	const element = filteredTasks.map(el => {
		const removeMyTask = () => {
			props.removeMyTask(el.id)
		}
		const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
			props.changeStatusMyToDo(el.id, e.currentTarget.checked)
		}
		return (
			<li key={el.id}>
				<input onChange={changeStatus} type="checkbox" checked={el.isDone} />
				{el.title}
				<button onClick={removeMyTask}> ✖️ </button>
			</li>
		)
	})
	return (
		<div className={s.wrapMyTodo}>
			<h4>Список дел</h4>
			<input value={title} onKeyDown={onKeyDownHandler} onChange={onChangeHandler} />
			<button onClick={() => addTask(title)}>Add</button>
			<ul>
				{element}
			</ul>
			<button onClick={() => filterTasks('All')}>All</button>
			<button onClick={() => filterTasks('Active')}>Active</button>
			<button onClick={() => filterTasks('Completed')}>Completed</button>
		</div>
	)
}

