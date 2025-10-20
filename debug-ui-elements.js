/**
 * Debug UI Elements
 */

function debugUIElements() {
    console.log('🔍 DEBUGGING UI ELEMENTS');
    console.log('='.repeat(80));
    
    // Check if elements exist
    const elements = {
        'resultsSection': document.getElementById('resultsSection'),
        'rankBadge': document.getElementById('rankBadge'),
        'accountName': document.getElementById('accountName'),
        'accountAddress': document.getElementById('accountAddress'),
        'balance': document.getElementById('balance'),
        'transactions': document.getElementById('transactions'),
        'soundboundNFTs': document.getElementById('soundboundNFTs'),
        'scoreValue': document.getElementById('scoreValue'),
        'balanceScore': document.getElementById('balanceScore'),
        'transactionScore': document.getElementById('transactionScore'),
        'activityScore': document.getElementById('activityScore'),
        'nftScore': document.getElementById('nftScore'),
        'tokenScore': document.getElementById('tokenScore'),
        'multiplierInfo': document.getElementById('multiplierInfo'),
        'multiplierValue': document.getElementById('multiplierValue'),
        'nftStatus': document.getElementById('nftStatus'),
        'nftStatusText': document.getElementById('nftStatusText')
    };
    
    console.log('📋 Element Check Results:');
    console.log('='.repeat(80));
    
    let missingElements = [];
    let foundElements = [];
    
    for (const [name, element] of Object.entries(elements)) {
        if (element) {
            foundElements.push(name);
            console.log(`✅ ${name}: Found`);
        } else {
            missingElements.push(name);
            console.log(`❌ ${name}: NOT FOUND`);
        }
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('📊 Summary:');
    console.log('='.repeat(80));
    console.log(`✅ Found: ${foundElements.length} elements`);
    console.log(`❌ Missing: ${missingElements.length} elements`);
    
    if (missingElements.length > 0) {
        console.log('\n❌ Missing Elements:');
        missingElements.forEach(name => console.log(`   - ${name}`));
    }
    
    // Check CSS classes
    console.log('\n🎨 CSS Classes Check:');
    console.log('='.repeat(80));
    
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        console.log(`✅ resultsSection classes: ${resultsSection.className}`);
        console.log(`✅ resultsSection display: ${window.getComputedStyle(resultsSection).display}`);
        console.log(`✅ resultsSection visibility: ${window.getComputedStyle(resultsSection).visibility}`);
    }
    
    // Check if hidden class is working
    const hiddenElements = document.querySelectorAll('.hidden');
    console.log(`\n🔍 Elements with 'hidden' class: ${hiddenElements.length}`);
    hiddenElements.forEach((el, index) => {
        console.log(`   ${index + 1}. ${el.id || el.tagName}: ${el.className}`);
    });
    
    console.log('\n' + '='.repeat(80));
    console.log('🚀 Debug complete!');
    console.log('='.repeat(80));
}

// Run debug
debugUIElements();
