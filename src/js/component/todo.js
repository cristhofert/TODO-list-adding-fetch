import React, { useState, useEffect } from "react";

const ToDo = () => {
	const [newTask, setNewTask] = useState("");
	const [toDoList, setToDoList] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const add = e => {
		e.preventDefault();
		setToDoList(prev => [...prev, { label: newTask, done: false }]);
		setNewTask("");
		updateData(toDoList);
	};

	const remove = index => e => {
		setToDoList(prev => prev.filter((item, i) => i != index));
	};

	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/cristhofert")
			.then(res => res.json())
			.then(data => setToDoList(data))
			.catch(error => console.log(error, "ERROR"));
	};

	const updateData = items => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/cristhofert", {
			method: "PUT",
			body: JSON.stringify(items),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => console.log(data.result))
			.catch(err => console.log(err, "PUT ERROR!"));
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
						{toDoList.length === 0 ? (
							<li className="list-group-item">Cargando...</li>
						) : (
							toDoList.map((item, index) => (
								<li className="list-group-item" key={index}>
									<div className="d-flex justify-content-between p-0">
										<p className="m-0">{item.label}</p>
										<i
											className="fas fa-times text-muted"
											onClick={remove(index)}></i>
									</div>
								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ToDo;
