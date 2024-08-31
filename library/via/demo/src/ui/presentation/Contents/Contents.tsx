import { Section } from "@fluid/core";
import { useView } from "viajs-react";
import { PresentationDataView } from "../../../core/view";
import { mapEditableComponent } from "../../../component/editable/mapEditableComponent";
import { useDestination } from "../../../hook/useNavigate";

export default function Contents() {
  const { presentationId } = useDestination();
  const { value: data } = useView({ view: PresentationDataView(presentationId) });
  console.log(data);
  return <Section fluid={{ overflow: ["hidden", "scroll"] }}>{data.map(mapEditableComponent)}</Section>;
}
