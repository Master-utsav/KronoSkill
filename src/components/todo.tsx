"use client"
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SortableEvent } from "react-sortablejs";
import Sortable from 'sortablejs';
import { TbEqual } from "react-icons/tb";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodo,
  updateTodoOrder,
} from "../utils/todoSlice";
import { Button } from "./ui/moving-border";
import { Input } from "./ui/input";
import { LabelInputContainer } from "./ui/LabelInputContainer";
import CheckBox from "./ui/CheckBox";

interface Todo {
  completed: boolean | undefined;
  id: string;
  text: string;
}

interface TodoState {
  todos: Todo[];
}


const Todo: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [input, setInput] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const dispatch = useDispatch();
  const todos = useSelector((state: TodoState) => state.todos);
  const todoListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
  if (todoListRef.current) {
    const sortable = new Sortable(todoListRef.current, {
      animation: 150,
      ghostClass: 'ghost',
      chosenClass: 'chosen',
      dragClass: 'dragging',
      onEnd: (evt: SortableEvent) => {
        const oldIndex = evt.oldIndex as number;
        const newIndex = evt.newIndex as number;
        if (oldIndex !== undefined && newIndex !== undefined) {
          const todosCopy = [...todos].map((todo) => ({
            ...todo,
            completed: todo.completed ?? false, // Ensure completed is always a boolean value
          }));
          const [removed] = todosCopy.splice(oldIndex, 1);
          todosCopy.splice(newIndex, 0, removed);
          dispatch(updateTodoOrder(todosCopy));
        }
      },
    });
    return () => {
      sortable.destroy();
    };
  }
}, [todos, dispatch, todoListRef]);

  const addTodoHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleEditTodo = (id: string, text: string) => {
    setEditingTodoId(id);
    setEditingText(text);
  };

  const handleSaveTodo = (id: string) => {
    if (editingText.trim() !== "") {
      dispatch(updateTodo({ id, text: editingText }));
      setEditingTodoId(null);
      setEditingText("");
    }
  };

  return (
    
    <div className={`pl-2 pr-2 h-[80%] fixed bg-black/5 backdrop-blur-md rounded-2xl scroll-smooth  flex overflow-y-auto  z-50 max-w-[40%] min-w-[20%]  scrollbar-thin scrollbar-thumb-green-600/80 scrollbar-track-indigo-200 scrollbar-corner-transparent ${visible? "animate-slidein top-0 right-0" : "animate-slideout top-0 -right-20 opacity-0 "}`} style={{WebkitBackdropFilter: "blur(10px)"}}>
      <div className=" p-2 rounded shadow-lg relative mt-2 backdrop-blur-lg">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex  mb-4 gap-2 relative w-[100%]">
          <div className="flex flex-grow w-[70%] relative">
            <LabelInputContainer>
              <Input
                type="text"
                value={input}
                className="h-12  bg-transparent"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a new todo"
              />
            </LabelInputContainer>
          </div>
          <Button
            borderClassName="bg-[radial-gradient(var(--cyan-500)_40%,transparent_80%)]"
            className="bg-white text-center  flex-1  dark:bg-slate-900/40 text-md h-12 w-24  text-black dark:text-white border-neutral-200 dark:border-slate-800"
            onClick={addTodoHandler}
          >
            Add
          </Button>
        </div>
        <ul
          ref={todoListRef}
          className="w-[100%] mx-auto flex flex-col justify-start items-center  relative"
        >
          {todos.map((todo: Todo , idx:number) => (
            <li
              key={todo.id || idx}
              className="mb-2 w-[100%] flex justify-between items-center space-y-2"
              draggable="true"
            >
              <div
                className={`flex text-md justify-start w-[80%]  items-center content-start  mx-auto ${
                  todo.completed && "line-through"
                }`}
              >
                <TbEqual className="mr-2 text-2xl text-white/30 font-light cursor-grab" />
                <CheckBox
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                {editingTodoId === todo.id ? (
                  <textarea
                    autoFocus={true}
                    className="w-[100%] text-start bg-transparent text-md text-white focus:outline-none pl-2 focus:border-l-2 focus:border-white/30 "
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  />
                ) : (
                  <span
                    className={`w-[100%] text-start ${
                      todo.completed && "text-white/60"
                    }`}
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {todo.text}
                  </span>
                )}
              </div>
              <div className="flex text-xl justify-end items-center content-end gap-2 ml-2">
                {!todo.completed ? (
                  editingTodoId === todo.id ? (
                    <Button
                      borderClassName="bg-[radial-gradient(var(--green-500)_40%,transparent_80%)]"
                      className="bg-white text-center  flex-1  dark:bg-slate-900/40 text-sm h-8 w-16  text-black dark:text-white border-neutral-200 dark:border-slate-800"
                      onClick={() => handleSaveTodo(todo.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      borderClassName="bg-[radial-gradient(var(--yellow-500)_40%,transparent_80%)]"
                      className="bg-white text-center  flex-1  dark:bg-slate-900/40 text-sm h-8 w-16  text-black dark:text-white border-neutral-200 dark:border-slate-800"
                      onClick={() => handleEditTodo(todo.id, todo.text)}
                    >
                      Edit
                    </Button>
                  )
                ) : (
                  ""
                )}
                <Button
                  borderClassName="bg-[radial-gradient(var(--red-500)_40%,transparent_80%)]"
                  className="bg-white text-center  flex-1  dark:bg-slate-900/40 text-sm h-8 w-20  text-black dark:text-white border-neutral-200 dark:border-slate-800"
                  onClick={() => handleRemoveTodo(todo.id)}
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
