import { memo } from "react";

import { Button } from "../../components/button/Button";

import { ReactComponent as Check } from "../../assets/check.svg";

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
}

export type Stories = Array<Story>;

type ListProps = {
  values: Stories;
  onRemoveItem: (item: Story) => void;
}

function Item({ item, onRemoveItem } : ItemProps ) {
  const { objectID, url, title, author } = item;
  return (
    <li className="item" key={objectID}>
      <span style={{ width: "60%" }}>
        <a href={url}>{title}</a>
      </span>
      <span style={{ width: "30%" }}>{author}</span>
      <span style={{ width: "10%" }}>
        <Button onClick={() => onRemoveItem(item)}>
          <Check width="18px" height="18px" />
        </Button>
      </span>
    </li>
  );
}

export function List({ values, onRemoveItem }: ListProps) {
  return (
    <ul>
      {values.map((item) => {
        return (
          <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
        );
      })}
    </ul>
  );
}

export const MemoizedList = memo(List);
