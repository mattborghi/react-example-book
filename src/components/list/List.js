import { Button } from '../../components/button/Button.js';

import './List.css';

function Item({ item, onRemoveItem }) {
  const { id, title, author } = item;
  return (
    <li className="List-item" key={id}>

      <strong>{title}</strong>
      <p>Hello {author}!</p>
      <Button title="Remove" onClick={() => onRemoveItem(item)} />
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