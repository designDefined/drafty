import { Presentation } from "../../entity/Presenation";

const getFEConf = async () => import("./feconf.json").then(res => res.default as Presentation);

export const PresentationRepository = { getFEConf };
