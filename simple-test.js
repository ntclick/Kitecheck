// Simple test script - paste this directly into browser console

function simpleTest() {
    console.log('🔍 SIMPLE TEST');
    console.log('='.repeat(50));
    
    // Test the wallet that should have 3 NFTs
    const testAddress = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    
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
        console.log(`  NFTs: ${accountData.soundboundNFTs}`);
        console.log(`  Rank: ${rankTier.name}`);
        console.log(`  Level: ${rankTier.level}`);
        console.log(`  Color: ${rankTier.color}`);
        
        // Expected vs actual
        console.log('\n🎯 Expected vs Actual:');
        console.log(`  Expected NFTs: 3`);
        console.log(`  Actual NFTs: ${accountData.soundboundNFTs}`);
        console.log(`  NFT Match: ${accountData.soundboundNFTs === 3 ? '✅' : '❌'}`);
        
        console.log(`  Expected Rank: Kite Legend`);
        console.log(`  Actual Rank: ${rankTier.name}`);
        console.log(`  Rank Match: ${rankTier.name === 'Kite Legend' ? '✅' : '❌'}`);
        
    }).catch(error => {
        console.error('❌ Error:', error);
    });
}

// Run the test
simpleTest();