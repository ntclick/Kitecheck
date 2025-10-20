// Detailed NFT Debug - paste this directly into browser console

function debugNFTDetailed() {
    console.log('🔍 DETAILED NFT DEBUG');
    console.log('='.repeat(60));
    
    // Get the app instance
    const app = window.simpleRankChecker || new SimpleRankChecker();
    
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    // Test multiple addresses
    const testAddresses = [
        {
            address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            expectedNFTs: 3,
            description: 'Should have 3 NFTs (fallback)'
        },
        {
            address: '0x5603800fD5aC900Bd5D710B461A9874E6201F7d5',
            expectedNFTs: 2,
            description: 'Should have 2 NFTs (fallback)'
        },
        {
            address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
            expectedNFTs: 0,
            description: 'Should have 0 NFTs (real API)'
        }
    ];
    
    async function testAddress(testCase) {
        console.log(`\n📍 Testing: ${testCase.address}`);
        console.log(`🎯 Expected: ${testCase.expectedNFTs} NFTs - ${testCase.description}`);
        console.log('-'.repeat(50));
        
        try {
            // Step 1: Test NFT data fetching
            console.log('🔍 Step 1: Fetching NFT data...');
            const nftData = await app.getNFTDataETH(testCase.address);
            console.log('📊 NFT Data Response:', nftData);
            
            // Step 2: Test account data fetching
            console.log('\n🔍 Step 2: Fetching account data...');
            const accountData = await app.getAccountData(testCase.address);
            console.log('📊 Account Data:', accountData);
            
            // Step 3: Test score calculation
            console.log('\n🔍 Step 3: Calculating scores...');
            const scores = app.calculateScoreBreakdown(accountData);
            console.log('📊 Scores:', scores);
            
            // Step 4: Test rank tier
            console.log('\n🔍 Step 4: Getting rank tier...');
            const rankTier = app.getRankTier(accountData);
            console.log('📊 Rank Tier:', rankTier);
            
            // Step 5: Analysis
            console.log('\n🔍 Step 5: Analysis...');
            console.log(`  Raw NFT Data: ${nftData.result ? nftData.result.length : 0} items`);
            console.log(`  Processed NFTs: ${accountData.soundboundNFTs}`);
            console.log(`  Expected NFTs: ${testCase.expectedNFTs}`);
            console.log(`  NFT Match: ${accountData.soundboundNFTs === testCase.expectedNFTs ? '✅' : '❌'}`);
            
            if (accountData.soundboundNFTs !== testCase.expectedNFTs) {
                console.log('❌ MISMATCH DETECTED!');
                console.log('🔍 Debugging NFT processing...');
                
                // Check if fallback was used
                if (nftData.result && nftData.result.length > 0) {
                    console.log('📋 NFT Items in response:');
                    nftData.result.forEach((item, index) => {
                        console.log(`  ${index + 1}. ${item.tokenName} (${item.tokenSymbol})`);
                        if (item.contractAddress) {
                            console.log(`     Contract: ${item.contractAddress}`);
                        }
                    });
                } else {
                    console.log('❌ No NFT items in response');
                }
            }
            
            console.log(`\n🎯 Final Result:`);
            console.log(`  Address: ${testCase.address}`);
            console.log(`  NFTs: ${accountData.soundboundNFTs}/${testCase.expectedNFTs}`);
            console.log(`  Rank: ${rankTier.name} (Level ${rankTier.level})`);
            console.log(`  Score: ${scores.total}`);
            console.log(`  Status: ${accountData.soundboundNFTs === testCase.expectedNFTs ? '✅ CORRECT' : '❌ INCORRECT'}`);
            
        } catch (error) {
            console.error(`❌ Error testing ${testCase.address}:`, error);
        }
    }
    
    // Test all addresses sequentially
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

// Run the debug
debugNFTDetailed();
