// Debug transaction count issue - paste this directly into browser console

function debugTransactionCount() {
    console.log('🔍 DEBUGGING TRANSACTION COUNT');
    console.log('='.repeat(60));
    
    const app = window.simpleRankChecker || new SimpleRankChecker();
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    // Test with the problematic address
    const testAddress = '0xe25Bb2cEdE45e042af3433944AF1d10ef0297761';
    const expectedTransactions = 46; // From KiteScan
    
    async function debugStepByStep() {
        console.log(`\n📍 Debugging: ${testAddress}`);
        console.log(`📊 Expected: ${expectedTransactions} transactions (KiteScan)`);
        console.log('-'.repeat(50));
        
        try {
            // Step 1: Test ETH RPC directly
            console.log('🔍 Step 1: Testing ETH RPC eth_getTransactionCount...');
            try {
                const rawResult = await app.makeEthRpcRequest('eth_getTransactionCount', [testAddress, 'latest']);
                console.log('📊 Raw ETH RPC result:', rawResult);
                console.log('📊 Type:', typeof rawResult);
                
                const parsedCount = parseInt(rawResult, 16);
                console.log('📊 Parsed count:', parsedCount);
                console.log('📊 Hex to decimal:', `${rawResult} = ${parsedCount}`);
                
                // Test different interpretations
                console.log('\n🔍 Testing different interpretations:');
                console.log(`- Nonce as-is: ${parsedCount}`);
                console.log(`- Nonce - 1: ${parsedCount - 1}`);
                console.log(`- Nonce + 1: ${parsedCount + 1}`);
                console.log(`- Expected: ${expectedTransactions}`);
                
                // Find the correct interpretation
                if (parsedCount === expectedTransactions) {
                    console.log('✅ Nonce as-is matches KiteScan');
                } else if (parsedCount - 1 === expectedTransactions) {
                    console.log('✅ Nonce - 1 matches KiteScan');
                } else if (parsedCount + 1 === expectedTransactions) {
                    console.log('✅ Nonce + 1 matches KiteScan');
                } else {
                    console.log('❌ No simple interpretation matches KiteScan');
                    console.log(`   Difference: ${Math.abs(parsedCount - expectedTransactions)}`);
                }
                
            } catch (error) {
                console.error('❌ ETH RPC error:', error);
            }
            
        } catch (error) {
            console.error('❌ Debug error:', error);
        }
    }
    
    // Run the debug tests
    debugStepByStep();
}

// Run the debug
debugTransactionCount();
