/**
 * Test Browser UI - Run this in browser console
 */

function testBrowserUI() {
    console.log('🌐 TESTING BROWSER UI');
    console.log('='.repeat(80));
    
    // Check if we're in the right page
    if (!document.getElementById('resultsSection')) {
        console.error('❌ Not on the right page! Please run this on the Kite AI Chain page.');
        return;
    }
    
    // Test data
    const testAccountData = {
        name: 'Account 0xE24546...',
        address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
        balance: 0.19998917870045402,
        transactionCount: 41,
        soundboundNFTs: 0,
        kiteTokens: 0
    };
    
    const testScores = {
        total: 243,
        balance: 20,
        transactions: 123,
        activity: 100,
        nft: 0,
        token: 0,
        nftMultiplier: 1.0,
        soundboundNFTs: 0
    };
    
    const rankTier = {
        name: 'Kite Beginner',
        level: 8,
        color: '#BDC3C7',
        gradient: 'linear-gradient(135deg, #BDC3C7, #95A5A6)',
        icon: '🌱',
        description: 'Kite Beginner - 10+ transactions!',
        tier: 'Beginner (10-49)'
    };
    
    console.log('📊 Test Data:', { testAccountData, testScores, rankTier });
    
    // Get elements
    const elements = {
        resultsSection: document.getElementById('resultsSection'),
        rankBadge: document.getElementById('rankBadge'),
        accountName: document.getElementById('accountName'),
        accountAddress: document.getElementById('accountAddress'),
        balance: document.getElementById('balance'),
        transactions: document.getElementById('transactions'),
        soundboundNFTs: document.getElementById('soundboundNFTs'),
        scoreValue: document.getElementById('scoreValue'),
        balanceScore: document.getElementById('balanceScore'),
        transactionScore: document.getElementById('transactionScore'),
        activityScore: document.getElementById('activityScore'),
        nftScore: document.getElementById('nftScore'),
        tokenScore: document.getElementById('tokenScore'),
        multiplierInfo: document.getElementById('multiplierInfo'),
        multiplierValue: document.getElementById('multiplierValue'),
        nftStatus: document.getElementById('nftStatus'),
        nftStatusText: document.getElementById('nftStatusText')
    };
    
    console.log('🔍 Element Check:');
    let missingElements = [];
    for (const [name, element] of Object.entries(elements)) {
        if (element) {
            console.log(`✅ ${name}: Found`);
        } else {
            console.log(`❌ ${name}: NOT FOUND`);
            missingElements.push(name);
        }
    }
    
    if (missingElements.length > 0) {
        console.error('❌ Missing elements:', missingElements);
        return;
    }
    
    // Update elements
    console.log('\n📝 Updating elements...');
    
    // Account info
    elements.accountName.textContent = testAccountData.name;
    elements.accountAddress.textContent = testAccountData.address;
    
    // Stats
    elements.balance.textContent = testAccountData.balance.toFixed(3);
    elements.transactions.textContent = testAccountData.transactionCount;
    elements.soundboundNFTs.textContent = testAccountData.soundboundNFTs;
    
    // Rank badge
    elements.rankBadge.className = `rank-badge ${rankTier.name.toLowerCase().replace('kite ', '')}`;
    elements.rankBadge.innerHTML = `
        <div class="rank-tier">
            <span class="rank-icon">${rankTier.icon}</span>
            ${rankTier.name}
        </div>
        <div class="rank-level">Level ${rankTier.level} - ${rankTier.tier}</div>
    `;
    
    // Score
    elements.scoreValue.textContent = `${testScores.total} pts`;
    
    // Score breakdown
    elements.balanceScore.textContent = `${testScores.balance} pts`;
    elements.transactionScore.textContent = `${testScores.transactions} pts`;
    elements.activityScore.textContent = `${testScores.activity} pts`;
    elements.nftScore.textContent = `${testScores.nft} pts`;
    elements.tokenScore.textContent = `${testScores.token} pts`;
    
    // Multiplier
    elements.multiplierValue.textContent = testScores.nftMultiplier.toFixed(1);
    if (testScores.nftMultiplier > 1) {
        elements.multiplierInfo.classList.remove('hidden');
    } else {
        elements.multiplierInfo.classList.add('hidden');
    }
    
    // NFT status
    let statusText = '';
    if (testScores.soundboundNFTs >= 3) {
        statusText = `🏆 ${rankTier.name}! 3+ NFT SoulBound - ${testScores.nftMultiplier}x multiplier!`;
    } else if (testScores.soundboundNFTs >= 2) {
        statusText = `🥈 ${rankTier.name}! 2 NFT SoulBound - ${testScores.nftMultiplier}x multiplier!`;
    } else if (testScores.soundboundNFTs >= 1) {
        statusText = `🥉 ${rankTier.name}! 1 NFT SoulBound - ${testScores.nftMultiplier}x multiplier!`;
    } else {
        statusText = `❌ ${rankTier.name} - Need NFT SoulBound to increase rank!`;
    }
    elements.nftStatusText.textContent = statusText;
    elements.nftStatus.classList.remove('hidden');
    
    // Show results
    console.log('\n🎯 Showing results section...');
    elements.resultsSection.classList.remove('hidden');
    
    console.log('✅ Results section classes:', elements.resultsSection.className);
    console.log('✅ Results section display:', window.getComputedStyle(elements.resultsSection).display);
    
    console.log('\n' + '='.repeat(80));
    console.log('🚀 Browser UI test complete!');
    console.log('='.repeat(80));
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running browser UI test...');
    testBrowserUI();
} else {
    console.log('📝 Copy and paste this function into browser console to test UI');
}
