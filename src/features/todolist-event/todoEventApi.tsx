import { apiClient } from 'api/APIClient';
import { TodoEvent, TodoEventResponse } from 'app/type';
import API_METHOD from 'constants/api';

export const todoEventApi = {
  createTodo(todoItem: TodoEvent): Promise<TodoEventResponse> {
    return new Promise<TodoEventResponse>((resolve, reject) => {
      apiClient
        .post<TodoEventResponse>(API_METHOD.MS_ACTIVITY.TODO_EVENT, todoItem)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateTodo(todoItem: TodoEvent): Promise<TodoEventResponse> {
    return new Promise<TodoEventResponse>((resolve, reject) => {
      apiClient
        .put<TodoEventResponse>(API_METHOD.MS_ACTIVITY.TODO_EVENT, todoItem)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deleteTodo(eventId: string): Promise<TodoEventResponse> {
    return new Promise<TodoEventResponse>((resolve, reject) => {
      apiClient
        .delete<TodoEventResponse>(API_METHOD.MS_ACTIVITY.TODO_EVENT + '/' + eventId)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  completeTodo(todoItem: TodoEvent): Promise<TodoEventResponse> {
    return new Promise<TodoEventResponse>((resolve, reject) => {
      apiClient
        .post<TodoEventResponse>(API_METHOD.MS_ACTIVITY.COMPLETE_TODO, todoItem)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};
