import { apiInstance } from '@/services/base'

const BASE_URL = '/footer-menu'

const FooterService = {
  GetList(params: any) {
    return apiInstance.get(`${BASE_URL}`, { params });
  },

}



export default FooterService


