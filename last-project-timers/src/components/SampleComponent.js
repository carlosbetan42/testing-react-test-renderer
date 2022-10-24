import React, { useState } from 'react';
import { useTimeout } from './useTimeout';

const SampleComponent = () => {
  const [data, setData] = useState([]);

  useTimeout(async () => {
    if (data.length) return;
    try {
      const result = await fetch("https://jsonplaceholder.typicode.com/users");
      const response = await result.json();

      setData(response);
      localStorage.setItem("users", JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
  }, 5000);

  return (
    <div>
      <h4>Users Component</h4>
      {data?.map((value) => (
        <div key={value.id}>
          <p>{value.name}</p>
        </div>
      ))}
    </div>
  )
}

export default SampleComponent;