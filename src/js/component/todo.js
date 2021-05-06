import React, { useState, useRef } from "react";

const ToDo = () => {
	const [newTask, setNewTask] = useState("");
	const [toDoList, setToDoList] = useState(["test1", "test2", "test3"]);
	const refRemove = useRef(null);

	const add = e => {
		e.preventDefault();
		setToDoList(prev => [...prev, newTask]);
		setNewTask("");
	};

	const remove = index => e => {
		setToDoList(prev => prev.filter((item, i) => i != index));
	};

	return (
		<div className="container d-flex justify-content-center ">
			<div>
				<h1 className="text-center">ToDo</h1>
				<a className="sr-only" href="#content">
					Skip to main content
				</a>
				<div className="card" style={{ width: "18rem" }}>
					<ul className="list-group list-group-flush">
						<li className="list-group-item p-0">
							<form onSubmit={add}>
								<div className="form-row ">
									<div className="col-9">
										<input
											type="text"
											className="form-control border-light"
											placeholder="No tasks, add a task"
											value={newTask}
											onChange={e =>
												setNewTask(e.target.value)
											}></input>
									</div>
									<div className="col">
										<button className="btn btn-light text-black-50">
											Add
										</button>
									</div>
								</div>
							</form>
						</li>
						{toDoList.map((item, index) => (
							<li className="list-group-item" key={index}>
								<div className="d-flex justify-content-between p-0">
									<p className="m-0">{item}</p>
									<i
										className="fas fa-times text-muted"
										onClick={remove(index)}></i>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ToDo;
