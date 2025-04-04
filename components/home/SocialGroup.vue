<template>
	<div
		class="bg-primary rounded-full px-2 z-30 md:flex hidden flex-col gap-4 fixed left-4 top-96 py-3"
		:class="{ 'bg-white shadow-lg ': $route.name != 'Home' }"
	>
		<a v-for="el in socials" :href="el.link">
			<CircleIcon :class="{ 'bg-primary': $route.name != 'Home' }">
				<component :is="el.image" class="fill-white" />
			</CircleIcon>
		</a>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainSettingStore } from "@/store/MainSetting";
import facebook from "@/assets/icons/social/facebook.svg?component";
import instagram from "@/assets/icons/social/instagram.svg?component";
import telegram from "@/assets/icons/social/telegram.svg?component";
import CircleIcon from "@/components/shared/CircleIcon.vue";

const MainStore = useMainSettingStore();
const { MainSetting } = storeToRefs(MainStore);

const socials = [
	{
		id: "telegram",
		link: MainSetting.value.telegram,
		image: telegram,
	},
	{
		id: "instagram",
		link: MainSetting.value.instagram,
		image: instagram,
	},
	{
		id: "facebook",
		link: MainSetting.value.facebook,
		image: facebook,
	},
];
</script>
