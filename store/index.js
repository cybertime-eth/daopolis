import Web3 from 'web3'
import { ethers, Wallet, providers } from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import daosABI from '../abi/daos.json'
import { newKit } from "@celo/contractkit";
import { WHITELIST_ADDRESSES } from '@/constants'
const ContractKit = require('@celo/contractkit')
export const state = () => ({
  daosContract: '0x34d63dc2f8c5655bA6E05124B3D4a283A402CEd9',
  countdownTime: 604800, // 7 * 24 * 3600(7 days - countdown time as seconds)
  fullAddress: null,
  address: null,
  userInWhitelist: false,
  mintCount: 5,
  totalMintCount: 0,
  rejectBuyNft: false,
  successPurchasedNft: false,
  nftList: []
})

export const getters = {
  provider() {
    const web3 = window.web3.eth && window.web3.eth.currentProvider.connected ? window.web3.eth : window.ethereum
    if (web3) {
      return new ethers.providers.Web3Provider(web3);
    } else {
      return new Web3.providers.HttpProvider('https://alfajores-forno.celo-testnet.org')
    }
  }
}

export const actions = {
  async updateUser({getters, commit, dispatch}) {
    if (localStorage.getItem('address') && !localStorage.getItem('walletconnect')) {
      try {
        const signer = await getters.provider.getSigner()
        const address = await signer.getAddress()
        commit('setAddress', address)
        if ($nuxt.$route.name === 'collection') {
          dispatch('getCollection')
        }
      } catch(e) {
        localStorage.removeItem('address')
      }
    }
  },
  async updateTotalMintCount({commit, state}) {
    const web3 = new Web3(window.ethereum)
    const kit = ContractKit.newKitFromWeb3(web3)
    const contract = new kit.web3.eth.Contract(daosABI, state.daosContract)
    const totalSupply = await contract.methods.totalSupply().call()
    commit('setTotalMintCount', totalSupply)
  },
  async connectMetaTrust({getters, commit}) {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const address = await getters.provider.getSigner().getAddress();
        commit('setAddress', address)
      } else if (window.web3) {
        window.web3 = new ethers.providers.Web3Provider(
          window.web3.currentProvider
        );
        const address = await getters.provider.getSigner().getAddress();
        commit('setAddress', address)
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
      const result = await contract.methods.mint(state.fullAddress, state.mintCount).send({
        from: account,
        value: web3.utils.toWei((2 * state.mintCount).toString())
      })
      console.log('mint done')

      getters.provider.once(result, async () => {
        await dispatch('getCollection', true)
        commit('setSuccessPurchasedNft', true)
      })
    } catch(e) {
      console.log(e)
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
      state.userInWhitelist = true
    }
  },
  setTotalMintCount(state, totalCount) {
    state.totalMintCount = totalCount
  },
  setMintCount(state, count) {
    state.mintCount = count
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
