# Three.js with TypeScript and Vite

A minimal starter template for Three.js projects using TypeScript and Vite.

## Features

- Three.js setup with TypeScript support
- Fast development with Vite
- Orbit controls for camera manipulation
- Responsive canvas with window resize handling
- Basic scene with a rotating cube
- Comprehensive debugging tools:
  - Performance monitoring (FPS counter)
  - GUI controls for objects, materials, and lights
  - Visual helpers (axes)

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/andrevarandas/threejs-typescript-starter.git
cd threejs-typescript-starter

# Install dependencies
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── main.ts          # Main entry point
│   └── utils/
│       └── debug/       # Debugging utilities
│           └── debugger.ts  # Scene debugger
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Debugging Tools

The project includes a modular `SceneDebugger` class that provides various debugging tools:

### Performance Monitoring

- FPS counter in the top-left corner
- Performance measurement for each animation frame

### Object Controls

- Transform controls (position, rotation, scale) for any 3D object
- Material controls (color, wireframe, roughness, metalness)
- Light controls (intensity, position)

### Visual Helpers

- Axes helper to visualize X, Y, and Z axes in the scene

### Usage

```typescript
// Initialize the debugger with your scene
const sceneDebugger = new SceneDebugger(scene);

// Add axes helper
sceneDebugger.addAxesHelper(5);

// Add controls for a mesh
sceneDebugger.addTransformControls(mesh, 'Mesh Name');

// Add material controls
sceneDebugger.addMaterialControls(material, 'Material Name');

// Add light controls
sceneDebugger.addLightControls(light, 'Light Name');

// Use in animation loop
function animate() {
  requestAnimationFrame(animate);

  // Begin performance measurement
  sceneDebugger.beginPerformance();

  // Your animation code...

  // End performance measurement
  sceneDebugger.endPerformance();
}
```

## License

[MIT 2025 André Varandas](LICENSE)
