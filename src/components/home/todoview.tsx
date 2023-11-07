import { useState } from "react";

import { useGetTodos } from "../hooks/getTodos";
import { AddTodoIcon } from "../icons/AddTodo";

export const TodoView = () => {
  const [date, setDate] = useState(new Date());
  const { todos } = useGetTodos();

  const addDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  };
  const removeDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
  };

  const filteredTodos = todos.filter((todo) => {
    const todoDate = new Date(todo.date);
    return todoDate.toDateString() === date.toDateString();
  });

  return (
    <>
      <button className="absolute bottom-6 right-8 z-10 bg-white text-blue-800 rounded-full px-2 py-2">
        <AddTodoIcon className="w-8 h-8" />
      </button>
      <section className=" flex justify-center translate-y-5 w-full ">
        <div className="bg-white drop-shadow-2xl w-8/12 rounded-lg p-5 text-center relative ">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={addDay}
              className="bg-blue-800 rounded-full text-white px-3 py-1 "
            >
              +
            </button>
            <h3
              className={` ${
                date.toDateString() === new Date().toDateString() &&
                "bg-gray-200 "
              } font-bold text-xl rounded-lg px-2 cursor-pointer  mb-2 `}
            >
              {date.toDateString()}
            </h3>
            <button
              onClick={removeDay}
              className="bg-blue-800 rounded-full text-white px-3 py-1 "
            >
              -
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {filteredTodos.length === 0 ? (
              <h5 className=" text-sm cursor-pointer text-gray-600 font-semibold flex justify-center  items-center py-1 rounded-full">
                No tasks for this day
              </h5>
            ) : (
              filteredTodos.map((todo, index) => {
                return (
                  <div key={index}>
                    <h5 className="bg-blue-800 text-sm cursor-pointer text-white flex justify-center  items-center py-1 rounded-full">
                      {todo.title}
                    </h5>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};
