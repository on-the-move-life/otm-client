import React from 'react'
import { IoIosArrowBack } from "react-icons/io";

function BackButton({size, color="#7e87ef", className, action}) {
  return (
    <IoIosArrowBack size={size} color={color} onClick={action} className={className}/>
  )
}

export default BackButton