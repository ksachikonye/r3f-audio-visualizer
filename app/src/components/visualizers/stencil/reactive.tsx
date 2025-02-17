import { Vector3 } from "three";

import { type VisualProps } from "@/components/visualizers/common";
import Ground from "@/components/visualizers/ground";
import { useStencilVisualConfigContext } from "@/context/visualConfig/stencil";

import BaseStencil from "./base";
import { getPoly2D as getPoly2D_DIAG } from "./polys/diagonal";
import { getPoly2D as getPoly2D_OWL } from "./polys/owl";

const StencilVisual = ({ coordinateMapper }: VisualProps) => {
  const { pointSize, power, bounds, transitionSpeed } =
    useStencilVisualConfigContext();
  // const { pointSize, power, bounds, transitionSpeed } = useControls({
  //   "Visual - Trace Particles": folder(
  //     {
  //       bounds: { value: [0.15, 0.73], min: 0.0, max: 1.0, step: 0.01 },
  //       power: { value: 1.0, min: 0.0, max: 2, step: 0.05 },
  //       useNoise: false,
  //       pointSize: { value: 0.2, min: 0.01, max: 2, step: 0.01 },
  //       transitionSpeed: { value: 10, min: 0.5, max: 30, step: 1 },
  //     },
  //     { collapsed: true }
  //   ),
  // });

  const polyStates = [
    getPoly2D_OWL(),
    getPoly2D_DIAG(),
    getPoly2D_OWL(),
    getPoly2D_DIAG(),
  ];

  return (
    <>
      <BaseStencil
        coordinateMapper={coordinateMapper}
        polyStates={polyStates}
        parametricMin={bounds[0]}
        parametricMax={bounds[1]}
        power={power}
        pointSize={pointSize}
        transitionSpeedSec={transitionSpeed}
      />
      <Ground position={new Vector3(0, 0, -1.5 * coordinateMapper.amplitude)} />
    </>
  );
};

export default StencilVisual;
