import { apiInstance } from '@/services/base'

const BASE_URL = '/additional-links'

const AdditionalLinkService = {
  GetList(params: any) {
    return apiInstance.get(`${BASE_URL}`, {
      params: {
        ...{
          sort: "orderCode:ASC",
        },
        ...params
      }
    });
  }
}



export default AdditionalLinkService


