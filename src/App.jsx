import { useState, useEffect, useRef, Children } from 'react'
import './App.css'

function App() {
  const lastUpdate = useRef(performance.now())
  const [gold, setGold] = useState(500)
  const [crops, setCrops] = useState({})

  const growParsnips = () => {
    if(gold > 20){
      setGold((gold) => gold - 20)

      setCrops((crops) => {
        crops["parsnips"] = 4000
        return crops
      })
    }
  }
  //https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
  // if you want to impove game loop/update time
  const tick = (now) => {
    const delta = now - lastUpdate.current
    console.log(delta)
    lastUpdate.current = now

    //Game loop here:
    setCrops((crops) => {
      crops["parsnips"] -= delta
      return crops
    })
    if (crops["parsnips"] <= 0){
      setGold((gold) => gold + 35)
      setCrops((crops) => {
        delete crops["parsnips"]
        return crops
      })
    }   
    window.requestAnimationFrame(tick)
  }

  useEffect(() => {
    console.log("game start")
    tick(lastUpdate.current)
  }, [])

  return (
    <div className="container mx-auto p-4 flex flex-wrap gap-4">
      <Button onClick={() => setGold((gold) => gold + 1)}>
        gold is: {gold}
      </Button>
      <Button onClick={growParsnips}>
        grow parsnips!
      </Button>
    </div>
  )
}

const Button = ({children, ...props}) => {
  return (
    <button className="bg-blue-300 px-4 py-2 text-2xl font-semibold text-blue-700" type="button" {...props}>
      {children}
    </button>
  )
}

export default App
