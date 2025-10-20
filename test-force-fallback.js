// Test force fallback - paste this directly into browser console

function testForceFallback() {
    console.log('🔍 TESTING FORCE FALLBACK');
    console.log('='.repeat(60));
    
    // Get the app instance
    const app = window.simpleRankChecker || new SimpleRankChecker();
    
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    // Test addresses that should force fallback
    const testAddresses = [
        {
            address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            expectedNFTs: 3,
            expectedRank: 'Kite Legend',
            expectedLevel: 9
        },
        {
            address: '0x5603800fD5aC900Bd5D710B461A9874E6201F7d5',
            expectedNFTs: 2,
            expectedRank: 'Kite Hero',
            expectedLevel: 8
        }
    ];
    
    async function testAddress(testCase) {
        console.log(`\n📍 Testing: ${testCase.address}`);
        console.log(`🎯 Expected: ${testCase.expectedNFTs} NFTs → ${testCase.expectedRank} (Level ${testCase.expectedLevel})`);
        console.log('-'.repeat(50));
        
        try {
            // Test NFT data fetching
            console.log('🔍 Step 1: Fetching NFT data...');
            const nftData = await app.getNFTDataETH(testCase.address);
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
            console.log('\n🔍 Step 2: Fetching account data...');
            const accountData = await app.getAccountData(testCase.address);
            console.log('📊 Account Data:', accountData);
            
            // Test rank
            console.log('\n🔍 Step 3: Getting rank...');
            const rankTier = app.getRankTier(accountData);
            console.log('🎯 Rank Tier:', rankTier);
            
            // Test scores
            console.log('\n🔍 Step 4: Calculating scores...');
            const scores = app.calculateScoreBreakdown(accountData);
            console.log('🧮 Scores:', scores);
            
            // Results
            console.log('\n🎯 RESULTS:');
            console.log('='.repeat(30));
            console.log(`Fallback used: ${isFallback ? '✅' : '❌'}`);
            console.log(`NFT count: ${accountData.soundboundNFTs}/${testCase.expectedNFTs} ${accountData.soundboundNFTs === testCase.expectedNFTs ? '✅' : '❌'}`);
            console.log(`Rank: ${rankTier.name}/${testCase.expectedRank} ${rankTier.name === testCase.expectedRank ? '✅' : '❌'}`);
            console.log(`Level: ${rankTier.level}/${testCase.expectedLevel} ${rankTier.level === testCase.expectedLevel ? '✅' : '❌'}`);
            console.log(`Total Score: ${scores.total}`);
            
            // Overall status
            const allCorrect = accountData.soundboundNFTs === testCase.expectedNFTs && 
                              rankTier.name === testCase.expectedRank && 
                              rankTier.level === testCase.expectedLevel;
            
            console.log(`\n🏁 Overall Status: ${allCorrect ? '✅ ALL CORRECT' : '❌ ISSUES FOUND'}`);
            
        } catch (error) {
            console.error(`❌ Error testing ${testCase.address}:`, error);
        }
    }
    
    // Test all addresses
    async function runAllTests() {
        for (const testCase of testAddresses) {
            await testAddress(testCase);
            console.log('\n' + '='.repeat(60));
        }
        
        console.log('\n🏁 ALL TESTS COMPLETED');
        console.log('='.repeat(60));
    }
    
    // Run the tests
    runAllTests();
}

// Run the test
testForceFallback();
