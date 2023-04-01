enum BlockType {
  BASIC = 'text',
  IMAGE = 'img',
  TABLE = 'table',
  BULLET_LIST = 'bullet-list',
  ORDERED_LIST = 'ordered-list',
}

export interface Block {
  id: string;
  content: string | null;
  type: BlockType;
}
