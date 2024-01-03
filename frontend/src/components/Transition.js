import React from 'react'
import {motion} from "framer-motion"

const Transition = () => {
  return (
    <>
     <motion.div className='fixed top-0 bottom-0 right-full w-screen z-30 bg-red'
     initial={{x:"100%",width:"100%"}}
     animate={{x:"0%",width:"0%"}}
     exit={{x:["0%","100%"],width:["0%","100%"]}}
     transition={{duration:0.8,ease:"easeInOut"}}
     /> 
     <motion.div className='fixed top-0 bottom-0 right-full w-screen z-20 bg-blue'
     initial={{x:"100%",width:"100%"}}
     animate={{x:"0%",width:"0%"}}
     transition={{delay:0.2, duration:0.8,ease:"easeInOut"}}
     /> 
     <motion.div className='fixed top-0 bottom-0 right-full w-screen z-10 bg-green'
     initial={{x:"100%",width:"100%"}}
     animate={{x:"0%",width:"0%"}}
     transition={{delay:0.4,duration:0.8,ease:"easeInOut"}}
     /> 
    </>
  )
}

export default Transition
