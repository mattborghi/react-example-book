export type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

export type Stories = {
  data: Array<Story>,
  page: number,
  isLoading: boolean,
  isError: boolean
};

export type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

export type ListProps = {
  values: Array<Story>;
  onRemoveItem: (item: Story) => void;
};

export type typeSorts = { [elementType: string]: (list: Array<Story>) => Array<Story> };
