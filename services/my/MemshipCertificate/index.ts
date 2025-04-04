import { apiInstanceMy } from '@/services/base'

const BASE_URL = '/MemshipCertificate'

const MemshipCertificateService = {
   GetByInnPinflForChamber(tin: string) {
      return apiInstanceMy.get(`${BASE_URL}/GetByInnPinflForChamber?innPinfl=${tin}`);
   }
}



export default MemshipCertificateService


