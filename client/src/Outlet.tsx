import ContractTools from "./components/ContractTools";
import Hits from "./components/Hits";
import ProgrammingTutor from "./components/ProgrammingTutor";

export default function (props: { view: number }) {
  const { view } = props;

  if (view === 0) {
    return <ContractTools />;
  }
  if (view === 1) {
    return <Hits />;
  }
  if (view === 2) {
    return <ProgrammingTutor />;
  }
}
