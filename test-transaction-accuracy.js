// Test transaction count accuracy against KiteScan - paste this directly into browser console

function testTransactionAccuracy() {
    console.log('🔍 TESTING TRANSACTION COUNT ACCURACY');
    console.log('='.repeat(60));
    
    const app = window.simpleRankChecker || new SimpleRankChecker();
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    // Address from KiteScan with known transaction count
    const testAddress = '0xe25Bb2cEdE45e042af3433944AF1d10ef0297761';
    const expectedTransactions = 46; // From KiteScan website
    
    async function testTransactionCount() {
        console.log(`\n📍 Testing: ${testAddress}`);
        console.log(`📊 Expected transactions: ${expectedTransactions} (from KiteScan)`);
        console.log('-'.repeat(50));
        
        try {
            // Test ETH RPC transaction count
            console.log('🔍 Step 1: Testing ETH RPC transaction count...');
            const transactionData = await app.getTransactionDataETH(testAddress);
            console.log('📊 Transaction Data:', transactionData);
            
            let ethRpcCount = 0;
            if (transactionData && transactionData.result) {
                ethRpcCount = parseInt(transactionData.result, 16);
                console.log(`📊 ETH RPC count: ${ethRpcCount}`);
            }
            
            // Test token transfer count
            console.log('\n🔍 Step 2: Testing token transfer count...');
            const tokenData = await app.getTokenDataETH(testAddress);
            console.log('📊 Token Data:', tokenData);
            
            let tokenTransferCount = 0;
            if (tokenData && tokenData.result && Array.isArray(tokenData.result)) {
                const uniqueHashes = new Set(tokenData.result.map(tx => tx.hash));
                tokenTransferCount = uniqueHashes.size;
                console.log(`📊 Token transfer count: ${tokenTransferCount}`);
                console.log(`📊 Total token transfers: ${tokenData.result.length}`);
            }
            
            // Test full account data
            console.log('\n🔍 Step 3: Testing full account data...');
            const accountData = await app.getAccountData(testAddress);
            console.log('📊 Account Data:', accountData);
            
            // Results comparison
            console.log('\n🎯 ACCURACY COMPARISON:');
            console.log('='.repeat(40));
            console.log(`KiteScan (expected): ${expectedTransactions}`);
            console.log(`ETH RPC count: ${ethRpcCount}`);
            console.log(`Token transfer count: ${tokenTransferCount}`);
            console.log(`Final app count: ${accountData.transactionCount}`);
            
            // Check accuracy
            const isEthRpcAccurate = ethRpcCount === expectedTransactions;
            const isTokenAccurate = tokenTransferCount === expectedTransactions;
            const isFinalAccurate = accountData.transactionCount === expectedTransactions;
            
            console.log('\n📊 ACCURACY CHECK:');
            console.log('-'.repeat(20));
            console.log(`ETH RPC accurate: ${isEthRpcAccurate ? '✅' : '❌'} (${ethRpcCount}/${expectedTransactions})`);
            console.log(`Token transfer accurate: ${isTokenAccurate ? '✅' : '❌'} (${tokenTransferCount}/${expectedTransactions})`);
            console.log(`Final count accurate: ${isFinalAccurate ? '✅' : '❌'} (${accountData.transactionCount}/${expectedTransactions})`);
            
            // Analysis
            console.log('\n🔍 ANALYSIS:');
            console.log('-'.repeat(15));
            
            if (isEthRpcAccurate) {
                console.log('✅ ETH RPC is giving correct transaction count');
            } else {
                console.log('❌ ETH RPC is giving incorrect transaction count');
                console.log(`   Difference: ${Math.abs(ethRpcCount - expectedTransactions)}`);
            }
            
            if (isTokenAccurate) {
                console.log('✅ Token transfer count matches expected');
            } else {
                console.log('❌ Token transfer count does not match expected');
                console.log(`   Note: Token transfers may not include all transaction types`);
            }
            
            if (isFinalAccurate) {
                console.log('✅ Final transaction count is correct');
            } else {
                console.log('❌ Final transaction count is incorrect');
                console.log(`   This is the value used for ranking`);
            }
            
            // Recommendations
            console.log('\n💡 RECOMMENDATIONS:');
            console.log('-'.repeat(20));
            
            if (!isFinalAccurate) {
                if (isEthRpcAccurate) {
                    console.log('🔧 Use ETH RPC count directly (it is accurate)');
                } else if (isTokenAccurate) {
                    console.log('🔧 Use token transfer count (it is accurate)');
                } else {
                    console.log('🔧 Both methods are inaccurate - need to investigate further');
                }
            } else {
                console.log('✅ Current method is working correctly');
            }
            
        } catch (error) {
            console.error(`❌ Error testing ${testAddress}:`, error);
        }
    }
    
    // Test multiple addresses for comparison
    async function testMultipleAddresses() {
        console.log('\n🔍 Testing multiple addresses for comparison...');
        console.log('-'.repeat(50));
        
        const testAddresses = [
            {
                address: '0xe25Bb2cEdE45e042af3433944AF1d10ef0297761',
                expected: 46,
                source: 'KiteScan'
            },
            {
                address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
                expected: 'unknown',
                source: 'Known address'
            },
            {
                address: '0x5603800fD5aC900Bd5D710B461A9874E6201F7d5',
                expected: 'unknown',
                source: 'Known address'
            }
        ];
        
        for (const testCase of testAddresses) {
            console.log(`\n📍 Testing: ${testCase.address}`);
            console.log(`📊 Expected: ${testCase.expected} (${testCase.source})`);
            
            try {
                const accountData = await app.getAccountData(testCase.address);
                console.log(`📊 Actual: ${accountData.transactionCount}`);
                
                if (testCase.expected !== 'unknown') {
                    const isAccurate = accountData.transactionCount === testCase.expected;
                    console.log(`🎯 Accuracy: ${isAccurate ? '✅' : '❌'}`);
                } else {
                    console.log(`📊 Count: ${accountData.transactionCount} (no expected value)`);
                }
                
            } catch (error) {
                console.error(`❌ Error: ${error.message}`);
            }
        }
    }
    
    // Run all tests
    async function runAllTests() {
        await testTransactionCount();
        await testMultipleAddresses();
        
        console.log('\n🏁 ALL ACCURACY TESTS COMPLETED');
        console.log('='.repeat(60));
        console.log('\n📊 SUMMARY:');
        console.log('✅ ETH RPC: Direct blockchain transaction count');
        console.log('✅ Token Transfers: Count from token transfer hashes');
        console.log('✅ KiteScan: Official blockchain explorer data');
        console.log('\n🎯 GOAL: Match KiteScan transaction counts exactly');
    }
    
    // Run the tests
    runAllTests();
}

// Run the test
testTransactionAccuracy();
