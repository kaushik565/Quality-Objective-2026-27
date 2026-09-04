import React, { useEffect, useRef, useState, lazy, Suspense } from 'react'
import Reveal from 'reveal.js'
import ErrorBoundary from './ErrorBoundary'
import PresentationSelector from './components/PresentationSelector'
import SlideSkeleton from './components/SlideSkeleton'

// Lazy loaded slides
const IntroSlides = lazy(() => import('./slides/IntroSlides'))
const QualityObjectivesSlide = lazy(() => import('./slides/QualityObjectivesSlide'))
const defaultDarkLogo = 'https://raw.githubusercontent.com/kaushik565/KAushikMRMNEW/master/public/logo.png'
const defaultLightLogo = 'https://www.molbiodiagnostics.com/wp-content/uploads/2025/01/footer-logo.png'

export default function Presentation() {
  const deckRef = useRef(null)
  const timerRef = useRef(null)
  const [selectedDepartment, setSelectedDepartment] = useState('QA')
  const [currentLogo, setCurrentLogo] = useState(defaultLightLogo)

  return (
    <>
      {/* Show corner logo only when presentation is active */}
      {selectedDepartment && (
        <div className="corner-logo" aria-hidden="true">
          <img 
            src={currentLogo} 
            alt="Molbio Logo" 
            className="transition-opacity duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src = defaultDarkLogo }}
          />
        </div>
      )}
      
      {/* QA Presentation */}
      {selectedDepartment === 'QA' && (
        <Suspense fallback={<SlideSkeleton />}>
          <ErrorBoundary>
            <IntroSlides />
            <QualityObjectivesSlide />
          </ErrorBoundary>
          <RevealInitializer 
            selectedDepartment={selectedDepartment} 
            setCurrentLogo={setCurrentLogo} 
            defaultLightLogo={defaultLightLogo} 
            defaultDarkLogo={defaultDarkLogo} 
          />
        </Suspense>
      )}

    </>
  )
}

function RevealInitializer({ selectedDepartment, setCurrentLogo, defaultLightLogo, defaultDarkLogo }) {
  const deckRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!selectedDepartment) return;
    
    const handleSlideState = () => {
      if (!deckRef.current) return
      const currentSlide = deckRef.current.getCurrentSlide()
      if (currentSlide) {
        const isTitle = currentSlide.getAttribute('data-state') === 'title-slide'
        const isClosing = currentSlide.getAttribute('data-state') === 'closing-slide'
        const isQO    = currentSlide.getAttribute('data-state') === 'quality-objectives'
        const bgColor = currentSlide.getAttribute('data-background-color')
        document.body.classList.toggle('hide-corner-logo', !!isTitle || !!isClosing)
        document.body.classList.toggle('logo-bottom-right', false) // QO slide logo stays top-right
        if (isQO) window.dispatchEvent(new CustomEvent('qualityObjectivesActive'))
        
        const logoOverride = currentSlide.getAttribute('data-logo')
        if (logoOverride === 'light') {
          setCurrentLogo(defaultLightLogo)
        } else if (logoOverride === 'dark' || bgColor === '#ffffff' || bgColor === '#f8fafc' || bgColor === '#f3f4f6') {
          setCurrentLogo(defaultDarkLogo)
        } else {
          setCurrentLogo(defaultLightLogo)
        }
      }

      window.dispatchEvent(new CustomEvent('closeAllModals'))

      if (currentSlide) {
        currentSlide.scrollTop = 0
        const scrollableElements = currentSlide.querySelectorAll('div[style*="overflow"], div[style*="scroll"]')
        scrollableElements.forEach(el => { el.scrollTop = 0 })
        const contentWrappers = currentSlide.querySelectorAll('.slide-content, section, [class*="container"]')
        contentWrappers.forEach(el => { el.scrollTop = 0 })
      }
    }

    const handleKeydown = (e) => {
      const deck = deckRef.current
      if (!deck) return
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        const elem = document.documentElement
        if (!document.fullscreenElement) {
          if (elem.requestFullscreen) {
            elem.requestFullscreen()
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen()
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen()
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen()
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          }
        }
      }
    }

    timerRef.current = setTimeout(() => {
      const revealElement = document.querySelector('.reveal')

      if (revealElement) {
        const deck = new Reveal(revealElement, {
          embedded: false,
          progress: false,
          history: true,
          center: false,
          view: 'scroll',
          scrollProgress: true,
          transition: 'fade',
          transitionSpeed: 'fast',
          slideNumber: false,
          keyboard: { 70: null, 83: null }, // disable Reveal's F (custom fullscreen toggle) and S (used for Spotlight)
          overview: true,
          touch: true,
          loop: false,
          rtl: false,
          navigationMode: 'linear',
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
          controls: false,
          controlsTutorial: false,
          disableLayout: false,
          width: 1920,
          height: 1080,
          margin: 0,
          minScale: 0.2,
          maxScale: 2.0,
          viewDistance: 3,
          mobileViewDistance: 2,
          pdfMaxPagesPerSlide: 1,
          pdfPageHeightOffset: 0,
        });

        deck.initialize().then(() => {
          deckRef.current = deck;
          
          const handleWheel = (e) => {
            const isScrollable = e.target.closest('.overflow-y-auto, .overflow-auto, .overflow-x-auto');
            if (!isScrollable) {
              e.preventDefault();
            }
          };

          window.addEventListener('wheel', handleWheel, { passive: false });

          deck.on('ready', () => {
            deck.slide(0, 0, 0);
            handleSlideState();
            
            // Sync Reveal.js when React.lazy inserts new slides
            const observer = new MutationObserver(() => {
              deck.sync();
              setTimeout(() => deck.layout?.(), 50);
            });
            const slidesDom = document.querySelector('.slides');
            if (slidesDom) {
              observer.observe(slidesDom, { childList: true });
            }
          });
          
          deck.on('slidechanged', handleSlideState);

          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 100);

          document.addEventListener('keydown', handleKeydown);

          deck.on('destroy', () => {
            window.removeEventListener('wheel', handleWheel);
            document.removeEventListener('keydown', handleKeydown);
          });
        });
      }
    }, 150)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      document.body.classList.remove('hide-corner-logo')

      const deck = deckRef.current
      if (deck) {
        deck.off('ready', handleSlideState)
        deck.off('slidechanged', handleSlideState)
        deck.destroy()
        deckRef.current = null
      }
    }
  }, [selectedDepartment, setCurrentLogo, defaultLightLogo, defaultDarkLogo])

  return null;
}

