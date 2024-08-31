import { Block } from "../../entity/Block";
import { PresentationSummary } from "../../entity/Presenation";

const cache = { summary: new Map<number, PresentationSummary>(), data: new Map<number, Block[]>() };

const getPresentationSummary = async (presentationId: number) => {
  const cached = cache.summary.get(presentationId);
  if (cached) return cached;
  else return await import(`./${presentationId}/summary.json`).then(res => res.default as PresentationSummary);
};

const getPresentationData = async (presentationId: number) => {
  const cached = cache.data.get(presentationId);
  if (cached) return cached;
  else return await import(`./${presentationId}/data.json`).then(res => res.default as Block[]).catch(() => []);
};

const postNewPresentation = async () => {
  const id = Math.max(...cache.summary.keys()) + 1;
  const summary = { id, title: "제목이 없는 발표" };
  cache.summary.set(id, summary);
  cache.data.set(id, []);
  return id;
};

const patchPresentationSummary = async (presentationId: number, body: Partial<Omit<PresentationSummary, "id">>) => {
  const cached = cache.summary.get(presentationId);
  if (!cached) throw new Error("Presentation not found");
  return cache.summary.set(presentationId, { ...cached, ...body }).get(presentationId);
};

const putPresentationData = async (presentationId: number, body: Block[]) => {
  const cached = cache.summary.get(presentationId);
  if (!cached) throw new Error("Presentation not found");
  return cache.data.set(presentationId, body).get(presentationId);
};

export const PresentationRepository = {
  getPresentationSummary,
  getPresentationData,
  postNewPresentation,
  patchPresentationSummary,
  putPresentationData,
};
