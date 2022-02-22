import {ethers} from 'ethers';
import deploy from './deploy';
import addContract from './addContract';
import "./index.scss";
import { abi } from './artifacts/contracts/Escrow.sol/Escrow.json';

const provider = new ethers.providers.Web3Provider(ethereum);

let contracts = 0;
async function newContract() {
  const beneficiary = document.getElementById("beneficiary").value;
  const arbiter = document.getElementById("arbiter").value;
  const value = ethers.BigNumber.from(ethers.utils.parseUnits(document.getElementById("eth").value, "ether"));
  const contract = await deploy(arbiter, beneficiary, value);
  addContract(++contracts, contract, arbiter, beneficiary, value);
}

async function addExistingContract() {
  const contractAddress = document.getElementById("existingContract").value;
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const beneficiary = await contract.beneficiary();
  const arbiter = await contract.arbiter();
  const isApproved = await contract.isApproved();
  const value = await provider.getBalance(contractAddress);
  addContract(++contracts, contract, arbiter, beneficiary, value);
}

document.getElementById("deploy").addEventListener("click", newContract);
document.getElementById("add").addEventListener("click", addExistingContract);
