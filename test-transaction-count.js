// Test transaction count - paste this directly into browser console

function testTransactionCount() {
    console.log('🔍 TESTING TRANSACTION COUNT');
    console.log('='.repeat(60));
    
    const app = window.simpleRankChecker || new SimpleRankChecker();
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    const testAddress = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    
    async function testTransactionData() {
        console.log(`\n📍 Testing: ${testAddress}`);
        console.log('-'.repeat(50));
        
        try {
            // Test transaction data fetching
            console.log('🔍 Step 1: Fetching transaction data...');
            const transactionData = await app.getTransactionDataETH(testAddress);
            console.log('📊 Transaction Data:', transactionData);
            
            // Parse transaction count
            let transactionCount = 0;
            if (transactionData && transactionData.result) {
                transactionCount = parseInt(transactionData.result, 16);
                console.log(`📊 Parsed transaction count: ${transactionCount}`);
            }
            
            // Test token data for fallback
            console.log('\n🔍 Step 2: Fetching token data for fallback...');
            const tokenData = await app.getTokenDataETH(testAddress);
            console.log('📊 Token Data:', tokenData);
            
            if (tokenData && tokenData.result && Array.isArray(tokenData.result)) {
                const uniqueHashes = new Set(tokenData.result.map(tx => tx.hash));
                const estimatedCount = uniqueHashes.size;
                console.log(`📊 Estimated transaction count from token transfers: ${estimatedCount}`);
                console.log(`📊 Unique transaction hashes: ${uniqueHashes.size}`);
                
                // Show first few hashes
                const hashArray = Array.from(uniqueHashes);
                console.log('📋 First few transaction hashes:');
                hashArray.slice(0, 5).forEach((hash, index) => {
                    console.log(`  ${index + 1}. ${hash}`);
                });
            }
            
            // Test full account data
            console.log('\n🔍 Step 3: Fetching full account data...');
            const accountData = await app.getAccountData(testAddress);
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
            
            // Check if transaction count is being used correctly
            if (accountData.transactionCount > 0) {
                console.log('\n✅ Transaction count is working correctly');
            } else {
                console.log('\n❌ Transaction count is 0 - checking fallback...');
                
                // Check if fallback should be used
                const expectedCount = testAddress.toLowerCase() === '0x7a2c109ceabf0818f461278f57234dd2440a41db' ? 150 : 0;
                console.log(`Expected fallback count: ${expectedCount}`);
                
                if (expectedCount > 0) {
                    console.log('🔄 Fallback should be used for this address');
                } else {
                    console.log('📊 No fallback expected for this address');
                }
            }
            
        } catch (error) {
            console.error(`❌ Error testing transaction count:`, error);
        }
    }
    
    testTransactionData();
}

// Run the test
testTransactionCount();
