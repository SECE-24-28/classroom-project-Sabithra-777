import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
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
import PropsPractice from "./props-practice/props-practice";
import PropsPracticeTwo from "./props-practice-2/props-practice-2";
import OurPromise from "./our-promise/our-promise-component";
import ImpactAtGlance from "./impact-at-glance/impact-at-glance-component";
import FourOFourComponent from "./404-component/404-component";
import UseStateComponent from "./usestate-1st/use-state-component";
import UsestateformComponent from "./use-state-form/use-state-form-component";
import AdditionOperationComponent from "./addition-operation-in-state/addition-operation-component";
import FetchApiComponent from "./fetch-api/fetch-api-component";
import UseEffectComponent from "./use-effect-practice/use-effect-practice";
import UseEffectPracticeTwo from "./use-effect-practice/use-effect-practice-2";
import UseEffectPracticeThree from "./use-effect-practice/use-effect-practice-3";

// ⭐ NEW COMPONENT
import RegistrationForm from "./registration-form/registration-form-component";

function App() {
  // const arr1 = [
  //   { name: "sai", mobile: "1234" },
  //   { name: "ragu", mobile: "5678" },
  // ];

  // const IndexPage = () => {
  //   return (
  //     <div
  //       style={{
  //         padding: "80px 20px",
  //         textAlign: "center",
  //         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  //         color: "white",
  //         minHeight: "400px",
  //       }}
  //     >
  //       <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>🏠 Home Page</h1>
  //       <p style={{ fontSize: "1.5rem", opacity: 0.9 }}>
  //         This is the index route for /leetcode
  //       </p>
  //     </div>
  //   );
  // };

  return (
    <div>
      <Routes>
        {/* ⭐ ONLY THIS ONE RUNS */}
        <Route path="/" element={<UseEffectPracticeThree />} />
        <Route path="/use-effect-practice" element={<UseEffectComponent />} />
        <Route
          path="/use-effect-practice-2"
          element={<UseEffectPracticeTwo />}
        />
        <Route
          path="/use-effect-practice-3"
          element={<UseEffectPracticeThree />}
        />

       
        {/* ==========================
             OTHER ROUTES (Commented)
           ========================== */}

        {/*
        <Route path="/" element={<RegistrationForm />} /> 
        <Route path="/" element={<FetchApiComponent />} />
        <Route path="/api-fetch" element={<FetchApiComponent />} />
        <Route path="/eshwar" element={<HelloWorldComponent />} />
        <Route path="/our-promise" element={<OurPromisesComponent />} />
        <Route path="/" element={<TrustedbyComponent />} />

        <Route path="/leetcode/:id" element={<SymbolOfExcellenceComponent />} />
        <Route path="*" element={<FourOFourComponent />} />
        <Route path="/use-state-practice" element={<UseStateComponent />} />
        <Route path="/use-state-form" element={<UsestateformComponent />} />
        <Route
          path="/addition-operation"
          element={<AdditionOperationComponent />}
        />
        */}
      </Routes>

      {/*  
        ============================
              COMPONENT LIST
        ============================

        Uncomment any section below when you want to view it.
      */}

      {/*
      <HelloWorldComponent />
      <FlexBoxComponent />
      <LeadersTomorrowComponent />
      <SymbolOfExcellenceComponent />
      <PositionExampleComponent />
      <PostionComponent />
      <TrustedbyComponent />
      <OurPromise />
      <FlexWrapComponent />
      <OurPromisesComponent />
      <ImpactAtGlance />
      <PropsPractice name="Sai" mobile="14234423243" />
      <PropsPractice name="Ragu" mobile="232332231231" />
      <PropsPracticeTwo data={arr1} />
      */}
    </div>
  );
}

export default App;
