/**
 * Reusable KPI Card component
 */
export function KPICard({
  value,
  label,
  subtext,
  variant = 'default',
  color,
  icon = null,
  onClick = null,
  className = '',
  style = {}
}) {
  const variants = {
    default: {
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderColor: '#0ea5e9',
      textColor: '#0c4a6e'
    },
    success: {
      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      borderColor: '#10b981',
      textColor: '#065f46'
    },
    warning: {
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      borderColor: '#f59e0b',
      textColor: '#92400e'
    },
    danger: {
      background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
      borderColor: '#ef4444',
      textColor: '#991b1b'
    },
    info: {
      background: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)',
      borderColor: '#8b5cf6',
      textColor: '#4c1d95'
    }
  };

  const variantStyle = variants[variant] || variants.default;
  const borderColorToUse = color || variantStyle.borderColor;
  const textColorToUse = color || variantStyle.textColor;

  return (
    <div
      onClick={onClick}
      style={{
        background: variantStyle.background,
        borderLeft: `4px solid ${borderColorToUse}`,
        borderRadius: '8px',
        padding: '14px',
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        border: `1px solid ${borderColorToUse}20`,
        ...style
      }}
      className={className}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
      }}
    >
      {icon && <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>{icon}</div>}
      <div
        style={{
          fontSize: '0.8em',
          fontWeight: '600',
          color: textColorToUse,
          marginBottom: '4px',
          textTransform: 'uppercase'
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '1.7em',
          fontWeight: '700',
          color: textColorToUse,
          marginBottom: '4px',
          lineHeight: '1.1'
        }}
      >
        {value}
      </div>
      {subtext && (
        <div
          style={{
            fontSize: '0.7em',
            color: '#0f172a',
            lineHeight: '1.1'
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
}

/**
 * Reusable Metric Card for displaying improvement metrics
 */
export function MetricCard({
  title,
  beforeValue,
  afterValue,
  improvement,
  unit = '%',
  color = '#0ea5e9',
  icon = '📊',
  onClick = null,
  description = null
}) {
  const isPositive = improvement >= 0;

  return (
    <div
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #ffffff, #f9fafb)',
        padding: '16px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        border: `1px solid #e5e7eb`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div
          style={{
            fontSize: '1.8em',
            minWidth: '40px',
            opacity: 0.8
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: '0 0 8px 0',
              fontSize: '0.95em',
              fontWeight: '600',
              color: '#0f172a'
            }}
          >
            {title}
          </h4>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              marginBottom: '8px'
            }}
          >
            <span
              style={{
                fontSize: '0.85em',
                color: '#0f172a',
                textDecoration: 'line-through'
              }}
            >
              {beforeValue}
            </span>
            <span style={{ fontSize: '0.7em', color: '#94a3b8' }}>→</span>
            <span
              style={{
                fontSize: '1.1em',
                fontWeight: '700',
                color: color
              }}
            >
              {afterValue}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span
              style={{
                fontSize: '1.2em',
                fontWeight: '800',
                color: isPositive ? '#10b981' : '#ef4444'
              }}
            >
              {isPositive ? '↓' : '↑'} {Math.abs(improvement)}{unit}
            </span>
          </div>
          {description && (
            <p
              style={{
                fontSize: '0.75em',
                color: '#0f172a',
                margin: '8px 0 0 0'
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable Info Card for displaying detailed information
 */
export function InfoCard({
  title,
  value,
  description,
  color = '#0ea5e9',
  icon = 'ℹ️',
  onClick = null
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: `${color}10`,
        borderLeft: `4px solid ${color}`,
        padding: '16px',
        borderRadius: '8px',
        border: `1px solid ${color}20`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      <div style={{ display: 'flex', gap: '12px' }}>
        <div
          style={{
            fontSize: '1.5em',
            minWidth: '32px'
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: '0 0 4px 0',
              fontSize: '0.9em',
              fontWeight: '600',
              color: color
            }}
          >
            {title}
          </h4>
          <div
            style={{
              fontSize: '1.3em',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '6px'
            }}
          >
            {value}
          </div>
          {description && (
            <p
              style={{
                fontSize: '0.8em',
                color: '#0f172a',
                margin: 0,
                lineHeight: '1.4'
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


