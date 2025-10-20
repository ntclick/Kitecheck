/**
 * Test final ranking system
 */

async function testFinalRanking() {
    console.log('🎯 TESTING FINAL RANKING SYSTEM');
    console.log('='.repeat(80));
    
    // Test different scenarios
    const testCases = [
        {
            name: 'Kite Legendary (3 NFTs)',
            data: {
                balance: 5.0,
                transactionCount: 100,
                lastActivity: new Date().toISOString(),
                soundboundNFTs: 3,
                kiteTokens: 0
            }
        },
        {
            name: 'Kite Master (2 NFTs)',
            data: {
                balance: 3.0,
                transactionCount: 80,
                lastActivity: new Date().toISOString(),
                soundboundNFTs: 2,
                kiteTokens: 0
            }
        },
        {
            name: 'Kite Elite (1 NFT)',
            data: {
                balance: 2.0,
                transactionCount: 60,
                lastActivity: new Date().toISOString(),
                soundboundNFTs: 1,
                kiteTokens: 0
            }
        },
        {
            name: 'Kite Advanced (0 NFTs)',
            data: {
                balance: 1.5,
                transactionCount: 40,
                lastActivity: new Date().toISOString(),
                soundboundNFTs: 0,
                kiteTokens: 0
            }
        },
        {
            name: 'Kite Beginner (0 NFTs, low activity)',
            data: {
                balance: 0.5,
                transactionCount: 10,
                lastActivity: new Date().toISOString(),
                soundboundNFTs: 0,
                kiteTokens: 0
            }
        }
    ];
    
    // Simulate the calculateScoreBreakdown function
    function calculateScoreBreakdown(accountData) {
        const { 
            balance, 
            transactionCount, 
            lastActivity, 
            soundboundNFTs = 0,
            kiteTokens = 0
        } = accountData;
        
        // New points-based system instead of percentages
        let totalPoints = 0;
        
        // NFT Soundbound scoring (most important - up to 1000 points)
        let nftPoints = 0;
        let nftMultiplier = 1;
        if (soundboundNFTs >= 3) {
            // 3+ NFTs = 1000 points + 3.0x multiplier
            nftPoints = 1000;
            nftMultiplier = 3.0;
        } else if (soundboundNFTs >= 2) {
            // 2 NFTs = 800 points + 2.5x multiplier
            nftPoints = 800;
            nftMultiplier = 2.5;
        } else if (soundboundNFTs >= 1) {
            // 1 NFT = 500 points + 1.5x multiplier
            nftPoints = 500;
            nftMultiplier = 1.5;
        } else {
            // 0 NFTs = 0 points + 1.0x multiplier
            nftPoints = 0;
            nftMultiplier = 1.0;
        }
        
        // Balance scoring (up to 200 points)
        const balancePoints = Math.min(balance * 100, 200); // 1 KITE = 100 points, max 200 points
        
        // Transaction scoring (up to 150 points)
        const transactionPoints = Math.min(transactionCount * 3, 150); // 1 transaction = 3 points, max 150 points
        
        // Activity scoring (up to 100 points)
        const daysSinceActivity = (Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24);
        const activityPoints = Math.max(0, Math.min(100 - (daysSinceActivity * 2), 100)); // Max 100 points
        
        // Kite Tokens scoring (up to 50 points)
        const kiteTokenPoints = Math.min(kiteTokens * 5, 50); // 1 Kite token = 5 points, max 50 points
        
        // Calculate total base points
        const basePoints = nftPoints + balancePoints + transactionPoints + activityPoints + kiteTokenPoints;
        
        // Apply NFT multiplier to final score
        const finalPoints = Math.round(basePoints * nftMultiplier);
        
        return {
            points: {
                soundboundNFTs: nftPoints,
                balance: Math.round(balancePoints),
                transactions: Math.round(transactionPoints),
                activity: Math.round(activityPoints),
                kiteTokens: Math.round(kiteTokenPoints),
                baseTotal: Math.round(basePoints),
                finalTotal: finalPoints
            },
            nftMultiplier: nftMultiplier,
            soundboundNFTs: soundboundNFTs,
            total: finalPoints
        };
    }
    
    // Simulate the getRankTier function with updated thresholds
    function getRankTier(points) {
        if (points >= 4000) {
            return {
                name: 'Kite Legendary',
                level: 1,
                color: '#FFD700', // Gold
                gradient: 'linear-gradient(135deg, #FFD700, #FFA500, #FF6B35)',
                icon: '👑',
                description: 'Huyền thoại Kite - Cấp cao nhất!'
            };
        } else if (points >= 2500) {
            return {
                name: 'Kite Master',
                level: 2,
                color: '#9B59B6', // Purple
                gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD, #6A1B9A)',
                icon: '💎',
                description: 'Bậc thầy Kite - Cấp cao!'
            };
        } else if (points >= 1200) {
            return {
                name: 'Kite Elite',
                level: 3,
                color: '#3498DB', // Blue
                gradient: 'linear-gradient(135deg, #3498DB, #2980B9, #1F618D)',
                icon: '⭐',
                description: 'Tinh nhuệ Kite - Cấp trung cao!'
            };
        } else if (points >= 500) {
            return {
                name: 'Kite Advanced',
                level: 4,
                color: '#2ECC71', // Green
                gradient: 'linear-gradient(135deg, #2ECC71, #27AE60, #1E8449)',
                icon: '🚀',
                description: 'Nâng cao Kite - Cấp trung!'
            };
        } else {
            return {
                name: 'Kite Beginner',
                level: 5,
                color: '#95A5A6', // Gray
                gradient: 'linear-gradient(135deg, #95A5A6, #7F8C8D, #566061)',
                icon: '🌱',
                description: 'Người mới Kite - Cấp cơ bản!'
            };
        }
    }
    
    console.log('🧪 Testing final ranking scenarios...');
    console.log('='.repeat(80));
    
    testCases.forEach((testCase, index) => {
        console.log(`\n${index + 1}. ${testCase.name}`);
        console.log('-'.repeat(50));
        
        const scores = calculateScoreBreakdown(testCase.data);
        const rankTier = getRankTier(scores.total);
        
        console.log(`📊 Data: ${testCase.data.soundboundNFTs} NFTs, ${testCase.data.balance} KITE, ${testCase.data.transactionCount} txs`);
        console.log(`🎯 Points Breakdown:`);
        console.log(`   - NFT SoulBound: ${scores.points.soundboundNFTs} pts`);
        console.log(`   - Balance: ${scores.points.balance} pts`);
        console.log(`   - Transactions: ${scores.points.transactions} pts`);
        console.log(`   - Activity: ${scores.points.activity} pts`);
        console.log(`   - Kite Tokens: ${scores.points.kiteTokens} pts`);
        console.log(`   - Base Total: ${scores.points.baseTotal} pts`);
        console.log(`   - NFT Multiplier: ${scores.nftMultiplier}x`);
        console.log(`   - Final Total: ${scores.total} pts`);
        
        console.log(`🏆 Rank: ${rankTier.icon} ${rankTier.name} (Level ${rankTier.level})`);
        console.log(`🎨 Color: ${rankTier.color}`);
        console.log(`📝 Description: ${rankTier.description}`);
    });
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ FINAL RANKING SYSTEM SUMMARY:');
    console.log('='.repeat(80));
    console.log('👑 Kite Legendary: 4000+ pts (3+ NFTs, 3.0x multiplier)');
    console.log('💎 Kite Master: 2500+ pts (2 NFTs, 2.5x multiplier)');
    console.log('⭐ Kite Elite: 1200+ pts (1 NFT, 1.5x multiplier)');
    console.log('🚀 Kite Advanced: 500+ pts (0 NFTs, 1.0x multiplier)');
    console.log('🌱 Kite Beginner: <500 pts (0 NFTs, 1.0x multiplier)');
    console.log('='.repeat(80));
    console.log('🎨 Màu sắc đẹp cho từng cấp rank:');
    console.log('👑 Legendary: Vàng kim cương (Gold)');
    console.log('💎 Master: Tím hoàng gia (Purple)');
    console.log('⭐ Elite: Xanh dương (Blue)');
    console.log('🚀 Advanced: Xanh lá (Green)');
    console.log('🌱 Beginner: Xám (Gray)');
    console.log('='.repeat(80));
    console.log('🌐 Test at: http://localhost:8001');
    console.log('='.repeat(80));
}

// Run test
testFinalRanking().catch(console.error);
