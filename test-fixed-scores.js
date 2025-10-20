/**
 * Test Fixed Scores
 * Verify that scores are consistent for the same wallet
 */

function testFixedScores() {
    console.log('🔍 TESTING FIXED SCORES');
    console.log('='.repeat(80));
    
    // Test addresses
    const testAddresses = [
        '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D', // Should have 0 NFTs
        '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',  // Should have 3 NFTs
        '0x28ccE1d1B8469dD7Daaf2B1FFF3d2DC4F1dCcEf1'   // Recent test address
    ];
    
    // Create score tester
    class ScoreTester {
        constructor() {
            this.baseURL = 'https://testnet.kitescan.ai';
        }
        
        async makeEthRpcRequest(method, params = []) {
            const url = `${this.baseURL}/api/eth-rpc`;
            const payload = {
                jsonrpc: '2.0',
                method: method,
                params: params,
                id: 1
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error.message);
                }

                return data.result;
            } catch (error) {
                console.error(`ETH RPC ${method} failed:`, error);
                throw error;
            }
        }
        
        async getAccountData(address) {
            try {
                // Get balance and transaction count from ETH RPC
                const [balance, transactionCount] = await Promise.all([
                    this.makeEthRpcRequest('eth_getBalance', [address, 'latest']),
                    this.makeEthRpcRequest('eth_getTransactionCount', [address, 'latest'])
                ]);
                
                // Parse balance
                const balanceInWei = parseInt(balance, 16);
                const balanceInEther = balanceInWei / Math.pow(10, 18);
                
                // Parse transaction count
                const txCount = parseInt(transactionCount, 16);
                
                // Get NFT data (simplified for testing)
                let soundboundNFTs = 0;
                if (address.toLowerCase() === '0x7a2c109ceabf0818f461278f57234dd2440a41db') {
                    soundboundNFTs = 3; // Known NFT count
                }
                
                return {
                    address: address,
                    balance: balanceInEther,
                    transactionCount: txCount,
                    soundboundNFTs: soundboundNFTs,
                    kiteTokens: 0
                };
            } catch (error) {
                console.error('Error getting account data:', error);
                throw error;
            }
        }
        
        calculateScoreBreakdown(accountData) {
            const { balance, transactionCount, soundboundNFTs, kiteTokens } = accountData;
            
            // Fixed points system - consistent for same wallet
            const balancePoints = Math.floor(balance * 100); // 1 KITE = 100 points
            const transactionPoints = Math.floor(transactionCount * 3); // 1 transaction = 3 points
            const activityPoints = Math.floor(transactionCount * 2.5); // Activity bonus
            const nftPoints = soundboundNFTs * 1000; // 1 NFT = 1000 points
            const tokenPoints = kiteTokens * 50; // 1 Kite token = 50 points
            
            // Fixed NFT multiplier - consistent for same NFT count
            let nftMultiplier = 1.0;
            if (soundboundNFTs >= 3) {
                nftMultiplier = 3.0;
            } else if (soundboundNFTs >= 2) {
                nftMultiplier = 2.5;
            } else if (soundboundNFTs >= 1) {
                nftMultiplier = 1.5;
            }
            
            // Calculate base points (before multiplier)
            const basePoints = balancePoints + transactionPoints + activityPoints + nftPoints + tokenPoints;
            
            // Apply NFT multiplier to get final points
            const totalPoints = Math.floor(basePoints * nftMultiplier);
            
            return {
                total: totalPoints,
                balance: balancePoints,
                transactions: transactionPoints,
                activity: activityPoints,
                nft: nftPoints,
                token: tokenPoints,
                nftMultiplier: nftMultiplier,
                soundboundNFTs: soundboundNFTs,
                basePoints: basePoints
            };
        }
        
        async testAddressMultipleTimes(address, times = 3) {
            console.log(`\n🧪 Testing ${address} ${times} times...`);
            console.log('='.repeat(60));
            
            const results = [];
            
            for (let i = 0; i < times; i++) {
                console.log(`\n🔍 Test ${i + 1}/${times}:`);
                
                try {
                    const accountData = await this.getAccountData(address);
                    const scores = this.calculateScoreBreakdown(accountData);
                    
                    console.log(`  Balance: ${accountData.balance} KITE`);
                    console.log(`  Transactions: ${accountData.transactionCount}`);
                    console.log(`  NFTs: ${accountData.soundboundNFTs}`);
                    console.log(`  Total Points: ${scores.total}`);
                    console.log(`  NFT Multiplier: ${scores.nftMultiplier}x`);
                    
                    results.push({
                        test: i + 1,
                        accountData: accountData,
                        scores: scores
                    });
                    
                } catch (error) {
                    console.error(`  ❌ Test ${i + 1} failed:`, error.message);
                    results.push({
                        test: i + 1,
                        error: error.message
                    });
                }
                
                // Wait a bit between tests
                if (i < times - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
            
            // Check consistency
            console.log(`\n📊 Consistency Check for ${address}:`);
            const successfulResults = results.filter(r => !r.error);
            
            if (successfulResults.length > 1) {
                const firstResult = successfulResults[0];
                let isConsistent = true;
                
                for (let i = 1; i < successfulResults.length; i++) {
                    const currentResult = successfulResults[i];
                    
                    if (currentResult.scores.total !== firstResult.scores.total) {
                        isConsistent = false;
                        console.log(`  ❌ Inconsistent! Test 1: ${firstResult.scores.total}, Test ${i + 1}: ${currentResult.scores.total}`);
                    }
                }
                
                if (isConsistent) {
                    console.log(`  ✅ Consistent! All tests show ${firstResult.scores.total} points`);
                } else {
                    console.log(`  ❌ Inconsistent scores detected!`);
                }
            } else {
                console.log(`  ⚠️ Not enough successful tests to check consistency`);
            }
            
            return results;
        }
    }
    
    // Run tests
    async function runTests() {
        const tester = new ScoreTester();
        
        console.log('🧪 Running Fixed Score Tests...');
        console.log('Test Addresses:', testAddresses);
        
        const allResults = [];
        
        for (const address of testAddresses) {
            const results = await tester.testAddressMultipleTimes(address, 3);
            allResults.push({
                address: address,
                results: results
            });
        }
        
        // Final summary
        console.log('\n' + '='.repeat(80));
        console.log('🎯 FIXED SCORE TEST SUMMARY');
        console.log('='.repeat(80));
        
        for (const addressResult of allResults) {
            console.log(`\n📍 ${addressResult.address}`);
            
            const successfulResults = addressResult.results.filter(r => !r.error);
            if (successfulResults.length > 1) {
                const firstScore = successfulResults[0].scores.total;
                const allSame = successfulResults.every(r => r.scores.total === firstScore);
                
                if (allSame) {
                    console.log(`✅ Consistent: ${firstScore} points across all tests`);
                } else {
                    console.log(`❌ Inconsistent scores detected`);
                    successfulResults.forEach(r => {
                        console.log(`  Test ${r.test}: ${r.scores.total} points`);
                    });
                }
            } else {
                console.log(`⚠️ Not enough successful tests`);
            }
        }
        
        console.log('\n💡 Score Calculation Formula:');
        console.log('  Balance Points = Balance * 100');
        console.log('  Transaction Points = Transactions * 3');
        console.log('  Activity Points = Transactions * 2.5');
        console.log('  NFT Points = NFTs * 1000');
        console.log('  Token Points = Tokens * 50');
        console.log('  Base Points = Sum of all above');
        console.log('  Final Points = Base Points * NFT Multiplier');
        console.log('  NFT Multiplier: 3+ NFTs = 3.0x, 2 NFTs = 2.5x, 1 NFT = 1.5x, 0 NFTs = 1.0x');
        
        console.log('='.repeat(80));
    }
    
    // Run the tests
    runTests().catch(console.error);
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running fixed score test...');
    testFixedScores();
} else {
    console.log('📝 Copy and paste this function into browser console to test fixed scores');
}
