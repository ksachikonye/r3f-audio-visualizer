import { Bloom, EffectComposer, Noise } from "@react-three/postprocessing";
import { Vector3 } from "three";

import { type VisualProps } from "@/components/visualizers/common";
import Ground from "@/components/visualizers/ground";
import { useRingVisualConfigContext } from "@/context/visualConfig/diffusedRing";

import BaseDiffusedRing from "./base";

const DiffusedRingVisual = ({ coordinateMapper }: VisualProps) => {
  const { radius, pointSize, mirrorEffects } = useRingVisualConfigContext();
  // const { radius, pointSize, mirrorEffects } = useControls({
  //   "Visual - Ring": folder(
  //     {
  //       radius: { value: 2, min: 0.25, max: 3, step: 0.25 },
  //       pointSize: { value: 0.2, min: 0.01, max: 2, step: 0.01 },
  //       mirrorEffects: false,
  //     },
  //     { collapsed: true }
  //   ),
  // });

  return (
    <>
      <BaseDiffusedRing
        coordinateMapper={coordinateMapper}
        radius={radius}
        pointSize={pointSize}
        mirrorEffects={mirrorEffects}
      />
      <Ground position={new Vector3(0, 0, -1.5 * coordinateMapper.amplitude)} />
    </>
  );
};

const ComposeDiffusedRingVisual = ({ ...props }: VisualProps) => {
  return (
    <>
      <DiffusedRingVisual {...props} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={1} height={300} />
        <Noise opacity={0.05} />
      </EffectComposer>
    </>
  );
};

export default ComposeDiffusedRingVisual;
