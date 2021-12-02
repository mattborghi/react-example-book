export function List({values, displayCallback}) {
    return (
        <ul>
        {values.map(item => {
          const { id, title, name } = item;
          return (

            <li className="App-item" key={id}>
              {displayCallback(id) &&
                <>
                  <h1>{title}</h1>
                  <h2>Hello {name}!</h2>
                </>
              }
            </li>
          )
        })}
      </ul>
    )
}