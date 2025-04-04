<template>
	<div class="text-primary text-2xl font-semibold mt-2">{{ $t("rating.hududlar_kesimida_korxona") }}</div>
	<table class="table-auto w-100 border-collapse">
		<thead>
			<tr>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r bg-stone-50">{{ $t("tr") }}</th>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r bg-stone-50">{{ $t("rating.hudud") }}</th>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r bg-stone-50">{{ $t("total") }}</th>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r" :class="getColorsWithBg(1)">ААА</th>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r" :class="getColorsWithBg(2)">АА</th>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r" :class="getColorsWithBg(3)">А</th>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r" :class="getColorsWithBg(4)">ВВВ</th>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r" :class="getColorsWithBg(5)">ВВ</th>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r" :class="getColorsWithBg(6)">В</th>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r" :class="getColorsWithBg(7)">ССС</th>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r" :class="getColorsWithBg(8)">СС</th>
				<th class="px-3 py-6 rounded-t-2xl border-b border-r" :class="getColorsWithBg(9)">С</th>
				<th class="px-3 py-6 rounded-t-2xl border-b" :class="getColorsWithBg(10)">D</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in companyStateNewInfo" :key="i" class="border-zinc-200 bg-slate-50">
				<td class="text-center p-3 border-e">{{ i + 1 }}</td>
				<td class="text-center p-3 border-e font-semibold">{{ item.nameUz }}</td>
				<td class="text-center p-3">{{ parseNumber(item.countAll) }}</td>
				<td class="text-center p-3 border-e">{{ parseNumber(item.aaacount) }}</td>
				<td class="text-center p-3 border-e">{{ parseNumber(item.aacount) }}</td>
				<td class="text-center p-3 border-e">{{ parseNumber(item.acount) }}</td>
				<td class="text-center p-3 border-e">{{ parseNumber(item.bbbcount) }}</td>
				<td class="text-center p-3 border-e">{{ parseNumber(item.bbcount) }}</td>
				<td class="text-center p-3 border-e">{{ parseNumber(item.bcount) }}</td>
				<td class="text-center p-3 border-e">{{ parseNumber(item.ccccount) }}</td>
				<td class="text-center p-3 border-e">{{ parseNumber(item.cccount) }}</td>
				<td class="text-center p-3 border-e">{{ parseNumber(item.ccount) }}</td>
				<td class="text-center p-3 border-e">{{ parseNumber(item.dcount) }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import { getColorsWithBg, parseNumber } from "@/lib/helper";
import type { CompanyStateNewInfoDto } from "@/services/erp/soliq/models";

defineProps<{ companyStateNewInfo: CompanyStateNewInfoDto[] }>();
</script>
