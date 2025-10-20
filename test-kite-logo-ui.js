/**
 * Test Kite Logo UI
 */

function testKiteLogoUI() {
    console.log('🎨 TESTING KITE LOGO UI');
    console.log('='.repeat(80));
    
    // Check if we're in the right page
    if (!document.getElementById('resultsSection')) {
        console.error('❌ Not on the right page! Please run this on the Kite AI Chain page.');
        return;
    }
    
    // Check logo elements
    console.log('\n🔍 Logo Elements Check:');
    const logoContainer = document.querySelector('.logo-container');
    const logoImage = document.querySelector('.logo-image');
    const logo = document.querySelector('.logo');
    const subtitle = document.querySelector('.subtitle');
    const authorInfo = document.querySelector('.author-info');
    
    const logoElements = {
        'logo-container': logoContainer,
        'logo-image': logoImage,
        'logo': logo,
        'subtitle': subtitle,
        'author-info': authorInfo
    };
    
    let missingElements = [];
    for (const [name, element] of Object.entries(logoElements)) {
        if (element) {
            console.log(`✅ ${name}: Found`);
            if (name === 'logo-image') {
                const styles = window.getComputedStyle(element);
                console.log(`   - Background: ${styles.background}`);
                console.log(`   - Width: ${styles.width}`);
                console.log(`   - Height: ${styles.height}`);
                console.log(`   - Border-radius: ${styles.borderRadius}`);
            }
        } else {
            console.log(`❌ ${name}: NOT FOUND`);
            missingElements.push(name);
        }
    }
    
    if (missingElements.length > 0) {
        console.error('❌ Missing logo elements:', missingElements);
        return;
    }
    
    // Check logo image pseudo-elements (circles)
    console.log('\n🎯 Logo Image Circles Check:');
    if (logoImage) {
        const beforeElement = window.getComputedStyle(logoImage, '::before');
        console.log('Before pseudo-element:', beforeElement.content);
        console.log('Background:', beforeElement.background);
        console.log('Width:', beforeElement.width);
        console.log('Height:', beforeElement.height);
    }
    
    // Check color scheme
    console.log('\n🎨 Color Scheme Check:');
    const checkBtn = document.querySelector('.check-btn');
    if (checkBtn) {
        const styles = window.getComputedStyle(checkBtn);
        console.log('Check Button Background:', styles.background);
        console.log('Check Button Box-shadow:', styles.boxShadow);
    }
    
    // Check author info
    console.log('\n👤 Author Info Check:');
    if (authorInfo) {
        console.log('Author Info Text:', authorInfo.textContent);
        console.log('Author Info Link:', authorInfo.href);
        console.log('Author Info Target:', authorInfo.target);
        
        const styles = window.getComputedStyle(authorInfo);
        console.log('Author Info Background:', styles.background);
        console.log('Author Info Color:', styles.color);
        console.log('Author Info Border:', styles.border);
    }
    
    // Test hover effects
    console.log('\n🖱️ Hover Effects Test:');
    if (checkBtn) {
        console.log('Testing check button hover...');
        checkBtn.dispatchEvent(new Event('mouseenter'));
        setTimeout(() => {
            const hoverStyles = window.getComputedStyle(checkBtn);
            console.log('Hover Background:', hoverStyles.background);
            console.log('Hover Transform:', hoverStyles.transform);
            checkBtn.dispatchEvent(new Event('mouseleave'));
        }, 100);
    }
    
    // Check responsive design
    console.log('\n📱 Responsive Design Check:');
    const container = document.querySelector('.container');
    if (container) {
        const containerStyles = window.getComputedStyle(container);
        console.log('Container Max-width:', containerStyles.maxWidth);
        console.log('Container Padding:', containerStyles.padding);
    }
    
    // Test with sample data
    console.log('\n🧪 Sample Data Test:');
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
    
    // Update elements with test data
    const elements = {
        accountName: document.getElementById('accountName'),
        accountAddress: document.getElementById('accountAddress'),
        balance: document.getElementById('balance'),
        transactions: document.getElementById('transactions'),
        soundboundNFTs: document.getElementById('soundboundNFTs'),
        scoreValue: document.getElementById('scoreValue'),
        rankBadge: document.getElementById('rankBadge')
    };
    
    if (elements.accountName) elements.accountName.textContent = testAccountData.name;
    if (elements.accountAddress) elements.accountAddress.textContent = testAccountData.address;
    if (elements.balance) elements.balance.textContent = testAccountData.balance.toFixed(3);
    if (elements.transactions) elements.transactions.textContent = testAccountData.transactionCount;
    if (elements.soundboundNFTs) elements.soundboundNFTs.textContent = testAccountData.soundboundNFTs;
    if (elements.scoreValue) elements.scoreValue.textContent = `${testScores.total} pts`;
    
    if (elements.rankBadge) {
        elements.rankBadge.className = `rank-badge ${rankTier.name.toLowerCase().replace('kite ', '')}`;
        elements.rankBadge.innerHTML = `
            <div class="rank-tier">
                <span class="rank-icon">${rankTier.icon}</span>
                ${rankTier.name}
            </div>
            <div class="rank-level">Level ${rankTier.level} - ${rankTier.tier}</div>
        `;
    }
    
    // Show results
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.classList.remove('hidden');
        resultsSection.style.display = 'block';
        console.log('✅ Results section displayed with test data');
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('🚀 Kite Logo UI test complete!');
    console.log('='.repeat(80));
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running Kite Logo UI test...');
    testKiteLogoUI();
} else {
    console.log('📝 Copy and paste this function into browser console to test Kite Logo UI');
}
