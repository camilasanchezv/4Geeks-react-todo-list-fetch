import React from "react";
import { any, number, string } from "prop-types";

import "./styles.scss";

export default function Todo({ todo, id, list, setList, clean }) {
	const handleDelete = async () => {
		if (list.length === 1) {
			clean();
		} else {
			let auxList = list.filter((element, index) => index !== id);

			const url =
				"https://assets.breatheco.de/apis/fake/todos/user/camila";
			fetch(url, {
				method: "PUT",
				body: JSON.stringify(auxList),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then()
				.then(response => {
					{
						if (response.ok) setList(auxList);
						else
							alert(
								"Oops! We cant delete the task by the moment."
							);
					}
				})
				.catch(() =>
					alert("Oops! We cant delete the task by the moment.")
				);
		}
	};

	return (
		<div className="todo">
			{todo}
			<button className="delete" onClick={handleDelete}>
				x
			</button>
		</div>
	);
}

Todo.propTypes = {
	todo: string,
	id: number,
	list: any,
	setList: any,
	clean: any
};
