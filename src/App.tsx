import Layout from "./components/Layout";
import Main from "./components/main";
import "react-loading-skeleton/dist/skeleton.css";
import AppContext from "./context/AppContext";
import "./App.scss";

function App() {
  return (
    <AppContext>
      <div className="App">
        <Layout>
          <Main />
        </Layout>
      </div>
    </AppContext>
  );
}

export default App;
