import { useState, useEffect, useRef, Children } from 'react'
import './App.css'

const cropData = {
  parsnips: {
    cost: 20,
    growTime: 4000,
    sellPrice: {
      base: 35
      //add more prices here
    }
  },
  cauliflower: {
    cost: 80,
    growTime: 12000,
    sellPrice: {
      base: 175
    }
  }
}

function App() {
  const lastUpdate = useRef(performance.now())
  const [gold, setGold] = useState(500)
  const [crops, setCrops] = useState({})
  // Add new "should repeat" object
  // {
  //   parsnips: true, 
  // }

  const growCrop = (crop) => {
    return () => {
      //toggle the "should repeat" state for this crop 
      if(gold > cropData[crop].cost){
        setGold((gold) => gold - cropData[crop].cost)
  
        setCrops((crops) => {
          crops[crop] = cropData[crop].growTime
          return crops
        })
      }
    }
  }
  //https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
  // if you want to impove game loop/update time
  const tick = (now) => {
    const delta = now - lastUpdate.current
    lastUpdate.current = now

    //Game loop here:
    for(const crop in cropData){
      setCrops((crops) => {
        crops[crop] -= delta
        return crops
      })
      if (crops[crop] <= 0){
        setGold((gold) => gold + cropData[crop].sellPrice.base)
        setCrops((crops) => {
          delete crops[crop]
          return crops
        })
        console.log(gold, cropData[crop])
        //add a check if 'should repeat' has key 'crop'
        if(gold > cropData[crop].cost){
          growCrop(crop)()
        }
      }   
    }

    window.requestAnimationFrame(tick)
  }

  useEffect(() => {
    tick(lastUpdate.current)
  }, [])

  return (
    <div className="container mx-auto p-4 flex flex-wrap gap-4">
      <Button onClick={() => setGold((gold) => gold + 1)}>
        gold is: {gold}
      </Button>
      <Button onClick={growCrop("parsnips")}>
        Grow Parsnips!
      </Button>
      <Button onClick={growCrop("cauliflower")}>
        Grow Cauliflower!
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
