import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodo,
} from "../utils/todoSlice";
import { Button } from "./ui/moving-border";
import { Input } from "./ui/input";
import { LabelInputContainer } from "./ui/LabelInputContainer";
import CheckBox from "./ui/CheckBox";

type Todo = {
  completed: boolean | undefined;
  id: string;
  text: string;
};

interface TodoState {
  todos: Todo[];
}

const Todo: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const dispatch = useDispatch();
  const todos = useSelector((state: TodoState) => state.todos);

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
    <div className="h-[80%] fixed top-0 right-0 backdrop-blur-md rounded-2xl bg-gray-100/5 flex  z-50 max-w-[40%] min-w-[20%]">
      <div className=" p-6 rounded shadow-lg relative">
        
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
            borderRadius="1rem"
            borderClassName="bg-[radial-gradient(var(--cyan-500)_40%,transparent_80%)]"
            className="bg-white text-center  flex-1  dark:bg-slate-900/40 text-md h-12 w-24  text-black dark:text-white border-neutral-200 dark:border-slate-800"
            onClick={addTodoHandler}
          >
            Add
          </Button>
        </div>
        <ul className="w-[100%] mx-auto flex flex-col justify-start items-center  relative">
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              className="mb-2 w-[100%] flex justify-between items-center space-y-2"
            >
              <div
                className={`flex text-md justify-start w-[80%]  items-center content-start  mx-auto ${
                  todo.completed && "line-through"
                }`}
              >
                
                <CheckBox
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                  
                
                {editingTodoId === todo.id ? (
                  <textarea
                    autoFocus={true}
                    className="min-w-[100%] text-start bg-transparent text-md text-white focus:outline focus:outline-white/50"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  />
                ) : (
                  <span
                      className={`min-w-[100%] text-start ${todo.completed && "text-white/60"}` }
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
                { !todo.completed ? (editingTodoId === todo.id? (
                  <Button
                    borderRadius="0.75rem"
                    borderClassName="bg-[radial-gradient(var(--green-500)_40%,transparent_80%)]"
                    className="bg-white text-center  flex-1  dark:bg-slate-900/40 text-sm h-8 w-16  text-black dark:text-white border-neutral-200 dark:border-slate-800"
                    onClick={() => handleSaveTodo(todo.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    borderRadius="0.75rem"
                    borderClassName="bg-[radial-gradient(var(--yellow-500)_40%,transparent_80%)]"
                    className="bg-white text-center  flex-1  dark:bg-slate-900/40 text-sm h-8 w-16  text-black dark:text-white border-neutral-200 dark:border-slate-800"
                    onClick={() => handleEditTodo(todo.id, todo.text)}
                  >
                    Edit
                  </Button>
                )) : ""
              }
                
                <Button
                    borderRadius="0.75rem"
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
