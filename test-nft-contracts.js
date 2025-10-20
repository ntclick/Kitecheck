// Test NFT contracts - paste this directly into browser console

function testNFTContracts() {
    console.log('🔍 TESTING NFT CONTRACTS');
    console.log('='.repeat(50));
    
    // Get the app instance
    const app = window.simpleRankChecker || new SimpleRankChecker();
    
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    // Test the wallet that should have 3 NFTs with new contracts
    const testAddress = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    
    console.log(`📍 Testing address: ${testAddress}`);
    console.log('🎯 Expected NFT contracts:');
    console.log('  1. 0x7dD7d801f93d6A1C2DF96374F9A5A3A9C2aEd0b2 (WhitelistSoulBoundNFT)');
    console.log('  2. 0x831940163a24ac325D1d6Ac3Cf0a8932F8237514 (WhitelistSoulBoundNFT)');
    console.log('  3. 0xC17d5AA3045d9A4a0915972c5da94f6fb1EFFBda (SoulBoundNFT)');
    console.log('');
    
    // Test NFT data fetching
    app.getNFTDataETH(testAddress).then(nftData => {
        console.log('🖼️ NFT Data:', nftData);
        
        // Check if contract addresses are included
        if (nftData.result && nftData.result.length > 0) {
            console.log('\n📋 Contract Addresses Found:');
            nftData.result.forEach((nft, index) => {
                console.log(`  ${index + 1}. ${nft.tokenName} (${nft.tokenSymbol})`);
                if (nft.contractAddress) {
                    console.log(`     Contract: ${nft.contractAddress}`);
                } else {
                    console.log(`     Contract: ❌ Missing`);
                }
            });
        }
        
        // Test account data fetching
        return app.getAccountData(testAddress);
    }).then(accountData => {
        console.log('\n📊 Account Data:', accountData);
        
        // Test score calculation
        const scores = app.calculateScoreBreakdown(accountData);
        console.log('🧮 Scores:', scores);
        
        // Test rank tier
        const rankTier = app.getRankTier(accountData);
        console.log('🎯 Rank Tier:', rankTier);
        
        // Check results
        console.log('\n🔍 Results:');
        console.log(`  NFTs: ${accountData.soundboundNFTs}`);
        console.log(`  Rank: ${rankTier.name}`);
        console.log(`  Level: ${rankTier.level}`);
        console.log(`  Color: ${rankTier.color}`);
        console.log(`  Total Score: ${scores.total}`);
        
        // Expected vs actual
        console.log('\n🎯 Expected vs Actual:');
        console.log(`  Expected NFTs: 3`);
        console.log(`  Actual NFTs: ${accountData.soundboundNFTs}`);
        console.log(`  NFT Match: ${accountData.soundboundNFTs === 3 ? '✅' : '❌'}`);
        
        console.log(`  Expected Rank: Kite Legend`);
        console.log(`  Actual Rank: ${rankTier.name}`);
        console.log(`  Rank Match: ${rankTier.name === 'Kite Legend' ? '✅' : '❌'}`);
        
        console.log(`  Expected Level: 9`);
        console.log(`  Actual Level: ${rankTier.level}`);
        console.log(`  Level Match: ${rankTier.level === 9 ? '✅' : '❌'}`);
        
    }).catch(error => {
        console.error('❌ Error:', error);
    });
}

// Run the test
testNFTContracts();
