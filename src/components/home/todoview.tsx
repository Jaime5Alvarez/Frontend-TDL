import { useState } from "react";

import { useGetTodos } from "../hooks/getTodos";
import { AddTodoIcon } from "../icons/AddTodo";

import { Modal } from "../modals/modal";
import { http } from "../../services/http/http";

export const TodoView = () => {
  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const { todos, setTodos } = useGetTodos();
  const [inputForm, setInputForm] = useState({
    NewTask: "",
    Date: "",
  });
  const handleChangeTaskForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };
  const resetInputForm = () => {
    setInputForm({
      NewTask: "",
      Date: "",
    });
  };
  const HandleSubmitAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = inputForm.NewTask;
    const date = new Date(inputForm.Date).toISOString();
    const res = await http.addTodo({ title, date });
    setTodos((prev) => [...prev, res.todo]);
  };
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
      {modal && (
        <Modal setClose={setModal} onOpen={resetInputForm}>
          <form className="" onSubmit={HandleSubmitAddTask}>
            <h3 className="text-blue-800 text-xl font-bold1">ADD A TASK</h3>
            <hr />
            <div className="mt-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Your new task
              </label>
              <input
                onChange={handleChangeTaskForm}
                value={inputForm.NewTask}
                type="text"
                name="NewTask"
                placeholder="New task"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
              />
            </div>
            <div className="mt-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Date
              </label>
              <input
                onChange={handleChangeTaskForm}
                value={inputForm.Date}
                type="date"
                name="Date"
                placeholder="New date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 text-white bg-blue-800 hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Save
            </button>
          </form>
        </Modal>
      )}

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
              className="bg-blue-800 rounded-full font-extrabold duration-200 hover:opacity-90 ease-in-out text-white px-3 py-1 "
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
              className="bg-blue-800 rounded-full font-extrabold duration-200 hover:opacity-90 ease-in-out text-white px-3 py-1 "
            >
              +
            </button>
          </div>
          <div className="flex flex-col max-h-72 overflow-y-auto gap-2">
            {filteredTodos.length === 0 ? (
              <h5 className=" text-sm cursor-pointer text-gray-600 font-semibold flex justify-center  items-center py-1 rounded-full">
                No tasks for this day
              </h5>
            ) : (
              filteredTodos.map((todo) => {
                return (
                  <div key={todo.id}>
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
