import React, { useState, useEffect } from "react";

import Todo from "./Todo";
import "./styles.scss";

export default function TodoList() {
	const [list, setList] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [length, setLength] = useState(0);

	const addTodo = () => {
		if (newTodo) {
			setList([...list, newTodo]);
			setNewTodo("");
		}
	};

	useEffect(() => {
		setLength(list.length);
	}, [list]);

	return (
		<div className="todo-list">
			<input
				className="input"
				value={newTodo}
				onChange={e => setNewTodo(e.target.value)}
				placeholder="write here..."
			/>
			<button onClick={addTodo} className="add">
				+
			</button>
			<div className="list">
				{list.map((todo, index) => (
					<Todo
						key={index + todo}
						id={index}
						todo={todo}
						list={list}
						setList={setList}
					/>
				))}
			</div>
			<p>{length}</p>
		</div>
	);
}
