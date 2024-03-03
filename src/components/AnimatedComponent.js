import React from 'react'
import { motion } from 'framer-motion'

// default animation
const defaultAnimation = {
    initial: {
        opacity: 0,
        y: "20%",
        scale: "80%",
    },
    animate: {
        opacity: 1,
        y: "0%",
        scale: "100%",
    },
    exit: {
        opacity: 0,
        y: "-20%",
        scale: "80%"
    }
}

const defaultTransition = {duration: 0.5, ease: "easeInOut"}

function AnimatedComponent({ children, animation=defaultAnimation, transition=defaultTransition }) {
  return (
    <motion.div
        variants={animation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        exitbeforeEnter
    >
        {children}
    </motion.div>
  )
}

export default AnimatedComponent