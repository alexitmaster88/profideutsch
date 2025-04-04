<template>
	<div class="bg-primary srv-section md:py-14 py-8">
		<div class="container">
			<div class="text-title text-white">{{ $t("Services") }}</div>

			<div class="flex flex-wrap gap-6 mt-12 mb-12">
				<div
					v-for="srv in srvList"
					:key="srv.id"
					class="w-[16.9375rem] h-[14.75rem] px-[1.375rem] pt-[1.8125rem] bg-blue-700 bg-opacity-40 rounded-[1.4375rem] backdrop-blur-[2.9937rem] flex-col justify-center items-center inline-flex"
				>
					<div class="w-[5.125rem] h-[4.9375rem] relative">
						<div class="w-[5.125rem] h-[4.9375rem] left-0 top-0 absolute bg-cyan-300 rounded-[1.4375rem]"></div>
						<div class="w-[2.4375rem] h-[2.4375rem] left-[1.3438rem] top-[1.25rem] absolute"></div>
					</div>
					<div class="w-80 h-[5.25rem] text-center text-white text-2xl font-normal leading-9">{{ srv.shortName }}</div>
				</div>
			</div>

			<AllViewBtn :title="$t('all_services')" to="/news" class="text-white border-white" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AllViewBtn from "@/components/shared/btn/AllViewBtn.vue";
import NeedChamberServiceGroupService from "@/services/erp/needChamberServiceGroup";
import type { NeedChamberServiceGroupListDto } from "@/services/erp/needChamberServiceGroup/models";

const loading = ref(false);
const srvList = ref<NeedChamberServiceGroupListDto[]>([]);

const getServices = () => {
	loading.value = true;
	NeedChamberServiceGroupService.GetList({ search: "", sortBy: "", orderType: "", page: 1, pageSize: 6 })
		.then((res) => {
			srvList.value = res.data.rows;
		})
		.finally(() => {
			loading.value = false;
		});
};

getServices();
</script>

<style scoped>
.srv-section {
	background-image: url("@/assets/images/srv-bg.png") theme("colors.primary[DEFAULT]");
	background-size: 100%;
	background-repeat: no-repeat;
}
</style>