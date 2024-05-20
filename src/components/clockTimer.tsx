import React from 'react'
import Clock from './ui/clock'

const ClockTimer = () => {
  return (
    <span className="fixed top-[39rem] right-6 z-50">
        <Clock dark_sdw="#9ec7f9dc" size="70px" light_sdw="#c7dcf8" box_sdw="#00ffff45" second_color="#0004ff" outline_color="#332a37" />
    </span>
  )
}

export default ClockTimer
