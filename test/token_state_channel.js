const HUFToken = artifacts.require('HUFToken.sol')
const TokenStateChannel = artifacts.require('TokenStateChannel.sol');
const BN = web3.utils.BN;

let token, twst

contract('State channel and token initialization', addresses => {

    const [token_owner, state_channel_owner, participant1, participant2, _] = addresses;        
    
    let participant1_tokens = web3.utils.toWei('20', 'ether')
    let participant2_tokens = web3.utils.toWei('10', 'ether')

    let participant1_deposit = web3.utils.toWei('2', 'ether')
    let participant2_deposit = web3.utils.toWei('3', 'ether')

    before( async () => {
        token = await HUFToken.new({from: token_owner})
        twst = await TokenStateChannel.new(token.address, {from: state_channel_owner})
    })
        
    it('Token is deployed', async () => {
        assert(await token.symbol() === 'HUF')
        assert(await token.owner() === token_owner)
        assert(await token.name() === 'HUF Token')
        assert((await token.totalSupply()).isZero())
    })

    it('Token payment channel contract is deployed', async () => {
        assert(await twst.owner() === state_channel_owner)
        assert(await twst.huf_token() === token.address)
    })

    it('We can mint tokens for participant1', async () => {
        token.mint(participant1, participant1_tokens, {from: token_owner})
        assert((await token.balanceOf(participant1)) == participant1_tokens)
    })

    it('We can mint tokens for participant2', async () => {
        token.mint(participant2, participant2_tokens, {from: token_owner})
        assert((await token.balanceOf(participant2)) == participant2_tokens)
    })

    it('Participant1 can create a payment channel with deposit', async () => {
        await token.approve(twst.address, participant1_deposit, {from: participant1})
        await twst.createChannel(participant1_deposit, {from: participant1})
        assert((await token.balanceOf(twst.address)) == participant1_deposit)
        assert((await twst.channel_cnt()) == 1)
    })

    it('participant2 can join to channel with funds', async () => {
        total_funds = new BN(participant1_deposit).add(new BN(participant2_deposit))
        await token.approve(twst.address, participant2_deposit, {from: participant2})
        await twst.join(1, participant2_deposit, {from: participant2})
        assert((await token.balanceOf(twst.address)).eq(total_funds))
    })

    it.skip('participant2 can sign a SCR message', async() => {

    })

    it.skip('participant1 can sign a SCR message signed by participant1', async() => {

    })

    it.skip('participant1 can redeem his first SRC payment  ', async() => {

    })
})
