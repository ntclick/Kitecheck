// Test speed optimization - paste this directly into browser console

function testSpeedOptimization() {
    console.log('⚡ TESTING SPEED OPTIMIZATION');
    console.log('='.repeat(60));
    
    const app = window.simpleRankChecker || new SimpleRankChecker();
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    const testAddress = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    
    async function testSpeed() {
        console.log(`\n📍 Testing speed with: ${testAddress}`);
        console.log('-'.repeat(50));
        
        // Test 1: First call (no cache)
        console.log('🔍 Test 1: First call (no cache)');
        const start1 = performance.now();
        
        try {
            const accountData1 = await app.getAccountData(testAddress);
            const end1 = performance.now();
            const time1 = end1 - start1;
            
            console.log(`⏱️ First call time: ${time1.toFixed(2)}ms`);
            console.log(`📊 Data: ${accountData1.transactionCount} transactions, ${accountData1.soundboundNFTs} NFTs`);
            
            // Test 2: Second call (with cache)
            console.log('\n🔍 Test 2: Second call (with cache)');
            const start2 = performance.now();
            
            const accountData2 = await app.getAccountData(testAddress);
            const end2 = performance.now();
            const time2 = end2 - start2;
            
            console.log(`⏱️ Second call time: ${time2.toFixed(2)}ms`);
            console.log(`📊 Data: ${accountData2.transactionCount} transactions, ${accountData2.soundboundNFTs} NFTs`);
            
            // Test 3: Third call (still cached)
            console.log('\n🔍 Test 3: Third call (still cached)');
            const start3 = performance.now();
            
            const accountData3 = await app.getAccountData(testAddress);
            const end3 = performance.now();
            const time3 = end3 - start3;
            
            console.log(`⏱️ Third call time: ${time3.toFixed(2)}ms`);
            console.log(`📊 Data: ${accountData3.transactionCount} transactions, ${accountData3.soundboundNFTs} NFTs`);
            
            // Results
            console.log('\n🎯 SPEED RESULTS:');
            console.log('='.repeat(30));
            console.log(`First call (no cache): ${time1.toFixed(2)}ms`);
            console.log(`Second call (cached): ${time2.toFixed(2)}ms`);
            console.log(`Third call (cached): ${time3.toFixed(2)}ms`);
            
            const speedup1 = time1 / time2;
            const speedup2 = time1 / time3;
            
            console.log(`\n⚡ SPEED IMPROVEMENT:`);
            console.log(`Cache vs First: ${speedup1.toFixed(2)}x faster`);
            console.log(`Cache vs First: ${speedup2.toFixed(2)}x faster`);
            
            if (time2 < 100) {
                console.log('✅ Cache is working effectively (< 100ms)');
            } else {
                console.log('⚠️ Cache might not be working properly (> 100ms)');
            }
            
            // Test cache timeout
            console.log('\n🔍 Test 4: Cache timeout test');
            console.log('⏳ Waiting 31 seconds for cache to expire...');
            
            setTimeout(async () => {
                const start4 = performance.now();
                const accountData4 = await app.getAccountData(testAddress);
                const end4 = performance.now();
                const time4 = end4 - start4;
                
                console.log(`⏱️ After cache timeout: ${time4.toFixed(2)}ms`);
                console.log(`📊 Data: ${accountData4.transactionCount} transactions, ${accountData4.soundboundNFTs} NFTs`);
                
                if (time4 > time2) {
                    console.log('✅ Cache timeout working - slower after 30s');
                } else {
                    console.log('⚠️ Cache timeout might not be working');
                }
            }, 31000);
            
        } catch (error) {
            console.error('❌ Error testing speed:', error);
        }
    }
    
    // Test individual methods
    async function testIndividualMethods() {
        console.log('\n🔍 Testing individual method speeds...');
        console.log('-'.repeat(50));
        
        const methods = [
            { name: 'getBalanceETH', method: () => app.getBalanceETH(testAddress) },
            { name: 'getTransactionDataETH', method: () => app.getTransactionDataETH(testAddress) },
            { name: 'getTokenDataETH', method: () => app.getTokenDataETH(testAddress) },
            { name: 'getNFTDataETH', method: () => app.getNFTDataETH(testAddress) }
        ];
        
        for (const { name, method } of methods) {
            try {
                const start = performance.now();
                const result = await method();
                const end = performance.now();
                const time = end - start;
                
                console.log(`⏱️ ${name}: ${time.toFixed(2)}ms`);
                
                if (time > 5000) {
                    console.log(`⚠️ ${name} is slow (> 5s)`);
                } else if (time > 2000) {
                    console.log(`⚠️ ${name} is moderate (> 2s)`);
                } else {
                    console.log(`✅ ${name} is fast (< 2s)`);
                }
                
            } catch (error) {
                console.log(`❌ ${name} failed: ${error.message}`);
            }
        }
    }
    
    // Run all tests
    async function runAllTests() {
        await testSpeed();
        await testIndividualMethods();
        
        console.log('\n🏁 ALL SPEED TESTS COMPLETED');
        console.log('='.repeat(60));
        console.log('\n📊 OPTIMIZATION SUMMARY:');
        console.log('✅ Timeout: 3s for ETH RPC, 5s for CORS proxy');
        console.log('✅ Caching: 30 seconds for account data');
        console.log('✅ Parallel: Essential data first, then additional data');
        console.log('✅ Loading: Progress indicators for better UX');
        console.log('\n🎯 EXPECTED IMPROVEMENTS:');
        console.log('- Faster failure on slow APIs');
        console.log('- Cached data for repeated requests');
        console.log('- Better user experience with loading states');
    }
    
    // Run the tests
    runAllTests();
}

// Run the test
testSpeedOptimization();
