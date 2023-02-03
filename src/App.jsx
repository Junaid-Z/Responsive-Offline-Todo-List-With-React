import { useState } from 'react';
import './App.css';
import "./Resources/style.css"

function App() {
	let [todos, setTodos] = useState([]);
	let [text, setText] = useState("");
	return (
		<div className="App">
			<header className="App-header">
				<div className="todoList">
					{todos.map((todo, i) => {
						return (
							<div className="todoItem" key={i}>
								{
									(todo.confirmed && <div className='todoText'>{todo.text}</div>)
									||
									(<input className='todoText' value={todo.newValue} onChange={(e) => {
										todos[i].newValue = e.target.value;
										setTodos([...todos]);
									}
									}></input>)
								}
								<div className='todoOptions'>
									{
										(todos[i].confirmed
											&&
											<button onClick={(e) => {
												todos[i].confirmed = false;
												todos[i].newValue = todos[i].text;
												setTodos([...todos]);
											}
											}>Edit
											</button>
										)
										||
										(
											<button onClick={() => {
												todos[i].text = todos[i].newValue;
												todos[i].confirmed = true;
												setTodos([...todos]);
											}
											}>Update</button>
										)
									}
									{
										(todos[i].confirmed
											&&
											<button onClick={() => {
												todos.splice(i, 1);
												setTodos([...todos]);
											}
											}>Delete</button>
										)
										||
										(
											<button onClick={() => {
												todos[i].confirmed = true;
												todos[i].newValue = "";
												setTodos([...todos]);
											}
											}>Cancel Update</button>
										)
									}
								</div>
							</div>
						);
					})}
				</div>
				<form className="buttonHolder" onSubmit={
					(e) => {
						if (text) {
							todos.push({
								text: text,
								confirmed: true,
								newValue: "",
							});
							setTodos([...todos]);
							setText("");
						}
						e.preventDefault();
					}
				}>
					<input type="text" onChange={(e) => { setText(e.target.value) }} value={text} />
					<button>Add !</button>
				</form>
			</header>
		</div>
	);
}

export default App;
