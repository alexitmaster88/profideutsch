export type IPersonDto = {
    pinfl: string,
    inn: string,
    passportSeria: string,
    passportNumber: string,
    passportDate: string,
    passportExpiration: string,
    surnameLatin: string,
    nameLatin: string,
    patronymLatin: string,
    surnameEng: string,
    nameEng: string,
    birthDate: string,
    genderId: number,
    passportDivName: string,
    birthCountryId: number,
    birthDistrictId: number,
    nationalityId: number,
    citizenshipId: number,
    livingRegionId: number,
    livingDistrictId: number,
    pictureId: string,
}


export interface IAppealDto {
    person: IPersonDto | null;
    contractorInn: string;
    docNumber: string;
    phoneNumber: string;
    personFullName: string;
    docOn: string;
    details: string;
    contractorId: number;
    personId: number;
    busyness: true;
    appealTypeId: number | null;
    appealFormatTypeId: number;
    openAppeal: true;
    regionId: number | null;
    districtId: number | null;
    appealTypeArriveId: number | null;
    appealDescriptionId: number | null;
    departmentId: number | null;
    email: string;
    address: string;
    files: any[];
}