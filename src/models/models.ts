export interface Todos {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date: string;
}
export type ErrorBody = {
  message: string;
};
