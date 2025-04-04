export type CompanyHighNewInfoDto = {
    business: number;
    countAll: number;
    countSt: number;
    countVat: number;
    not_business: number;
    sort: number;
    type: string;
};

export type CompanyStateNewInfoDto = {
    aaacounVat: number;
    aaacount: number;
    aaacountSt: number;
    aacounVat: number;
    aacount: number;
    aacountSt: number;
    acounVat: number;
    acount: number;
    acountSt: number;
    bbbcounVat: number;
    bbbcount: number;
    bbbcountSt: number;
    bbcounVat: number;
    bbcount: number;
    bbcountSt: number;
    bcounVat: number;
    bcount: number;
    bcountSt: number;
    ccccounVat: number;
    ccccount: number;
    ccccountSt: number;
    cccounVat: number;
    cccount: number;
    cccountSt: number;
    ccounVat: number;
    ccount: number;
    ccountSt: number;
    code: number;
    countAll: number;
    countSt: number;
    countVat: number;
    dcounVat: number;
    dcount: number;
    dcountSt: number;
    nameLat: string;
    nameRu: string;
    nameUz: string;
};


export type CompanyInfoDto = {
    pkey: string
    name: string
    tin: string
    criteriaAll: number
    nameUz: string
    nameRu: string
    nameLat: string
    type: string
    taxpayerType: number
    taxpayer_name_uz_latn: string
    taxpayername: string
    taxpayername_ru: string
    taxpayername_uz_cyrl: string
    soato: number
    regionID: number
    regionNameUz: string
    regionNameRu: string
    regionNameLat: string
    districtID: number
    districtNameUz: string
    districtNameRu: string
    districtNameLat: string
    levelTo: number
    levelFrom: number
    maxPoint: number,
    okedDetail: {
        name: string,
        code: string
    }
}

export type CriteriesDto = {
    id: number
    nameUz: string
    nameLat: string
    nameRu: string
    methodsUz: string
    methodsLat: string
    methodsRu: string
    procedureUz: string
    procedureLat: string
    procedureRu: string
    eliminateUz: string
    eliminateLat: string
    eliminateRu: string
    vatPoint: number
    stPoint: number
    minusPoint: number
    ord: number
    header: string
    state: string
    active: string
    cabinet: string
    dscr: string
    point: number
    tin: string
    maxPoint: number
    isPrivilege: boolean
}