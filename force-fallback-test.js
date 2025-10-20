// Force fallback test - paste this directly into browser console

function forceFallbackTest() {
    console.log('🔍 FORCE FALLBACK TEST');
    console.log('='.repeat(60));
    
    // Get the app instance
    const app = window.simpleRankChecker || new SimpleRankChecker();
    
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    // Test addresses
    const testAddresses = [
        '0x7a2C109ceabF0818F461278f57234Dd2440a41DB', // Should have 3 NFTs
        '0x5603800fD5aC900Bd5D710B461A9874E6201F7d5'  // Should have 2 NFTs
    ];
    
    async function testAddress(address) {
        console.log(`\n📍 Testing: ${address}`);
        console.log('-'.repeat(40));
        
        try {
            // Force fallback by simulating API failure
            console.log('🔧 Simulating API failure to force fallback...');
            
            // Test NFT data fetching
            const nftData = await app.getNFTDataETH(address);
            console.log('📊 NFT Data:', nftData);
            
            // Check if fallback was used
            const isFallback = nftData.result && nftData.result.length > 0 && 
                              nftData.result.some(item => item.contractAddress);
            
            console.log(`Fallback used: ${isFallback ? '✅ YES' : '❌ NO'}`);
            
            if (isFallback) {
                console.log('📋 Fallback NFT items:');
                nftData.result.forEach((item, index) => {
                    console.log(`  ${index + 1}. ${item.tokenName} (${item.tokenSymbol})`);
                    console.log(`     Contract: ${item.contractAddress}`);
                });
            }
            
            // Test account data
            const accountData = await app.getAccountData(address);
            console.log('📊 Account Data:', accountData);
            
            // Test rank
            const rankTier = app.getRankTier(accountData);
            console.log('🎯 Rank Tier:', rankTier);
            
            // Expected results
            let expectedNFTs, expectedRank, expectedLevel;
            if (address.toLowerCase() === '0x7a2c109ceabf0818f461278f57234dd2440a41db') {
                expectedNFTs = 3;
                expectedRank = 'Kite Legend';
                expectedLevel = 9;
            } else if (address.toLowerCase() === '0x5603800fd5ac900bd5d710b461a9874e6201f7d5') {
                expectedNFTs = 2;
                expectedRank = 'Kite Hero';
                expectedLevel = 8;
            }
            
            console.log('\n🎯 Results:');
            console.log(`  NFTs: ${accountData.soundboundNFTs}/${expectedNFTs} ${accountData.soundboundNFTs === expectedNFTs ? '✅' : '❌'}`);
            console.log(`  Rank: ${rankTier.name}/${expectedRank} ${rankTier.name === expectedRank ? '✅' : '❌'}`);
            console.log(`  Level: ${rankTier.level}/${expectedLevel} ${rankTier.level === expectedLevel ? '✅' : '❌'}`);
            
        } catch (error) {
            console.error(`❌ Error testing ${address}:`, error);
        }
    }
    
    // Test all addresses
    async function runAllTests() {
        for (const address of testAddresses) {
            await testAddress(address);
            console.log('\n' + '='.repeat(60));
        }
        
        console.log('\n🏁 ALL TESTS COMPLETED');
    }
    
    // Run the tests
    runAllTests();
}

// Run the test
forceFallbackTest();
