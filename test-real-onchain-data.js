// Test real onchain data - paste this directly into browser console

function testRealOnchainData() {
    console.log('🔍 TESTING REAL ONCHAIN DATA');
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
        {
            address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            description: 'Should have 3 NFTs from onchain data'
        },
        {
            address: '0x5603800fD5aC900Bd5D710B461A9874E6201F7d5',
            description: 'Should have 2 NFTs from onchain data'
        },
        {
            address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
            description: 'Should have 0 NFTs from onchain data'
        }
    ];
    
    async function testAddress(testCase) {
        console.log(`\n📍 Testing: ${testCase.address}`);
        console.log(`📝 Description: ${testCase.description}`);
        console.log('-'.repeat(50));
        
        try {
            // Test NFT data fetching
            console.log('🔍 Step 1: Fetching NFT data from onchain...');
            const nftData = await app.getNFTDataETH(testCase.address);
            console.log('📊 NFT Data:', nftData);
            
            // Check if data is from API or fallback
            const isFromAPI = nftData.result && nftData.result.length > 0 && 
                             !nftData.result.some(item => item.contractAddress && 
                                 ['0x7dD7d801f93d6A1C2DF96374F9A5A3A9C2aEd0b2', 
                                  '0x831940163a24ac325D1d6Ac3Cf0a8932F8237514', 
                                  '0xC17d5AA3045d9A4a0915972c5da94f6fb1EFFBda'].includes(item.contractAddress));
            
            const isFromFallback = nftData.result && nftData.result.length > 0 && 
                                  nftData.result.some(item => item.contractAddress && 
                                      ['0x7dD7d801f93d6A1C2DF96374F9A5A3A9C2aEd0b2', 
                                       '0x831940163a24ac325D1d6Ac3Cf0a8932F8237514', 
                                       '0xC17d5AA3045d9A4a0915972c5da94f6fb1EFFBda'].includes(item.contractAddress));
            
            console.log(`Data source: ${isFromAPI ? '✅ REAL ONCHAIN' : isFromFallback ? '🔄 FALLBACK' : '❌ EMPTY'}`);
            
            if (nftData.result && nftData.result.length > 0) {
                console.log('\n📋 NFT Items:');
                nftData.result.forEach((item, index) => {
                    console.log(`  ${index + 1}. ${item.tokenName} (${item.tokenSymbol})`);
                    if (item.contractAddress) {
                        console.log(`     Contract: ${item.contractAddress}`);
                    }
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
            console.log(`Data source: ${isFromAPI ? '✅ REAL ONCHAIN' : isFromFallback ? '🔄 FALLBACK' : '❌ EMPTY'}`);
            console.log(`NFT count: ${accountData.soundboundNFTs}`);
            console.log(`Rank: ${rankTier.name} (Level ${rankTier.level})`);
            console.log(`Total Score: ${scores.total}`);
            console.log(`Balance: ${accountData.balance} KITE`);
            console.log(`Transactions: ${accountData.transactionCount}`);
            
            // Verify data authenticity
            if (isFromAPI) {
                console.log('\n✅ VERIFIED: Using real onchain data');
            } else if (isFromFallback) {
                console.log('\n🔄 FALLBACK: Using fallback data (API failed)');
            } else {
                console.log('\n❌ EMPTY: No NFT data available');
            }
            
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
        console.log('\n📊 SUMMARY:');
        console.log('✅ REAL ONCHAIN: Data fetched from blockchain API');
        console.log('🔄 FALLBACK: Data used when API fails');
        console.log('❌ EMPTY: No NFT data available');
    }
    
    // Run the tests
    runAllTests();
}

// Run the test
testRealOnchainData();
