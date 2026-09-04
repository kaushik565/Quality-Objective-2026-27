import { useEffect } from 'react'
import Reveal from 'reveal.js'
import TitleSlide from './slides/TitleSlide'
import ExecutiveSummary from './slides/ExecutiveSummary'
import EfficiencyGains from './slides/EfficiencyGains'
import ImprovementStory from './slides/ImprovementStory'
import EmptySlide from './slides/EmptySlide'
import LineClearance from './slides/LineClearance'
import IncidentTrend from './slides/IncidentTrend'
import CalibrationThroughput from './slides/CalibrationThroughput'
import CartridgeAssembly from './slides/CartridgeAssembly'
import DeviceAssembly from './slides/DeviceAssembly'
import ValidationReports from './slides/ValidationReports'
import ProcessImprovements from './slides/ProcessImprovements'
import ClosingSlide from './slides/ClosingSlide'

export default function Presentation() {
  useEffect(() => {
    let deck = null
    let timer = null

    // Small delay to ensure all sections are rendered
    timer = setTimeout(() => {
      const revealElement = document.querySelector('.reveal')
      
      if (revealElement) {
        deck = new Reveal(revealElement, {
          embedded: false,
          progress: true,
          history: true,
          center: false,
          transition: 'convex',
          transitionSpeed: 'default',
          slideNumber: 'c/t',
          keyboard: true,
          overview: true,
          touch: true,
          loop: false,
          rtl: false,
          navigationMode: 'default',
          shuffle: false,
          fragments: true,
          fragmentInURL: true,
          help: true,
          showNotes: false,
          autoPlayMedia: null,
          preloadIframes: null,
          autoSlide: 0,
          autoSlideStoppable: true,
          mouseWheel: false,
          hideInactiveCursor: true,
          hideCursorTime: 5000,
          disableLayout: false,
          width: 1920,
          height: 1080,
          margin: 0.04,
          minScale: 0.2,
          maxScale: 2.0,
          parallaxBackgroundImage: '',
          parallaxBackgroundSize: '',
          backgroundTransition: 'fade'
        })

        deck.initialize()
      }
    }, 150)

    return () => {
      if (timer) clearTimeout(timer)
      if (deck) deck.destroy()
    }
  }, [])

  return (
    <>
      <div className="corner-logo" aria-hidden="true">
        <img src="https://new.molbiodiagnostics.com/mailSignature/png/Molbio_Logo.png" alt="Molbio Diagnostics Limited" />
      </div>
      <TitleSlide />
      <ExecutiveSummary />
      <EfficiencyGains />
      <ImprovementStory />
      <IncidentTrend />
      <LineClearance />
      <CalibrationThroughput />
      <CartridgeAssembly />
      <DeviceAssembly />
      <ValidationReports />
      <ProcessImprovements />
      <ClosingSlide />
    </>
  )
}
