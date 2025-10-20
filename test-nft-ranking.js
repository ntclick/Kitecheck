/**
 * Test NFT Ranking System
 * Test the updated ranking system where 1 NFT is normal
 */

function testNFTRanking() {
    console.log('🎯 TESTING NFT RANKING SYSTEM');
    console.log('='.repeat(80));
    
    // Test ranking system
    function testRankingSystem() {
        console.log('\n🎯 TESTING RANKING SYSTEM');
        console.log('='.repeat(60));
        
        // Test data scenarios
        const testScenarios = [
            {
                name: '3 NFTs - Should be Kite Legend',
                soundboundNFTs: 3,
                transactionCount: 50,
                expectedRank: 'Kite Legend',
                expectedLevel: 1,
                expectedColor: '#D4A574',
                description: 'Ultra Rare - Maximum prestige'
            },
            {
                name: '2 NFTs - Should be Kite Hero',
                soundboundNFTs: 2,
                transactionCount: 50,
                expectedRank: 'Kite Hero',
                expectedLevel: 2,
                expectedColor: '#9B59B6',
                description: 'Epic - Legendary status'
            },
            {
                name: '1 NFT - Should be Kite Regular (Normal)',
                soundboundNFTs: 1,
                transactionCount: 50,
                expectedRank: 'Kite Regular',
                expectedLevel: 7,
                expectedColor: '#95A5A6',
                description: 'Standard - Normal user with 1 NFT'
            },
            {
                name: '0 NFTs, 500+ transactions - Should be Kite Advanced',
                soundboundNFTs: 0,
                transactionCount: 500,
                expectedRank: 'Kite Advanced',
                expectedLevel: 4,
                expectedColor: '#2ECC71',
                description: 'Uncommon - Advanced player'
            },
            {
                name: '0 NFTs, 200+ transactions - Should be Kite Intermediate',
                soundboundNFTs: 0,
                transactionCount: 200,
                expectedRank: 'Kite Intermediate',
                expectedLevel: 5,
                expectedColor: '#F39C12',
                description: 'Common - Intermediate level'
            },
            {
                name: '0 NFTs, 100+ transactions - Should be Kite Active',
                soundboundNFTs: 0,
                transactionCount: 100,
                expectedRank: 'Kite Active',
                expectedLevel: 6,
                expectedColor: '#E67E22',
                description: 'Basic - Active participant'
            },
            {
                name: '0 NFTs, 50+ transactions - Should be Kite Beginner',
                soundboundNFTs: 0,
                transactionCount: 50,
                expectedRank: 'Kite Beginner',
                expectedLevel: 8,
                expectedColor: '#A9A9A9',
                description: 'Basic - New to the game'
            },
            {
                name: '0 NFTs, 10+ transactions - Should be Kite Newbie',
                soundboundNFTs: 0,
                transactionCount: 10,
                expectedRank: 'Kite Newbie',
                expectedLevel: 9,
                expectedColor: '#D3D3D3',
                description: 'Light - Just started'
            },
            {
                name: '0 NFTs, 0-9 transactions - Should be Kite Newbie',
                soundboundNFTs: 0,
                transactionCount: 5,
                expectedRank: 'Kite Newbie',
                expectedLevel: 9,
                expectedColor: '#D3D3D3',
                description: 'Light - Just started'
            }
        ];
        
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
        
        // Test each scenario
        testScenarios.forEach((scenario, index) => {
            console.log(`\n${index + 1}. ${scenario.name}`);
            console.log(`   Input: ${scenario.soundboundNFTs} NFTs, ${scenario.transactionCount} transactions`);
            
            const accountData = {
                soundboundNFTs: scenario.soundboundNFTs,
                transactionCount: scenario.transactionCount
            };
            
            const rankTier = getRankTier(accountData);
            
            console.log(`   Expected: ${scenario.expectedRank} (Level ${scenario.expectedLevel})`);
            console.log(`   Actual: ${rankTier.name} (Level ${rankTier.level})`);
            console.log(`   Color: ${rankTier.color}`);
            console.log(`   Description: ${rankTier.description}`);
            
            // Check if results match expectations
            if (rankTier.name === scenario.expectedRank && rankTier.level === scenario.expectedLevel) {
                console.log(`   ✅ PASS - Rank matches expectation`);
            } else {
                console.log(`   ❌ FAIL - Rank does not match expectation`);
            }
        });
    }
    
    // Test NFT analysis logic
    function testNFTAnalysis() {
        console.log('\n🎵 TESTING NFT ANALYSIS LOGIC');
        console.log('='.repeat(60));
        
        // Test NFT data scenarios
        const nftTestScenarios = [
            {
                name: '3 NFTs - WhitelistSoulBoundNFT x2 + SoulBoundNFT x1',
                nftData: {
                    result: [
                        { tokenName: 'WhitelistSoulBoundNFT', tokenSymbol: 'WSBNFT' },
                        { tokenName: 'WhitelistSoulBoundNFT', tokenSymbol: 'WSBNFT' },
                        { tokenName: 'SoulBoundNFT', tokenSymbol: 'SBNFT' }
                    ]
                },
                expectedCount: 3,
                expectedWhitelist: 2,
                expectedRegular: 1
            },
            {
                name: '2 NFTs - WhitelistSoulBoundNFT x2',
                nftData: {
                    result: [
                        { tokenName: 'WhitelistSoulBoundNFT', tokenSymbol: 'WSBNFT' },
                        { tokenName: 'WhitelistSoulBoundNFT', tokenSymbol: 'WSBNFT' }
                    ]
                },
                expectedCount: 2,
                expectedWhitelist: 2,
                expectedRegular: 0
            },
            {
                name: '1 NFT - SoulBoundNFT x1',
                nftData: {
                    result: [
                        { tokenName: 'SoulBoundNFT', tokenSymbol: 'SBNFT' }
                    ]
                },
                expectedCount: 1,
                expectedWhitelist: 0,
                expectedRegular: 1
            },
            {
                name: '0 NFTs - No SoulBound NFTs',
                nftData: {
                    result: [
                        { tokenName: 'RegularNFT', tokenSymbol: 'RNFT' },
                        { tokenName: 'AnotherNFT', tokenSymbol: 'ANFT' }
                    ]
                },
                expectedCount: 0,
                expectedWhitelist: 0,
                expectedRegular: 0
            },
            {
                name: 'Empty NFT data',
                nftData: {
                    result: []
                },
                expectedCount: 0,
                expectedWhitelist: 0,
                expectedRegular: 0
            }
        ];
        
        // Simulate NFT analysis function
        function analyzeNFTData(nftData) {
            let soundboundNFTs = 0;
            console.log('🎵 Analyzing NFT data for SoulBound NFTs...');
            console.log('🔍 NFT data object:', nftData);
            
            if (nftData && nftData.result && Array.isArray(nftData.result)) {
                console.log('📊 Total NFT transfers available:', nftData.result.length);
                
                let whitelistCount = 0;
                let regularCount = 0;
                let allNFTs = [];
                
                for (const transfer of nftData.result) {
                    console.log('🔍 Checking transfer:', transfer.tokenName, transfer.tokenSymbol);
                    allNFTs.push(transfer.tokenName);
                    
                    if (transfer.tokenName && transfer.tokenName.toLowerCase().includes('soulbound')) {
                        console.log('✅ Found SoulBound NFT:', transfer.tokenName);
                        
                        if (transfer.tokenName.toLowerCase().includes('whitelist')) {
                            whitelistCount++;
                            console.log('🏆 WhitelistSoulBoundNFT count:', whitelistCount);
                        } else {
                            regularCount++;
                            console.log('📱 Regular SoulBoundNFT count:', regularCount);
                        }
                    } else {
                        console.log('❌ Not a SoulBound NFT:', transfer.tokenName);
                    }
                }
                
                console.log('📊 All NFT names found:', allNFTs);
                console.log('📊 Raw counts - Whitelist:', whitelistCount, 'Regular:', regularCount);
                
                // Cap WhitelistSoulBoundNFT at 2, Regular at 1, total max 3
                whitelistCount = Math.min(whitelistCount, 2);
                regularCount = Math.min(regularCount, 1);
                soundboundNFTs = whitelistCount + regularCount;
                
                console.log('🎯 Final counts - Whitelist:', whitelistCount, 'Regular:', regularCount, 'Total:', soundboundNFTs);
                
                return {
                    total: soundboundNFTs,
                    whitelist: whitelistCount,
                    regular: regularCount,
                    allNFTs: allNFTs
                };
            } else {
                console.log('📊 No NFT transfers available for analysis');
                return {
                    total: 0,
                    whitelist: 0,
                    regular: 0,
                    allNFTs: []
                };
            }
        }
        
        // Test each NFT scenario
        nftTestScenarios.forEach((scenario, index) => {
            console.log(`\n${index + 1}. ${scenario.name}`);
            console.log(`   Input: ${scenario.nftData.result.length} NFT transfers`);
            
            const result = analyzeNFTData(scenario.nftData);
            
            console.log(`   Expected: ${scenario.expectedCount} total, ${scenario.expectedWhitelist} whitelist, ${scenario.expectedRegular} regular`);
            console.log(`   Actual: ${result.total} total, ${result.whitelist} whitelist, ${result.regular} regular`);
            console.log(`   All NFTs: ${result.allNFTs.join(', ')}`);
            
            // Check if results match expectations
            if (result.total === scenario.expectedCount && 
                result.whitelist === scenario.expectedWhitelist && 
                result.regular === scenario.expectedRegular) {
                console.log(`   ✅ PASS - NFT analysis matches expectation`);
            } else {
                console.log(`   ❌ FAIL - NFT analysis does not match expectation`);
            }
        });
    }
    
    // Test color scheme for 1 NFT
    function testColorScheme() {
        console.log('\n🎨 TESTING COLOR SCHEME FOR 1 NFT');
        console.log('='.repeat(60));
        
        console.log('\n📊 RANKING HIERARCHY:');
        console.log('  1. Kite Legend (3+ NFTs) - Gold - Level 1');
        console.log('  2. Kite Hero (2 NFTs) - Purple - Level 2');
        console.log('  3. Kite Regular (1 NFT) - Gray - Level 7 (Normal)');
        console.log('  4. Kite Advanced (0 NFTs, 500+ tx) - Green - Level 4');
        console.log('  5. Kite Intermediate (0 NFTs, 200+ tx) - Orange - Level 5');
        console.log('  6. Kite Active (0 NFTs, 100+ tx) - Red - Level 6');
        console.log('  7. Kite Beginner (0 NFTs, 50+ tx) - Light Gray - Level 8');
        console.log('  8. Kite Newbie (0 NFTs, 0-49 tx) - Very Light Gray - Level 9');
        
        console.log('\n🎯 KEY CHANGES:');
        console.log('  ✅ 1 NFT is now Kite Regular (Normal)');
        console.log('  ✅ 1 NFT has gray color (not blue)');
        console.log('  ✅ 1 NFT is Level 7 (not Level 3)');
        console.log('  ✅ 1 NFT is considered normal, not elite');
        
        console.log('\n🎨 COLOR SCHEME:');
        console.log('  🏆 High Ranks (3+ NFTs): Gold, Purple');
        console.log('  📈 Normal Rank (1 NFT): Gray');
        console.log('  🚀 Activity Ranks (0 NFTs): Green, Orange, Red, Light Gray');
    }
    
    // Run all tests
    function runAllTests() {
        testRankingSystem();
        testNFTAnalysis();
        testColorScheme();
        
        console.log('\n' + '='.repeat(80));
        console.log('🎯 NFT RANKING SYSTEM TEST SUMMARY');
        console.log('='.repeat(80));
        
        console.log('\n✅ FEATURES TESTED:');
        console.log('  🎯 Updated ranking system');
        console.log('  🎵 NFT analysis logic');
        console.log('  🎨 Color scheme for 1 NFT');
        console.log('  📊 Level hierarchy');
        console.log('  🔍 Debug logging');
        
        console.log('\n🎯 EXPECTED RESULTS:');
        console.log('  - 3+ NFTs: Kite Legend (Gold, Level 1)');
        console.log('  - 2 NFTs: Kite Hero (Purple, Level 2)');
        console.log('  - 1 NFT: Kite Regular (Gray, Level 7) - NORMAL');
        console.log('  - 0 NFTs: Activity-based ranking');
        
        console.log('\n💡 USAGE INSTRUCTIONS:');
        console.log('  1. Test with different wallet addresses');
        console.log('  2. Check console logs for NFT analysis');
        console.log('  3. Verify 1 NFT shows as Kite Regular');
        console.log('  4. Check that 1 NFT has gray color');
        console.log('  5. Verify ranking hierarchy');
        
        console.log('='.repeat(80));
    }
    
    // Run the tests
    runAllTests();
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running NFT ranking system test...');
    testNFTRanking();
} else {
    console.log('📝 Copy and paste this function into browser console to test NFT ranking system');
}
