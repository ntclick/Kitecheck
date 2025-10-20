/**
 * Test App NFT Functionality
 * Test the actual app to see what's wrong with NFT display
 */

function testAppNFT() {
    console.log('🔍 TESTING APP NFT FUNCTIONALITY');
    console.log('='.repeat(80));
    
    // Check if we're on the right page
    if (!document.getElementById('resultsSection')) {
        console.error('❌ Not on the right page! Please run this on the Kite AI Chain page.');
        return;
    }
    
    // Test the app's NFT functionality
    async function testAppNFTLogic() {
        console.log('🧪 Testing app NFT logic...');
        
        // Get the app instance (if available)
        const app = window.simpleRankChecker || new SimpleRankChecker();
        
        // Test address that should have 3 NFTs
        const testAddress = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
        
        console.log(`📍 Testing address: ${testAddress}`);
        
        try {
            // Test the app's NFT data fetching
            console.log('🔍 Testing app.getNFTDataETH...');
            const nftData = await app.getNFTDataETH(testAddress);
            console.log('📊 NFT Data from app:', nftData);
            
            // Test the app's NFT analysis
            console.log('🔍 Testing NFT analysis...');
            let soundboundNFTs = 0;
            
            if (nftData && nftData.result && Array.isArray(nftData.result)) {
                console.log('📊 Total NFT transfers available:', nftData.result.length);
                
                let whitelistCount = 0;
                let regularCount = 0;
                
                for (const transfer of nftData.result) {
                    console.log('🔍 Checking transfer:', transfer.tokenName, transfer.tokenSymbol);
                    
                    if (transfer.tokenName && transfer.tokenName.toLowerCase().includes('soulbound')) {
                        console.log('✅ Found SoulBound NFT:', transfer.tokenName);
                        
                        if (transfer.tokenName.toLowerCase().includes('whitelist')) {
                            whitelistCount++;
                            console.log('🏆 WhitelistSoulBoundNFT count:', whitelistCount);
                        } else {
                            regularCount++;
                            console.log('📱 Regular SoulBoundNFT count:', regularCount);
                        }
                    }
                }
                
                console.log('📊 Raw counts - Whitelist:', whitelistCount, 'Regular:', regularCount);
                
                // Cap WhitelistSoulBoundNFT at 2, Regular at 1, total max 3
                whitelistCount = Math.min(whitelistCount, 2);
                regularCount = Math.min(regularCount, 1);
                soundboundNFTs = whitelistCount + regularCount;
                
                console.log('🎯 Final counts - Whitelist:', whitelistCount, 'Regular:', regularCount, 'Total:', soundboundNFTs);
            } else {
                console.log('📊 No NFT transfers available for analysis');
            }
            
            // Test the app's complete data fetching
            console.log('\n🔍 Testing complete app data fetching...');
            const accountData = await app.getAccountData(testAddress);
            console.log('📊 Complete Account Data:', accountData);
            
            // Check if the app is showing the correct NFT count
            const soundboundNFTsElement = document.getElementById('soundboundNFTs');
            if (soundboundNFTsElement) {
                const displayedCount = soundboundNFTsElement.textContent;
                console.log('📊 NFT count displayed in UI:', displayedCount);
                console.log('📊 NFT count from app data:', accountData.soundboundNFTs);
                
                if (displayedCount == accountData.soundboundNFTs) {
                    console.log('✅ UI and app data match');
                } else {
                    console.log('❌ UI and app data do not match!');
                }
            }
            
            // Test the app's ranking
            console.log('\n🔍 Testing app ranking...');
            const scores = app.calculateScoreBreakdown(accountData);
            console.log('📊 Scores:', scores);
            
            const rankTier = app.getRankTier(accountData);
            console.log('📊 Rank Tier:', rankTier);
            
            // Check if the rank is correct
            if (accountData.soundboundNFTs >= 3) {
                if (rankTier.name === 'Kite Legend') {
                    console.log('✅ Rank is correct for 3+ NFTs');
                } else {
                    console.log('❌ Rank is incorrect! Should be Kite Legend for 3+ NFTs');
                }
            }
            
        } catch (error) {
            console.error('❌ App test error:', error);
        }
    }
    
    // Test the app's UI elements
    function testAppUI() {
        console.log('\n🧪 Testing app UI elements...');
        
        const elements = {
            'soundboundNFTs': document.getElementById('soundboundNFTs'),
            'nftScore': document.getElementById('nftScore'),
            'nftStatus': document.getElementById('nftStatus'),
            'nftStatusText': document.getElementById('nftStatusText'),
            'rankBadge': document.getElementById('rankBadge')
        };
        
        for (const [name, element] of Object.entries(elements)) {
            if (element) {
                console.log(`✅ ${name}: Found - "${element.textContent}"`);
            } else {
                console.log(`❌ ${name}: NOT FOUND`);
            }
        }
    }
    
    // Test manual data setting
    function testManualData() {
        console.log('\n🧪 Testing manual data setting...');
        
        // Set test data manually
        const testData = {
            address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            name: 'Account 0x7a2C10...',
            balance: 0.686,
            transactionCount: 46,
            soundboundNFTs: 3,
            kiteTokens: 0
        };
        
        const testScores = {
            total: 207,
            balance: 69,
            transactions: 138,
            activity: 115,
            nft: 3000,
            token: 0,
            nftMultiplier: 3.0,
            soundboundNFTs: 3
        };
        
        // Get the app instance
        const app = window.simpleRankChecker || new SimpleRankChecker();
        
        // Test displayResults
        console.log('🔍 Testing displayResults with manual data...');
        try {
            app.displayResults(testData, testScores);
            console.log('✅ displayResults completed');
            
            // Check if UI was updated
            const soundboundNFTsElement = document.getElementById('soundboundNFTs');
            if (soundboundNFTsElement) {
                console.log('📊 NFT count in UI after manual test:', soundboundNFTsElement.textContent);
            }
            
            const rankBadge = document.getElementById('rankBadge');
            if (rankBadge) {
                console.log('📊 Rank badge after manual test:', rankBadge.textContent);
            }
            
        } catch (error) {
            console.error('❌ displayResults error:', error);
        }
    }
    
    // Run all tests
    async function runAllTests() {
        await testAppNFTLogic();
        testAppUI();
        testManualData();
        
        console.log('\n' + '='.repeat(80));
        console.log('🎯 APP NFT TEST SUMMARY');
        console.log('='.repeat(80));
        console.log('💡 Check the console logs above to identify any issues');
        console.log('💡 If NFT count is 0 but should be 3, there may be an API issue');
        console.log('💡 If UI shows wrong data, there may be a display issue');
        console.log('='.repeat(80));
    }
    
    // Run the tests
    runAllTests();
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running app NFT test...');
    testAppNFT();
} else {
    console.log('📝 Copy and paste this function into browser console to test app NFT');
}
