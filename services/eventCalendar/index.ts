import { apiInstance } from '@/services/base'
import { AxiosRequestConfig } from 'axios';

const BASE_URL = '/event-calendars'

const EventCalendarService = {
  GetList(params: any) {
    return apiInstance.get(`${BASE_URL}`, {
      params: {
        ...{
          "filters[startDate][$gte]": new Date(),
          sort: "startDate:DESC",
        },
        ...params
      }
    });
  },
  Get(id: number, config?: AxiosRequestConfig<any>) {
    return apiInstance.get(`${BASE_URL}/${id}`, config);
  },

}



export default EventCalendarService


