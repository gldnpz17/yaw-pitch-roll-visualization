import logo from './logo.svg';
import './App.css';
import { Suspense, useEffect, useState } from 'react';
import PaperPlane from './PaperPlane';
import { Environment, OrbitControls, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Duck from './duck';

function App() {
  const [rotation, setRotation] = useState([0,0,0])

  useEffect(() => {
    listenForFlightData()
  }, [])

  const listenForFlightData = async () => {
    let response = await fetch('/flight-data')

    let reader = response.body.getReader()
    let decoder = new TextDecoder()

    while (true) {
      let { done, value } = await reader.read()

      if (done) {
        console.log('End of flight data stream.')
      }

      let decodedData = decoder.decode(value)

      console.log('data received', decodedData)

      let data = JSON.parse(decodedData)

      setRotation(data.rotation)
    }
  }

  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Duck position={[0,0,0]} rotation={rotation} scale={[1,1,1]} />
          <ambientLight intensity={0.9} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
