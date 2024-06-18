import "./App.css";
import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import bgMobileLight from "./images/bg-mobile-light.jpg";
import bgDesktopLight from "./images/bg-desktop-light.jpg";
import moonBtn from "./images/icon-moon.svg";
import Check from "./images/icon-check.svg";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// todo
// drag n drop
// css line through
// dark theme
// animation during add and remove todo
// todos corners

function App() {
    const [todos, setTodos] = useState(() => {
        const data = localStorage.getItem("todos")
            ? JSON.parse(localStorage.getItem("todos"))
            : [];
        return data;
    });
    const [newText, setNewText] = useState("");
    const [newCheck, setNewCheck] = useState(false);
    const [counter, setCounter] = useState(0);
    const [status, setStatus] = useState("all");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));

        setCounter((prev) => {
            prev = todos.length;

            todos.forEach((element) => {
                if (element.complete === true) {
                    prev -= 1;
                }
            });

            return prev;
        });
    }, [todos]);

    const handleChange = (event) => {
        setNewText(event.target.value);
    };

    const handleCheck = () => {
        setNewCheck((prev) => !prev);
    };

    const handleClick = () => {
        if (newText !== "") {
            setTodos((prev) => {
                return [
                    ...prev,
                    {
                        complete: newCheck,
                        todo: newText,
                    },
                ];
            });
            setNewCheck(false);
            setNewText("");
        }
    };

    const editTodo = (index, event) => {
        const newArray = todos.map((n, id) => {
            if (index === id) {
                if (event.target.className === "todos-input") {
                    return { ...n, [event.target.name]: event.target.value };
                } else {
                    return { ...n, [event.target.name]: event.target.checked };
                }
            }
            return n;
        });

        setTodos(newArray);
    };

    const removeTodo = (index) => {
        const removedArray = todos.filter((n, id) => id !== index);

        setTodos(removedArray);

        // setTimeout(() => {
        //     setTodos(removedArray);
        // }, 5000);
    };

    const removeComplete = () => {
        const removedAllArray = todos.filter((n) => n.complete !== true);

        setTodos(removedAllArray);
    };

    const filterTodos = (e) => {
        setStatus(e.target.value);
    };

    const handleDragEnd = (results) => {
        const { source, destination, type } = results;

        if (!destination) return;

        if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        )
            return;

        if (type === "group") {
            const reorderedTodos = [...todos];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
            const [removedTodo] = reorderedTodos.splice(sourceIndex, 1);
            reorderedTodos.splice(destinationIndex, 0, removedTodo);

            setTodos(reorderedTodos);
        }
    };

    return (
        <>
            <section className="app-cont">
                <img
                    src={
                        window.innerWidth > 1024
                            ? bgDesktopLight
                            : bgMobileLight
                    }
                    alt="banner"
                />

                <section className="app">
                    <header>
                        <h1 className="header-title">TODO</h1>
                        <button className="header-btn">
                            <img src={moonBtn} alt="moon button" />
                        </button>
                    </header>

                    <main className="main">
                        {/* create todo input */}
                        <section className="todos-input-cont">
                            <input
                                className="todos-checkbox"
                                type="checkbox"
                                onChange={handleCheck}
                                checked={newCheck}
                            />

                            <input
                                className="todos-input"
                                type="text"
                                placeholder="Create a new todo..."
                                autoComplete="off"
                                // autoCorrect="off"
                                spellCheck="false"
                                onChange={handleChange}
                                value={newText}
                            />
                            <button className="todos-btn" onClick={handleClick}>
                                <img
                                    className="todo-btn-check"
                                    src={Check}
                                    alt="add"
                                />
                            </button>
                        </section>
                        {/* /// */}
                        <section className="todos-cont">
                            {/* drag n drop */}

                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="todos" type="group">
                                    {(provided) => (
                                        <ul
                                            className="todos-list"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {todos.length > 0 &&
                                                todos.map((elem, index) => {
                                                    if (status === "all") {
                                                        return (
                                                            <Draggable
                                                                draggableId={index.toString()}
                                                                key={index}
                                                                index={index}
                                                            >
                                                                {(provided) => (
                                                                    <li
                                                                        className="todos-list-elem"
                                                                        {...provided.dragHandleProps}
                                                                        {...provided.draggableProps}
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                    >
                                                                        <Todo
                                                                            complete={
                                                                                elem.complete
                                                                            }
                                                                            todo={
                                                                                elem.todo
                                                                            }
                                                                            editTodo={(
                                                                                e
                                                                            ) => {
                                                                                editTodo(
                                                                                    index,
                                                                                    e
                                                                                );
                                                                            }}
                                                                            deleteTodo={() => {
                                                                                removeTodo(
                                                                                    index
                                                                                );
                                                                            }}
                                                                        />
                                                                        <hr />
                                                                    </li>
                                                                )}
                                                            </Draggable>
                                                        );
                                                    } else {
                                                        if (
                                                            elem.complete ===
                                                            JSON.parse(status)
                                                        ) {
                                                            return (
                                                                <Draggable
                                                                    draggableId={index.toString()}
                                                                    key={index}
                                                                    index={
                                                                        index
                                                                    }
                                                                >
                                                                    {(
                                                                        provided
                                                                    ) => (
                                                                        <li
                                                                            className="todos-list-elem"
                                                                            {...provided.dragHandleProps}
                                                                            {...provided.draggableProps}
                                                                            ref={
                                                                                provided.innerRef
                                                                            }
                                                                        >
                                                                            <Todo
                                                                                complete={
                                                                                    elem.complete
                                                                                }
                                                                                todo={
                                                                                    elem.todo
                                                                                }
                                                                                editTodo={(
                                                                                    e
                                                                                ) => {
                                                                                    editTodo(
                                                                                        index,
                                                                                        e
                                                                                    );
                                                                                }}
                                                                                deleteTodo={() => {
                                                                                    removeTodo(
                                                                                        index
                                                                                    );
                                                                                }}
                                                                            />
                                                                            <hr />
                                                                        </li>
                                                                    )}
                                                                </Draggable>
                                                            );
                                                        }
                                                    }
                                                })}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            {/* //////////////////////////////////////////////////////////////////// */}

                            {/* <ul className="todos-list">
                                {todos.length > 0 &&
                                    todos.map((elem, i) => {
                                        if (status === "all") {
                                            return (
                                                <li
                                                    className="todos-list-elem"
                                                    key={i}
                                                >
                                                    <Todo
                                                        complete={elem.complete}
                                                        todo={elem.todo}
                                                        editTodo={(e) => {
                                                            editTodo(i, e);
                                                        }}
                                                        deleteTodo={() => {
                                                            removeTodo(i);
                                                        }}
                                                    />
                                                    <hr />
                                                </li>
                                            );
                                        } else {
                                            if (
                                                elem.complete ===
                                                JSON.parse(status)
                                            ) {
                                                return (
                                                    <li
                                                        className="todos-list-elem"
                                                        key={i}
                                                    >
                                                        <Todo
                                                            complete={
                                                                elem.complete
                                                            }
                                                            todo={elem.todo}
                                                            editTodo={(e) => {
                                                                editTodo(i, e);
                                                            }}
                                                            deleteTodo={() => {
                                                                removeTodo(i);
                                                            }}
                                                        />
                                                        <hr />
                                                    </li>
                                                );
                                            }
                                        }
                                    })}
                            </ul> */}
                            <section className="todos-bottom">
                                <span className="todos-bottom-counter">
                                    {`${counter} items left`}
                                </span>
                                <button
                                    onClick={() => {
                                        removeComplete();
                                    }}
                                    className="todos-bottom-btn"
                                >
                                    Clear Completed
                                </button>
                            </section>
                            <section className="todos-filters">
                                <input
                                    type="radio"
                                    id="all"
                                    value="all"
                                    name="status"
                                    defaultChecked
                                    onChange={filterTodos}
                                />
                                <label htmlFor="all">All</label>
                                <input
                                    type="radio"
                                    id="active"
                                    value={false}
                                    name="status"
                                    onChange={filterTodos}
                                />
                                <label value="false" htmlFor="active">
                                    Active
                                </label>
                                <input
                                    type="radio"
                                    id="completed"
                                    value={true}
                                    name="status"
                                    onChange={filterTodos}
                                />
                                <label htmlFor="completed">Completed</label>
                            </section>
                        </section>
                    </main>
                </section>
            </section>
        </>
    );
}

export default App;
