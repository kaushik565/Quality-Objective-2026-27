/**
 * Global constants for the MRMNEW presentation
 * Centralized configuration for colors, timeouts, and other magic values
 */

// ============================================================================
// COLOR THEME
// ============================================================================

export const SITE_COLORS = {
    SITE_I: '#dc2626',
    SITE_III: '#8b5cf6',
    SITE_V: '#0ea5e9'
};

export const CATEGORY_COLORS = {
    Incidents: '#ef4444',
    CA: '#8b5cf6',
    PA: '#f59e0b',
    OOS: '#f97316',
    CC: '#3b82f6',
    Investigation: '#10b981'
};

export const STATUS_COLORS = {
    Excellent: '#10b981',
    Good: '#3b82f6',
    Fair: '#f59e0b',
    Poor: '#ef4444'
};

export const UTILITY_COLORS = {
    Primary: '#b91c1c',
    Secondary: '#ef4444',
    Dark: '#111827',
    Mid: '#4b5563',
    Muted: '#6b7280',
    Light: '#f5f5f5',
    Accent: '#d1d5db',
    Success: '#10b981',
    Warning: '#f59e0b',
    Error: '#ef4444'
};

// ============================================================================
// TIMING & TRANSITIONS
// ============================================================================

export const TIMEOUTS = {
    // Reveal.js initialization delay (ms)
    // Accounts for component mounting and section rendering
    SLIDE_INIT: 150,

    // Layout recalculation after navigation (ms)
    // Allows browser to complete paint cycle
    LAYOUT_RECALC: 50,

    // Debounce delay for resize handlers (ms)
    DEBOUNCE: 300,

    // Transition duration for modals (ms)
    MODAL_TRANSITION: 300,

    // Scroll behavior timing (ms)
    SCROLL_SMOOTH: 500,

    // Hover state delay (ms)
    HOVER_DELAY: 100
};

// ============================================================================
// REVEAL.JS CONFIGURATION
// ============================================================================

export const REVEAL_CONFIG = {
    embedded: false,
    progress: true,
    history: true,
    center: false,
    transition: 'fade',
    transitionSpeed: 'fast',
    slideNumber: 'c/t',
    keyboard: false,
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
    // Increased from 2 to 3 to preload more slides
    // Prevents flicker when jumping between distant slides
    viewDistance: 3,
    mobileViewDistance: 2,
    pdfMaxPagesPerSlide: 1,
    pdfPageHeightOffset: 0
};

// ============================================================================
// PERFORMANCE TARGETS
// ============================================================================

export const PERFORMANCE_TARGETS = {
    // Maximum acceptable render time before warning (ms)
    RENDER_TIME_WARN: 16, // ~1 frame at 60fps

    // Initial load time target (seconds)
    LOAD_TIME_TARGET: 1.5,

    // Time to interactive target (seconds)
    TTI_TARGET: 1.5,

    // Memory usage warning threshold (MB)
    MEMORY_WARN: 100,

    // Build time target (seconds)
    BUILD_TIME_TARGET: 3
};

// ============================================================================
// BREAKPOINTS (for responsive design)
// ============================================================================

export const BREAKPOINTS = {
    Mobile: 480,
    Tablet: 768,
    Desktop: 1024,
    Large: 1440,
    XL: 1920
};

// ============================================================================
// MODAL & OVERLAY SETTINGS
// ============================================================================

export const MODAL_SETTINGS = {
    // Backdrop blur amount
    BLUR: '4px',

    // Backdrop opacity (0-1)
    OVERLAY_OPACITY: 0.7,

    // Border radius for modals
    BORDER_RADIUS: '16px',

    // Padding inside modals
    PADDING: '32px',

    // Maximum width for modals
    MAX_WIDTH: '750px'
};

// ============================================================================
// DATA LIMITS
// ============================================================================

export const DATA_LIMITS = {
    // Maximum items to display before pagination
    ITEMS_PER_PAGE: 10,

    // Maximum table rows before virtualization
    VIRTUALIZE_THRESHOLD: 100,

    // Maximum data points in charts
    CHART_MAX_POINTS: 100,

    // Truncation length for long text
    TEXT_TRUNCATE: 50
};

// ============================================================================
// MEASUREMENT UNITS
// ============================================================================

export const UNITS = {
    // Common time measurements
    DAYS_ABBREVIATION: 'd',
    PERCENTAGE_SYMBOL: '%',

    // Data size units
    THOUSAND: 1000,
    MILLION: 1000000,

    // Percentage ranges
    EXCELLENT_MIN: 50,
    GOOD_MIN: 30,
    FAIR_MIN: 15
};

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION = {
    // Email pattern
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Number pattern
    NUMBER_PATTERN: /^-?\d+(\.\d+)?$/,

    // URL pattern
    URL_PATTERN: /^https?:\/\/.+/,

    // Min/max for common inputs
    MIN_INPUT_LENGTH: 2,
    MAX_INPUT_LENGTH: 100
};

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
    SLIDE_RENDER: 'Error loading slide content. Please refresh the presentation.',
    DATA_LOAD: 'Failed to load presentation data.',
    CHART_RENDER: 'Failed to render chart.',
    MODAL_ERROR: 'Error opening modal. Please try again.',
    GENERIC: 'An unexpected error occurred. Please refresh the page.'
};

// ============================================================================
// LOG LEVELS
// ============================================================================

export const LOG_LEVELS = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug'
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get site color by site ID
 * @param {string} siteId - SITE-I, SITE-III, or SITE-V
 * @returns {string} Color hex value
 */
export const getSiteColor = (siteId) => {
    return SITE_COLORS[siteId] || UTILITY_COLORS.Muted;
};

/**
 * Get category color by category name
 * @param {string} category - Category name
 * @returns {string} Color hex value
 */
export const getCategoryColor = (category) => {
    return CATEGORY_COLORS[category] || UTILITY_COLORS.Accent;
};

/**
 * Get status color by status
 * @param {string} status - Status name
 * @returns {string} Color hex value
 */
export const getStatusColor = (status) => {
    return STATUS_COLORS[status] || UTILITY_COLORS.Muted;
};

/**
 * Check if value is in excellent range
 * @param {number} value - Value to check
 * @returns {boolean}
 */
export const isExcellent = (value) => value >= UNITS.EXCELLENT_MIN;

/**
 * Check if value is in good range
 * @param {number} value - Value to check
 * @returns {boolean}
 */
export const isGood = (value) => value >= UNITS.GOOD_MIN && value < UNITS.EXCELLENT_MIN;

/**
 * Get performance status label
 * @param {number} value - Value to evaluate
 * @returns {string} Status label
 */
export const getPerformanceStatus = (value) => {
    if (isExcellent(value)) return 'Excellent';
    if (isGood(value)) return 'Good';
    if (value >= UNITS.FAIR_MIN) return 'Fair';
    return 'Poor';
};