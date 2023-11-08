import { useState } from "react";

import { useGetTodos } from "../hooks/getTodos";
import { AddTodoIcon } from "../icons/AddTodo";
import { toast } from "react-toastify";
import { Modal } from "../modals/modal";
import { http } from "../../services/http/http";
import { AxiosError } from "axios";
import { ErrorBody, Todos } from "../../models/models";
import { LoadingSpinner } from "../gif/LoadingSpinner";

export const TodoView = () => {
  const { todos, setTodos, loading } = useGetTodos();

  const [date, setDate] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [inputForm, setInputForm] = useState({
    id: "",
    NewTask: "",
    Date: "",
    completed: false,
  });
  const handleChangeTaskForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };
  const HandleEditModal = (todo: Todos) => {
    setEditModal(true);
    setInputForm({
      id: todo.id,
      NewTask: todo.title,
      Date: todo.date.split("T")[0],
      completed: todo.completed,
    });
  };
  const resetInputForm = () => {
    setInputForm({
      id: "",
      NewTask: "",
      Date: "",
      completed: false,
    });
  };
  const HandleDeleteTodo = async (id: string) => {
    const Toastid = toast.loading("Loading...");
    try {
      const res = await http.deleteTodo(id);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id != id);
      });
      toast.update(Toastid, {
        render: res.data.message,
        type: "success",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } catch (e: unknown) {
      const error = e as AxiosError<ErrorBody>;
      const responseError = error.response?.data;
      const errorMessage = responseError?.message || "An error occurred.";
      toast.update(Toastid, {
        render: errorMessage,
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } finally {
      setEditModal(false);
    }
  };
  const HandleSubmitEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date(inputForm.Date).toISOString();
    const id = inputForm.id;
    const Toastid = toast.loading("Loading...");
    const title = inputForm.NewTask;
    const completed = inputForm.completed;

    try {
      const res = await http.editTodo({ id, date, title, completed });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            // Replace the existing task with the updated one
            return res.data.todo;
          }
          return todo;
        });
      });
      toast.update(Toastid, {
        render: res.data.message,
        type: "success",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } catch (e: unknown) {
      const error = e as AxiosError<ErrorBody>;
      const responseError = error.response?.data;
      const errorMessage = responseError?.message || "An error occurred.";
      toast.update(Toastid, {
        render: errorMessage,
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } finally {
      setEditModal(false);
    }
  };
  const HandleSubmitAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date(inputForm.Date).toISOString();
    const Toastid = toast.loading("Loading...");
    const title = inputForm.NewTask;

    try {
      const res = await http.addTodo({ title, date });
      toast.update(Toastid, {
        render: res.data.message,
        type: "success",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
      setTodos((prev) => [...prev, res.data.todo]);
    } catch (e: unknown) {
      const error = e as AxiosError<ErrorBody>;
      const responseError = error.response?.data;
      const errorMessage = responseError?.message || "An error occurred.";
      toast.update(Toastid, {
        render: errorMessage,
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } finally {
      setModal(false);
    }
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

  if (loading) {
    return (
      <>
        <section className=" flex justify-center h-screen items-center  ">
          <LoadingSpinner className="w-10 h-10" />
        </section>
      </>
    );
  }
  return (
    <>
      {editModal && (
        <Modal setClose={setEditModal}>
          {" "}
          <form className="" onSubmit={HandleSubmitEditTask}>
            <h3 className="text-blue-800 text-xl font-bold">EDIT A TASK</h3>
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
            <div className="flex items-start mt-2 mb-1">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  checked={inputForm.completed} // Use 'checked' to determine the state of the checkbox
                  onChange={(e) => {
                    setInputForm({
                      ...inputForm,
                      completed: e.target.checked, // Update 'completed' based on the checkbox state
                    });
                  }}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                />
              </div>
              <label className="ml-2 text-sm font-medium text-gray-900 ">
                Completed
              </label>
            </div>
            <button
              type="submit"
              className="w-full mt-2 text-white bg-blue-800 hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Save
            </button>
            <button
              onClick={() => HandleDeleteTodo(inputForm.id)}
              type="button"
              className="w-full mt-2 text-white bg-red-800 hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Delete
            </button>
          </form>
        </Modal>
      )}
      {modal && (
        <Modal setClose={setModal} onOpen={resetInputForm}>
          <form className="" onSubmit={HandleSubmitAddTask}>
            <h3 className="text-blue-800 text-xl font-bold">ADD A TASK</h3>
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
                    <h5
                      onClick={() => HandleEditModal(todo)}
                      className={`bg-blue-800 mx-5 duration-200 hover:opacity-90 ease-in-out text-sm cursor-pointer text-white flex justify-center  items-center py-1 rounded-full ${
                        todo.completed && "line-through "
                      }`}
                    >
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
