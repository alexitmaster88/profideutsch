import { apiInstance } from '@/services/base'
import { type AxiosRequestConfig } from 'axios';

const BASE_URL = '/news-tags'

const NewsTagService = {
   GetList(params: any) {
      return apiInstance.get(`${BASE_URL}`, {
         params: {
            ...{
               sort: "id:ASC",
            },
            ...params
         }
      });
   },
   Get(id: number, config?: AxiosRequestConfig<any>) {
      return apiInstance.get(`${BASE_URL}/${id}`, config);
   },
}



export default NewsTagService


