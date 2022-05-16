import { useEffect } from "react";
import "../styles/app.css";
import contract from "../contracts/index.json";
import { ethers } from 'ethers';

const contractAddress = "0x00000";
const abi = contract.abi;

 async function MyApp() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = () => {
    const { ethereum } = windows;

    if (!ethereum) {
      console.log("Install Metamask");
      return;
    } else {
      console.log("Lets go");

    }

    const accounts = await ethereum.request({method: "eth_accounts"});

    if(accounts.length !==0) {
      const account = accounts[0];
      console.log("Found an authorized accout", account);
      setCurrentAccount(account);
    }else{
      console.log("No authorized account found");
    }
  };

  async const connectWalletHandler = () => {
    if(!ethereum) {
      alert("Please install Metamask");
    }
    try {
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      console.log("Found an account:", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch(err) {
      console.log(err);
    }
  };

  async const verifyProof = () => {
    try {
      const {ethereum} = window;

      if(ethereum) {
        const provider =new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const merkleTreeContract= new ethers.Contract(contractAddress,abi,signer);

        let verify = await merkleTreeContract.verify();
        await verify.wait();
      } 
    } catch(err) {
      console.log(err);
    }
  };

  async const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    );
  };
  {currentAccount ? verifyProofButton() : connectWalletButton()}

 async const verifyProofButton = () => {
    return (
      <button
        onClick={verifyProof}
        className="cta-button verify-proof-button"
      ></button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className="main-app">
      <h1>Merkle Tree</h1>
      <div>{connectWalletButton()}</div>
    </div>
  );
}

export default MyApp;
