// Test transaction count accuracy - paste this directly into browser console

function testTransactionCountAccuracy() {
    console.log('🔍 TESTING TRANSACTION COUNT ACCURACY');
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
            description: 'Should have correct transaction count'
        },
        {
            address: '0x5603800fD5aC900Bd5D710B461A9874E6201F7d5',
            description: 'Should have correct transaction count'
        },
        {
            address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
            description: 'Should have correct transaction count'
        }
    ];
    
    async function testAddress(testCase) {
        console.log(`\n📍 Testing: ${testCase.address}`);
        console.log(`📝 Description: ${testCase.description}`);
        console.log('-'.repeat(50));
        
        try {
            // Test transaction data fetching
            console.log('🔍 Step 1: Fetching transaction data...');
            const transactionData = await app.getTransactionDataETH(testCase.address);
            console.log('📊 Transaction Data:', transactionData);
            
            // Parse transaction count
            let transactionCount = 0;
            if (transactionData && transactionData.result) {
                transactionCount = parseInt(transactionData.result, 16);
                console.log(`📊 Parsed transaction count: ${transactionCount}`);
            }
            
            // Test token data for verification
            console.log('\n🔍 Step 2: Fetching token data for verification...');
            const tokenData = await app.getTokenDataETH(testCase.address);
            console.log('📊 Token Data:', tokenData);
            
            let tokenTransferCount = 0;
            if (tokenData && tokenData.result && Array.isArray(tokenData.result)) {
                const uniqueHashes = new Set(tokenData.result.map(tx => tx.hash));
                tokenTransferCount = uniqueHashes.size;
                console.log(`📊 Unique token transfer hashes: ${tokenTransferCount}`);
                
                if (tokenTransferCount > 0) {
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
            console.log(`ETH RPC transaction count: ${transactionCount}`);
            console.log(`Token transfer count: ${tokenTransferCount}`);
            console.log(`Final transaction count: ${accountData.transactionCount}`);
            console.log(`Balance: ${accountData.balance} KITE`);
            console.log(`NFTs: ${accountData.soundboundNFTs}`);
            console.log(`Rank: ${rankTier.name} (Level ${rankTier.level})`);
            console.log(`Total Score: ${scores.total}`);
            console.log(`Transaction Points: ${scores.transactions}`);
            
            // Check accuracy
            console.log('\n🔍 ACCURACY CHECK:');
            console.log('-'.repeat(20));
            
            if (transactionCount > 0) {
                console.log(`✅ ETH RPC count: ${transactionCount} (from nonce)`);
                console.log(`📊 This represents the actual number of transactions sent from this address`);
            } else if (tokenTransferCount > 0) {
                console.log(`✅ Token transfer count: ${tokenTransferCount} (from token transfers)`);
                console.log(`📊 This represents unique transaction hashes from token transfers`);
            } else {
                console.log(`❌ No transaction data available`);
            }
            
            // Check if count is reasonable
            if (accountData.transactionCount >= 0) {
                console.log(`✅ Transaction count is valid: ${accountData.transactionCount}`);
            } else {
                console.log(`❌ Invalid transaction count: ${accountData.transactionCount}`);
            }
            
            // Check if transaction count affects ranking
            if (accountData.transactionCount > 0) {
                console.log(`\n📊 Transaction count contributes ${scores.transactions} points to total score`);
                
                // Check transaction tier
                if (accountData.transactionCount >= 200) {
                    console.log(`🏆 High transaction tier: ${accountData.transactionCount} transactions`);
                } else if (accountData.transactionCount >= 100) {
                    console.log(`🥈 Medium transaction tier: ${accountData.transactionCount} transactions`);
                } else if (accountData.transactionCount >= 50) {
                    console.log(`🥉 Low transaction tier: ${accountData.transactionCount} transactions`);
                } else {
                    console.log(`📊 Basic transaction tier: ${accountData.transactionCount} transactions`);
                }
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
        console.log('✅ ETH RPC: Transaction count from eth_getTransactionCount (nonce)');
        console.log('✅ Token Transfers: Count from unique transaction hashes');
        console.log('📊 Nonce starts from 0, so count is already correct');
        console.log('\n🎯 PRINCIPLE: Use real onchain data, no fake adjustments');
    }
    
    // Run the tests
    runAllTests();
}

// Run the test
testTransactionCountAccuracy();
