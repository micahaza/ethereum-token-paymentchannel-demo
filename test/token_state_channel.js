const HUFToken = artifacts.require('HUFToken.sol')
const TokenStateChannel = artifacts.require('TokenStateChannel.sol');
const BN = web3.utils.BN;

contract('Two Way State Channel', addresses => {

    const [token_owner, state_channel_owner, participant1, participant2, _] = addresses;
    
    let token, twst
    
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

    it('State Channel contract is deployed', async () => {
        assert(await twst.owner() === state_channel_owner)
        assert(await twst.hufToken() === token.address)
    })

    it('We can mint tokens for participant1', async () => {
        token.mint(participant1, web3.utils.toWei('20', 'ether'), {from: token_owner})
        assert((await token.totalSupply()).eq(new BN(web3.utils.toWei('20', 'ether'))))
        assert((await token.balanceOf(participant1)).eq(new BN(web3.utils.toWei('20', 'ether'))))
    })

    it('We can mint tokens for participant2', async () => {
        token.mint(participant2, web3.utils.toWei('20', 'ether'), {from: token_owner})
        assert((await token.totalSupply()).eq(new BN(web3.utils.toWei('40', 'ether'))))
        assert((await token.balanceOf(participant2)).eq(new BN(web3.utils.toWei('20', 'ether'))))
    })

})
