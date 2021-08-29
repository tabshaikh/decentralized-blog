# Decentralized Blog

https://user-images.githubusercontent.com/31198893/131247110-7b28f04c-27c0-4ce9-82f5-62d0b5d5282e.mp4

### Instructions to run:

```
git clone https://github.com/tabshaikh/decentralized-blog.git
cd decentralized-blog
yarn install
yarn start

# run local ethereum node (In a new terminal)
yarn run chain

# deploy your contracts (In a new terminal)
yarn run deploy

# Run a local TheGraph node (In a new terminal)
# remove any previous data files if they exist:
sudo -rf docker/graph-node/data/

# create a local subgraph
yarn graph-create-local

# ship your locally created subgraph to locally running graph node and ipfs 
yarn graph-ship-local

# Run Graph Node
yarn graph-run-node

# To deploy both graph and contracts 
yarn deploy-and-graph

# To stop running node
yarn graph-remove-node

```

---
Made using this cool template: https://github.com/austintgriffith/scaffold-eth
