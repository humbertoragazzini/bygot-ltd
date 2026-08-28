"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { DoubleRenderTarget } from "./DoubleRenderTarget";
import { fullscreenVert } from "./shaders/fullscreen.vert";
import { splatFrag } from "./shaders/splat.frag";
import { curlFrag } from "./shaders/curl.frag";
import { vorticityFrag } from "./shaders/vorticity.frag";
import { divergenceFrag } from "./shaders/divergence.frag";
import { pressureFrag } from "./shaders/pressure.frag";
import { gradientSubtractFrag } from "./shaders/gradientSubtract.frag";
import { advectionFrag } from "./shaders/advection.frag";
import { displayFrag } from "./shaders/display.frag";

export interface SplatPoint {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: THREE.Vector3;
}

interface FluidSimulationProps {
  splatQueueRef: React.RefObject<SplatPoint[]>;
  isReducedMotion: boolean;
  isVisibleRef: React.RefObject<boolean>;
}

interface FluidMaterials {
  splatMat: THREE.ShaderMaterial;
  curlMat: THREE.ShaderMaterial;
  vorticityMat: THREE.ShaderMaterial;
  divergenceMat: THREE.ShaderMaterial;
  pressureMat: THREE.ShaderMaterial;
  gradSubtractMat: THREE.ShaderMaterial;
  advectionMat: THREE.ShaderMaterial;
  displayMat: THREE.ShaderMaterial;
}

interface FluidTargets {
  velocity: DoubleRenderTarget;
  dye: DoubleRenderTarget;
  pressure: DoubleRenderTarget;
  divergence: THREE.WebGLRenderTarget;
  curl: THREE.WebGLRenderTarget;
}

