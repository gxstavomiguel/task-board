import { Task } from '../features/task/model/task.model';

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Ir na academia',
    isCompleted: false,
    categoryId: '5',
  },
  {
    id: '2',
    title: 'Estudar Angular',
    isCompleted: true,
    categoryId: '4',
  },
];

export const task: Task = {
  id: '4',
  title: 'Ler um livro',
  isCompleted: true,
  categoryId: '2',
};

export const TASK_INTERNAL_SERVER_ERROR_RESPONSE: {
  status: number;
  statusText: string;
} = {
  status: 500,
  statusText: 'Internal Server Error',
};

export const TASK_UNPROCESSIBLE_ENTITY_RESPONSE: {
  status: number;
  statusText: string;
} = {
  status: 422,
  statusText: 'Unprocessable Entity',
};

export const TASK_NOT_FOUND_RESPONSE: {
  status: number;
  statusText: string;
} = {
  status: 404,
  statusText: 'Not found',
};
