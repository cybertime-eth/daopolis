import Web3 from 'web3'
import { ethers, BigNumber } from 'ethers'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { uuid } from "@walletconnect/utils";
import daosABI from '../abi/daos.json'
import { WHITELIST_ADDRESSES } from '@/constants'
const ContractKit = require('@celo/contractkit')
const axios = require('axios')
export const state = () => ({
  daosContract: '0xc4ea80deCA2415105746639eC16cB0cF8378996A',
  fullAddress: null,
  address: null,
  chainId: null,
  walletUri: null,
  wrongNetwork: false,
  saleOpened: false,
  mintCount: 5,
  celoPrice: 2,
  totalMintCount: 0,
  rejectBuyNft: false,
  successAddedNetwork: false,
  successPurchasedNft: false,
  nftList: [],
})

export const getters = {
  walletConnectProvider() {
    return new WalletConnectProvider({
      rpc: {
        42220: "https://forno.celo.org"
      },
      qrcodeModalOptions: {
        mobileLinks: !window.ethereum ? ['metamask', 'valora'] : []
      },
      // qrcodeModalOptions: {
      //   mobileLinks: ['metamask', 'trust', 'safepal', 'math']
      // },
    })
  },
  provider(state, getters) {
    return window.ethereum || getters.walletConnectProvider
  }
}

export const actions = {
  async updateUser({state, getters, commit, dispatch}) {
    if (!getters.provider) return
    if (localStorage.getItem('address') && !localStorage.getItem('walletconnect')) {
      try {
        const provider = getters.provider
        const web3Provider = new ethers.providers.Web3Provider(provider)
        const signer = await web3Provider.getSigner()
        const address = await signer.getAddress()
        const chain = await web3Provider.getNetwork()
        provider.on("chainChanged", async (chainId) => {
          dispatch('updateChainId', BigNumber.from(chainId).toNumber())
          if (state.totalMintCount === 0 || chainId !== state.chainId) {
            dispatch('updateTotalMintCount')
          }
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
        console.log(e)
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
    if (!state.fullAddress || !getters.provider || state.chainId !== 42220) return
    try {
      const web3 = new Web3(getters.provider)
      const kit = ContractKit.newKitFromWeb3(web3)
      const contract = new kit.web3.eth.Contract(daosABI, state.daosContract)
      const totalSupply = await contract.methods.totalSupply().call()
      commit('setTotalMintCount', totalSupply)
    } catch(e) {
      console.log(e)
    }
  },
  async connectMetaTrust({getters, commit, dispatch}) {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
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
  addEventHandlerForWalletProvider({state, commit, dispatch}, provider) {
    provider.on("accountsChanged", async (accounts) => {
      commit('setAddress', accounts[0])
      dispatch('updateTotalMintCount')
      if ($nuxt.$route.name === 'collection') {
        dispatch('getCollection')
      }
    });

    provider.on("chainChanged", async (chainId) => {
      dispatch('updateChainId', BigNumber.from(chainId).toNumber())
      if (state.totalMintCount === 0 || chainId !== state.chainId) {
        dispatch('updateTotalMintCount')
      }
    })

    provider.on("stop", () => {
      alert('wallet stop')
      dispatch('disconnectWallet', provider)
    })

    provider.on("close", () => {
      alert('wallet close')
      dispatch('disconnectWallet', provider)
    })
  },
  disconnectWallet({}, provider) {
    provider.wc._handshakeTopic = ""
    provider.isConnecting = false
  },
  async createWalletConnect({state, getters, commit, dispatch}) {
    const provider = getters.walletConnectProvider
    const wc = provider.wc
    dispatch('addEventHandlerForWalletProvider', provider)

    // create session
    wc._key = await wc._generateKey()
    const request = wc._formatRequest({
      method: "wc_sessionRequest",
      params: [
        {
          peerId: wc.clientId,
          peerMeta: wc.clientMeta,
          chainId: state.chainId,
        }
      ],
    })
    wc.handshakeId = request.id
    wc.handshakeTopic = uuid()
    wc._sendSessionRequest(request, "Session update rejected", { topic: wc.handshakeTopic })
    commit('setWalletUri', wc.uri)
    // create session end

    provider.start()
    provider.subscribeWalletConnector()
  },
  async walletConnect({commit, dispatch, getters}, isConnect) {
    const provider = getters.walletConnectProvider
    try {
      dispatch('addEventHandlerForWalletProvider', provider)

      if (localStorage.getItem('walletconnect') || isConnect) {
        await provider.enable();
      }
      window.web3 = new Web3(provider);
    } catch(e) {
      console.log(e)
      dispatch('disconnectWallet', provider)
    }
  },
  async addCeloNetwork({commit, state}) {
    if (!window.ethereum) {
      alert('Please switch network manaully')
      return
    }
    try {
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{"chainId": '0xa4ec'}] })
      commit('setSuccessAddedNetwork', true)
    } catch(e) {
      try {
        if (e.code === 4902) {
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
              "blockExplorerUrls": [
                "https://explorer.celo.org"
              ]
          }]})
          commit('setSuccessAddedNetwork', true)
        } else {
          console.log(e)
        }
      } catch(e) {
        console.log(e)
      }
    }
  },
  async getBalance({state, getters}) {
    if (!state.fullAddress || !getters.provider) return
    const web3 = new Web3(getters.provider)
    const kit = ContractKit.newKitFromWeb3(web3)
    const res = await kit.getTotalBalance(state.fullAddress)
    return res.CELO.c[0] / 10000
  },
  async getCollection({commit, state}, fetchMints = false) {
    if (state.fullAddress) {
      let provider = window.ethereum
      if (!provider) {
        provider = new Web3.providers.HttpProvider('https://forno.celo.org')
      }
      const web3 = new Web3(provider)
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
        uriList.forEach(tokenURI => nftPromises.push(axios.get(tokenURI)))
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
      const web3Provider = getters.provider
      const provider = new ethers.providers.Web3Provider(web3Provider);
      const web3 = new Web3(web3Provider)
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]
      const kit = ContractKit.newKitFromWeb3(web3)
      const contract = new kit.web3.eth.Contract(daosABI, state.daosContract)
      const msgValue = state.totalMintCount < 2000 ? '0' : web3.utils.toWei((state.celoPrice * state.mintCount).toString())
      const result = await contract.methods.mint(state.fullAddress, state.mintCount).send({
        from: account,
        value: msgValue,
        gasPrice: ethers.utils.parseUnits('0.5', 'gwei'),
        gasLimit: 210000
      })
      console.log('mint done')

      provider.once(result, async () => {
        await dispatch('getCollection', true)
        commit('setSuccessPurchasedNft', true)
      }) 
    } catch(e) {
      commit('setRejectBuyNft', true)
      console.log(e)
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
  setWalletUri(state, uri) {
    state.walletUri = uri
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
