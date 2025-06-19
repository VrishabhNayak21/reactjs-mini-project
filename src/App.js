import React from 'react';


import Todo from './component/Todo app/todo';
// or 
import Temp from './component/weather app/temp';  

const App = () => {
  return (
    <div>
      <Todo /> 
      {/* or  */}
      <Temp/>
    </div>
  );
};

export default App;
