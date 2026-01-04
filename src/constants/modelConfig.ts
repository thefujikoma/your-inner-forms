// Universal configuration for 3D model corrections
// Blender uses Z-up coordinate system, Three.js uses Y-up
// This rotation correction converts between the two systems

export const MODEL_CONFIG = {
  // Rotation correction: -90 degrees on X-axis to convert Blender Z-up to Three.js Y-up
  BLENDER_ROTATION_X: -Math.PI / 2,
  
  // Scale multiplier for hand tracking mode
  // Models are designed with ~7cm hand area, MediaPipe returns normalized 0-1 coords
  // Increase this value to make models larger in hand mode
  HAND_MODE_SCALE_MULTIPLIER: 40,
  
  // Base scale for free explore mode (models should render at 1:1)
  FREE_EXPLORE_SCALE: 1,
};
