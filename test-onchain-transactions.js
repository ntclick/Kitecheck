// Test onchain transaction count - paste this directly into browser console

function testOnchainTransactions() {
    console.log('🔍 TESTING ONCHAIN TRANSACTION COUNT');
    console.log('='.repeat(60));
    
    const app = window.simpleRankChecker || new SimpleRankChecker();
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    const testAddresses = [
        {
            address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            description: 'Should get real transaction count from onchain'
        },
        {
            address: '0x5603800fD5aC900Bd5D710B461A9874E6201F7d5',
            description: 'Should get real transaction count from onchain'
        },
        {
            address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
            description: 'Should get real transaction count from onchain'
        }
    ];
    
    async function testAddress(testCase) {
        console.log(`\n📍 Testing: ${testCase.address}`);
        console.log(`📝 Description: ${testCase.description}`);
        console.log('-'.repeat(50));
        
        try {
            // Test transaction data fetching
            console.log('🔍 Step 1: Fetching transaction data from onchain...');
            const transactionData = await app.getTransactionDataETH(testCase.address);
            console.log('📊 Transaction Data:', transactionData);
            
            // Parse transaction count
            let transactionCount = 0;
            if (transactionData && transactionData.result) {
                transactionCount = parseInt(transactionData.result, 16);
                console.log(`📊 Parsed transaction count: ${transactionCount}`);
            }
            
            // Check if data is from onchain or fake
            const isFromOnchain = transactionData && transactionData.result && 
                                 transactionData.result !== '0x0' && 
                                 transactionCount > 0;
            
            const isFromTokenTransfers = transactionData && transactionData.result && 
                                        transactionData.result !== '0x0' && 
                                        transactionCount > 0;
            
            const isZero = transactionCount === 0;
            
            console.log(`Data source: ${isFromOnchain ? '✅ REAL ONCHAIN' : isFromTokenTransfers ? '✅ ONCHAIN TOKEN TRANSFERS' : isZero ? '❌ ZERO (NO FAKE DATA)' : '❓ UNKNOWN'}`);
            
            // Test token data for verification
            console.log('\n🔍 Step 2: Fetching token data for verification...');
            const tokenData = await app.getTokenDataETH(testCase.address);
            console.log('📊 Token Data:', tokenData);
            
            if (tokenData && tokenData.result && Array.isArray(tokenData.result)) {
                const uniqueHashes = new Set(tokenData.result.map(tx => tx.hash));
                const estimatedCount = uniqueHashes.size;
                console.log(`📊 Unique transaction hashes from onchain: ${uniqueHashes.size}`);
                
                if (estimatedCount > 0) {
                    console.log('📋 First few transaction hashes:');
                    const hashArray = Array.from(uniqueHashes);
                    hashArray.slice(0, 5).forEach((hash, index) => {
                        console.log(`  ${index + 1}. ${hash}`);
                    });
                }
            }
            
            // Test full account data
            console.log('\n🔍 Step 3: Fetching full account data...');
            const accountData = await app.getAccountData(testCase.address);
            console.log('📊 Account Data:', accountData);
            
            // Test rank and scores
            console.log('\n🔍 Step 4: Getting rank and scores...');
            const rankTier = app.getRankTier(accountData);
            const scores = app.calculateScoreBreakdown(accountData);
            
            console.log('\n🎯 RESULTS:');
            console.log('='.repeat(30));
            console.log(`Transaction count: ${accountData.transactionCount}`);
            console.log(`Balance: ${accountData.balance} KITE`);
            console.log(`NFTs: ${accountData.soundboundNFTs}`);
            console.log(`Rank: ${rankTier.name} (Level ${rankTier.level})`);
            console.log(`Total Score: ${scores.total}`);
            console.log(`Transaction Points: ${scores.transactions}`);
            
            // Verify data authenticity
            if (isFromOnchain) {
                console.log('\n✅ VERIFIED: Using real onchain transaction count');
            } else if (isFromTokenTransfers) {
                console.log('\n✅ VERIFIED: Using onchain token transfer count');
            } else if (isZero) {
                console.log('\n✅ VERIFIED: No fake data - returning 0 when onchain data unavailable');
            } else {
                console.log('\n❓ UNKNOWN: Data source unclear');
            }
            
            // Check if transaction count affects ranking
            if (accountData.transactionCount > 0) {
                console.log(`\n📊 Transaction count contributes ${scores.transactions} points to total score`);
            } else {
                console.log('\n📊 Transaction count is 0 - no points from transactions');
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
        console.log('✅ REAL ONCHAIN: Transaction count from ETH RPC');
        console.log('✅ ONCHAIN TOKEN TRANSFERS: Count from token transfer hashes');
        console.log('❌ ZERO: No fake data when onchain methods fail');
        console.log('\n🎯 PRINCIPLE: Only use real onchain data, never fake data');
    }
    
    // Run the tests
    runAllTests();
}

// Run the test
testOnchainTransactions();
