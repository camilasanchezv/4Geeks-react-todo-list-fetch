import React from "react";
import { any, number, string } from "prop-types";

import "./styles.scss";

export default function Todo({ todo, id, list, setList }) {
	const handleDelete = () => {
		setList(list.filter((element, index) => index !== id));
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
	setList: any
};
