// Test actual transaction count from API - paste this directly into browser console

function testActualTransactionCount() {
    console.log('🔍 TESTING ACTUAL TRANSACTION COUNT FROM API');
    console.log('='.repeat(60));
    
    const app = window.simpleRankChecker || new SimpleRankChecker();
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    const testAddress = '0xe25Bb2cEdE45e042af3433944AF1d10ef0297761';
    const expectedTransactions = 46; // From KiteScan
    
    async function testActualCount() {
        console.log(`\n📍 Testing: ${testAddress}`);
        console.log(`📊 Expected: ${expectedTransactions} transactions (KiteScan)`);
        console.log('-'.repeat(50));
        
        try {
            // Test actual transaction count method
            console.log('🔍 Step 1: Testing getActualTransactionCount method...');
            const actualCount = await app.getActualTransactionCount(testAddress);
            console.log(`📊 Actual transaction count from API: ${actualCount}`);
            
            // Test transaction data fetching
            console.log('\n🔍 Step 2: Testing getTransactionDataETH method...');
            const transactionData = await app.getTransactionDataETH(testAddress);
            console.log('📊 Transaction Data:', transactionData);
            
            let transactionCount = 0;
            if (transactionData && transactionData.result) {
                transactionCount = parseInt(transactionData.result, 16);
                console.log(`📊 Parsed transaction count: ${transactionCount}`);
            }
            
            // Test full account data
            console.log('\n🔍 Step 3: Testing full account data...');
            const accountData = await app.getAccountData(testAddress);
            console.log('📊 Account Data:', accountData);
            
            // Test rank and scores
            console.log('\n🔍 Step 4: Testing rank and scores...');
            const rankTier = app.getRankTier(accountData);
            const scores = app.calculateScoreBreakdown(accountData);
            
            // Results
            console.log('\n🎯 RESULTS:');
            console.log('='.repeat(30));
            console.log(`API transaction count: ${actualCount}`);
            console.log(`Method transaction count: ${transactionCount}`);
            console.log(`Final transaction count: ${accountData.transactionCount}`);
            console.log(`Balance: ${accountData.balance} KITE`);
            console.log(`NFTs: ${accountData.soundboundNFTs}`);
            console.log(`Rank: ${rankTier.name} (Level ${rankTier.level})`);
            console.log(`Total Score: ${scores.total}`);
            console.log(`Transaction Points: ${scores.transactions}`);
            
            // Check accuracy
            const isAccurate = accountData.transactionCount === expectedTransactions;
            console.log(`\n📊 ACCURACY CHECK:`);
            console.log(`Expected: ${expectedTransactions}`);
            console.log(`API Count: ${actualCount}`);
            console.log(`Final Count: ${accountData.transactionCount}`);
            console.log(`Match: ${isAccurate ? '✅' : '❌'}`);
            
            if (isAccurate) {
                console.log('✅ Transaction count is accurate!');
            } else {
                console.log('❌ Transaction count is still incorrect');
                const difference = Math.abs(accountData.transactionCount - expectedTransactions);
                console.log(`   Difference: ${difference} transactions`);
                
                if (actualCount === expectedTransactions) {
                    console.log('✅ API count is correct, but final count is wrong');
                } else {
                    console.log('❌ API count is also incorrect');
                }
            }
            
            // Test different methods
            console.log('\n🔍 METHOD COMPARISON:');
            console.log('-'.repeat(25));
            console.log(`1. ETH RPC nonce: ${transactionCount}`);
            console.log(`2. API actual count: ${actualCount}`);
            console.log(`3. Final count: ${accountData.transactionCount}`);
            console.log(`4. Expected: ${expectedTransactions}`);
            
            // Find the best method
            const methods = [
                { name: 'ETH RPC nonce', count: transactionCount },
                { name: 'API actual count', count: actualCount },
                { name: 'Final count', count: accountData.transactionCount }
            ];
            
            const bestMethod = methods.find(method => method.count === expectedTransactions);
            if (bestMethod) {
                console.log(`✅ Best method: ${bestMethod.name} (${bestMethod.count})`);
            } else {
                console.log('❌ No method matches expected count');
            }
            
        } catch (error) {
            console.error(`❌ Error testing ${testAddress}:`, error);
        }
    }
    
    // Test with other addresses
    async function testOtherAddresses() {
        console.log('\n🔍 Testing other addresses...');
        console.log('-'.repeat(40));
        
        const otherAddresses = [
            '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            '0x5603800fD5aC900Bd5D710B461A9874E6201F7d5'
        ];
        
        for (const address of otherAddresses) {
            try {
                console.log(`\n📍 Testing: ${address}`);
                
                // Test actual count
                const actualCount = await app.getActualTransactionCount(address);
                console.log(`📊 API count: ${actualCount}`);
                
                // Test full data
                const accountData = await app.getAccountData(address);
                console.log(`📊 Final count: ${accountData.transactionCount}`);
                console.log(`📊 Balance: ${accountData.balance} KITE`);
                console.log(`📊 NFTs: ${accountData.soundboundNFTs}`);
                
            } catch (error) {
                console.error(`❌ Error testing ${address}:`, error.message);
            }
        }
    }
    
    // Run all tests
    async function runAllTests() {
        await testActualCount();
        await testOtherAddresses();
        
        console.log('\n🏁 ALL ACTUAL TRANSACTION COUNT TESTS COMPLETED');
        console.log('='.repeat(60));
        console.log('\n📊 FIX SUMMARY:');
        console.log('✅ API Method: Get actual transaction count from txlist API');
        console.log('✅ CORS Proxies: Multiple fallback proxies');
        console.log('✅ Fallback: ETH RPC nonce if API fails');
        console.log('✅ Accuracy: Should match KiteScan exactly');
        console.log('\n🎯 EXPECTED RESULTS:');
        console.log('- 0xe25Bb2cEdE45e042af3433944AF1d10ef0297761: 46 transactions');
        console.log('- Other addresses: Real API transaction counts');
    }
    
    // Run the tests
    runAllTests();
}

// Run the test
testActualTransactionCount();
