import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const data = [{
  id: 0,
  title: "React App",
  name: "Matias",
},
{
  id: 1,
  title: "React App 2",
  name: "Another name",
},
{
  id: 2,
  title: "React App 3",
  name: "Another name",
},
{
  id: 3,
  title: "React App 4",
  name: "Another name",
}]

ReactDOM.render(
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
