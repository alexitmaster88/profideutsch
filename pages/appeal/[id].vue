<template>
	<div class="container py-8 text-sm mx-auto w-[900px]">
		<div class="space-y-2 shadow-sm bg-white p-6 rounded">
			<div class="flex justify-between items-center gap-4 py-3 border-b">
				<div class="text-title">
					{{ isEdit ? t("appeal") : t("thanks_for_appeal") }}
				</div>
				<div>
					<LocLink to="/">
						<img v-if="LOCALE == 'en'" :src="SSP_ENG_W" class="h-16 object-contain" :alt="$t('ssp_name')" />
						<img v-else-if="LOCALE == 'ru'" :src="SSP_RU_W" class="h-16 object-contain" :alt="$t('ssp_name')" />
						<img v-else :src="SSP_UZB_W" class="h-16 object-contain" :alt="$t('ssp_name')" />
					</LocLink>
				</div>
			</div>
			<div v-if="getLoading" class="flex justify-center items-center min-h-32">
				<Spinner class="w-16 h-16" />
			</div>
			<form v-else-if="isEdit" @submit.prevent="saveData" class="group py-2">
				<div class="grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 lg:gap-6 items-center">
					<div>
						<WInput
							:modelValue="filter.Seria"
							@update:model-value="(e:string) => (filter.Seria = e ? e.toUpperCase() : e)"
							mask="@@"
							:label="$t('passportSeria')"
							placeholder="AA"
						/>
					</div>
					<div>
						<WInput v-model="filter.Number" mask="#######" :label="$t('passportNumber')" placeholder="#######" />
					</div>

					<div>
						<WDatePicker v-model="filter.DateOfBirth" :label="$t('birthDate')" placeholder="DD.MM.YYYY" />
					</div>
					<div>
						<WBtn type="button" color="primary" class="mt-3" :loading="searchLoading" @click="GetPassportData">
							{{ $t("search") }}
						</WBtn>
					</div>
				</div>

				<div class="grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 mt-2 lg:gap-6 items-center">
					<div class="col-span-2">
						<WInput v-model="Data.personFullName" :label="$t('fio')" :placeholder="$t('fio')" :disabled="!isEdit" />
					</div>
					<div v-if="Data.person">
						<WDatePicker v-model="Data.person.birthDate" :placeholder="$t('birthDate')" :label="$t('birthDate')" :disabled="!isEdit"></WDatePicker>
					</div>
					<div v-if="Data.person">
						<WInput v-model="Data.person.pinfl" :label="$t('pinfl')" :placeholder="$t('pinfl')" :disabled="!isEdit" />
					</div>
					<div class="col-span-2">
						<WInput v-model="Data.email" :label="$t('email')" :disabled="!isEdit" :error="v$.email.$error && isEdit" />
					</div>
				</div>

				<div class="grid md:grid-cols-2 grid-cols-1 sm:grid-cols-2 mt-2 lg:gap-6 items-center">
					<div>
						<WSelect
							v-model="Data.regionId"
							@update:model-value="ChangeRegion"
							:options="RegionList"
							:label="$t('region')"
							required
							:disabled="!isEdit"
							:error="v$.regionId.$error && isEdit"
						/>
					</div>
					<div>
						<WSelect
							v-model="Data.districtId"
							:options="DistrictList"
							:label="$t('district')"
							required
							:disabled="!isEdit"
							:error="v$.districtId.$error && isEdit"
						/>
					</div>

					<div>
						<WInput
							v-model="Data.address"
							:label="$t('address')"
							@blur="v$.address.$touch()"
							required
							:disabled="!isEdit"
							:error="v$.address.$error && isEdit"
						/>
					</div>

					<div>
						<WSelect
							v-model="Data.busyness"
							:options="bandlik"
							required
							:disabled="!isEdit"
							:error="v$.busyness.$error && isEdit"
							:label="$t('employmentType')"
						/>
					</div>
					<div>
						<WInput
							v-model="Data.phoneNumber"
							mask="+998 (##) ###-##-##"
							:label="$t('phoneNumber')"
							required
							:disabled="!isEdit"
							:error="v$.phoneNumber.$error && isEdit"
						/>
					</div>
				</div>

				<div class="grid border-t pt-3 mt-3 md:grid-cols-2 grid-cols-1 sm:grid-cols-2 lg:gap-6 items-center">
					<div>
						<WInput v-model="Data.docNumber" :label="$t('docNumber')" required :disabled="!isEdit" :error="v$.docNumber.$error && isEdit" />
					</div>

					<div>
						<WDatePicker
							v-model="Data.docOn"
							:label="$t('docOn')"
							placeholder="DD.MM.YYYY"
							required
							:disabled="!isEdit"
							:error="v$.docOn.$error && isEdit"
						/>
					</div>

					<div>
						<WSelect v-model="Data.openAppeal" :options="openAppeal" :disabled="!isEdit" :label="$t('openAppeal')" />
					</div>

					<div>
						<WSelect
							v-model="Data.appealTypeId"
							:options="AppealTypeSelectList"
							required
							:disabled="!isEdit"
							:error="v$.appealTypeId.$error"
							:label="$t('appealType')"
						/>
					</div>
					<div>
						<WSelect
							v-model="Data.appealFormatTypeId"
							required
							:error="v$.appealFormatTypeId.$error"
							:options="AppealFormatTypeSelectList"
							:disabled="!isEdit"
							:label="$t('appealFormatType')"
						/>
					</div>
					<div>
						<WInput :disabled="!isEdit" @change="UploadFile" :label="$t('files')" type="file" multiple :error="v$.files.$error && isEdit" />

						<div class="mt-1" v-for="item in Data.files" :key="item.id">
							<a target="_blank" class="text-primary" :href="FileSrc(item.id)">{{ item.fileName || item.id }}</a>
							<WBtn v-if="isEdit" color="danger" size="xs" class="ml-1" @click="DeleteFile(item.id)">
								<svg class="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
									/>
								</svg>
							</WBtn>
						</div>
					</div>
				</div>

				<div class="mt-2">
					<WTextarea v-model="Data.details" :label="$t('appealText')" :disabled="!isEdit" required :error="v$.details.$error && isEdit" />
				</div>

				<WBtn color="primary" class="mt-3 md:w-auto w-full" :loading="loading" type="submit">
					{{ $t("send") }}
				</WBtn>
			</form>

			<div v-else-if="Data" class="grid md:grid-cols-2">
				<div>
					<div class="text-title">{{ $t("appeal_number") }}:</div>
					<div class="text-title">
						{{ Data?.docNumber }}
					</div>
				</div>
				<div class="flex flex-col gap-6 pt-4">
					<div class="text-xs font-bold">
						{{ $t("appeal_copy_details") }}
					</div>

					<LocLink class="!w-full uppercase !border-primary text-center text-primary border p-1 rounded" :to="'/appeal?docNumber=' + Data.docNumber">
						{{ $t("appeal_check") }}
					</LocLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import AppealApplication from "@/services/my/AppealApplication";
