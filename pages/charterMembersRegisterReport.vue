<template>
  <div id="app" class="p-8">
    <div class="container space-y-8 text-sm mx-auto">
      <div class="space-y-2">
        <div
          v-if="getLoading"
          class="flex justify-center items-center min-h-32"
        >
          <Spinner class="w-16 h-16" />
        </div>
        <div v-else class="bg-white shadow-lg hover:shadow-xl rounded-md">
          <table class="table table-auto w-full leading-normal">
            <thead
              class="uppercase text-gray-600 text-xs font-semibold bg-gray-200"
            >
              <tr class="hidden md:table-row">
                <th class="text-left p-3">
                  <p>№</p>
                </th>
                <th class="text-left p-3">
                  <p>{{ $t("Корхона (ташкилот) номи") }}</p>
                </th>
                <th class="text-left p-3">
                  <p>
                    {{ $t("Корхона (ташкилот)нинг ташкилий-ҳуқуқий шакли") }}
                  </p>
                </th>
                <th class="text-left p-3">
                  <p>{{ $t("choosedRegion") }}</p>
                </th>
                <th class="text-left p-3">
                  <p>{{ $t("Region") }}</p>
                </th>
                <th class="text-left p-3">
                  <p>{{ $t("Adress") }}</p>
                </th>
                <th class="text-left p-3">
                  <p>{{ $t("inn") }}</p>
                </th>
                <th class="text-left p-3">
                  <p>{{ $t("Хартияга аъзолик сертификатининг рақами") }}</p>
                </th>
                <th class="text-left p-3">
                  <p>{{ $t("Сертификат Реестрга киритилган сана") }}</p>
                </th>
                <th class="text-left p-3">
                  <p>{{ $t("Сертификат берилган сана") }}</p>
                </th>
                <th class="text-left p-3">
                  <p>{{ $t("phoneNumber") }}</p>
                </th>
              </tr>
            </thead>
            <tbody class="flex-1 text-gray-700 sm:flex-none">
              <tr
                v-for="(item, index) in Items"
                :key="index"
                class="border-t first:border-t-0 flex p-1 md:p-3 hover:bg-gray-100 md:table-row flex-col w-full flex-wrap"
              >
                <td class="p-1 md:p-3">
                  <p class="">{{ index + 1 }}</p>
                </td>
                <td class="p-1 md:p-3">
                  <p class="">{{ item.contractorFullName }}</p>
                </td>
                <td class="p-1 md:p-3 md:text-left">
                  <div>{{ item.contractorOpf }}</div>
                </td>
                <td class="p-1 md:p-3 md:text-left">
                  <div>{{ item.contractorRegion }}</div>
                </td>
                <td class="p-1 md:p-3 md:text-left">
                  <div>{{ item.contractorDistrict }}</div>
                </td>
                <td class="p-1 md:p-3 md:text-left">
                  <div>{{ item.adress }}</div>
                </td>
                <td class="p-1 md:p-3 md:text-left">
                  <div>{{ item.contractorInn }}</div>
                </td>
                <td class="p-1 md:p-3 md:text-right">
                  <div>{{ item.docNumber }}</div>
                </td>
                <td class="p-1 md:p-3 md:text-right">
                  <div>{{ item.docOn }}</div>
                </td>
                <td class="p-1 md:p-3 md:text-right">
                  <div>{{ item.expireOn }}</div>
                </td>
                <td class="p-1 md:p-3 md:text-right">
                  <div>{{ item.contractorPhoneNumber }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMainSettingStore } from "@/store/MainSetting";
import CharterMembersRegisterReport from "@/services/erp/CharterMembersRegisterReport";
import Spinner from "@/components/shared/skeleton/Spinner.vue";

const { $toast } = useNuxtApp();
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);
Meta.value = {
  title: "charterMembersRegisterReport",
  breadcrumbs: [
    {
      to: "/charterMembersRegisterReport",
      label: "charterMembersRegisterReport",
    },
  ],
};

interface CharterMember {
  contractorFullName: string;
  contractorOpf: string;
  contractorRegion: string;
  contractorDistrict: string;
  adress: string;
  contractorInn: string;
  docNumber: string;
  docOn: string;
  expireOn: string;
  contractorPhoneNumber: string;
}

const getLoading = ref(false);
const Items = ref<CharterMember[] | null>(null);

const getData = () => {
  getLoading.value = true;
  Items.value = null;
  CharterMembersRegisterReport.GetCharterMembersRegisterReportForChamber({})
    .then((res) => {
      Items.value = res.data as CharterMember[];
    })
    .catch((e) => {
      if (e?.response?.data?.errors) {
        Object.values(e?.response?.data?.errors).forEach((el: any) => {
          $toast.error(el ? el[0] : "");
        });
      } else {
        $toast.error("маълумот топилмади!");
      }
    })
    .finally(() => {
      getLoading.value = false;
    });
};
getData();
</script>
