import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ title, isVisible }) {
  const [show, setShow] = useState(false);
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    setPortalNode(document.body);
  }, []);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 600); // 0.6 seconds total duration
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible]);

  if (!portalNode) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#b91c1c] overflow-hidden shadow-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-white text-5xl md:text-7xl font-black tracking-tight uppercase text-center"
          >
            {title}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalNode
  );
}
