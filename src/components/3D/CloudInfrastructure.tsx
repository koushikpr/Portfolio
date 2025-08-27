import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, Box, Cylinder, Line } from '@react-three/drei'
import * as THREE from 'three'

const CloudInfrastructure = () => {
  const groupRef = useRef<THREE.Group>(null)

  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  // Connection lines between nodes
  const connections = useMemo(() => {
    const lines = []
    const positions = [
      [-4, 2, 0], [0, 3, 0], [4, 2, 0],
      [-2, 0, 2], [2, 0, 2],
      [0, -2, 0], [-3, -1, -2], [3, -1, -2]
    ]

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (Math.random() > 0.6) {
          lines.push([positions[i], positions[j]])
        }
      }
    }
    return lines
  }, [])

  return (
    <group ref={groupRef}>
      {/* Main Cloud Servers */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Box position={[-4, 2, 0]} args={[1, 1.5, 1]}>
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.2} />
        </Box>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.7}>
        <Box position={[0, 3, 0]} args={[1.2, 1.8, 1.2]}>
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.2} />
        </Box>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <Box position={[4, 2, 0]} args={[1, 1.5, 1]}>
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.2} />
        </Box>
      </Float>

      {/* Database Cylinders */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Cylinder position={[-2, 0, 2]} args={[0.5, 0.5, 1.5, 8]}>
          <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={0.3} />
        </Cylinder>
      </Float>

      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.5}>
        <Cylinder position={[2, 0, 2]} args={[0.5, 0.5, 1.5, 8]}>
          <meshStandardMaterial color="#0891b2" emissive="#0891b2" emissiveIntensity={0.3} />
        </Cylinder>
      </Float>

      {/* Load Balancer */}
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
        <Sphere position={[0, -2, 0]} args={[0.8, 16, 16]}>
          <meshStandardMaterial color="#5eead4" emissive="#5eead4" emissiveIntensity={0.4} />
        </Sphere>
      </Float>

      {/* Edge Nodes */}
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.3}>
        <Box position={[-3, -1, -2]} args={[0.6, 0.6, 0.6]}>
          <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={0.2} />
        </Box>
      </Float>

      <Float speed={1.9} rotationIntensity={0.5} floatIntensity={0.4}>
        <Box position={[3, -1, -2]} args={[0.6, 0.6, 0.6]}>
          <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={0.2} />
        </Box>
      </Float>

      {/* Connection Lines */}
      {connections.map((connection, index) => (
        <Line
          key={index}
          points={connection}
          color="#14b8a6"
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      ))}

      {/* Floating Data Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float
          key={i}
          speed={3 + Math.random() * 2}
          rotationIntensity={1}
          floatIntensity={2}
        >
          <Sphere
            position={[
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8
            ]}
            args={[0.05, 8, 8]}
          >
            <meshStandardMaterial
              color={Math.random() > 0.5 ? "#14b8a6" : "#22d3ee"}
              emissive={Math.random() > 0.5 ? "#14b8a6" : "#22d3ee"}
              emissiveIntensity={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

export default CloudInfrastructure
