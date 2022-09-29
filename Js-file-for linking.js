 const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "ropsten"
    );

    const MoodContractAddress = "0x266Ce8558066CA7aC09d4d6AA5E501299a0FC2d8";
    const MoodContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
    let MoodContract;
    let signer;

    provider.send("eth_requestAccounts", []).then(() => {
      provider.listAccounts().then(function (accounts) {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(
          MoodContractAddress,
          MoodContractABI,
          signer
        );
      });
    });

    async function getMood() {
      const getMoodPromise = MoodContract.getMood();
      const mood = await getMoodPromise;
      console.log(mood);
    }

    async function setMood() {
      const mood = document.getElementById("mood").value;
      const setMoodPromise = MoodContract.setMood(mood);
      await setMoodPromise;
    }
