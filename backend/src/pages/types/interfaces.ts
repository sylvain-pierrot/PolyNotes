export enum BlockType {
  TEXT = "text",
  IMAGE = "img",
  TABLE = "table",
  BULLET_LIST = "bullet-list",
  ORDERED_LIST = "ordered-list",
  TO_DO_LIST = "to-do-list",
  HEADING_1 = "heading-1",
  HEADING_2 = "heading-2",
  HEADING_3 = "heading-3",
  SUB_PAGE = "sub-page",
}

export interface Block {
  id: string;
  content: string | null;
  type: BlockType;
}
