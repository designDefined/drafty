import {
  DefaultStyledProps,
  PropsWithEnhancedClass,
} from "../hooks/fluidClass";
import { FluidStyle } from "../hooks/fluidStyle";

export type FluidComponentProps<T extends DefaultStyledProps> =
  PropsWithEnhancedClass<T> & FluidStyle;
