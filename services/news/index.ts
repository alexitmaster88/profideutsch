import { apiInstance } from '@/services/base'
import { type AxiosRequestConfig } from 'axios';

const BASE_URL = '/news'

const NewsService = {
   GetList(params: any) {
      return apiInstance.get(`${BASE_URL}`, {
         params: {
            ...{
               "filters[publishDate][$lte]": new Date(),
               sort: "publishDate:DESC",
            },
            ...params
         }
      });
   },
   Get(id: number, config?: AxiosRequestConfig<any>) {
      return apiInstance.get(`${BASE_URL}/${id}`, config);
   },
   updateNewsViewCount(id: number) {
      return apiInstance.post(`${BASE_URL}/updateNewsViewCount/${id}`);
   }
}



export default NewsService


