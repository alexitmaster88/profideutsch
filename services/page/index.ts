import { apiInstance } from '@/services/base'

const BASE_URL = '/pages'

const PageService = {
   GetList(params: any) {
      return apiInstance.get(`${BASE_URL}`, {
         params: {
            ...{
               sort: "createdAt:DESC",
            },
            ...params
         }
      });
   },
   Get(slug: string) {
      return apiInstance.get(`${BASE_URL}/findSlug/${slug}`);
   },
}



export default PageService


