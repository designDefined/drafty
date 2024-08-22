import { View } from "@via/core";
import { PresentationSummary } from "../entity/Presenation";
import { PresentationRepository } from "../repository/presentation";
import { Block } from "../entity/Block";

export const PresentationSummaryView = View<[number], PresentationSummary>(presentationId => ({
  key: ["view", "presentationSummary", { presentationId }],
  from: () => PresentationRepository.getPresentationSummary(presentationId),
}));

export const PresentationDataView = View<[number], Block[]>(presentationId => ({
  key: ["view", "presentationData", presentationId],
  from: () => PresentationRepository.getPresentationData(presentationId),
}));
