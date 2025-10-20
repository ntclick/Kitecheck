/**
 * Test app with real wallet data
 */

async function testAppWithRealData() {
    console.log('🚀 Testing app with REAL wallet data...');
    console.log('='.repeat(80));
    
    // Test wallets
    const testWallets = [
        {
            address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
            expected: {
                balance: 0.19998918,
                transactions: 41,
                tokens: 0,
                nfts: 0
            }
        },
        {
            address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            expected: {
                balance: 0.68571852,
                transactions: 46,
                tokens: 3,
                nfts: 'unknown' // API timeout
            }
        }
    ];
    
    for (const wallet of testWallets) {
        console.log(`\n🔍 Testing wallet: ${wallet.address}`);
        console.log('-'.repeat(60));
        
        // Simulate what the app would do
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        
        try {
            // 1. Get Balance
            const balanceUrl = `https://testnet.kitescan.ai/api?module=account&action=balance&address=${wallet.address}&tag=latest`;
            const balanceResponse = await fetch(`${corsProxy}${encodeURIComponent(balanceUrl)}`);
            
            if (balanceResponse.ok) {
                const balanceData = await balanceResponse.json();
                const balanceInWei = balanceData.result || '0';
                const balanceInEther = parseInt(balanceInWei) / Math.pow(10, 18);
                
                console.log('💰 Balance:');
                console.log(`  Raw: ${balanceInWei}`);
                console.log(`  Parsed: ${balanceInEther.toFixed(8)} KITE`);
                console.log(`  Expected: ${wallet.expected.balance} KITE`);
                console.log(`  ✅ Match: ${Math.abs(balanceInEther - wallet.expected.balance) < 0.00000001 ? 'YES' : 'NO'}`);
            }
            
            // 2. Get Transactions
            const txUrl = `https://testnet.kitescan.ai/api?module=account&action=txlist&address=${wallet.address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
            const txResponse = await fetch(`${corsProxy}${encodeURIComponent(txUrl)}`);
            
            if (txResponse.ok) {
                const txData = await txResponse.json();
                const txCount = txData.result ? txData.result.length : 0;
                
                console.log('📋 Transactions:');
                console.log(`  Count: ${txCount}`);
                console.log(`  Expected: ${wallet.expected.transactions}`);
                console.log(`  ✅ Match: ${txCount === wallet.expected.transactions ? 'YES' : 'NO'}`);
            }
            
            // 3. Get Token Transfers
            const tokenUrl = `https://testnet.kitescan.ai/api?module=account&action=tokentx&address=${wallet.address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
            const tokenResponse = await fetch(`${corsProxy}${encodeURIComponent(tokenUrl)}`);
            
            if (tokenResponse.ok) {
                const tokenData = await tokenResponse.json();
                const tokenCount = tokenData.result ? tokenData.result.length : 0;
                
                console.log('🪙 Token Transfers:');
                console.log(`  Count: ${tokenCount}`);
                console.log(`  Expected: ${wallet.expected.tokens}`);
                console.log(`  ✅ Match: ${tokenCount === wallet.expected.tokens ? 'YES' : 'NO'}`);
            }
            
            // 4. Calculate Score (simplified)
            const balance = parseInt(balanceData.result || '0') / Math.pow(10, 18);
            const transactions = txData.result ? txData.result.length : 0;
            const tokens = tokenData.result ? tokenData.result.length : 0;
            
            // Simple scoring (higher is better)
            const score = (balance * 100) + (transactions * 10) + (tokens * 5);
            
            console.log('📊 Calculated Score:');
            console.log(`  Balance: ${balance.toFixed(8)} KITE`);
            console.log(`  Transactions: ${transactions}`);
            console.log(`  Tokens: ${tokens}`);
            console.log(`  Total Score: ${score.toFixed(2)}`);
            
        } catch (error) {
            console.log(`❌ Error testing wallet ${wallet.address}:`, error.message);
        }
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('🏁 App testing completed!');
    console.log('🌐 Open http://localhost:8001 to test the app');
    console.log('='.repeat(80));
}

// Run the test
testAppWithRealData().catch(console.error);
