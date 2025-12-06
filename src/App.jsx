import "./App.css";

// 🔹 All components (you can enable anytime)
import FlexBoxComponent from "./flex-box/flex-box-component";
import FlexWrapComponent from "./flex-wrap/flex-wrap-component";
import HelloWorldComponent from "./hello-world/hello-world-component";
import LeadersTomorrowComponent from "./leaders-tomorrow/leaders-tomorrow-component";
import PositionExampleComponent from "./position-example/position-example-component";
import PostionComponent from "./positioning/position-component";
import SymbolOfExcellenceComponent from "./symbol-of-excellence/symbol-of-execllence-component";
import TrustedbyComponent from "./trusted-by/trusted-by-component";
import OurPromisesComponent from "./our-promises/our-promises";
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
      {/*<PositionExampleComponent />*/}
      {/* <PostionComponent /> */}
      {/* <TrustedbyComponent /> */}
      {/* <OurPromise /> */}
       {/* <FlexWrapComponent /> */} 
      
      {/*<ImpactAtGlance />*/}
      {/*  
        ======================================
             VISIBLE SECTION RIGHT NOW
        ======================================
      */}
      <OurPromisesComponent />
    </div>
  );
}

export default App;
