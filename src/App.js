import React from "react";
import User from "./components/User";
import Input from "./components/Input";

function App() {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState("");
  const [counter, setCounter] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");

  const increment = () => {
    setCounter((prevCounter) => (prevCounter += 1));
  };

  const decrement = () => {
    setCounter((prevCounter) => (prevCounter -= 1));
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
      <ul className="animals">
        <li>Cat</li>
        <li>Whale</li>
        <li>Lion</li>
        <li>Elephant</li>
        <li>Rhino</li>
      </ul>
      <Input handleChange={handleChange} inputValue={inputValue} />
      <div>{user ? <User user={user} /> : <span>Loading...</span>}</div>
      <h2 data-testid="counter">{counter}</h2>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default App;
