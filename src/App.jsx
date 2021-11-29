import { useState, useEffect } from 'react'
import './App.css'

var lastUpdate = performance.now()

function App() {
  const [gold, setGold] = useState(0)
  const [crops, setCrops] = useState({})

  const growParsnips = () => {
    setCrops((crops) => {
      crops["parsnips"] = 2000
      return crops
    })
  }
  //https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
  // if you want to impove game loop/update time
  const tick = (now) => {
    const delta = now - lastUpdate
    console.log(delta)
    lastUpdate = now

    //Game loop here:
    setCrops((crops) => {
      crops["parsnips"] -= delta
      return crops
    })
    if (crops["parsnips"] <= 0){
      setGold((gold) => gold + 30)
      setCrops((crops) => {
        delete crops["parsnips"]
        return crops
      })
    }   
    window.requestAnimationFrame(tick)
  }

  useEffect(() => {
    console.log("game start")
    tick(lastUpdate)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button type="button" onClick={() => setGold((gold) => gold + 1)}>
            gold is: {gold}
          </button>
          <button type="button" onClick={growParsnips}>
            grow parsnips!
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
