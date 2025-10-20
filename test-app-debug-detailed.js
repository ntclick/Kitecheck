/**
 * Test App Debug Detailed
 * Test the app with detailed debug logs to find the exact issue
 */

function testAppDebugDetailed() {
    console.log('🔍 TESTING APP DEBUG DETAILED');
    console.log('='.repeat(80));
    
    // Check if we're on the right page
    if (!document.getElementById('resultsSection')) {
        console.error('❌ Not on the right page! Please run this on the Kite AI Chain page.');
        return;
    }
    
    // Test with known addresses
    const testAddresses = [
        {
            address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            expectedNFTs: 3,
            expectedRank: 'Kite Legend',
            description: 'Should have 3 NFTs - Kite Legend'
        },
        {
            address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
            expectedNFTs: 0,
            expectedRank: 'Kite Active',
            description: 'Should have 0 NFTs - Kite Active'
        }
    ];
    
    // Test app with detailed debugging
    async function testAppWithDetailedDebugging() {
        console.log('🧪 Testing app with detailed debugging...');
        
        // Get the app instance
        const app = window.simpleRankChecker || new SimpleRankChecker();
        console.log('App instance:', app);
        
        for (const testCase of testAddresses) {
            console.log(`\n📍 Testing: ${testCase.address}`);
            console.log(`   Expected: ${testCase.expectedNFTs} NFTs → ${testCase.expectedRank}`);
            console.log(`   Description: ${testCase.description}`);
            console.log('='.repeat(60));
            
            try {
                // Step 1: Test NFT data fetching
                console.log('\n🖼️ STEP 1: Testing NFT data fetching...');
                const nftData = await app.getNFTDataETH(testCase.address);
                console.log('NFT Data Result:', nftData);
                
                // Step 2: Test account data fetching
                console.log('\n📊 STEP 2: Testing account data fetching...');
                const accountData = await app.getAccountData(testCase.address);
                console.log('Account Data Result:', accountData);
                
                // Step 3: Test score calculation
                console.log('\n🧮 STEP 3: Testing score calculation...');
                const scores = app.calculateScoreBreakdown(accountData);
                console.log('Scores Result:', scores);
                
                // Step 4: Test rank tier calculation
                console.log('\n🎯 STEP 4: Testing rank tier calculation...');
                const rankTier = app.getRankTier(accountData);
                console.log('Rank Tier Result:', rankTier);
                
                // Step 5: Test UI display
                console.log('\n🖥️ STEP 5: Testing UI display...');
                app.displayResults(accountData, scores, rankTier);
                
                // Check UI elements
                const rankBadge = document.getElementById('rankBadge');
                const scoreValue = document.getElementById('scoreValue');
                const nftScore = document.getElementById('nftScore');
                
                console.log('UI Elements:');
                console.log(`  Rank Badge: ${rankBadge ? rankBadge.textContent : 'Not found'}`);
                console.log(`  Score Value: ${scoreValue ? scoreValue.textContent : 'Not found'}`);
                console.log(`  NFT Score: ${nftScore ? nftScore.textContent : 'Not found'}`);
                
                // Step 6: Compare with expected
                console.log('\n🔍 STEP 6: Comparing with expected...');
                console.log(`  Expected NFTs: ${testCase.expectedNFTs}`);
                console.log(`  Actual NFTs: ${accountData.soundboundNFTs}`);
                console.log(`  NFT Match: ${accountData.soundboundNFTs === testCase.expectedNFTs ? '✅' : '❌'}`);
                
                console.log(`  Expected Rank: ${testCase.expectedRank}`);
                console.log(`  Actual Rank: ${rankTier.name}`);
                console.log(`  Rank Match: ${rankTier.name === testCase.expectedRank ? '✅' : '❌'}`);
                
                // Step 7: Debug summary
                console.log('\n📋 STEP 7: Debug summary...');
                console.log('Debug Summary:');
                console.log(`  Address: ${testCase.address}`);
                console.log(`  NFT Data Available: ${!!nftData}`);
                console.log(`  NFT Transfers: ${nftData && nftData.result ? nftData.result.length : 0}`);
                console.log(`  Soundbound NFTs: ${accountData.soundboundNFTs}`);
                console.log(`  Transaction Count: ${accountData.transactionCount}`);
                console.log(`  Balance: ${accountData.balance}`);
                console.log(`  Total Score: ${scores.total}`);
                console.log(`  Rank: ${rankTier.name}`);
                console.log(`  Level: ${rankTier.level}`);
                console.log(`  Color: ${rankTier.color}`);
                
            } catch (error) {
                console.error(`❌ Test failed for ${testCase.address}:`, error);
                console.error('Error stack:', error.stack);
            }
            
            // Wait between tests
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
    
    // Test specific NFT analysis
    async function testSpecificNFTAnalysis() {
        console.log('\n🎵 TESTING SPECIFIC NFT ANALYSIS');
        console.log('='.repeat(60));
        
        const app = window.simpleRankChecker || new SimpleRankChecker();
        
        // Test with the address that should have 3 NFTs
        const address = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
        console.log(`\n📍 Testing NFT analysis for: ${address}`);
        
        try {
            // Get NFT data
            const nftData = await app.getNFTDataETH(address);
            console.log('NFT Data:', nftData);
            
            // Manually analyze the data
            if (nftData && nftData.result && Array.isArray(nftData.result)) {
                console.log('\n🔍 Manual NFT Analysis:');
                console.log(`Total transfers: ${nftData.result.length}`);
                
                let soulboundCount = 0;
                let whitelistCount = 0;
                let regularCount = 0;
                let allTokenNames = [];
                
                nftData.result.forEach((transfer, index) => {
                    const tokenName = transfer.tokenName || '';
                    allTokenNames.push(tokenName);
                    
                    console.log(`\n${index + 1}. Transfer Analysis:`);
                    console.log(`   Token Name: ${tokenName}`);
                    console.log(`   Token Symbol: ${transfer.tokenSymbol}`);
                    console.log(`   Contract: ${transfer.contractAddress}`);
                    console.log(`   From: ${transfer.from}`);
                    console.log(`   To: ${transfer.to}`);
                    console.log(`   TokenID: ${transfer.tokenID}`);
                    
                    const isSoulbound = tokenName.toLowerCase().includes('soulbound');
                    const isWhitelist = tokenName.toLowerCase().includes('whitelist');
                    
                    console.log(`   Is SoulBound: ${isSoulbound}`);
                    console.log(`   Is Whitelist: ${isWhitelist}`);
                    
                    if (isSoulbound) {
                        soulboundCount++;
                        if (isWhitelist) {
                            whitelistCount++;
                        } else {
                            regularCount++;
                        }
                    }
                });
                
                console.log('\n📊 Manual Analysis Results:');
                console.log(`  All token names: ${allTokenNames.join(', ')}`);
                console.log(`  Total SoulBound: ${soulboundCount}`);
                console.log(`  Whitelist: ${whitelistCount}`);
                console.log(`  Regular: ${regularCount}`);
                
                // Apply capping
                const cappedWhitelist = Math.min(whitelistCount, 2);
                const cappedRegular = Math.min(regularCount, 1);
                const totalCapped = cappedWhitelist + cappedRegular;
                
                console.log('\n🎯 After Capping:');
                console.log(`  Capped Whitelist: ${cappedWhitelist}`);
                console.log(`  Capped Regular: ${cappedRegular}`);
                console.log(`  Total Capped: ${totalCapped}`);
                
                // Expected vs actual
                console.log('\n🔍 Expected vs Actual:');
                console.log(`  Expected NFTs: 3`);
                console.log(`  Actual NFTs: ${totalCapped}`);
                console.log(`  Match: ${totalCapped === 3 ? '✅' : '❌'}`);
                
            } else {
                console.log('❌ No valid NFT data structure found');
            }
            
        } catch (error) {
            console.error('❌ Error in NFT analysis:', error);
        }
    }
    
    // Test app methods individually
    function testAppMethodsIndividually() {
        console.log('\n🔧 TESTING APP METHODS INDIVIDUALLY');
        console.log('='.repeat(60));
        
        const app = window.simpleRankChecker || new SimpleRankChecker();
        
        // Check if methods exist
        const methods = [
            'getAccountData',
            'getNFTDataETH',
            'calculateScoreBreakdown',
            'getRankTier',
            'displayResults'
        ];
        
        methods.forEach(method => {
            if (typeof app[method] === 'function') {
                console.log(`✅ ${method} method exists`);
            } else {
                console.log(`❌ ${method} method missing`);
            }
        });
        
        // Test method signatures
        console.log('\n📋 Method Signatures:');
        methods.forEach(method => {
            if (typeof app[method] === 'function') {
                console.log(`  ${method}: ${app[method].toString().split('(')[0]}...`);
            }
        });
    }
    
    // Run all tests
    async function runAllTests() {
        await testAppWithDetailedDebugging();
        await testSpecificNFTAnalysis();
        testAppMethodsIndividually();
        
        console.log('\n' + '='.repeat(80));
        console.log('🔍 APP DEBUG DETAILED TEST SUMMARY');
        console.log('='.repeat(80));
        
        console.log('\n✅ TESTS COMPLETED:');
        console.log('  🧪 App with detailed debugging');
        console.log('  🎵 Specific NFT analysis');
        console.log('  🔧 App methods individually');
        
        console.log('\n💡 WHAT TO LOOK FOR:');
        console.log('  1. Check each step of the process');
        console.log('  2. Look for NFT data structure issues');
        console.log('  3. Verify SoulBound detection logic');
        console.log('  4. Check score and rank calculations');
        console.log('  5. Verify UI display updates');
        
        console.log('='.repeat(80));
    }
    
    // Run the tests
    runAllTests().catch(console.error);
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running app debug detailed test...');
    testAppDebugDetailed();
} else {
    console.log('📝 Copy and paste this function into browser console to test app debug detailed');
}
