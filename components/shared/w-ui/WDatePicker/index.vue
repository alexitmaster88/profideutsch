<template>
	<DatePicker v-model.string="innerVal" :masks="masks" locales="ru" :mode="mode">
		<template #default="{ inputValue, inputEvents }">
			<WInput :model-value="inputValue" :label="label" :placeholder="placeholder" :required="required" :error="error" v-on="inputEvents" />
		</template>
	</DatePicker>
</template>

<script setup lang="ts">
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";
import WInput from "../WInput";
import { computed } from "vue";

defineOptions({
	inheritAttrs: false,
});

type IProps = {
	modelValue: any;
	label: string;
	placeholder?: string;
	required?: boolean;
	masks?: Record<string, any>;
	mode?: any;
	error?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
	label: "",
	masks: {
		// @ts-ignore
		input: "DD.MM.YYYY",
		modelValue: "DD.MM.YYYY",
	},
	mode: "date",
	error: false,
});

const emit = defineEmits(["update:modelValue"]);

const innerVal = computed({
	get() {
		return props.modelValue;
	},
	set(v) {
		emit("update:modelValue", v);
	},
});
</script>
