/**
 * Test Ranking with Real Data
 * Test the ranking system with real data from the logs
 */

function testRankingWithRealData() {
    console.log('🎯 TESTING RANKING WITH REAL DATA');
    console.log('='.repeat(80));
    
    // Real data from the logs
    const realData = [
        {
            address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
            balance: 0.19998917870045402,
            transactionCount: 40,
            soundboundNFTs: 0,
            kiteTokens: 0,
            expectedRank: 'Kite Active',
            expectedLevel: 6,
            expectedColor: '#E67E22',
            description: 'Real data from logs - 40 transactions, 0 NFTs'
        },
        {
            address: '0x28ccE1d1B8469dD7Daaf2B1FFF3d2DC4F1dCcEf1',
            balance: 1.880792382605529,
            transactionCount: 149,
            soundboundNFTs: 0,
            kiteTokens: 0,
            expectedRank: 'Kite Active',
            expectedLevel: 6,
            expectedColor: '#E67E22',
            description: 'Real data from logs - 149 transactions, 0 NFTs'
        },
        {
            address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            balance: 0.686, // Estimated
            transactionCount: 46, // Estimated
            soundboundNFTs: 3,
            kiteTokens: 0,
            expectedRank: 'Kite Legend',
            expectedLevel: 1,
            expectedColor: '#D4A574',
            description: 'Expected data - 3 NFTs, should be Kite Legend'
        }
    ];
    
    // Test ranking system with real data
    function testRankingSystemWithRealData() {
        console.log('\n🎯 TESTING RANKING SYSTEM WITH REAL DATA');
        console.log('='.repeat(60));
        
        // Simulate getRankTier function
        function getRankTier(accountData) {
            const { soundboundNFTs, transactionCount } = accountData;
            
            console.log(`  🎯 Calculating rank for: ${soundboundNFTs} NFTs, ${transactionCount} transactions`);
            
            // NFT holders get priority ranking
            if (soundboundNFTs >= 3) {
                return {
                    name: 'Kite Legend',
                    level: 1,
                    color: '#D4A574',
                    gradient: 'linear-gradient(135deg, #D4A574, #C19A6B)',
                    icon: '⚔️',
                    description: 'Kite Legend - 3+ NFTs, Top tier!',
                    tier: 'NFT Holder (3+)'
                };
            } else if (soundboundNFTs >= 2) {
                return {
                    name: 'Kite Hero',
                    level: 2,
                    color: '#9B59B6',
                    gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)',
                    icon: '🛡️',
                    description: 'Kite Hero - 2 NFTs, High tier!',
                    tier: 'NFT Holder (2)'
                };
            } else if (soundboundNFTs >= 1) {
                return {
                    name: 'Kite Regular',
                    level: 7,
                    color: '#95A5A6',
                    gradient: 'linear-gradient(135deg, #95A5A6, #7F8C8D, #566061)',
                    icon: '📈',
                    description: 'Kite Regular - 1 NFT, Normal user!',
                    tier: 'NFT Holder (1)'
                };
            } else {
                // No NFTs - rank by transaction count
                if (transactionCount >= 500) {
                    return {
                        name: 'Kite Advanced',
                        level: 4,
                        color: '#2ECC71',
                        gradient: 'linear-gradient(135deg, #2ECC71, #27AE60)',
                        icon: '🚀',
                        description: 'Kite Advanced - 500+ transactions!',
                        tier: 'High Activity (500+)'
                    };
                } else if (transactionCount >= 200) {
                    return {
                        name: 'Kite Intermediate',
                        level: 5,
                        color: '#F39C12',
                        gradient: 'linear-gradient(135deg, #F39C12, #E67E22)',
                        icon: '⚡',
                        description: 'Kite Intermediate - 200+ transactions!',
                        tier: 'Mid Activity (200-499)'
                    };
                } else if (transactionCount >= 100) {
                    return {
                        name: 'Kite Active',
                        level: 6,
                        color: '#E67E22',
                        gradient: 'linear-gradient(135deg, #E67E22, #D35400)',
                        icon: '🔥',
                        description: 'Kite Active - 100+ transactions!',
                        tier: 'Active (100-199)'
                    };
                } else if (transactionCount >= 50) {
                    return {
                        name: 'Kite Beginner',
                        level: 8,
                        color: '#A9A9A9',
                        gradient: 'linear-gradient(135deg, #A9A9A9, #808080, #696969)',
                        icon: '🌱',
                        description: 'Kite Beginner - 50+ transactions!',
                        tier: 'Regular (50-99)'
                    };
                } else if (transactionCount >= 10) {
                    return {
                        name: 'Kite Newbie',
                        level: 9,
                        color: '#D3D3D3',
                        gradient: 'linear-gradient(135deg, #D3D3D3, #C0C0C0, #A9A9A9)',
                        icon: '🆕',
                        description: 'Kite Newbie - 10+ transactions!',
                        tier: 'Beginner (10-49)'
                    };
                } else {
                    return {
                        name: 'Kite Newbie',
                        level: 9,
                        color: '#D3D3D3',
                        gradient: 'linear-gradient(135deg, #D3D3D3, #C0C0C0, #A9A9A9)',
                        icon: '🆕',
                        description: 'Kite Newbie - Just getting started!',
                        tier: 'Newbie (0-9)'
                    };
                }
            }
        }
        
        // Test each real data scenario
        realData.forEach((data, index) => {
            console.log(`\n${index + 1}. ${data.address}`);
            console.log(`   Description: ${data.description}`);
            console.log(`   Input: ${data.soundboundNFTs} NFTs, ${data.transactionCount} transactions`);
            
            const accountData = {
                soundboundNFTs: data.soundboundNFTs,
                transactionCount: data.transactionCount
            };
            
            const rankTier = getRankTier(accountData);
            
            console.log(`   Expected: ${data.expectedRank} (Level ${data.expectedLevel})`);
            console.log(`   Actual: ${rankTier.name} (Level ${rankTier.level})`);
            console.log(`   Expected Color: ${data.expectedColor}`);
            console.log(`   Actual Color: ${rankTier.color}`);
            console.log(`   Description: ${rankTier.description}`);
            
            // Check if results match expectations
            const rankMatch = rankTier.name === data.expectedRank;
            const levelMatch = rankTier.level === data.expectedLevel;
            const colorMatch = rankTier.color === data.expectedColor;
            
            console.log(`   Rank Match: ${rankMatch ? '✅' : '❌'}`);
            console.log(`   Level Match: ${levelMatch ? '✅' : '❌'}`);
            console.log(`   Color Match: ${colorMatch ? '✅' : '❌'}`);
            
            if (rankMatch && levelMatch && colorMatch) {
                console.log(`   ✅ PASS - All matches expectation`);
            } else {
                console.log(`   ❌ FAIL - Does not match expectation`);
            }
        });
    }
    
    // Test score calculation with real data
    function testScoreCalculationWithRealData() {
        console.log('\n🧮 TESTING SCORE CALCULATION WITH REAL DATA');
        console.log('='.repeat(60));
        
        // Simulate calculateScoreBreakdown function
        function calculateScoreBreakdown(accountData) {
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
        
        // Test each real data scenario
        realData.forEach((data, index) => {
            console.log(`\n${index + 1}. ${data.address}`);
            console.log(`   Description: ${data.description}`);
            
            const accountData = {
                balance: data.balance,
                transactionCount: data.transactionCount,
                soundboundNFTs: data.soundboundNFTs,
                kiteTokens: data.kiteTokens
            };
            
            const scores = calculateScoreBreakdown(accountData);
            
            console.log(`   Balance: ${data.balance} KITE = ${scores.balance} pts`);
            console.log(`   Transactions: ${data.transactionCount} = ${scores.transactions} pts`);
            console.log(`   Activity: ${data.transactionCount} = ${scores.activity} pts`);
            console.log(`   NFTs: ${data.soundboundNFTs} = ${scores.nft} pts`);
            console.log(`   Tokens: ${data.kiteTokens} = ${scores.token} pts`);
            console.log(`   Base Points: ${scores.basePoints} pts`);
            console.log(`   NFT Multiplier: ${scores.nftMultiplier}x`);
            console.log(`   Final Points: ${scores.total} pts`);
        });
    }
    
    // Test expected results
    function testExpectedResults() {
        console.log('\n🎯 TESTING EXPECTED RESULTS');
        console.log('='.repeat(60));
        
        console.log('\n📊 Expected Results Summary:');
        console.log('  1. 0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D:');
        console.log('     - 40 transactions, 0 NFTs');
        console.log('     - Expected: Kite Active (Level 6, Red)');
        console.log('     - Reason: 0 NFTs, 40 transactions (below 100 threshold)');
        
        console.log('\n  2. 0x28ccE1d1B8469dD7Daaf2B1FFF3d2DC4F1dCcEf1:');
        console.log('     - 149 transactions, 0 NFTs');
        console.log('     - Expected: Kite Active (Level 6, Red)');
        console.log('     - Reason: 0 NFTs, 149 transactions (above 100 threshold)');
        
        console.log('\n  3. 0x7a2C109ceabF0818F461278f57234Dd2440a41DB:');
        console.log('     - 3 NFTs, estimated transactions');
        console.log('     - Expected: Kite Legend (Level 1, Gold)');
        console.log('     - Reason: 3+ NFTs (highest tier)');
        
        console.log('\n💡 Key Points:');
        console.log('  - 0 NFTs: Ranked by transaction count');
        console.log('  - 1 NFT: Kite Regular (Normal, Gray)');
        console.log('  - 2 NFTs: Kite Hero (Epic, Purple)');
        console.log('  - 3+ NFTs: Kite Legend (Ultra Rare, Gold)');
    }
    
    // Run all tests
    function runAllTests() {
        testRankingSystemWithRealData();
        testScoreCalculationWithRealData();
        testExpectedResults();
        
        console.log('\n' + '='.repeat(80));
        console.log('🎯 RANKING WITH REAL DATA TEST SUMMARY');
        console.log('='.repeat(80));
        
        console.log('\n✅ TESTS COMPLETED:');
        console.log('  🎯 Ranking system with real data');
        console.log('  🧮 Score calculation with real data');
        console.log('  🎯 Expected results verification');
        
        console.log('\n💡 WHAT TO LOOK FOR:');
        console.log('  1. Check if ranking logic is correct');
        console.log('  2. Verify score calculations');
        console.log('  3. Check expected vs actual results');
        console.log('  4. Verify NFT priority ranking');
        console.log('  5. Check transaction-based ranking');
        
        console.log('='.repeat(80));
    }
    
    // Run the tests
    runAllTests();
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running ranking with real data test...');
    testRankingWithRealData();
} else {
    console.log('📝 Copy and paste this function into browser console to test ranking with real data');
}
