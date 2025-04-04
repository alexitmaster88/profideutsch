import { apiInstanceErp } from '@/services/base'

const GetCountService = {
   CallCenterIntegration() {
      return apiInstanceErp.get(`CallCenterIntegration/GetCount`);
   },
   AppealApplication() {
      return apiInstanceErp.get(`AppealApplication/GetCount`);
   },
   MemshipCertificate() {
      return apiInstanceErp.get(`Memship/MemshipCertificate/GetCount`);
   },
}

export default GetCountService


