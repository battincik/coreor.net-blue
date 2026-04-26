import { useEffect, useState } from "react"

export function useCounter(target: number, duration = 2000, isActive = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    let current = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, isActive])

  return count
}
