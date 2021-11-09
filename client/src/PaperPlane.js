
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function PaperPlane(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/paper-plane.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials.White} />
    </group>
  )
}