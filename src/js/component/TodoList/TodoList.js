import React, { useState, useEffect } from "react";

import Todo from "./Todo";
import "./styles.scss";

export default function TodoList() {
	const [list, setList] = useState([]);
	const [newTodo, setNewTodo] = useState();
	const url = "https://assets.breatheco.de/apis/fake/todos/user/camila";

	const addTodo = async () => {
		if (newTodo) {
			const todo = {
				label: newTodo,
				done: false
			};

			fetch(url, {
				method: "PUT",
				body: JSON.stringify([...list, todo]),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then()
				.then(response => {
					if (response.ok) {
						setList([...list, todo]);
						setNewTodo("");
					} else alert("Oops! We cant add the task by the moment.");
				})
				.catch(() =>
					alert("Oops! We cant add the task by the moment.")
				);
		}
	};

	const getList = async () => {
		let response = await (
			await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			})
		).json();
		setList(response);
	};

	const create = async () => {
		await fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		});
	};

	const clean = async () => {
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then()
			.then(response => {
				{
					if (response.ok) {
						setList([]);
						create();
					} else
						alert(
							"Oops! We cant delete the task list by the moment."
						);
				}
			})
			.catch(() =>
				alert("Oops! We cant delete the task list by the moment.")
			);
	};

	useEffect(() => {
		getList();
	}, []);

	return (
		<>
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
							todo={todo.label}
							list={list}
							setList={setList}
							clean={clean}
						/>
					))}
				</div>
				<p>{list.length}</p>
			</div>
			<button onClick={clean}>clean</button>
		</>
	);
}
