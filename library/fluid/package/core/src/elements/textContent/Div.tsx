import { useFluidStyle, useFluidClass } from "../../hooks";
import { FluidDivProps } from "../../types/fluidElementProps";

export function Div({ children, fluid, style, ...props }: FluidDivProps) {
  const fluidStyle = useFluidStyle(fluid, style, false);
  const fluidClass = useFluidClass(props);

  return (
    <div {...props} style={fluidStyle} className={fluidClass}>
      {children}
    </div>
  );
}
