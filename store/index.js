import Web3 from 'web3'
import { ethers, BigNumber } from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import daosABI from '../abi/daos.json'
import { WHITELIST_ADDRESSES } from '@/constants'
const ContractKit = require('@celo/contractkit')
export const state = () => ({
  daosContract: '0xc4ea80deCA2415105746639eC16cB0cF8378996A',
  fullAddress: null,
  address: null,
  chainId: null,
  wrongNetwork: false,
  saleOpened: false,
  mintCount: 5,
  celoPrice: 2,
  totalMintCount: 0,
  rejectBuyNft: false,
  successAddedNetwork: false,
  successPurchasedNft: false,
  nftList: []
})

export const getters = {
  provider() {
    const web3 = window.web3 && window.web3.eth && window.web3.eth.currentProvider.connected ? window.web3.eth : window.ethereum
    if (web3) {
      return new ethers.providers.Web3Provider(web3);
    } else {
      return new Web3.providers.HttpProvider('https://alfajores-forno.celo-testnet.org')
    }
  }
}

export const actions = {
  async updateUser({state, getters, commit, dispatch}) {
    if (localStorage.getItem('address') && !localStorage.getItem('walletconnect')) {
      try {
        const provider = getters.provider
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const chain = await provider.getNetwork()
        window.ethereum.on("chainChanged", async (chainId) => {
          dispatch('updateChainId', BigNumber.from(chainId).toNumber())
          dispatch('updateTotalMintCount')
        })

        commit('setAddress', address)
        dispatch('updateChainId', chain.chainId)
        if (state.totalMintCount === 0) {
          dispatch('updateTotalMintCount')
        }
        if ($nuxt.$route.name === 'collection') {
          dispatch('getCollection')
        }
      } catch(e) {
        localStorage.removeItem('address')
      }
    }
  },
  updateChainId({commit, state}, chainId) {
    commit('setChainId', chainId)
    commit('setWrongNetwork', (chainId !== 42220))
    commit('setSuccessAddedNetwork', false)
  },
  async updateTotalMintCount({commit, state, getters}) {
    if (!state.fullAddress || state.chainId !== 42220) return
    const web3 = new Web3(window.ethereum)
    const kit = ContractKit.newKitFromWeb3(web3)
    const contract = new kit.web3.eth.Contract(daosABI, state.daosContract)
    const totalSupply = await contract.methods.totalSupply().call()
    commit('setTotalMintCount', totalSupply)
  },
  async connectMetaTrust({getters, commit, dispatch}) {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = getters.provider
        const address = await provider.getSigner().getAddress();
        const chain = await provider.getNetwork()
        commit('setAddress', address)
        dispatch('updateChainId', chain.chainId)
        dispatch('updateTotalMintCount')
      } else {
        alert("please use web3 enabled browser.");
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async walletConnect({commit}, isConnect) {
    const provider = new WalletConnectProvider({
      rpc: {
        44787: "https://alfajores-forno.celo-testnet.org"
      },
      qrcodeModalOptions: {
        mobileLinks: ['metamask', 'trust', 'safepal', 'math']
      },
    });
    provider.on("accountsChanged", (accounts) => {
      commit('setAddress', accounts[0])
    });
    if (localStorage.getItem('walletconnect') || isConnect) {
      await provider.enable();
    }
    window.web3 = new Web3(provider);
  },
  async addCeloNetwork({commit, state}) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          "chainId": "0xa4ec",
          "chainName": "Celo (Mainnet)",
          "rpcUrls": [
            "https://forno.celo.org"
          ],
          "nativeCurrency": {
            "name": "Celo",
            "symbol": "CELO",
            "decimals": 18
          },
          "iconUrls": [
            "future",
          ],
          "blockExplorerUrls": [
            "https://explorer.celo.org"
          ]
      }]})
      commit('setSuccessAddedNetwork', true)
    } catch(e) {
      console.log(e)
      if (state.fullAddress === '0x44350e80B5F6c432529896FfEFDeD5A91ade3AA7') {
        alert(e)
      }
    }
  },
  async getCollection({commit, state}, fetchMints = false) {
    if (state.fullAddress) {
      const web3 = new Web3(window.ethereum)
      const kit = ContractKit.newKitFromWeb3(web3)
      const contract = new kit.web3.eth.Contract(daosABI, state.daosContract)
      const result = await contract.methods.tokensOfOwner(state.fullAddress).call()
      if (result)  {
        const promises = []
        const nftPromises = []
        const nftList = []
        const fetchCount = fetchMints ? state.mintCount : result.length
        const orderedResult = [...result].sort((a, b) => parseInt(a) - parseInt(b))
        orderedResult.slice(-fetchCount).forEach(tokenId => promises.push(contract.methods.tokenURI(tokenId).call()))
        const uriList = await Promise.all(promises)

        uriList.forEach(tokenURI => nftPromises.push(this.$axios.get(tokenURI)))
        const nftResultList = await Promise.all(nftPromises)

        nftResultList.forEach(nftResult => {
          nftList.push({
            id: parseInt(nftResult.data.token_id),
            ...nftResult.data
          })
        })
        commit('setNftList', nftList)
      }
    }
  },
  async buyNft({commit, getters, state, dispatch}) {
    try {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]
      const kit = ContractKit.newKitFromWeb3(web3)
      const contract = new kit.web3.eth.Contract(daosABI, state.daosContract)
      const msgValue = state.totalMintCount < 2000 ? '0' : web3.utils.toWei((state.celoPrice * state.mintCount).toString())
      const result = await contract.methods.mint(state.fullAddress, state.mintCount).send({
        from: account,
        value: msgValue
      })
      console.log('mint done')

      getters.provider.once(result, async () => {
        await dispatch('getCollection', true)
        commit('setSuccessPurchasedNft', true)
      })
    } catch(e) {
      commit('setRejectBuyNft', true)
    }
  },
  async logout({commit}) {
    try {
      commit('setAddress', '')
      localStorage.removeItem('walletconnect')
      localStorage.removeItem('address')
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
}
export const mutations = {
  setAddress(state,address) {
    localStorage.setItem('address', address)
    const startID = address.split("").slice(0, 6);
    const endID = address.split("").slice(-4);
    const dotArr = [".", ".", "."];
    state.address = startID
      .concat(dotArr)
      .concat(endID)
      .join("");
    state.fullAddress = address
    if (WHITELIST_ADDRESSES.includes(address)) {
      state.saleOpened = true
    }
  },
  setChainId(state, chainId) {
    state.chainId = chainId
  },
  setWrongNetwork(state, wrongNetwork) {
    state.wrongNetwork = wrongNetwork
  },
  setSaleOpened(state, saleOpened) {
    state.saleOpened = saleOpened
  },
  setTotalMintCount(state, totalCount) {
    state.totalMintCount = totalCount
  },
  setMintCount(state, count) {
    state.mintCount = count
  },
  setCeloPrice(state, price) {
    state.celoPrice = price
  },
  setSuccessAddedNetwork(state, successAddedNetwork) {
    state.successAddedNetwork = successAddedNetwork
  },
  setRejectBuyNft(state, rejectBuyNft) {
    state.rejectBuyNft = rejectBuyNft
  },
  setSuccessPurchasedNft(state, successPurchasedNft) {
    state.successPurchasedNft = successPurchasedNft
  },
  setNftList(state, nftList) {
    state.nftList = nftList
  }
}
