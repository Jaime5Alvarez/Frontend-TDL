import { useEffect, useState } from "react";
import { http } from "../../../infraestructure/http/http";
import { Todos } from "../../../domain/models";

export const TodoView = () => {
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
      <div>
        {todos.map((todo, index) => {
          return <div key={index}>{todo.title}</div>;
        })}
      </div>
    </>
  );
};
