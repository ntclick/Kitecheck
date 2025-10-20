/**
 * Test UI Display
 */

function testUIDisplay() {
    console.log('🧪 TESTING UI DISPLAY');
    console.log('='.repeat(80));
    
    // Test data
    const testAccountData = {
        name: 'Test Account',
        address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
        balance: 0.19998917870045402,
        transactionCount: 41,
        soundboundNFTs: 0,
        kiteTokens: 0
    };
    
    const testScores = {
        total: 150,
        balance: 20,
        transactions: 123,
        activity: 50,
        nft: 0,
        token: 0,
        nftMultiplier: 1.0,
        soundboundNFTs: 0
    };
    
    console.log('📊 Test Data:');
    console.log('Account:', testAccountData);
    console.log('Scores:', testScores);
    
    // Check if elements exist
    const resultsSection = document.getElementById('resultsSection');
    console.log('\n🔍 Element Check:');
    console.log('resultsSection:', resultsSection);
    
    if (resultsSection) {
        console.log('Current classes:', resultsSection.className);
        console.log('Current display:', window.getComputedStyle(resultsSection).display);
        
        // Try to show it
        resultsSection.classList.remove('hidden');
        console.log('After removing hidden class:');
        console.log('New classes:', resultsSection.className);
        console.log('New display:', window.getComputedStyle(resultsSection).display);
        
        // Test rank tier
        const rankTier = {
            name: 'Kite Beginner',
            level: 8,
            icon: '🌱',
            tier: 'Beginner (10-49)'
        };
        
        const rankBadge = document.getElementById('rankBadge');
        if (rankBadge) {
            rankBadge.className = `rank-badge ${rankTier.name.toLowerCase().replace('kite ', '')}`;
            rankBadge.innerHTML = `
                <div class="rank-tier">
                    <span class="rank-icon">${rankTier.icon}</span>
                    ${rankTier.name}
                </div>
                <div class="rank-level">Level ${rankTier.level} - ${rankTier.tier}</div>
            `;
            console.log('✅ Rank badge updated');
        } else {
            console.log('❌ Rank badge not found');
        }
        
        // Update other elements
        const elements = {
            'accountName': testAccountData.name,
            'accountAddress': testAccountData.address,
            'balance': testAccountData.balance.toFixed(3),
            'transactions': testAccountData.transactionCount,
            'soundboundNFTs': testAccountData.soundboundNFTs,
            'scoreValue': `${testScores.total} pts`
        };
        
        console.log('\n📝 Updating elements:');
        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
                console.log(`✅ ${id}: ${value}`);
            } else {
                console.log(`❌ ${id}: not found`);
            }
        }
        
    } else {
        console.log('❌ resultsSection not found!');
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('🚀 Test complete!');
    console.log('='.repeat(80));
}

// Run test
testUIDisplay();
