// Test new wallet - paste this directly into browser console

function testNewWallet() {
    console.log('🔍 TESTING NEW WALLET');
    console.log('='.repeat(50));
    
    // Test the new wallet from logs
    const testAddress = '0x5603800fD5aC900Bd5D710B461A9874E6201F7d5';
    
    console.log(`📍 Testing address: ${testAddress}`);
    
    // Get the app instance
    const app = window.simpleRankChecker || new SimpleRankChecker();
    
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    // Test NFT data fetching
    app.getNFTDataETH(testAddress).then(nftData => {
        console.log('🖼️ NFT Data:', nftData);
        
        // Test account data fetching
        return app.getAccountData(testAddress);
    }).then(accountData => {
        console.log('📊 Account Data:', accountData);
        
        // Test score calculation
        const scores = app.calculateScoreBreakdown(accountData);
        console.log('🧮 Scores:', scores);
        
        // Test rank tier
        const rankTier = app.getRankTier(accountData);
        console.log('🎯 Rank Tier:', rankTier);
        
        // Check results
        console.log('\n🔍 Results:');
        console.log(`  Balance: ${accountData.balance} KITE`);
        console.log(`  Transactions: ${accountData.transactionCount}`);
        console.log(`  NFTs: ${accountData.soundboundNFTs}`);
        console.log(`  Rank: ${rankTier.name}`);
        console.log(`  Level: ${rankTier.level}`);
        console.log(`  Color: ${rankTier.color}`);
        console.log(`  Total Score: ${scores.total}`);
        
        // Expected vs actual
        console.log('\n🎯 Expected vs Actual:');
        console.log(`  Expected NFTs: 2 (from fallback)`);
        console.log(`  Actual NFTs: ${accountData.soundboundNFTs}`);
        console.log(`  NFT Match: ${accountData.soundboundNFTs === 2 ? '✅' : '❌'}`);
        
        console.log(`  Expected Rank: Kite Hero`);
        console.log(`  Actual Rank: ${rankTier.name}`);
        console.log(`  Rank Match: ${rankTier.name === 'Kite Hero' ? '✅' : '❌'}`);
        
    }).catch(error => {
        console.error('❌ Error:', error);
    });
}

// Run the test
testNewWallet();
