import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Beasts from "./components/beasts/Beasts";
import BeastModal from "./components/beastModal/BeastModal";
// import { useSelector } from "react-redux";

const App = () => {
  // const selectedBeast = useSelector((state) => state.beast.selectedBeast);
  return (
    <div>
      {/* {selectedBeast && selectedBeast.title} */}
      <Header />
      <Beasts />
      <Footer />
      <BeastModal />
    </div>
  );
};

export default App;
