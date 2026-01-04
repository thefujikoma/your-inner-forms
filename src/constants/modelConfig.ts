// Universal configuration for 3D model corrections

export const MODEL_CONFIG = {
  // Scale multiplier for hand tracking mode
  // Models are designed with ~7cm hand area, MediaPipe returns normalized 0-1 coords
  HAND_MODE_SCALE_MULTIPLIER: 30,
  
  // Base scale for free explore mode (models should render at 1:1)
  FREE_EXPLORE_SCALE: 1,
  
  // User-adjustable scale range
  DEFAULT_USER_SCALE: 1.0,
  MIN_USER_SCALE: 0.5,
  MAX_USER_SCALE: 2.0,
  
  // Smoothing factor for hand tracking (0-1: lower = smoother but more lag)
  SMOOTHING_FACTOR: 0.3,
  
  // Default camera mode (false = phone/pass-through, true = laptop/mirrored)
  DEFAULT_MIRRORED: false,
};
