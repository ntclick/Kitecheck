/**
 * Test App Score Consistency
 * Test the actual app to ensure scores are consistent
 */

function testAppConsistency() {
    console.log('🔍 TESTING APP SCORE CONSISTENCY');
    console.log('='.repeat(80));
    
    // Check if we're on the right page
    if (!document.getElementById('resultsSection')) {
        console.error('❌ Not on the right page! Please run this on the Kite AI Chain page.');
        return;
    }
    
    // Test addresses
    const testAddresses = [
        '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D', // Should have 0 NFTs
        '0x7a2C109ceabF0818F461278f57234Dd2440a41DB'  // Should have 3 NFTs
    ];
    
    // Test app consistency
    async function testAppConsistency() {
        console.log('🧪 Testing app score consistency...');
        
        // Get the app instance
        const app = window.simpleRankChecker || new SimpleRankChecker();
        
        const allResults = [];
        
        for (const address of testAddresses) {
            console.log(`\n📍 Testing address: ${address}`);
            console.log('='.repeat(60));
            
            const addressResults = [];
            
            // Test the same address multiple times
            for (let i = 0; i < 3; i++) {
                console.log(`\n🔍 Test ${i + 1}/3:`);
                
                try {
                    // Get account data
                    const accountData = await app.getAccountData(address);
                    console.log('📊 Account Data:', accountData);
                    
                    // Calculate scores
                    const scores = app.calculateScoreBreakdown(accountData);
                    console.log('📊 Scores:', scores);
                    
                    // Get rank tier
                    const rankTier = app.getRankTier(accountData);
                    console.log('📊 Rank Tier:', rankTier);
                    
                    addressResults.push({
                        test: i + 1,
                        accountData: accountData,
                        scores: scores,
                        rankTier: rankTier
                    });
                    
                    console.log(`✅ Test ${i + 1} completed: ${scores.total} points`);
                    
                } catch (error) {
                    console.error(`❌ Test ${i + 1} failed:`, error);
                    addressResults.push({
                        test: i + 1,
                        error: error.message
                    });
                }
                
                // Wait between tests
                if (i < 2) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
            
            // Check consistency for this address
            console.log(`\n📊 Consistency Check for ${address}:`);
            const successfulResults = addressResults.filter(r => !r.error);
            
            if (successfulResults.length > 1) {
                const firstResult = successfulResults[0];
                let isConsistent = true;
                
                for (let i = 1; i < successfulResults.length; i++) {
                    const currentResult = successfulResults[i];
                    
                    // Check if scores are consistent
                    if (currentResult.scores.total !== firstResult.scores.total) {
                        isConsistent = false;
                        console.log(`  ❌ Inconsistent scores! Test 1: ${firstResult.scores.total}, Test ${i + 1}: ${currentResult.scores.total}`);
                    }
                    
                    // Check if rank is consistent
                    if (currentResult.rankTier.name !== firstResult.rankTier.name) {
                        isConsistent = false;
                        console.log(`  ❌ Inconsistent rank! Test 1: ${firstResult.rankTier.name}, Test ${i + 1}: ${currentResult.rankTier.name}`);
                    }
                }
                
                if (isConsistent) {
                    console.log(`  ✅ Consistent! All tests show ${firstResult.scores.total} points and ${firstResult.rankTier.name} rank`);
                } else {
                    console.log(`  ❌ Inconsistent results detected!`);
                }
            } else {
                console.log(`  ⚠️ Not enough successful tests to check consistency`);
            }
            
            allResults.push({
                address: address,
                results: addressResults
            });
        }
        
        // Final summary
        console.log('\n' + '='.repeat(80));
        console.log('🎯 APP CONSISTENCY TEST SUMMARY');
        console.log('='.repeat(80));
        
        for (const addressResult of allResults) {
            console.log(`\n📍 ${addressResult.address}`);
            
            const successfulResults = addressResult.results.filter(r => !r.error);
            if (successfulResults.length > 1) {
                const firstScore = successfulResults[0].scores.total;
                const firstRank = successfulResults[0].rankTier.name;
                const allSameScore = successfulResults.every(r => r.scores.total === firstScore);
                const allSameRank = successfulResults.every(r => r.rankTier.name === firstRank);
                
                if (allSameScore && allSameRank) {
                    console.log(`✅ Consistent: ${firstScore} points, ${firstRank} rank`);
                } else {
                    console.log(`❌ Inconsistent results:`);
                    successfulResults.forEach(r => {
                        console.log(`  Test ${r.test}: ${r.scores.total} points, ${r.rankTier.name} rank`);
                    });
                }
            } else {
                console.log(`⚠️ Not enough successful tests`);
            }
        }
        
        console.log('\n💡 Expected Results:');
        console.log('  Address 1 (0xE245...): Should show consistent points and rank');
        console.log('  Address 2 (0x7a2C...): Should show consistent points and rank');
        console.log('  Same wallet should always get same score and rank');
        
        console.log('='.repeat(80));
    }
    
    // Test manual score calculation
    function testManualScoreCalculation() {
        console.log('\n🧪 Testing manual score calculation...');
        console.log('='.repeat(60));
        
        // Test data
        const testData = [
            {
                name: 'No NFTs',
                balance: 0.2,
                transactionCount: 41,
                soundboundNFTs: 0,
                kiteTokens: 0
            },
            {
                name: '3 NFTs',
                balance: 0.686,
                transactionCount: 46,
                soundboundNFTs: 3,
                kiteTokens: 0
            }
        ];
        
        testData.forEach(data => {
            console.log(`\n📊 Testing: ${data.name}`);
            
            // Calculate scores manually
            const balancePoints = Math.floor(data.balance * 100);
            const transactionPoints = Math.floor(data.transactionCount * 3);
            const activityPoints = Math.floor(data.transactionCount * 2.5);
            const nftPoints = data.soundboundNFTs * 1000;
            const tokenPoints = data.kiteTokens * 50;
            
            let nftMultiplier = 1.0;
            if (data.soundboundNFTs >= 3) {
                nftMultiplier = 3.0;
            } else if (data.soundboundNFTs >= 2) {
                nftMultiplier = 2.5;
            } else if (data.soundboundNFTs >= 1) {
                nftMultiplier = 1.5;
            }
            
            const basePoints = balancePoints + transactionPoints + activityPoints + nftPoints + tokenPoints;
            const totalPoints = Math.floor(basePoints * nftMultiplier);
            
            console.log(`  Balance: ${data.balance} KITE = ${balancePoints} pts`);
            console.log(`  Transactions: ${data.transactionCount} = ${transactionPoints} pts`);
            console.log(`  Activity: ${data.transactionCount} = ${activityPoints} pts`);
            console.log(`  NFTs: ${data.soundboundNFTs} = ${nftPoints} pts`);
            console.log(`  Tokens: ${data.kiteTokens} = ${tokenPoints} pts`);
            console.log(`  Base Points: ${basePoints} pts`);
            console.log(`  NFT Multiplier: ${nftMultiplier}x`);
            console.log(`  Final Points: ${totalPoints} pts`);
        });
    }
    
    // Run all tests
    async function runAllTests() {
        await testAppConsistency();
        testManualScoreCalculation();
    }
    
    // Run the tests
    runAllTests().catch(console.error);
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running app consistency test...');
    testAppConsistency();
} else {
    console.log('📝 Copy and paste this function into browser console to test app consistency');
}
