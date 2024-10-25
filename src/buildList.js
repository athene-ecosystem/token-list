const { version } = require("../package.json");
const tokenlist = require("./constants/tokenLists/tokenlist.json");

module.exports = function buildLists() {
  const parsed = version.split(".");

  // Create the function that generates the list with sorted tokens
  const generateList = (name, tokens) => ({
    name: `${name} Default`,
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "",
    keywords: [name, "default"],
    tokens: [...tokens]
      // sort them by symbol for easy readability
      .sort((t1, t2) =>
        t1.symbol.toLowerCase().localeCompare(t2.symbol.toLowerCase())
      ),
  });

  // Generate testnet and mainnet lists separately
  const testnet = generateList("AtheneSwap Testnet", tokenlist.testnet);
  const mainnet = generateList(
    "AtheneSwap Mainnet",
    tokenlist.mainnet.filter((token) => token.address)
  );

  // Return both lists
  return { testnet, mainnet };
};
