// import { useState } from 'react'
// import ToggleButton from './components/Lesson_1/ToggleButton'
// import InputPreview from './components/Lesson_1/InputPreview';
import UsersList from './components/Lesson_1/UsersList';
// import UsersWithMapAndFilter from './components/Lesson_1/UsersWithMapAndFilter';

function App() {
  // const [count, setCount] = useState<number>(0);

  // const increase = () => {
  //   setCount(count + 1)
  // }

  // const decrease = () => {
  //   setCount(count - 1)
  // }
  
  return (
    <div>
      {/* <h1>Counter: {count}</h1>
      <button onClick={increase} style={{ marginRight: '10px' }}>
        Increase
      </button>
      <button onClick={decrease}>Decrease</button> */}
      {/* <ToggleButton /> */}

      {/* <InputPreview /> */}

      <UsersList />
      {/* <UsersWithMapAndFilter /> */}
    </div>
  )

}

export default App
