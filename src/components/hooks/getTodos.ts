import { useEffect, useState } from "react";
import { Todos } from "../../models/models";
import { http } from "../../services/http/http";

export const useGetTodos = () => {
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

  return { todos };
};
