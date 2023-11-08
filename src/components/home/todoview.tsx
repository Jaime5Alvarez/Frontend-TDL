import { useState } from "react";

import { useGetTodos } from "../hooks/getTodos";
import { AddTodoIcon } from "../icons/AddTodo";

import { Modal } from "../modals/modal";

export const TodoView = () => {
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);
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
      <Modal setClose={setModal} close={modal}>
        ssasa
      </Modal>

      <button
        onClick={() => setModal((prev) => !prev)}
        className="absolute bottom-6 duration-200 ease-in-out right-8 z-10 hover:scale-110 bg-white text-blue-800 rounded-full px-2 py-2"
      >
        <AddTodoIcon className="w-8 h-8" />
      </button>

      <section className=" flex justify-center translate-y-5 w-full ">
        <div className="bg-white drop-shadow-2xl translate-y-20 w-8/12 rounded-lg p-5 text-center  ">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={removeDay}
              className="bg-blue-800 rounded-full duration-200 hover:opacity-90 ease-in-out text-white px-3 py-1 "
            >
              -
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
              onClick={addDay}
              className="bg-blue-800 rounded-full duration-200 hover:opacity-90 ease-in-out text-white px-3 py-1 "
            >
              +
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
                    <h5 className="bg-blue-800 duration-200 hover:opacity-90 ease-in-out text-sm cursor-pointer text-white flex justify-center  items-center py-1 rounded-full">
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
