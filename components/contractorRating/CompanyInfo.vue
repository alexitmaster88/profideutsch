<template>
	<BaseCard class="md:min-h-[215px] relative cursor-default">
		<div class="flex flex-wrap gap-1 items-center">
			<div class="text-gray-600 text-sm font-medium">{{ $t("inn") }}:</div>
			<div class="text-primary text-sm font-bold border-e-2 px-4 border-primary">{{ companyInfo.tin }}</div>
			<div class="text-primary text-base font-bold">{{ companyInfo.name }}</div>
		</div>

		<div class="flex flex-col gap-6 mt-6">
			<div class="justify-start items-start gap-3 inline-flex">
				<CheckIcon />
				<div class="text-gray-600 text-sm font-medium">{{ $t("rating.faoliyat_turi") }}:</div>
				<div class="text-primary text-sm font-bold">{{ companyInfo?.okedDetail?.name }}</div>
			</div>

			<div class="justify-start items-start gap-3 inline-flex">
				<CheckIcon />
				<div class="text-gray-600 text-sm font-medium">{{ $t("rating.xizmat_soliq_organi") }}:</div>
				<div class="text-primary text-sm font-bold"></div>
				<!-- {{ companyInfo.taxpayername }} -->
			</div>
			<div class="justify-start items-start gap-3 inline-flex">
				<CheckIcon />
				<div class="text-gray-600 text-sm font-medium">{{ $t("rating.taxpayer") }}:</div>
				<div class="text-primary text-base font-bold">{{ companyInfo.type }}</div>
				<div class="justify-start items-start gap-3 inline-flex">
					<div class="text-gray-600 text-sm font-medium">{{ $t("rating.ball") }}:</div>
					<div class="text-primary text-base font-bold">{{ companyInfo.criteriaAll }}</div>
				</div>
			</div>
		</div>

		<!-- bg image -->
		<div class="w-8/12 md:h-[198px] absolute right-0 bottom-0 flex items-end justify-end">
			<Vector class="fill-zinc-300" />
		</div>
	</BaseCard>
</template>

<script setup lang="ts">
import BaseCard from "../shared/card/BaseCard.vue";
import Vector from "@/assets/icons/bg-vector-1.svg?component";
import CheckIcon from "@/assets/icons/contractor/check.svg?component";
import { type CompanyInfoDto } from "@/services/erp/soliq/models";

defineProps<{ companyInfo: CompanyInfoDto }>();
</script>