import ManualService from "@/services/my/Manual";

import Spinner from "@/components/shared/skeleton/Spinner.vue";
import WDatePicker from "@/components/shared/w-ui/WDatePicker/index.vue";
import WInput from "@/components/shared/w-ui/WInput/index.vue";
import WBtn from "@/components/shared/w-ui/WBtn";
import WSelect from "@/components/shared/w-ui/WSelect/index.vue";
import WTextarea from "@/components/shared/w-ui/WTextarea/index.vue";
import { useMainSettingStore } from "@/store/MainSetting";

import { type IAppealDto } from "@/services/my/AppealApplication/models";
import { useI18n } from "vue-i18n";
import { apiInstanceMy } from "@/services/base";
import { useRoute, useRouter } from "vue-router";
import SSP_UZB_W from "@/assets/images/logo/dark/SSP_UZB.png";
import SSP_RU_W from "@/assets/images/logo/dark/SSP_RU.png";
import SSP_ENG_W from "@/assets/images/logo/dark/SSP_ENG.png";
import LocLink from "@/components/shared/LocLink.vue";
import { LOCALE } from "@/i18n/i18n.config";

const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);
const { t } = useI18n();

Meta.value = {
	title: "appeal",
	breadcrumbs: [
		{
			to: "/appeal",
			label: "appeal",
		},
	],
};

useSeoMeta({
	title: t("appeal"),
});

const { $toast } = useNuxtApp();

const router = useRouter();
const route = useRoute();

interface Filter {
	Seria: string;
	Number: string;
	DateOfBirth: string;
}

const filter = ref<Filter>({
	Seria: "",
	Number: "",
	DateOfBirth: "",
});

const dataDef: IAppealDto = {
	person: null,
	contractorInn: "",
	docNumber: "",
	phoneNumber: "",
	personFullName: "",
	docOn: "",
	details: "",
	contractorId: 0,
	personId: 0,
	busyness: true,
	appealTypeId: 0,
	appealFormatTypeId: 0,
	openAppeal: true,
	regionId: 0,
	districtId: 0,
	appealTypeArriveId: 0,
	appealDescriptionId: 0,
	departmentId: 0,
	email: "",
	address: "",
	files: [],
};

const Data = ref<IAppealDto>({ ...dataDef });

const rules = {
	address: { required },
	regionId: { required },
	districtId: { required },
	docNumber: { required },
	phoneNumber: { required },
	docOn: { required },
	details: { required },
	busyness: { required },
	appealTypeId: { required },
	appealFormatTypeId: { required },
	files: { required },
	email: { email },
};

