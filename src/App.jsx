import "./App.css";

// 🔹 All components (you can enable anytime)
import FlexBoxComponent from "./flex-box/flex-box-component";
import HelloWorldComponent from "./hello-world/hello-world-component";
import LeadersTomorrowComponent from "./leaders-tomorrow/leaders-tomorrow-component";
import PostionComponent from "./positioning/position-component";
import SymbolOfExcellenceComponent from "./symbol-of-excellence/symbol-of-execllence-component";
import TrustedbyComponent from "./trusted-by/trusted-by-component";
import OurPromise from "./our-promise/our-promise-component";
import ImpactAtGlance from "./impact-at-glance/impact-at-glance-component";

function App() {
  return (
    <div>

      {/*  
        ============================
              COMPONENT LIST
        ============================

        Uncomment any section below when you want to view it.
      */}

      {/* <HelloWorldComponent /> */}
      {/* <FlexBoxComponent /> */}
      {/* <LeadersTomorrowComponent /> */}
      {/* <SymbolOfExcellenceComponent /> */}
      {/* <PostionComponent /> */}
      {/* <TrustedbyComponent /> */}
      {/* <OurPromise /> */}

      {/*  
        ======================================
             VISIBLE SECTION RIGHT NOW
        ======================================
      */}
      <ImpactAtGlance />

    </div>
  );
}

export default App;
