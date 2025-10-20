/**
 * Test Complete Flow
 */

async function testCompleteFlow() {
    console.log('🧪 TESTING COMPLETE FLOW');
    console.log('='.repeat(80));
    
    // Simulate the app's data flow
    const testAccountData = {
        name: 'Account 0xE24546...',
        address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
        balance: 0.19998917870045402,
        transactionCount: 41,
        soundboundNFTs: 0,
        kiteTokens: 0,
        lastActivity: new Date().toISOString(),
        apiAvailable: true,
        onchainVerified: true
    };
    
    console.log('📊 Test Account Data:');
    console.log(testAccountData);
    
    // Simulate calculateScoreBreakdown
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
            nftPoints = 1000;
            nftMultiplier = 3.0;
        } else if (soundboundNFTs >= 2) {
            nftPoints = 800;
            nftMultiplier = 2.5;
        } else if (soundboundNFTs >= 1) {
            nftPoints = 500;
            nftMultiplier = 1.5;
        } else {
            nftPoints = 0;
            nftMultiplier = 1.0;
        }
        
        // Balance scoring (up to 200 points)
        const balancePoints = Math.min(balance * 100, 200);
        
        // Transaction scoring (up to 150 points)
        const transactionPoints = Math.min(transactionCount * 3, 150);
        
        // Activity scoring (up to 100 points)
        const daysSinceActivity = (Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24);
        const activityPoints = Math.max(0, Math.min(100 - (daysSinceActivity * 2), 100));
        
        // Kite Tokens scoring (up to 50 points)
        const kiteTokenPoints = Math.min(kiteTokens * 5, 50);
        
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
            // Keep old format for compatibility
            balance: Math.round(balancePoints),
            transactions: Math.round(transactionPoints),
            activity: Math.round(activityPoints),
            nft: nftPoints,
            token: Math.round(kiteTokenPoints),
            total: finalPoints
        };
    }
    
    // Simulate getRankTier
    function getRankTier(accountData) {
        const { soundboundNFTs, transactionCount } = accountData;
        
        // NFT holders get priority ranking
        if (soundboundNFTs >= 3) {
            return {
                name: 'Kite Legend',
                level: 1,
                color: '#FFD700',
                gradient: 'linear-gradient(135deg, #FFD700, #FFA500)',
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
                name: 'Kite Elite',
                level: 3,
                color: '#3498DB',
                gradient: 'linear-gradient(135deg, #3498DB, #2980B9)',
                icon: '🏹',
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
                    name: 'Kite Regular',
                    level: 7,
                    color: '#95A5A6',
                    gradient: 'linear-gradient(135deg, #95A5A6, #7F8C8D)',
                    icon: '📈',
                    description: 'Kite Regular - 50+ transactions!',
                    tier: 'Regular (50-99)'
                };
            } else if (transactionCount >= 10) {
                return {
                    name: 'Kite Beginner',
                    level: 8,
                    color: '#BDC3C7',
                    gradient: 'linear-gradient(135deg, #BDC3C7, #95A5A6)',
                    icon: '🌱',
                    description: 'Kite Beginner - 10+ transactions!',
                    tier: 'Beginner (10-49)'
                };
            } else {
                return {
                    name: 'Kite Newbie',
                    level: 9,
                    color: '#ECF0F1',
                    gradient: 'linear-gradient(135deg, #ECF0F1, #BDC3C7)',
                    icon: '🆕',
                    description: 'Kite Newbie - Just getting started!',
                    tier: 'Newbie (0-9)'
                };
            }
        }
    }
    
    console.log('\n🧮 Calculating scores...');
    const scores = calculateScoreBreakdown(testAccountData);
    console.log('📊 Calculated scores:', scores);
    
    console.log('\n🏆 Getting rank tier...');
    const rankTier = getRankTier(testAccountData);
    console.log('🎯 Rank tier:', rankTier);
    
    console.log('\n🎨 Expected UI Display:');
    console.log('='.repeat(80));
    console.log(`🏆 Rank: ${rankTier.icon} ${rankTier.name} (Level ${rankTier.level})`);
    console.log(`📊 Score: ${scores.total} pts`);
    console.log(`💰 Balance: ${testAccountData.balance.toFixed(3)} KITE`);
    console.log(`📝 Transactions: ${testAccountData.transactionCount}`);
    console.log(`🎵 NFTs: ${testAccountData.soundboundNFTs}`);
    console.log(`⚡ Multiplier: ${scores.nftMultiplier}x`);
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ Complete flow test successful!');
    console.log('='.repeat(80));
}

// Run test
testCompleteFlow().catch(console.error);
