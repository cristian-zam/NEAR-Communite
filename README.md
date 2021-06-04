📄 Introduction to communite
==================

Communite is a smart contract that allows citizens to create and store complaints or suggestions about the state of their community using the NEAR protocol in order to have a transparent, reliable and safe space where they can express their problems. The following are the main functionalities of this smart contract:

1. Create a complaint or suggestion.
2. Get all the complaints living on the smart contract to know your status (Submited, In progress and Done).
3. Get only the complaints that I already create. 
4. Vote on a complaint or suggestion from other to give more weight.
5. Change the status of a complaint (Submited, In progress and Done) if I'm the owner.

📦 Locally installation
===========

To run this project locally you need to follow the next steps:

Step 1: Prerequisites
------------------------------

1. Make sure you've installed [Node.js] ≥ 12 (we recommend use [nvm])
2. Make sure you've installed yarn: `npm install -g yarn`
3. Install dependencies: `yarn install`
4. Create a test near account [NEAR test account]
5. Install the NEAR CLI globally: [near-cli] is a command line interface (CLI) for interacting with the NEAR blockchain

    yarn install --global near-cli

Step 2: Configure your NEAR CLI
-------------------------------

Configure your near-cli to authorize your test account recently created:

    near login

Step 3: Build and make a smart contract development deploy  
--------------------------------

Build the communite smart contract code and deploy the local development server: `yarn buildevploy` (see `package.json` for a full list of `scripts` you can run with `yarn`). This script return to you a provisional smart contract deployed (save it to use later)


Congratulations, now you'll have a local development environment running on the NEAR TestNet! 🥳


📑 Exploring the communite smart contract methods 
==================

The following commands allow you to interact with the smart contract methods using the near cli (for this you need to have a provisional smart contract deployed).

Information: the commands will require especific data (category, status)
 
Category values: 

    0. the value 0 represents a Lights problem.
    1. the value 1 represents a Street problem.  
    2. the value 2 represents a Neighborhoodh problem.  
    3. the value 1 represents a Water problem.  


Command to make a complaint: 
--------------------------------------------

```bash
near call <your deployed contract> addNewComplaint '{"title": "string","description":"string","category":integer,"location":"string"}' --account-id <your test account>
```

Command to get all the complaint created:
--------------------------------------------

```bash
near view <your deployed contract> getComplaints
```

Command to get all my complaints created:
--------------------------------------------

```bash
near call <your deployed contract> getNumberOfComplaints --accountId <your test account>
```

Command to get the number of complaints created:
--------------------------------------------

```bash
near view <your deployed contract> getNComplaints
```


Command to see a specific complaint information: 
--------------------------------------------

```bash
near view <your deployed contract> getComplaintInfo '{"id":integer (id from you complaint)}' --accountId <your test account>
```

Command to vote for a complaint: 
--------------------------------------------

```bash
near call <your deployed contract> voteComplaint '{"id":integer (id from you complaint)}' --accountId <your test account>
```

Command to remote a vote for a complaint that I made: 
--------------------------------------------

```bash
near call <your deployed contract> removeVote '{"id":integer (id from you complaint)}' --accountId <your test account>
```

Command to change the status (Submited to In progress) of a complaint if you are not the complaint owner (you need to be the solver of the complaint): 
--------------------------------------------

```bash
near call <your deployed contract> takeComplaint '{"id":integer (id from you complaint)}' --accountId <your test account>
```

Command to change the status (In progress to Done) of a complaint if you're the complaint owner: 
--------------------------------------------

```bash
near call <your deployed contract> finishComplaint '{"id":integer (id from you complaint)}' --accountId <your test account>
```

Command to change the status (Submited to In progress and In progress to Done) of a complaint if you're the complaint owner: 
--------------------------------------------

```bash
near call <your deployed contract> finishComplaint '{"id":integer (id from you complaint)}' --accountId <your test account>
```

😎 Test communite smart contract 
==================

Testing is a part of the development, then to run the tests in the communite smart contract you need to run the follow command: 

    yarn test

this will execute the tests methods on the `assembly/__tests__/main.spect.js` file



👩🏼‍🏫 Exploring and Explaining The Code 
==================

This is a explanation of the smart contract file system

```bash
├── README.md                                       # this file
├── as-pect.config.js                               # configuration for as-pect (AssemblyScript unit testing)
├── asconfig.json                                   # configuration file for Assemblyscript compiler
├── assembly
│   ├── __tests__
│   │   ├── as-pect.d.ts                            # as-pect unit testing headers for type hints
│   │   └── main.spec.ts                            # unit test for the contract
│   ├── as_types.d.ts                               # AssemblyScript headers for type hint
│   ├── index.ts                                    # contains the smart contract code
│   ├── models.ts                                   # contains code for the models accesible to the smart contract
│   └── tsconfig.json                               # Typescript configuration file
├── neardev
│   ├── dev-account                                 #in this file the provisional deploy smart contract account is saved
│   └── dev-account.env                             #in this file the provisional deploy smart contract account is saved like a environment variable                             
├── out
│   └── main.wasm                                   # compiled smart contract code using to deploy
├── package-lock.json                               # project manifest lock version
├── package.json                                    # Node.js project manifest (scripts and dependencies)
└── yarn.lock                                       # project manifest lock version
```
1. The smart contract code lives in the `/assambly` folder.
2. To make a test deploy use the scripts in the `/package.json` file.



Thanks to be interested in our project! 🤗
======================
Here we leave a [UX/UI] design proposal to develop the frontend part of the communite project.
---------------------------

  [create-near-app]: https://github.com/near/create-near-app
  [Node.js]: https://nodejs.org/en/download/package-manager/
  [NEAR accounts]: https://docs.near.org/docs/concepts/account
  [NEAR Wallet]: https://wallet.testnet.near.org/
  [near-cli]: https://github.com/near/near-cli
  [NEAR test account]: https://docs.near.org/docs/develop/basics/create-account#creating-a-testnet-account
  [nvm]: https://github.com/nvm-sh/nvm
  [UX/UI]: https://www.figma.com/file/Ywz4Y2SS4yB3KBV7EeCytF/Communify?node-id=0%3A1