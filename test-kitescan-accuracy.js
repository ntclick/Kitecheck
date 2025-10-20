// Test accuracy against KiteScan data - paste this directly into browser console

function testKiteScanAccuracy() {
    console.log('🔍 TESTING KITESCAN ACCURACY');
    console.log('='.repeat(60));
    
    const app = window.simpleRankChecker || new SimpleRankChecker();
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    // Address from KiteScan with known data
    const testAddress = '0xe25Bb2cEdE45e042af3433944AF1d10ef0297761';
    
    // Known data from KiteScan website
    const kitescanData = {
        transactions: 46,
        tokenTransfers: 31,
        tokens: 5,
        internalTxns: 5,
        widgets: 10
    };
    
    async function testAgainstKiteScan() {
        console.log(`\n📍 Testing: ${testAddress}`);
        console.log(`🌐 KiteScan URL: https://testnet.kitescan.ai/address/${testAddress}`);
        console.log('-'.repeat(50));
        
        try {
            // Test full account data
            console.log('🔍 Fetching account data...');
            const accountData = await app.getAccountData(testAddress);
            console.log('📊 Account Data:', accountData);
            
            // Test rank and scores
            console.log('\n🔍 Calculating rank and scores...');
            const rankTier = app.getRankTier(accountData);
            const scores = app.calculateScoreBreakdown(accountData);
            
            // Compare with KiteScan data
            console.log('\n🎯 KITESCAN COMPARISON:');
            console.log('='.repeat(40));
            console.log(`Transactions:`);
            console.log(`  KiteScan: ${kitescanData.transactions}`);
            console.log(`  Our App: ${accountData.transactionCount}`);
            console.log(`  Match: ${accountData.transactionCount === kitescanData.transactions ? '✅' : '❌'}`);
            
            console.log(`\nBalance:`);
            console.log(`  Our App: ${accountData.balance} KITE`);
            
            console.log(`\nNFTs:`);
            console.log(`  Our App: ${accountData.soundboundNFTs}`);
            
            console.log(`\nRank:`);
            console.log(`  Our App: ${rankTier.name} (Level ${rankTier.level})`);
            
            console.log(`\nScore:`);
            console.log(`  Our App: ${scores.total} points`);
            console.log(`  Transaction Points: ${scores.transactions}`);
            
            // Detailed analysis
            console.log('\n🔍 DETAILED ANALYSIS:');
            console.log('-'.repeat(25));
            
            if (accountData.transactionCount === kitescanData.transactions) {
                console.log('✅ Transaction count matches KiteScan exactly');
            } else {
                console.log('❌ Transaction count does not match KiteScan');
                const difference = Math.abs(accountData.transactionCount - kitescanData.transactions);
                console.log(`   Difference: ${difference} transactions`);
                
                if (accountData.transactionCount < kitescanData.transactions) {
                    console.log('   Our count is lower than KiteScan');
                } else {
                    console.log('   Our count is higher than KiteScan');
                }
            }
            
            // Test individual methods
            console.log('\n🔍 Testing individual methods...');
            console.log('-'.repeat(30));
            
            // Test ETH RPC directly
            try {
                const transactionData = await app.getTransactionDataETH(testAddress);
                const ethRpcCount = parseInt(transactionData.result, 16);
                console.log(`ETH RPC count: ${ethRpcCount}`);
                console.log(`ETH RPC vs KiteScan: ${ethRpcCount === kitescanData.transactions ? '✅' : '❌'}`);
            } catch (error) {
                console.log(`ETH RPC error: ${error.message}`);
            }
            
            // Test token data
            try {
                const tokenData = await app.getTokenDataETH(testAddress);
                if (tokenData && tokenData.result) {
                    console.log(`Token transfers: ${tokenData.result.length}`);
                    console.log(`Token vs KiteScan: ${tokenData.result.length === kitescanData.tokenTransfers ? '✅' : '❌'}`);
                }
            } catch (error) {
                console.log(`Token data error: ${error.message}`);
            }
            
            // Recommendations
            console.log('\n💡 RECOMMENDATIONS:');
            console.log('-'.repeat(20));
            
            if (accountData.transactionCount === kitescanData.transactions) {
                console.log('✅ Current implementation is accurate');
                console.log('✅ No changes needed');
            } else {
                console.log('🔧 Need to investigate transaction count discrepancy');
                console.log('🔧 Check if ETH RPC is returning correct nonce');
                console.log('🔧 Verify nonce interpretation logic');
            }
            
        } catch (error) {
            console.error(`❌ Error testing ${testAddress}:`, error);
        }
    }
    
    // Test with other known addresses
    async function testOtherAddresses() {
        console.log('\n🔍 Testing other addresses...');
        console.log('-'.repeat(30));
        
        const otherAddresses = [
            '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            '0x5603800fD5aC900Bd5D710B461A9874E6201F7d5'
        ];
        
        for (const address of otherAddresses) {
            try {
                console.log(`\n📍 Testing: ${address}`);
                const accountData = await app.getAccountData(address);
                console.log(`📊 Transactions: ${accountData.transactionCount}`);
                console.log(`📊 Balance: ${accountData.balance} KITE`);
                console.log(`📊 NFTs: ${accountData.soundboundNFTs}`);
                
                const rankTier = app.getRankTier(accountData);
                console.log(`📊 Rank: ${rankTier.name} (Level ${rankTier.level})`);
                
            } catch (error) {
                console.error(`❌ Error testing ${address}:`, error.message);
            }
        }
    }
    
    // Run all tests
    async function runAllTests() {
        await testAgainstKiteScan();
        await testOtherAddresses();
        
        console.log('\n🏁 ALL KITESCAN ACCURACY TESTS COMPLETED');
        console.log('='.repeat(60));
        console.log('\n📊 SUMMARY:');
        console.log('✅ KiteScan: Official blockchain explorer');
        console.log('✅ ETH RPC: Direct blockchain data');
        console.log('✅ Our App: Should match KiteScan exactly');
        console.log('\n🎯 GOAL: Perfect accuracy with KiteScan data');
    }
    
    // Run the tests
    runAllTests();
}

// Run the test
testKiteScanAccuracy();
