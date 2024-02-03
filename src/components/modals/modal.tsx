import { CrossIcon } from "../buttons/crossIcon";
import { Dialog } from "@mui/material";
import Grow from "@mui/material/Grow";

interface ModalEditTaskProps {
  editModal: boolean;
  HandleSubmitEditTask: (e: React.FormEvent<HTMLFormElement>) => void;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeTaskForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputForm: {
    id: string;
    NewTask: string;
    description:string;
    Date: string;
    completed: boolean;
  };
  HandleDeleteTodo: (id: string) => Promise<void>;
  setInputForm: React.Dispatch<
    React.SetStateAction<{
      id: string;
      NewTask: string;
      description:string;
      Date: string;
      completed: boolean;
    }>
  >;
}
interface AddTaskDialogProps {
  resetInputForm: () => void;
  HandleSubmitAddTask: (e: React.FormEvent<HTMLFormElement>) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeTaskForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputForm: {
    id: string;
    NewTask: string;
    description:string;
    Date: string;
    completed: boolean;
  };
  modal: boolean;
}

export const ModalEditTask = ({
  editModal,
  HandleSubmitEditTask,
  setEditModal,
  handleChangeTaskForm,
  inputForm,
  HandleDeleteTodo,
  setInputForm,
}: ModalEditTaskProps) => {
  return (
    <>
      {" "}
      <Dialog
        fullWidth={true}
        open={editModal}
        TransitionComponent={Grow} // Utilizamos Slide para la transición
      >
        <form className="p-5" onSubmit={HandleSubmitEditTask}>
          <CrossIcon close={setEditModal} />

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
              Description
            </label>
            <input
              onChange={handleChangeTaskForm}
              value={inputForm.description}
              type="text"
              name="description"
              placeholder="Description"
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
      </Dialog>
    </>
  );
};
export const ModalAddTask = ({
  HandleSubmitAddTask,
  inputForm,
  setModal,
  resetInputForm,
  handleChangeTaskForm,
  modal,
}: AddTaskDialogProps) => {
  return (
    <>
      <Dialog
        onTransitionEnter={resetInputForm}
        fullWidth={true}
        open={modal}
        TransitionComponent={Grow}
      >
        <form className="p-5" onSubmit={HandleSubmitAddTask}>
          <CrossIcon close={setModal} />

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
              Description
            </label>
            <input
              onChange={handleChangeTaskForm}
              value={inputForm.description}
              type="text"
              name="description"
              placeholder="Description"
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
      </Dialog>
    </>
  );
};
