import React from "react"
import styles from "./Animate.module.css"

export const Animate = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AnimatedComponent = (props: P) => {
    const [isAnimated, setIsAnimated] = React.useState<boolean>(false)

    return (
      <div
        onMouseEnter={() => setIsAnimated(true)}
        onMouseLeave={() => setIsAnimated(false)}
        className={isAnimated ? styles.tadaAnimation : ""}
      >
        <WrappedComponent {...props} />
      </div>
    )
  }
  AnimatedComponent.displayName = `Animate(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`
  return AnimatedComponent
}
