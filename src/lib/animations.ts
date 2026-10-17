// Premium animation variants for Framer Motion

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 60 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

export const slideInFromBottom = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 }
};

// Stagger children animations
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerSlow = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// Premium easing curves
export const easings = {
  easeOutExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeOutQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  easeInOutQuart: [0.76, 0, 0.24, 1] as [number, number, number, number],
  spring: { type: "spring" as const, stiffness: 100, damping: 15 },
  springBouncy: { type: "spring" as const, stiffness: 300, damping: 20 },
  springSmooth: { type: "spring" as const, stiffness: 80, damping: 20 }
};

// Transition presets
export const transitions = {
  fast: { duration: 0.3, ease: easings.easeOutExpo },
  medium: { duration: 0.5, ease: easings.easeOutExpo },
  slow: { duration: 0.8, ease: easings.easeOutExpo },
  spring: easings.spring,
  springBouncy: easings.springBouncy
};

// Hover animations for cards
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
    transition: { duration: 0.3, ease: easings.easeOutExpo }
  }
};

// Text reveal animation (letter by letter)
export const textRevealContainer = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1
    }
  }
};

export const textRevealChild = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easings.easeOutExpo }
  }
};

// Word reveal animation
export const wordRevealContainer = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

export const wordRevealChild = {
  initial: { opacity: 0, y: 30, rotateX: -20 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: easings.easeOutExpo }
  }
};

// Floating animation
export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Pulse glow animation
export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(45, 142, 176, 0.3)",
      "0 0 40px rgba(45, 142, 176, 0.5)",
      "0 0 20px rgba(45, 142, 176, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Viewport settings for scroll animations
export const viewportSettings = {
  once: true,
  margin: "-100px",
  amount: 0.3
};

export const viewportSettingsEager = {
  once: true,
  margin: "-50px",
  amount: 0.1
};
