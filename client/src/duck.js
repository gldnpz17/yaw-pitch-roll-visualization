import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Duck(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/duck.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RubberDuck_mesh.geometry}
        material={materials.RubberDuck_mat1}
      />
    </group>
  )
}