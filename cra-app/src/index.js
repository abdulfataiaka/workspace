import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './main.css';
// import App from './App';
// import DragAndDrop from './DragAndDrop';
import Members from './Members';

const RenderComponent = Members;

ReactDOM.createRoot(document.getElementById('root')).render(<RenderComponent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
