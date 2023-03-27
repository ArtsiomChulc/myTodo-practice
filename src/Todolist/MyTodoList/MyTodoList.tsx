import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import s from './myTodoList.module.css'

type PropsType = {
	name: string
	myTasks: TaskPropsType[]
	removeMyTask: (id: string) => void
	callBackInput: (title: string) => void
	changeStatusMyToDo: (taskId: string, newIsDone: boolean) => void
	error: boolean
	setError: (x: boolean) => void
}

type TaskPropsType = {
	id: string
	title: string
	isDone: boolean
}


export const MyTodoList: React.FC<PropsType> = (
	{
		name,
		myTasks,
		removeMyTask,
		callBackInput,
		...restProps
	}
) => {

	let [filterName, setFilterName] = useState<string>('All')
	let [title, setTitle] = useState('')

	const styleEroorBlock = `${restProps.error ? s.errorBlock : ''}`
	const elementErrorBlock = restProps.error && <div className={styleEroorBlock}>Введите задачу...</div>

	const filterTasks = (name: string) => {
		setFilterName(name)
	}

	let filteredTasks = myTasks
	if (filterName === 'Active') {
		filteredTasks = myTasks.filter(el => !el.isDone)
	}
	if (filterName === 'Completed') {
		filteredTasks = myTasks.filter(el => el.isDone)
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
		restProps.error && restProps.setError(false)
	}

	const addTask = (title: string) => {
		const titleTrim = title.trim()
		callBackInput(titleTrim)
		setTitle('')
	}
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addTask(title)
		}
	}





	const element = filteredTasks.map(el => {
		const removeMyTaskCB = () => {
			removeMyTask(el.id)
		}
		const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
			restProps.changeStatusMyToDo(el.id, e.currentTarget.checked)
		}
		return (
			<li key={el.id}>
				<input onChange={changeStatus} type="checkbox" checked={el.isDone} />
				{el.title}
				<button onClick={removeMyTaskCB}> ✖️ </button>
			</li>
		)
	})
	return (
		<div className={s.wrapMyTodo}>
			<h2>{name}</h2>
			<input value={title} onKeyDown={onKeyDownHandler} onChange={onChangeHandler} />
			<button disabled={title.length === 0} onClick={() => addTask(title)}>Add</button>
			{elementErrorBlock}
			<ul>
				{element}
			</ul>
			<button className={filterName === 'All' ? s.activeBtn : ''} onClick={() => filterTasks('All')}>All</button>
			<button className={filterName === 'Active' ? s.activeBtn : ''} onClick={() => filterTasks('Active')}>Active</button>
			<button className={filterName === 'Completed' ? s.activeBtn : ''} onClick={() => filterTasks('Completed')}>Completed</button>
		</div>
	)
}

