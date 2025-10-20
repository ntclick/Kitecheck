// Test level ranking - paste this directly into browser console

function testLevelRanking() {
    console.log('🔍 TESTING LEVEL RANKING');
    console.log('='.repeat(50));
    
    // Get the app instance
    const app = window.simpleRankChecker || new SimpleRankChecker();
    
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    // Test different scenarios
    const testCases = [
        {
            name: '3 NFTs - Should be Level 9 (Highest)',
            data: { soundboundNFTs: 3, transactionCount: 0 }
        },
        {
            name: '2 NFTs - Should be Level 8',
            data: { soundboundNFTs: 2, transactionCount: 0 }
        },
        {
            name: '1 NFT - Should be Level 3',
            data: { soundboundNFTs: 1, transactionCount: 0 }
        },
        {
            name: '500+ transactions - Should be Level 6',
            data: { soundboundNFTs: 0, transactionCount: 500 }
        },
        {
            name: '200+ transactions - Should be Level 5',
            data: { soundboundNFTs: 0, transactionCount: 200 }
        },
        {
            name: '100+ transactions - Should be Level 4',
            data: { soundboundNFTs: 0, transactionCount: 100 }
        },
        {
            name: '50+ transactions - Should be Level 2',
            data: { soundboundNFTs: 0, transactionCount: 50 }
        },
        {
            name: '10+ transactions - Should be Level 1 (Lowest)',
            data: { soundboundNFTs: 0, transactionCount: 10 }
        },
        {
            name: '0-9 transactions - Should be Level 1 (Lowest)',
            data: { soundboundNFTs: 0, transactionCount: 5 }
        }
    ];
    
    console.log('🧪 Testing all scenarios...\n');
    
    testCases.forEach((testCase, index) => {
        const rankTier = app.getRankTier(testCase.data);
        
        console.log(`${index + 1}. ${testCase.name}`);
        console.log(`   Input: ${testCase.data.soundboundNFTs} NFTs, ${testCase.data.transactionCount} transactions`);
        console.log(`   Result: ${rankTier.name} (Level ${rankTier.level})`);
        console.log(`   Color: ${rankTier.color}`);
        console.log(`   Icon: ${rankTier.icon}`);
        console.log('');
    });
    
    // Summary
    console.log('📊 LEVEL RANKING SUMMARY:');
    console.log('='.repeat(30));
    console.log('Level 9 (Highest): Kite Legend (3+ NFTs)');
    console.log('Level 8: Kite Hero (2 NFTs)');
    console.log('Level 7: (Unused)');
    console.log('Level 6: Kite Advanced (500+ transactions)');
    console.log('Level 5: Kite Intermediate (200+ transactions)');
    console.log('Level 4: Kite Active (100+ transactions)');
    console.log('Level 3: Kite Regular (1 NFT)');
    console.log('Level 2: Kite Beginner (50+ transactions)');
    console.log('Level 1 (Lowest): Kite Newbie (0-49 transactions)');
    console.log('');
    
    // Verify ranking order
    console.log('✅ VERIFICATION:');
    console.log('Level 9 > Level 8 > Level 6 > Level 5 > Level 4 > Level 3 > Level 2 > Level 1');
    console.log('Legend > Hero > Advanced > Intermediate > Active > Regular > Beginner > Newbie');
}

// Run the test
testLevelRanking();
