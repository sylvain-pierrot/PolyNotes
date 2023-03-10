// import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

// export const removeAtIndex = (array: Array<any>, index: number) => {
//   return [...array.slice(0, index), ...array.slice(index + 1)];
// };

// export const insertAtIndex = (
//   array: Array<any>,
//   index: number,
//   item: HTMLElement
// ) => {
//   return [...array.slice(0, index), item, ...array.slice(index)];
// };

// export const arrayMove = (
//   array: Array<any>,
//   oldIndex: number,
//   newIndex: number
// ) => {
//   return dndKitArrayMove(array, oldIndex, newIndex);
// };

export function createRange<T>(
  length: number,
  initializer: (index: number) => T
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}
