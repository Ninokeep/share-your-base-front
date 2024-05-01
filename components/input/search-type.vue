<script setup lang="ts">
const props = defineProps<{
  items?: string[];
  placeholder: string;
  isRating: boolean;
  label: string;
  searchQueryName: SearchQueryType;
}>();

const emits = defineEmits<{
  (e: "change:modelValue", value: { [key: string]: string | null }): void;
}>();
const selectedValue = ref("");

function updateSelectedValue(data: string) {
  switch (props.searchQueryName) {
    case "name":
      setSelectedValue(data);
      break;
    case "rating":
      setSelectedValue(data);
      break;
    case "type":
      setSelectedValue(data);
      break;
    case "costHQ":
      setSelectedValue(data);
      break;
    case "costHQPerHour":
      setSelectedValue(data);
      break;
    case "costMetal":
      setSelectedValue(data);
      break;
    case "costMetalPerHour":
      setSelectedValue(data);
      break;
    case "costStone":
      setSelectedValue(data);
      break;
    case "costStonePerHour":
      setSelectedValue(data);
      break;
    case "costWood":
      setSelectedValue(data);
      break;
    case "costWoodPerHour":
      setSelectedValue(data);
      break;

    default:
      break;
  }
}

function setSelectedValue(data: string) {
  if (selectedValue.value === data) {
    selectedValue.value = "";
    emits("change:modelValue", {
      [props.searchQueryName]: null,
    });
  } else {
    selectedValue.value = data;
    emits("change:modelValue", {
      [props.searchQueryName]: selectedValue.value,
    });
  }
}
</script>

<template>
  <div class="w-[150px] mx-4 my-5">
    <Select
      :model-value="selectedValue"
      @update:model-value="(data) => updateSelectedValue(data)"
    >
      <SelectTrigger>
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectLabel>{{ props.label }}</SelectLabel>
        <SelectGroup v-for="item in items">
          <SelectItem :value="item">
            <span v-if="!isRating">{{ item }}</span>
            <Icon
              size="16"
              name="material-symbols:stars"
              class="text-amber-500"
              v-else
              v-for="nbr in Number(item)"
            />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