export function FluidSimulation({
  splatQueueRef,
  isReducedMotion,
  isVisibleRef,
}: FluidSimulationProps) {
  const { size } = useThree();

  const isMobile = size.width < 768;
  const simResolution = isMobile ? 64 : 128;
  const dyeResolution = isMobile ? 256 : 512;
  const pressureIterations = isMobile ? 10 : 18;

  const textureType = useMemo(() => THREE.HalfFloatType, []);

  const fboOptions: THREE.RenderTargetOptions = useMemo(
    () => ({
      type: textureType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    }),
    [textureType]
  );

  const targetsRef = useRef<FluidTargets | null>(null);
  const materialsRef = useRef<FluidMaterials | null>(null);
  const passCameraRef = useRef<THREE.OrthographicCamera>(
    new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  );
  const passSceneRef = useRef<{
    scene: THREE.Scene;
    quadMesh: THREE.Mesh;
  } | null>(null);
  const quadGeometryRef = useRef<THREE.PlaneGeometry | null>(null);

  // Initialize and resize render targets and materials
  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const simW = simResolution;
    const simH = Math.max(Math.round(simResolution / aspect), 1);
    const dyeW = dyeResolution;
    const dyeH = Math.max(Math.round(dyeResolution / aspect), 1);

    const targets: FluidTargets = {
      velocity: new DoubleRenderTarget(simW, simH, fboOptions),
      dye: new DoubleRenderTarget(dyeW, dyeH, fboOptions),
      pressure: new DoubleRenderTarget(simW, simH, fboOptions),
      divergence: new THREE.WebGLRenderTarget(simW, simH, fboOptions),
      curl: new THREE.WebGLRenderTarget(simW, simH, fboOptions),
    };
    targetsRef.current = targets;

    if (!quadGeometryRef.current) {
      quadGeometryRef.current = new THREE.PlaneGeometry(2, 2);
    }

    const scene = new THREE.Scene();
    const quadMesh = new THREE.Mesh(quadGeometryRef.current);
    quadMesh.position.set(0, 0, 0);
    scene.add(quadMesh);

    passSceneRef.current = { scene, quadMesh };

    const simTexelSize = new THREE.Vector2(1.0 / simW, 1.0 / simH);
    const dyeTexelSize = new THREE.Vector2(1.0 / dyeW, 1.0 / dyeH);

    const materials: FluidMaterials = {
      splatMat: new THREE.ShaderMaterial({
        vertexShader: fullscreenVert,
        fragmentShader: splatFrag,
        uniforms: {
          uTarget: { value: null },
          uAspectRatio: { value: aspect },
          uColor: { value: new THREE.Vector3() },
          uPoint: { value: new THREE.Vector2() },
          uRadius: { value: 0.0035 },
          uTexelSize: { value: simTexelSize },
        },
        depthTest: false,
        depthWrite: false,
      }),
      curlMat: new THREE.ShaderMaterial({
        vertexShader: fullscreenVert,
        fragmentShader: curlFrag,
        uniforms: {
          uVelocity: { value: null },
          uTexelSize: { value: simTexelSize },
        },
        depthTest: false,
        depthWrite: false,
      }),
      vorticityMat: new THREE.ShaderMaterial({
        vertexShader: fullscreenVert,
        fragmentShader: vorticityFrag,
        uniforms: {
          uVelocity: { value: null },
          uCurl: { value: null },
          uCurlStrength: { value: 4.5 },
          uDt: { value: 0.016 },
          uTexelSize: { value: simTexelSize },
        },
        depthTest: false,
        depthWrite: false,
      }),
      divergenceMat: new THREE.ShaderMaterial({
        vertexShader: fullscreenVert,
        fragmentShader: divergenceFrag,
        uniforms: {
          uVelocity: { value: null },
          uTexelSize: { value: simTexelSize },
        },
        depthTest: false,
        depthWrite: false,
      }),
      pressureMat: new THREE.ShaderMaterial({
        vertexShader: fullscreenVert,
        fragmentShader: pressureFrag,
        uniforms: {
          uPressure: { value: null },
          uDivergence: { value: null },
          uTexelSize: { value: simTexelSize },
        },
        depthTest: false,
        depthWrite: false,
      }),
      gradSubtractMat: new THREE.ShaderMaterial({
        vertexShader: fullscreenVert,
        fragmentShader: gradientSubtractFrag,
        uniforms: {
          uPressure: { value: null },
          uVelocity: { value: null },
          uTexelSize: { value: simTexelSize },
        },
        depthTest: false,
        depthWrite: false,
      }),
      advectionMat: new THREE.ShaderMaterial({
        vertexShader: fullscreenVert,
        fragmentShader: advectionFrag,
        uniforms: {
          uVelocity: { value: null },
          uSource: { value: null },
          uTexelSize: { value: simTexelSize },
          uDt: { value: 0.016 },
          uDissipation: { value: 0.28 },
        },
        depthTest: false,
        depthWrite: false,
      }),
      displayMat: new THREE.ShaderMaterial({
        vertexShader: fullscreenVert,
        fragmentShader: displayFrag,
        uniforms: {
          uDye: { value: null },
          uTexelSize: { value: dyeTexelSize },
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    };
    materialsRef.current = materials;

    return () => {
      targets.velocity.dispose();
      targets.dye.dispose();
      targets.pressure.dispose();
      targets.divergence.dispose();
      targets.curl.dispose();

      Object.values(materials).forEach((m) => m.dispose());
    };
  }, [simResolution, dyeResolution, fboOptions, size.width, size.height]);

  // Initial subtle pigment placement
  const initialSplatDone = useRef(false);
  useEffect(() => {
    if (initialSplatDone.current || isReducedMotion) return;
    initialSplatDone.current = true;

    const initialPoints: SplatPoint[] = [
      {
        x: 0.35,
        y: 0.45,
        dx: 0.012,
        dy: -0.008,
        color: new THREE.Vector3(0.85, 0.74, 0.61).multiplyScalar(0.25),
      },
      {
        x: 0.68,
        y: 0.58,
        dx: -0.015,
        dy: 0.01,
        color: new THREE.Vector3(0.66, 0.28, 0.19).multiplyScalar(0.18),
      },
    ];

    if (splatQueueRef.current) {
      splatQueueRef.current.push(...initialPoints);
    }
  }, [isReducedMotion, splatQueueRef]);

  useFrame((state, delta) => {
    if (isVisibleRef.current === false) return;
    const targets = targetsRef.current;
    const materials = materialsRef.current;
    const passScene = passSceneRef.current;
    const passCamera = passCameraRef.current;

    if (!targets || !materials || !passScene) return;

    const renderPass = (
      material: THREE.ShaderMaterial,
      target: THREE.WebGLRenderTarget | null
    ) => {
      passScene.quadMesh.material = material;
      state.gl.setRenderTarget(target);
      state.gl.render(passScene.scene, passCamera);
    };

    if (isReducedMotion) {
      renderPass(materials.displayMat, null);
      return;
    }

    const dt = Math.min(delta, 0.0333);

    // 1. Process queued pointer splats
    if (splatQueueRef.current && splatQueueRef.current.length > 0) {
      const queue = [...splatQueueRef.current];
      splatQueueRef.current.length = 0;

      const aspect = size.width / Math.max(size.height, 1);
      materials.splatMat.uniforms.uAspectRatio.value = aspect;

      for (const splat of queue) {
        // Velocity splat
        materials.splatMat.uniforms.uTarget.value = targets.velocity.read.texture;
        materials.splatMat.uniforms.uPoint.value.set(splat.x, splat.y);
        materials.splatMat.uniforms.uColor.value.set(
          splat.dx * 6500.0,
          splat.dy * 6500.0,
          0.0
        );
        materials.splatMat.uniforms.uRadius.value = 0.0035;
        renderPass(materials.splatMat, targets.velocity.write);
        targets.velocity.swap();

        // Dye splat
        materials.splatMat.uniforms.uTarget.value = targets.dye.read.texture;
        materials.splatMat.uniforms.uColor.value.copy(splat.color);
        materials.splatMat.uniforms.uRadius.value = 0.0045;
        renderPass(materials.splatMat, targets.dye.write);
        targets.dye.swap();
      }
    }

    // 2. Curl / Vorticity computation
    materials.curlMat.uniforms.uVelocity.value = targets.velocity.read.texture;
    renderPass(materials.curlMat, targets.curl);

    materials.vorticityMat.uniforms.uVelocity.value = targets.velocity.read.texture;
    materials.vorticityMat.uniforms.uCurl.value = targets.curl.texture;
    materials.vorticityMat.uniforms.uDt.value = dt;
    renderPass(materials.vorticityMat, targets.velocity.write);
    targets.velocity.swap();

    // 3. Divergence computation
    materials.divergenceMat.uniforms.uVelocity.value = targets.velocity.read.texture;
    renderPass(materials.divergenceMat, targets.divergence);

    // 4. Pressure solving (Jacobi iterations)
    materials.pressureMat.uniforms.uDivergence.value = targets.divergence.texture;
    for (let i = 0; i < pressureIterations; i++) {
      materials.pressureMat.uniforms.uPressure.value = targets.pressure.read.texture;
      renderPass(materials.pressureMat, targets.pressure.write);
      targets.pressure.swap();
    }

    // 5. Gradient subtraction (project velocity to divergence-free field)
    materials.gradSubtractMat.uniforms.uPressure.value = targets.pressure.read.texture;
    materials.gradSubtractMat.uniforms.uVelocity.value = targets.velocity.read.texture;
    renderPass(materials.gradSubtractMat, targets.velocity.write);
    targets.velocity.swap();

    // 6. Advect Velocity
    materials.advectionMat.uniforms.uVelocity.value = targets.velocity.read.texture;
    materials.advectionMat.uniforms.uSource.value = targets.velocity.read.texture;
    materials.advectionMat.uniforms.uDt.value = dt;
    materials.advectionMat.uniforms.uDissipation.value = 0.28;
    renderPass(materials.advectionMat, targets.velocity.write);
    targets.velocity.swap();

    // 7. Advect Dye
    materials.advectionMat.uniforms.uVelocity.value = targets.velocity.read.texture;
    materials.advectionMat.uniforms.uSource.value = targets.dye.read.texture;
    materials.advectionMat.uniforms.uDt.value = dt;
    materials.advectionMat.uniforms.uDissipation.value = 0.55;
    renderPass(materials.advectionMat, targets.dye.write);
    targets.dye.swap();

    // 8. Final Display Pass: composite fluid dye cleanly to screen
    materials.displayMat.uniforms.uDye.value = targets.dye.read.texture;
    renderPass(materials.displayMat, null);
  }, 1);

  return null;
}
