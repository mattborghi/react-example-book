import { Button } from '../../components/button/Button.js';

import { ReactComponent as Check } from '../../assets/check.svg';

function Item({ item, onRemoveItem }) {
  const { id, url, title, author } = item;
  return (
    <li className="item" key={id}>

      <span style={{ width: '60%' }}>
        <a href={url}>{title}</a>
      </span>
      <span style={{ width: '30%' }}>{author}</span>
      <span style={{ width: '10%' }}>
        <Button onClick={() => onRemoveItem(item)}><Check width="18px" height="18px"/></Button>
      </span>
    </li>
  )
}

export function List({ values, onRemoveItem }) {
  return (
    <ul>
      {values.map(item => {
        return <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      })}
    </ul>
  )
}