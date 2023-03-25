import { ChangeEvent, useState } from 'react';
import s from './Todolist.module.css';

type TodolistPropsType = {
	infoArr: infoArrType[]
	callBack: (id: string) => void
	changeStatusCheckBox: (infoId: string, newIsDone: boolean) => void
	title: string
}

type infoArrType = {
	id: string
	title: string
	isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {


	let [filterName, setFilterName] = useState('All');

	const filterToDo = (name: string) => {
		setFilterName(name)
	}

	let filteredArr = props.infoArr;
	if (filterName === 'Active') {
		filteredArr = props.infoArr.filter(el => !el.isDone)
	}
	if (filterName === 'Completed') {
		filteredArr = props.infoArr.filter(el => el.isDone)
	}

	const ElementLi = filteredArr.map(el => {
		const removeInfoTask = () => {
			props.callBack(el.id)
		}
		const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
			props.changeStatusCheckBox(el.id, e.currentTarget.checked)
		}
		return (

			<li key={el.id}>
				<input onChange={changeStatus} type={'checkbox'} checked={el.isDone} />
				{el.title}
				<button onClick={removeInfoTask}>✖️</button>
			</li>
		)
	})

	return (
		<div className={s.todoList}>
			<h2>{props.title}</h2>
			<ul>
				{ElementLi}
			</ul>
			<button onClick={() => filterToDo('All')}>All</button>
			<button onClick={() => filterToDo('Active')}>Active</button>
			<button onClick={() => filterToDo('Completed')}>Completed</button>
		</div>
	)
}