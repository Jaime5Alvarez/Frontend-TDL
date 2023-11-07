import { useEffect, useState } from "react";
import { Todos } from "../../../models/models";
import { http } from "../../../services/http/http";

export const TodoView = () => {
  const [date, setDate] = useState(new Date()); // Establecer la fecha actual
  const [todos, setTodos] = useState<Todos[] | []>([]);
  const getTodos = async () => {
    try {
      const response = await http.getTodos();
      setTodos(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <section>
        <h3>{date.toDateString()}</h3>
        <div>
          {todos.map((todo, index) => {
            return <div key={index}>{todo.title}</div>;
          })}
        </div>
      </section>
    </>
  );
};
