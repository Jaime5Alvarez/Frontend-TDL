import { useEffect, useState } from "react";
import { Todos } from "../../models/models";
import { http } from "../../services/http/http";

export const useGetTodos = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    try {
      setLoading(true);
      const response = await http.getTodos();
      setTodos(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  return { todos, setTodos, loading };
};
