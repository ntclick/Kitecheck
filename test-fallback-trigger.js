// Test fallback trigger - paste this directly into browser console

function testFallbackTrigger() {
    console.log('🔍 TESTING FALLBACK TRIGGER');
    console.log('='.repeat(60));
    
    // Get the app instance
    const app = window.simpleRankChecker || new SimpleRankChecker();
    
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    // Test the wallet that should trigger fallback
    const testAddress = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    
    console.log(`📍 Testing address: ${testAddress}`);
    console.log('🎯 This should trigger fallback with 3 NFTs');
    console.log('');
    
    // Override console.log to catch fallback messages
    const originalLog = console.log;
    let fallbackTriggered = false;
    let nftDataReceived = null;
    
    console.log = function(...args) {
        const message = args.join(' ');
        if (message.includes('🔄 Using known NFT data')) {
            fallbackTriggered = true;
            console.log('🎯 FALLBACK TRIGGERED!', ...args);
        } else if (message.includes('📊 Fallback NFT data:')) {
            nftDataReceived = args[1];
            console.log('📊 FALLBACK DATA RECEIVED!', ...args);
        } else {
            originalLog(...args);
        }
    };
    
    // Test NFT data fetching
    app.getNFTDataETH(testAddress).then(nftData => {
        console.log = originalLog; // Restore original console.log
        
        console.log('\n🔍 RESULTS:');
        console.log('='.repeat(30));
        console.log(`Fallback triggered: ${fallbackTriggered ? '✅ YES' : '❌ NO'}`);
        console.log(`NFT data received: ${nftData ? '✅ YES' : '❌ NO'}`);
        
        if (nftData) {
            console.log(`NFT data structure:`, nftData);
            console.log(`NFT items count: ${nftData.result ? nftData.result.length : 0}`);
            
            if (nftData.result && nftData.result.length > 0) {
                console.log('\n📋 NFT Items:');
                nftData.result.forEach((item, index) => {
                    console.log(`  ${index + 1}. ${item.tokenName} (${item.tokenSymbol})`);
                    if (item.contractAddress) {
                        console.log(`     Contract: ${item.contractAddress}`);
                    }
                });
            }
        }
        
        // Test account data
        return app.getAccountData(testAddress);
    }).then(accountData => {
        console.log('\n📊 Account Data:');
        console.log(`  NFTs: ${accountData.soundboundNFTs}`);
        console.log(`  Expected: 3`);
        console.log(`  Match: ${accountData.soundboundNFTs === 3 ? '✅ YES' : '❌ NO'}`);
        
        // Test rank
        const rankTier = app.getRankTier(accountData);
        console.log(`  Rank: ${rankTier.name} (Level ${rankTier.level})`);
        console.log(`  Expected: Kite Legend (Level 9)`);
        console.log(`  Match: ${rankTier.name === 'Kite Legend' && rankTier.level === 9 ? '✅ YES' : '❌ NO'}`);
        
        // Summary
        console.log('\n🏁 SUMMARY:');
        console.log('='.repeat(30));
        console.log(`Fallback triggered: ${fallbackTriggered ? '✅' : '❌'}`);
        console.log(`NFT count correct: ${accountData.soundboundNFTs === 3 ? '✅' : '❌'}`);
        console.log(`Rank correct: ${rankTier.name === 'Kite Legend' ? '✅' : '❌'}`);
        console.log(`Level correct: ${rankTier.level === 9 ? '✅' : '❌'}`);
        
        if (!fallbackTriggered) {
            console.log('\n❌ ISSUE: Fallback not triggered!');
            console.log('💡 Possible causes:');
            console.log('  1. API call succeeded (no timeout)');
            console.log('  2. Fallback logic not reached');
            console.log('  3. Address comparison failed');
        }
        
    }).catch(error => {
        console.log = originalLog; // Restore original console.log
        console.error('❌ Error:', error);
    });
}

// Run the test
testFallbackTrigger();