const v$ = useVuelidate(rules, Data);

const loading = ref(false);
const getLoading = ref(false);
const searchLoading = ref(false);
const RegionList = ref<any[]>([]);
const DistrictList = ref<any[]>([]);
const appealTypeArriveList = ref<any[]>([]);
const AppealFormatTypeSelectList = ref<any[]>([]);
const AppealTypeSelectList = ref<any[]>([]);

const bandlik = ref([
	{ text: t("Ishlaydi"), value: true },
	{ text: t("Ishsiz"), value: false },
]);

const openAppeal = ref([
	{ text: t("yes"), value: true },
	{ text: t("no"), value: false },
]);
const FileSrc = computed(() => {
	return (id: string) => apiInstanceMy.defaults.baseURL + `appeal/ChamberAppealApplication/DownloadFile/${id}`;
});

const isEdit = computed(() => route.params.id == "0");

const getData = async () => {
	getLoading.value = true;
	await AppealApplication.Get(route.params.id as string)
		.then((res) => {
			Data.value = res.data;
			if (isEdit.value) {
				Data.value.regionId = null;
				Data.value.districtId = null;
				Data.value.appealTypeArriveId = null;
				Data.value.appealDescriptionId = null;
				Data.value.appealTypeId = null;
			}
		})
		.catch((e) => {
			if (e?.response?.data?.errors) {
				Object.values(e?.response?.data?.errors).forEach((el: any) => {
					$toast.error(el ? el[0] : "");
				});
			} else {
				$toast.error(t("not_found_data"));
			}
		})
		.finally(() => {
			getLoading.value = false;
		});
};
const getRegion = () => {
	ManualService.RegionSelectList()
		.then((res) => {
			RegionList.value = res.data;
		})
		.catch((e) => {
			if (e?.response?.data?.errors) {
				Object.values(e?.response?.data?.errors).forEach((el: any) => {
					$toast.error(el ? el[0] : "");
				});
			} else {
				$toast.error(t("not_found_data"));
			}
		})
		.finally(() => {});
};

const ChangeRegion = () => {
	if (Data.value.regionId)
		ManualService.DistrictSelectList(Data.value.regionId).then((res) => {
			DistrictList.value = res.data;
		});
};

const GetPassportData = () => {
	searchLoading.value = true;

	AppealApplication.GetByPassportData(filter.value.Seria, filter.value.Number, filter.value.DateOfBirth)
		.then((res) => {
			Data.value.person = res.data;

			// Data.value.address = res.data.livingRegion + " " + res.data.livingDistrict;
			Data.value.personFullName = res.data.nameLatin + " " + res.data.surnameLatin + " " + res.data.patronymLatin;
			Data.value.personId = res.data.id;
			Data.value.districtId = res.data.livingDistrictId;
			Data.value.regionId = res.data.livingRegionId;
			ChangeRegion();
		})
		.catch((e) => {
			if (e?.response?.data?.errors) {
				Object.values(e?.response?.data?.errors).forEach((el: any) => {
					$toast.error(el ? el[0] : "");
				});
			} else {
				$toast.error(t("not_found_data"));
			}
		})
		.finally(() => {
			searchLoading.value = false;
		});
};

const UploadFile = (event: any) => {
	const formData = new FormData();
	formData.append("files", event.target.files[0]);
	AppealApplication.UploadFile(formData).then((res) => {
		Data.value.files.push(...res.data);
	});
};
const DeleteFile = (id: string) => {
	AppealApplication.DeleteFile(id).then(() => {
		Data.value.files = Data.value.files.filter((item) => item.id != id);
	});
};

const saveData = async () => {
	v$.value.$touch();
	const isFormCorrect = await v$.value.$validate();
	// you can show some extra alert to the user or just leave the each field to show it's `$errors`.
	if (!isFormCorrect) return;

	loading.value = true;
	AppealApplication.Create(Data.value)
		.then((res) => {
			router.replace({
				params: {
					id: res.data.id,
				},
			});
			getData();
		})
		.catch((e) => {
			if (e?.response?.data?.errors) {
				Object.values(e?.response?.data?.errors).forEach((el: any) => {
					$toast.error(el ? el[0] : "");
				});
			} else {
				$toast.error(t("error.500.title"));
			}
		})
		.finally(() => {
			loading.value = false;
		});
};

onMounted(() => {
	ManualService.AppealTypeSelectList().then((res) => {
		AppealTypeSelectList.value = res.data;
	});

	ManualService.AppealFormatTypeSelectList().then((res) => {
		AppealFormatTypeSelectList.value = res.data;
	});

	ManualService.AppealTypeArriveSelectList().then((res) => {
		appealTypeArriveList.value = res.data;
	});
});

getRegion();
await getData();
</script>
