import { apiInstanceErp } from '@/services/base'

const BASE_URL = '/Report'

const CharterMembersRegisterReport = {
   GetCharterMembersRegisterReportForChamber(data: any) {
      return apiInstanceErp.post(`${BASE_URL}/GetCharterMembersRegisterReportForChamber`, data);
   }
}

export default CharterMembersRegisterReport


