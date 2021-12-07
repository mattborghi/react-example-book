import { memo, useState } from "react";
import { sortBy } from "lodash";

import { Button } from "../../components/button/Button";

import { ReactComponent as Check } from "../../assets/check.svg";

import "./List.css";

export type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

export type Stories = Array<Story>;

type ListProps = {
  values: Stories;
  onRemoveItem: (item: Story) => void;
};

type typeSorts = { [elementType: string]: (list: Stories) => Stories; };

const SORTS : typeSorts = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, "title"),
  AUTHOR: (list) => sortBy(list, "author"),
  COMMENTS: (list) => sortBy(list, "num_comments"),
  POINTS: (list) => sortBy(list, "points"),
};

export function Item({ item, onRemoveItem }: ItemProps) {
  const { url, title, author, num_comments, points } = item;
  return (
    <li className="List item">
      <span className="title">
        <a href={url}>{title}</a>
      </span>
      <span className="author">{author}</span>
      <span className="comments">{num_comments}</span>
      <span className="points">{points}</span>
      <span className="actions">
        <Button onClick={() => onRemoveItem(item)}>
          <Check width="18px" height="18px" />
        </Button>
      </span>
    </li>
  );
}

export function List({ values, onRemoveItem }: ListProps) {
  const [sort, setSort] = useState<keyof typeof SORTS>("NONE");
  const handleSort = (key: keyof typeof SORTS) => {
    setSort(key);
  };

  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(values);

  return (
    <div>
      <div className="List item">
        <span className="title">
          <button type="button" onClick={() => handleSort("TITLE")}>
            Title
          </button>
        </span>
        <span className="author">
          <button type="button" onClick={() => handleSort("AUTHOR")}>
            Author
          </button>
        </span>
        <span className="comments">
          <button type="button" onClick={() => handleSort("COMMENTS")}>
            Comments
          </button>
        </span>
        <span className="points">
          <button type="button" onClick={() => handleSort("POINTS")}>
            Points
          </button>
        </span>
        <span className="actions">Actions</span>
      </div>
      {sortedList.map((item) => {
        return (
          <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
        );
      })}
    </div>
  );
}

export const MemoizedList = memo(List);
