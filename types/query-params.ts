export interface QueryParams {
  costWood: number;

  name: string;

  costStone: number;

  costMetal: number;

  costHQ: number;

  costWoodPerHour: number;

  costStonePerHour: number;

  costMetalPerHour: number;

  costHQPerHour: number;

  type: "attack" | "hybrid" | "defensive";

  users: number;

  rating: number;
}
