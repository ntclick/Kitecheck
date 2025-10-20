/**
 * Test new ranking system with NFT priority and transaction tiers
 */

async function testNewRankingSystem() {
    console.log('🎯 TESTING NEW RANKING SYSTEM');
    console.log('='.repeat(80));
    
    // Test different scenarios
    const testCases = [
        // NFT Holders (Priority)
        {
            name: 'Kite Legendary (3 NFTs)',
            data: {
                soundboundNFTs: 3,
                transactionCount: 10, // Low transactions but high NFT count
                balance: 1.0
            }
        },
        {
            name: 'Kite Master (2 NFTs)',
            data: {
                soundboundNFTs: 2,
                transactionCount: 50,
                balance: 2.0
            }
        },
        {
            name: 'Kite Elite (1 NFT)',
            data: {
                soundboundNFTs: 1,
                transactionCount: 100,
                balance: 1.5
            }
        },
        // Non-NFT Holders (Ranked by transactions)
        {
            name: 'Kite Advanced (500+ txs)',
            data: {
                soundboundNFTs: 0,
                transactionCount: 600,
                balance: 5.0
            }
        },
        {
            name: 'Kite Intermediate (200+ txs)',
            data: {
                soundboundNFTs: 0,
                transactionCount: 300,
                balance: 3.0
            }
        },
        {
            name: 'Kite Active (100+ txs)',
            data: {
                soundboundNFTs: 0,
                transactionCount: 150,
                balance: 2.0
            }
        },
        {
            name: 'Kite Regular (50+ txs)',
            data: {
                soundboundNFTs: 0,
                transactionCount: 75,
                balance: 1.0
            }
        },
        {
            name: 'Kite Beginner (10+ txs)',
            data: {
                soundboundNFTs: 0,
                transactionCount: 25,
                balance: 0.5
            }
        },
        {
            name: 'Kite Newbie (0-9 txs)',
            data: {
                soundboundNFTs: 0,
                transactionCount: 5,
                balance: 0.1
            }
        }
    ];
    
    // Simulate the getRankTier function
    function getRankTier(accountData) {
        const { soundboundNFTs, transactionCount } = accountData;
        
        // NFT holders get priority ranking
        if (soundboundNFTs >= 3) {
            return {
                name: 'Kite Legendary',
                level: 1,
                color: '#FFD700',
                gradient: 'linear-gradient(135deg, #FFD700, #FFA500, #FF6B35)',
                icon: '👑',
                description: 'Kite Legendary - 3+ NFTs, Top tier!',
                tier: 'NFT Holder (3+)'
            };
        } else if (soundboundNFTs >= 2) {
            return {
                name: 'Kite Master',
                level: 2,
                color: '#9B59B6',
                gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD, #6A1B9A)',
                icon: '💎',
                description: 'Kite Master - 2 NFTs, High tier!',
                tier: 'NFT Holder (2)'
            };
        } else if (soundboundNFTs >= 1) {
            return {
                name: 'Kite Elite',
                level: 3,
                color: '#3498DB',
                gradient: 'linear-gradient(135deg, #3498DB, #2980B9, #1F618D)',
                icon: '⭐',
                description: 'Kite Elite - 1 NFT, Mid-high tier!',
                tier: 'NFT Holder (1)'
            };
        } else {
            // No NFTs - rank by transaction count
            if (transactionCount >= 500) {
                return {
                    name: 'Kite Advanced',
                    level: 4,
                    color: '#2ECC71',
                    gradient: 'linear-gradient(135deg, #2ECC71, #27AE60, #1E8449)',
                    icon: '🚀',
                    description: 'Kite Advanced - 500+ transactions!',
                    tier: 'High Activity (500+)'
                };
            } else if (transactionCount >= 200) {
                return {
                    name: 'Kite Intermediate',
                    level: 5,
                    color: '#F39C12',
                    gradient: 'linear-gradient(135deg, #F39C12, #E67E22, #D35400)',
                    icon: '⚡',
                    description: 'Kite Intermediate - 200+ transactions!',
                    tier: 'Mid Activity (200-499)'
                };
            } else if (transactionCount >= 100) {
                return {
                    name: 'Kite Active',
                    level: 6,
                    color: '#E67E22',
                    gradient: 'linear-gradient(135deg, #E67E22, #D35400, #A04000)',
                    icon: '🔥',
                    description: 'Kite Active - 100+ transactions!',
                    tier: 'Active (100-199)'
                };
            } else if (transactionCount >= 50) {
                return {
                    name: 'Kite Regular',
                    level: 7,
                    color: '#95A5A6',
                    gradient: 'linear-gradient(135deg, #95A5A6, #7F8C8D, #566061)',
                    icon: '📈',
                    description: 'Kite Regular - 50+ transactions!',
                    tier: 'Regular (50-99)'
                };
            } else if (transactionCount >= 10) {
                return {
                    name: 'Kite Beginner',
                    level: 8,
                    color: '#BDC3C7',
                    gradient: 'linear-gradient(135deg, #BDC3C7, #95A5A6, #7F8C8D)',
                    icon: '🌱',
                    description: 'Kite Beginner - 10+ transactions!',
                    tier: 'Beginner (10-49)'
                };
            } else {
                return {
                    name: 'Kite Newbie',
                    level: 9,
                    color: '#ECF0F1',
                    gradient: 'linear-gradient(135deg, #ECF0F1, #BDC3C7, #95A5A6)',
                    icon: '🆕',
                    description: 'Kite Newbie - Just getting started!',
                    tier: 'Newbie (0-9)'
                };
            }
        }
    }
    
    console.log('🧪 Testing new ranking scenarios...');
    console.log('='.repeat(80));
    
    testCases.forEach((testCase, index) => {
        console.log(`\n${index + 1}. ${testCase.name}`);
        console.log('-'.repeat(50));
        
        const rankTier = getRankTier(testCase.data);
        
        console.log(`📊 Data: ${testCase.data.soundboundNFTs} NFTs, ${testCase.data.transactionCount} txs, ${testCase.data.balance} KITE`);
        console.log(`🏆 Rank: ${rankTier.icon} ${rankTier.name} (Level ${rankTier.level})`);
        console.log(`🎯 Tier: ${rankTier.tier}`);
        console.log(`🎨 Color: ${rankTier.color}`);
        console.log(`📝 Description: ${rankTier.description}`);
    });
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ NEW RANKING SYSTEM SUMMARY:');
    console.log('='.repeat(80));
    console.log('🎵 NFT HOLDERS (Priority Ranking):');
    console.log('👑 Kite Legendary: 3+ NFTs (Level 1)');
    console.log('💎 Kite Master: 2 NFTs (Level 2)');
    console.log('⭐ Kite Elite: 1 NFT (Level 3)');
    console.log('');
    console.log('📝 NON-NFT HOLDERS (Transaction-based):');
    console.log('🚀 Kite Advanced: 500+ txs (Level 4)');
    console.log('⚡ Kite Intermediate: 200-499 txs (Level 5)');
    console.log('🔥 Kite Active: 100-199 txs (Level 6)');
    console.log('📈 Kite Regular: 50-99 txs (Level 7)');
    console.log('🌱 Kite Beginner: 10-49 txs (Level 8)');
    console.log('🆕 Kite Newbie: 0-9 txs (Level 9)');
    console.log('');
    console.log('🎯 Key Features:');
    console.log('✅ NFT holders get priority (always higher than non-NFT)');
    console.log('✅ Transaction count divided into clear tiers');
    console.log('✅ 9 distinct levels with unique colors');
    console.log('✅ Clear tier descriptions');
    console.log('✅ Visual hierarchy with icons and gradients');
    console.log('='.repeat(80));
    console.log('🌐 Test at: http://localhost:8001');
    console.log('='.repeat(80));
}

// Run test
testNewRankingSystem().catch(console.error);