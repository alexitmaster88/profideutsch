<template>
  <div class="">
    <div class="container md:py-12 py-4">
      <div
        class="md:text-2xl text-xl text-center text-gray-700 mb-6 w-10/12 mx-auto"
      >
        {{ $t("rating.savol_yuborish") }}
        <NuxtLink
          target="_blank"
          external
          class="text-primary font-semibold cursor-pointer hover:text-primary-800 duration-200 inline-flex whitespace-nowrap gap-3 items-center"
          :to="'tel:+998781506007'"
          :externalLink="true"
        >
          <span class="text-wrap"> +99878 150 60 07</span>
        </NuxtLink>
      </div>
      <div class="flex lg:flex-row flex-col md:gap-10 gap-4 drop-shadow-lg">
        <div class="lg:w-3/4 w-full flex flex-shrink-0 gap-4 flex-col">
          <!-- search -->
          <div
            class="mb-4 max-w-[36rem] relative h-[50px] hover:shadow-lg shadow-sm duration-200 bg-white rounded-2xl border-zinc-400 overflow-hidden"
          >
            <input
              v-model="tin"
              :placeholder="$t('input_inn')"
              maxlength="9"
              pattern="[0-9]"
              type="text"
              @keyup.enter="GetCompanyCriteries"
              class="absolute top-0 bottom-0 left-0 px-6 right-0 outline-none border-none placeholder-neutral-400 text-gray-700 font-medium"
            />
            <WBtn
              @click="GetCompanyCriteries"
              :loading="loading"
              :disabled="!tin"
              color="primary"
              class="outline-none focus:ring-0 focus:ring-offset-0 absolute right-1 top-1 bottom-1 px-3 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.6829 17.6371C1.1057 14.0599 1.1057 8.2601 4.6829 4.6829C8.2601 1.1057 14.0599 1.1057 17.6371 4.6829C20.9069 7.95265 21.1879 13.0794 18.4802 16.6683L22.0943 20.2825C23.0371 21.2253 21.6229 22.6395 20.6801 21.6967L17.1092 18.1257C13.5103 21.2061 8.08905 21.0432 4.6829 17.6371ZM16.2229 6.09712C13.4267 3.30096 8.89327 3.30096 6.09712 6.09712C3.30096 8.89327 3.30096 13.4267 6.09712 16.2229C8.89327 19.019 13.4267 19.019 16.2229 16.2229C19.019 13.4267 19.019 8.89327 16.2229 6.09712Z"
                  fill="white"
                />
              </svg>
            </WBtn>
          </div>

          <template v-if="error">
            <!-- <div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
						<svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
							/>
						</svg>
						<div class="ms-3 text-xl font-medium">
							Tadbirkorlik subyektlarining barqarorlik reytingi ma'lumotlarini platformaga chiqarish bo'yicha ishlar olib borilmoqda.
						</div>
						<button
							type="button"
							class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:text-red-400"
							data-dismiss-target="#alert-2"
							aria-label="Close"
						>
							<span class="sr-only">Close</span>
							<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
							</svg>
						</button>
					</div> -->
          </template>

          <template v-if="tab == 1">
            <div v-if="0" class="flex gap-6 md:flex-row flex-col mt-6">
              <HeaderCard
                v-for="card in cards"
                :icon="card.icon"
                :label="card.label"
              />
            </div>

            <div
              v-if="getLoading"
              class="flex justify-center items-center min-h-32"
            >
              <Spinner class="w-16 h-16" />
            </div>

            <template v-else-if="companyHighNewInfo.length">
              <CompanyHighNewInfo :company-high-new-info="companyHighNewInfo" />
            </template>
            <div
              v-if="getLoading"
              class="flex justify-center items-center min-h-32"
            >
              <Spinner class="w-16 h-16" />
            </div>
            <template v-else-if="companyStateNewInfo.length">
              <CompanyStateNewInfo
                :company-state-new-info="companyStateNewInfo"
              />
            </template>
          </template>

          <template v-else-if="tab == 2">
            <ContractorSkeleton v-if="loading" />

            <CompanyInfo v-if="companyInfo" :companyInfo="companyInfo" />
            <CompanyCriteries
              v-if="criteries && criteries.length > 0"
              :criteries="criteries"
            />

            <!-- <span class="text-lg font-semibold">
						{{ t("reyting_title2") }}
					</span> -->
          </template>
        </div>

        <div class="lg:w-1/4 w-full flex flex-col gap-6">
          <!-- reklama -->
          <ReklamaSection :priority="1" layout="vertical" />

          <EventPicker />
        </div>
      </div>
      <div class="w-full mt-5 overflow-x-auto">
        <h1 class="text-2xl md:text-3xl text-center mb-6">
          {{ $t("Sohaviy") }}
        </h1>
        <table class="rating-table mx-auto min-w-full">
          <thead>
            <tr>
              <th style="text-wrap: wrap">
                {{ $t("Barqarorlik darajasi") }}
              </th>
              <th style="text-wrap: wrap">{{ $t("Reyting ko'rsatgichi") }}</th>
              <th style="text-wrap: wrap" class="row2">
                {{ $t("Baho") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th rowspan="3" class="head head1">{{ $t("Yuqori") }}</th>
              <td>AAA</td>
              <td>96-100 {{ $t("ball") }}</td>
            </tr>
            <tr>
              <td>AA</td>
              <td>91-95 {{ $t("ball") }}</td>
            </tr>
            <tr>
              <td>A</td>
              <td>86-90 {{ $t("ball") }}</td>
            </tr>
            <tr>
              <th rowspan="3" class="head head2">{{ $t("O'rta") }}</th>
              <td>BBB</td>
              <td>76-85 {{ $t("ball") }}</td>
            </tr>
            <tr>
              <td>BB</td>
              <td>66-75 {{ $t("ball") }}</td>
            </tr>
            <tr>
              <td>B</td>
              <td>56-65 {{ $t("ball") }}</td>
            </tr>
            <tr>
              <th rowspan="3" class="head head3">{{ $t("Qoniqarli") }}</th>
              <td>CCC</td>
              <td class="text-wrap">51-55 {{ $t("ball") }}</td>
            </tr>
            <tr>
              <td>CC</td>
              <td>36-50 {{ $t("ball") }}</td>
            </tr>
            <tr>
              <td>C</td>
              <td>26-35 {{ $t("ball") }}</td>
            </tr>
            <tr>
              <th rowspan="3" class="head head4">{{ $t("Quyi") }}</th>
              <td>D</td>
              <td>25 {{ $t("ball") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import HeaderCard from "@/components/contractorRating/HeaderCard.vue";
import chart1 from "@/assets/icons/contractor/chart1.svg?component";
import chart2 from "@/assets/icons/contractor/chart2.svg?component";
import chart3 from "@/assets/icons/contractor/chart3.svg?component";

import CompanyInfo from "@/components/contractorRating/CompanyInfo.vue";
import CompanyCriteries from "@/components/contractorRating/CompanyCriteries.vue";
import WBtn from "@/components/shared/w-ui/WBtn";
// services
import SoliqService from "@/services/erp/soliq";
import ContractorSkeleton from "@/components/shared/skeleton/ContractorSkeleton.vue";
import Spinner from "@/components/shared/skeleton/Spinner.vue";
import { useMainSettingStore } from "@/store/MainSetting";

// type
import type {
  CompanyHighNewInfoDto,
  CompanyStateNewInfoDto,
  CriteriesDto,
  CompanyInfoDto,
} from "@/services/erp/soliq/models";
import CompanyHighNewInfo from "@/components/contractorRating/CompanyHighNewInfo.vue";
import CompanyStateNewInfo from "@/components/contractorRating/CompanyStateNewInfo.vue";
import { useI18n } from "vue-i18n";
import ReklamaSection from "@/components/reklama/ReklamaSection.vue";
import EventPicker from "@/components/calendarofevents/EventPicker.vue";

const { t } = useI18n();
const { $toast } = useNuxtApp();
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);
Meta.value = {
  title: "ContractorRating",
  breadcrumbs: [
    {
      to: "/contractor-rating",
      label: "ContractorRating",
    },
  ],
};

useServerHead({
  title: t("ContractorRating"),
  meta: [
    {
      name: "description",
      content: t("ContractorRating"),
    },
  ],
});

useServerSeoMeta({
  ogTitle: t("ContractorRating"),
  ogDescription: t("ContractorRating"),
  twitterTitle: t("ContractorRating"),
  twitterDescription: t("ContractorRating"),
});

const tin = ref("");
const getLoading = ref(false);
const getLoading2 = ref(false);
const error = ref(false);
const loading = ref(false);
const tab = ref(1);
const companyInfo = ref<CompanyInfoDto | null>();
const criteries = ref<CriteriesDto[]>([]);
const companyHighNewInfo = ref<CompanyHighNewInfoDto[]>([]);
const companyStateNewInfo = ref<CompanyStateNewInfoDto[]>([]);

const cards = [
  {
    id: 1,
    icon: chart1,
    label: t("rating.mezonlar"),
  },
  {
    id: 2,
    icon: chart2,
    label: t("rating.dinamika"),
  },
  {
    id: 3,
    icon: chart3,
    label: t("rating.umumiy_statistika"),
  },
];

watch(
  () => tin.value,
  (newV) => {
    if (!newV) {
      tab.value = 1;
    }
  }
);

const GetCompanyCriteries = () => {
  loading.value = true;
  companyInfo.value = null;
  criteries.value = [];
  tab.value = 2;
  error.value = false;

  SoliqService.GetCompanyCriteries(tin.value)
    .then((res) => {
      // companyInfo.value = res.data.companyInfo;
      // @ts-ignore
      companyInfo.value = res.data as CompanyInfoDto;
      // criteries.value = res.data.criteries;
    })
    .catch((e) => {
      error.value = true;
      if (e?.response?.data?.errors) {
        Object.values(e?.response?.data?.errors).forEach((el: any) => {
          $toast.error(el ? el[0] : "");
        });
      } else {
        $toast.error("Солиқ тизимидан маълумот топилмади!");
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const GetCompanyHighNewInfo = () => {
  getLoading.value = true;
  companyHighNewInfo.value = [];
  error.value = false;

  SoliqService.GetCompanyHighNewInfo()
    .then((res) => {
      companyHighNewInfo.value = res.data;
    })
    .catch(() => {
      error.value = true;
    })
    .finally(() => {
      getLoading.value = false;
    });
};

const GetCompanyStateNewInfo = () => {
  getLoading2.value = true;
  companyStateNewInfo.value = [];

  SoliqService.GetCompanyStateNewInfo({
    isBusiness: 1,
    ns10Code: 30,
    ns11Code: 10,
  })
    .then((res) => {
      companyStateNewInfo.value = res.data;
    })
    .finally(() => {
      getLoading2.value = false;
    });
};

GetCompanyHighNewInfo();
GetCompanyStateNewInfo();
</script>
<style lang="css" scoped>
.rating-table {
  background: #0b2f82;
  border-radius: 4px;
  color: #fff;
  font-family: Montserrat, sans-serif;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  width: 100%;
}

.rating-table tbody tr th.head {
  font-size: 30px;
  font-weight: 600;
  vertical-align: middle;
}

.rating-table > :not(caption) > * > * {
  padding: 0.75rem;
}

.rating-table tbody tr th.head1 {
  color: #80c727;
}
.rating-table tbody tr th.head2 {
  color: #d7c73b;
}
.rating-table tbody tr th.head3 {
  color: #eca234;
}
.rating-table tbody tr th.head4 {
  color: #eb7543;
}
.rating-table tbody tr th.head {
  font-size: 20px;
}

table,
th,
td {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-collapse: collapse;
}

/* RESPONSIVE DESIGN */
@media screen and (max-width: 768px) {
  .rating-table {
    font-size: 12px;
    line-height: 24px;
  }
  .row2 {
    width: 50px;
    text-wrap: wrap;
  }
  .rating-table > :not(caption) > * > * {
    padding: 0.6rem 0.2rem;
  }

  .rating-table tbody tr th.head {
    font-size: 18px;
  }

  .w-full.mt-5 {
    overflow-x: auto;
  }
  table {
    width: 100%;
    min-width: 600px; /* Jadval ekranga sig‘magan holatda scroll chiqadi */
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
