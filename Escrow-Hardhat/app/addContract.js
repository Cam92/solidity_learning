import {ethers} from 'ethers';

const provider = new ethers.providers.Web3Provider(ethereum);

export default async function addContract(id, contract, arbiter, beneficiary, value, isApproved = false, isCancelled = false) {
  const buttonIdApproved = `approve-${id}`;
  const buttonIdCancelled = `cancel-${id}`;

  const container = document.getElementById("container");
  container.innerHTML += createHTML(buttonIdApproved, buttonIdCancelled, arbiter, beneficiary, ethers.utils.formatEther(value));

  if (isApproved == true) {
    document.getElementById(buttonIdApproved).className = "complete";
    document.getElementById(buttonIdApproved).innerText = "✓ It's been approved!";
    document.getElementById(buttonIdCancelled).className = "hidden";
  }

  if (isApproved == false) {
   contract.on('Approved', () => {
     document.getElementById(buttonIdApproved).className = "complete";
     document.getElementById(buttonIdApproved).innerText = "✓ It's been approved!";
     document.getElementById(buttonIdCancelled).className = "hidden";
   });

   document.getElementById(buttonIdApproved).addEventListener("click", async () => {
     const signer = provider.getSigner();
     await contract.connect(signer).approve();
    });
  }
  
  if (isCancelled == true) {
    document.getElementById(buttonIdCancelled).className = "cancelled";
    document.getElementById(buttonIdCancelled).innerText = "✗ It's been cancelled!";
    document.getElementById(buttonIdApproved).className = "hidden";
  }

  if (isCancelled == false) {
   contract.on('Cancelled', () => {
     document.getElementById(buttonIdCancelled).className = "cancelled";
     document.getElementById(buttonIdCancelled).innerText = "✗ It's been cancelled!";
     document.getElementById(buttonIdApproved).className = "hidden";
   });

   document.getElementById(buttonIdCancelled).addEventListener("click", async () => {
     const signer = provider.getSigner();
     await contract.connect(signer).cancel();
    });
  }
}

function createHTML(buttonIdApproved, buttonIdCancelled, arbiter, beneficiary, value) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> ${value} </div>
        </li>
        <div class="button" id="${buttonIdApproved}">
          Approve
        </div>
        <div class="button" id="${buttonIdCancelled}">
          Cancel
        </div>
      </ul>
    </div>
  `;
}
