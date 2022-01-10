import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const filterToDos = (category: IToDo["category"]) => {
      return toDos.filter((toDo) => toDo.category === category);
    };
    return {
      TO_DO: filterToDos("TO_DO"),
      DOING: filterToDos("DOING"),
      DONE: filterToDos("DONE"),
    };
  },
});
