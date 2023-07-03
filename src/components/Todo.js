import React from "react";
import "./Todo.css";
import Cross from "./images/icon-cross.svg";

const Todo = (props) => {
    // const localStyle =
    //     document.querySelector(".todos-checkbox").checked === true
    //         ? {
    //               textDecoration: "line-through",
    //               color: "hsl(233, 11%, 84%)",
    //           }

    // const handleDelete = () => {

    // }

    return (
        <section className="todos-input-cont">
            <label className="todos-checkbox-cont">
                <input
                    className="todos-checkbox"
                    type="checkbox"
                    checked={props.complete}
                    onChange={props.editTodo}
                    name="complete"
                />
                {/* <span className="todos-checkmark"></span> */}
            </label>
            <input
                className="todos-input"
                type="text"
                placeholder="Create a new todo..."
                value={props.todo}
                autoComplete="off"
                // autoCorrect="off"
                spellCheck="false"
                onChange={props.editTodo}
                name="todo"
            />
            <button className="todos-btn" onClick={props.deleteTodo}>
                <img src={Cross} alt="detele" />
            </button>
        </section>
    );
};

export default Todo;
