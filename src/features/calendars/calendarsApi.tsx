import { apiClient } from 'api/APIClient';
import { CalendarEventResponse, CalendarItem, TodoListResponse } from 'app/type';
import API_METHOD from 'constants/api';
import { createAppError } from 'utils/Utils';

export const calendarApi = {
  getCalendarList(): Promise<Array<CalendarItem>> {
    return new Promise<Array<CalendarItem>>((resolve, reject) => {
      const params = {
        isCalendar: true,
      };
      apiClient
        .get<Array<CalendarItem>>(API_METHOD.MS_ACTIVITY.CALENDAR_EVENT, params)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getTodoList(): Promise<TodoListResponse> {
    return new Promise<TodoListResponse>((resolve, reject) => {
      const params = {
        search: '',
        page: 0,
        type: 'TD',
      };
      apiClient
        .get<TodoListResponse>(API_METHOD.MS_RELATIONSHIP.TODO_LIST, params)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  createCalendarEvent(calendarItem: CalendarItem): Promise<CalendarEventResponse> {
    return new Promise<CalendarEventResponse>((resolve, reject) => {
      apiClient
        .post<CalendarEventResponse>(API_METHOD.MS_ACTIVITY.CALENDAR_EVENT, calendarItem)
        .then(response => {
          const { error } = response;
          if (error) {
            reject(createAppError('API_ERROR', new Error(error)));
          }

          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateCalendarEvent(calendarItem: CalendarItem): Promise<CalendarEventResponse> {
    return new Promise<CalendarEventResponse>((resolve, reject) => {
      apiClient
        .put<CalendarEventResponse>(API_METHOD.MS_ACTIVITY.CALENDAR_EVENT, calendarItem)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deleteCalendarEvent(eventId: string): Promise<CalendarEventResponse> {
    return new Promise<CalendarEventResponse>((resolve, reject) => {
      apiClient
        .delete<CalendarEventResponse>(API_METHOD.MS_ACTIVITY.CALENDAR_EVENT + '/' + eventId)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  completeCalendarEvent(eventId: string): Promise<CalendarEventResponse> {
    return new Promise<CalendarEventResponse>((resolve, reject) => {
      apiClient
        .get<CalendarEventResponse>(API_METHOD.MS_ACTIVITY.COMPLETE_CALENDAR + '/' + eventId)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};
