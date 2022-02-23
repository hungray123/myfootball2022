import { apiClient } from 'api/APIClient';
import { createAppError } from 'utils/Utils';
import { DashboardChartResponse } from 'app/type';
import API_METHOD from 'constants/api';

interface IRequestParam {
  rmCode?: string;
  businessDate: string;
  divisionCode: string;
}

export const dashboardApi = {
  fetchChartData(params: IRequestParam): Promise<DashboardChartResponse> {
    return new Promise<DashboardChartResponse>((resolve, reject) => {
      apiClient
        .get(API_METHOD.MS_REPORT.DASHBORD_CHART, params, { timeout: 10 * 1000 })
        .then(response => {
          const data = response as DashboardChartResponse;
          resolve(data);
        })
        .catch(err => {
          reject(createAppError('API_ERROR', err as Error));
        });
    });
  },
};
