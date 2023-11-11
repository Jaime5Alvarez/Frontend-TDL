import { useState } from "react";

import { useGetTodos } from "../hooks/getTodos";
import { AddTodoIcon } from "../icons/AddTodo";
import { toast } from "react-toastify";
import { http } from "../../services/http/http";
import { AxiosError } from "axios";
import { ErrorBody, Todos } from "../../models/models";
import { LoadingSpinner } from "../gif/LoadingSpinner";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { ModalAddTask, ModalEditTask } from "../modals/modal";

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
      Date: date.toISOString().split("T")[0],
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
    setInputForm({
      ...inputForm,
      Date: newDate.toISOString().split("T")[0],
    });
  };
  const removeDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
    setInputForm({
      ...inputForm,
      Date: newDate.toISOString().split("T")[0],
    });
  };
  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
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
      <ModalEditTask
        editModal={editModal}
        HandleSubmitEditTask={HandleSubmitEditTask}
        setEditModal={setEditModal}
        handleChangeTaskForm={handleChangeTaskForm}
        inputForm={inputForm}
        HandleDeleteTodo={HandleDeleteTodo}
        setInputForm={setInputForm}
      />

      <ModalAddTask
        modal={modal}
        resetInputForm={resetInputForm}
        HandleSubmitAddTask={HandleSubmitAddTask}
        setModal={setModal}
        handleChangeTaskForm={handleChangeTaskForm}
        inputForm={inputForm}
      />

      <button
        onClick={() => setModal((prev) => !prev)}
        className="absolute bottom-6 duration-200 ease-in-out right-8 z-10 hover:scale-110 bg-white text-blue-800 rounded-full px-2 py-2"
      >
        <AddTodoIcon className="w-8 h-8" />
      </button>

      <section className=" flex justify-center translate-y-5 w-full ">
        <div className="bg-white drop-shadow-2xl translate-y-20 w-8/12 rounded-lg p-5 text-center  ">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={date}
            todayButton="Today"
            onChange={handleDateChange}
            className={`${
              date.toDateString() === new Date().toDateString() && "bg-gray-200"
            } font-bold text-xl flex w-full justify-center text-center rounded-lg px-2 cursor-pointer mb-2 `}
          />
          <div className="flex justify-around items-center  mb-3">
            <button
              onClick={removeDay}
              className="bg-blue-800 rounded-full font-extrabold duration-200 hover:opacity-90 ease-in-out text-white px-3 py-1 "
            >
              -
            </button>

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
                        todo.completed && "line-through bg-gray-500 "
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
