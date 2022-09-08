import "./app.css";
import Layout from "./components/Layout/Layout";

import 'regenerator-runtime/runtime'

function App(props) {
  const {nft_contract, marketplace_contract, accountId, nearConfig, wallet } = props;
  
  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const mainObject = {nft_contract, marketplace_contract, accountId, nearConfig, wallet, signIn, signOut};

  return(
    <Layout mainObject={mainObject}/>
  );
}

export default App;
