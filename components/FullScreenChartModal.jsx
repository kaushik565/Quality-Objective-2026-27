import React from 'react'

export default function FullScreenChartModal({ open, onClose, image, title }) {
  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={e => e.stopPropagation()}>
        <h3 className="expanded-table-title">
          {title || 'Chart Fullscreen View'}
          <button className="modal-close" onClick={onClose} aria-label="Close full screen chart" style={{ float: 'right', marginTop: '-5px' }}>×</button>
        </h3>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', overflow: 'auto' }}>
          {image ? (
            <img src={image} alt={title || 'Chart expanded view'} style={{ maxWidth: '98%', maxHeight: '95%', objectFit: 'contain', borderRadius: '8px' }} />
          ) : (
            <div style={{ color: '#999', fontSize: '1.1em' }}>Loading chart...</div>
          )}
        </div>
      </div>
    </div>
  )
}

