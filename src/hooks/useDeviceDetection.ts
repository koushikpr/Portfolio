import { useState, useEffect } from 'react'

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  screenWidth: number
  screenHeight: number
  isLandscape: boolean
  isPortrait: boolean
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1024,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 768,
    isLandscape: typeof window !== 'undefined' ? window.innerWidth > window.innerHeight : true,
    isPortrait: typeof window !== 'undefined' ? window.innerWidth <= window.innerHeight : false,
  })

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isLandscape = width > height
      const isPortrait = width <= height

      // Mobile: width < 768px
      // Tablet: width >= 768px && width < 1024px
      // Desktop: width >= 1024px
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth: width,
        screenHeight: height,
        isLandscape,
        isPortrait,
      })
    }

    // Initial check
    updateDeviceInfo()

    // Listen for resize and orientation changes
    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure orientation change is complete
      setTimeout(updateDeviceInfo, 100)
    })

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
    }
  }, [])

  return deviceInfo
}
