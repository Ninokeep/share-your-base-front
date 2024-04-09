import { EditBase } from '../../../models/edit-base';
<script setup lang="ts">
import {
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
interface EditBase {
  costWood: number;

  costStone: number;

  costMetal: number;

  costHQ: number;

  costWoodPerHour: number;

  costStonePerHour: number;

  costMetalPerHour: number;

  costHQPerHour: number;

  type: string;

  name: string;

  rating: number;
}

defineProps<EditBase>();
</script>

<template>
  <DialogContent class="sm:max-w-[800px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right"> Name </Label>
        <Input id="name" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="type" class="text-right"> Type </Label>
        <Input id="type" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="costStone" class="text-right"> Cost Stone </Label>
        <Input id="costStone" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="costStonePerHour" class="text-right">
          Cost Stone Per Hour
        </Label>
        <Input id="costStonePerHour" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="costWood" class="text-right"> Coost Wood </Label>
        <Input id="costWood" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="costWoodPerHour" class="text-right">
          Coost Wood Per Hour
        </Label>
        <Input id="costWoodPerHour" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="costMetal" class="text-right"> Cost Metal </Label>
        <Input id="costMetal" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="costMetalPerHour" class="text-right">
          Cost Metal Per Hour
        </Label>
        <Input id="costMetalPerHour" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="costHQ" class="text-right"> Cost HQ </Label>
        <Input id="costHQ" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="costHqPerHour" class="text-right"> Cost HQ Per Hour </Label>
        <Input id="costHqPerHour" class="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit"> Save changes </Button>
    </DialogFooter>
  </DialogContent>
</template>
