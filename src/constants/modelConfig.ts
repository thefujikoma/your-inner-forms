// Universal configuration for 3D model corrections

export const MODEL_CONFIG = {
  // Scale multiplier for hand tracking mode
  // Models are designed with ~7cm hand area, MediaPipe returns normalized 0-1 coords
  // Increase this value to make models larger in hand mode
  HAND_MODE_SCALE_MULTIPLIER: 40,
  
  // Base scale for free explore mode (models should render at 1:1)
  FREE_EXPLORE_SCALE: 1,
};
