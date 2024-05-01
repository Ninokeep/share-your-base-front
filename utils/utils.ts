export const BASE_TYPES = ["attack", "defense", "hybrid"];
export const RATINGS = ["1", "2", "3", "4", "5"];
export type SearchQueryType =
  | "costWood"
  | "name"
  | "costStone"
  | "costMetal"
  | "costHQ"
  | "costWoodPerHour"
  | "costStonePerHour"
  | "costMetalPerHour"
  | "costHQPerHour"
  | "type"
  | "rating";