import { View } from "@via/core";
import { Presentation } from "../entity/Presenation";
import { PresentationRepository } from "../repository/presentation";

export const FEConfView = View<[], Presentation>(() => ({
  key: ["view", "FeconfPresentation"],
  from: () => PresentationRepository.getFEConf(),
}));
