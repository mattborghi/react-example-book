import { Button } from '../../components/button/Button.js';

function Item({ item, onRemoveItem }) {
  const { id, title, name } = item;
  return (
    <li className="App-item" key={id}>

      <h1>{title}</h1>
      <h2>Hello {name}!</h2>
      <Button title="Remove" onClick={() => onRemoveItem(item)} />
    </li>
  )
}

export function List({ values, onRemoveItem }) {
  return (
    <ul>
      {values.map(item => {
        return <Item key={item.id} item={item} onRemoveItem={onRemoveItem} />
      })}
    </ul>
  )
}