/**
 * Test 3 NFT Wallet
 * Test specifically the wallet that should have 3 NFTs
 */

function test3NFTWallet() {
    console.log('🎯 TESTING 3 NFT WALLET');
    console.log('='.repeat(80));
    
    // Check if we're on the right page
    if (!document.getElementById('resultsSection')) {
        console.error('❌ Not on the right page! Please run this on the Kite AI Chain page.');
        return;
    }
    
    // Test the wallet that should have 3 NFTs
    const testAddress = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    
    // Test app with 3 NFT wallet
    async function testAppWith3NFTWallet() {
        console.log('🧪 Testing app with 3 NFT wallet...');
        console.log(`📍 Address: ${testAddress}`);
        console.log('='.repeat(60));
        
        // Get the app instance
        const app = window.simpleRankChecker || new SimpleRankChecker();
        
        try {
            // Step 1: Test NFT data fetching
            console.log('\n🖼️ STEP 1: Testing NFT data fetching...');
            const nftData = await app.getNFTDataETH(testAddress);
            console.log('NFT Data Result:', nftData);
            
            // Step 2: Test account data fetching
            console.log('\n📊 STEP 2: Testing account data fetching...');
            const accountData = await app.getAccountData(testAddress);
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
            console.log(`  Expected NFTs: 3`);
            console.log(`  Actual NFTs: ${accountData.soundboundNFTs}`);
            console.log(`  NFT Match: ${accountData.soundboundNFTs === 3 ? '✅' : '❌'}`);
            
            console.log(`  Expected Rank: Kite Legend`);
            console.log(`  Actual Rank: ${rankTier.name}`);
            console.log(`  Rank Match: ${rankTier.name === 'Kite Legend' ? '✅' : '❌'}`);
            
            console.log(`  Expected Level: 1`);
            console.log(`  Actual Level: ${rankTier.level}`);
            console.log(`  Level Match: ${rankTier.level === 1 ? '✅' : '❌'}`);
            
            console.log(`  Expected Color: #D4A574`);
            console.log(`  Actual Color: ${rankTier.color}`);
            console.log(`  Color Match: ${rankTier.color === '#D4A574' ? '✅' : '❌'}`);
            
            // Step 7: Debug summary
            console.log('\n📋 STEP 7: Debug summary...');
            console.log('Debug Summary:');
            console.log(`  Address: ${testAddress}`);
            console.log(`  NFT Data Available: ${!!nftData}`);
            console.log(`  NFT Transfers: ${nftData && nftData.result ? nftData.result.length : 0}`);
            console.log(`  Soundbound NFTs: ${accountData.soundboundNFTs}`);
            console.log(`  Transaction Count: ${accountData.transactionCount}`);
            console.log(`  Balance: ${accountData.balance}`);
            console.log(`  Total Score: ${scores.total}`);
            console.log(`  Rank: ${rankTier.name}`);
            console.log(`  Level: ${rankTier.level}`);
            console.log(`  Color: ${rankTier.color}`);
            
            // Step 8: Check if fallback was used
            console.log('\n🔄 STEP 8: Checking fallback usage...');
            if (nftData && nftData.result && nftData.result.length > 0) {
                console.log('✅ NFT data was fetched successfully');
                console.log('NFT transfers found:', nftData.result.length);
                nftData.result.forEach((transfer, index) => {
                    console.log(`  ${index + 1}. ${transfer.tokenName} (${transfer.tokenSymbol})`);
                });
            } else {
                console.log('❌ No NFT data found - fallback should have been used');
                console.log('This indicates the fallback logic is not working');
            }
            
        } catch (error) {
            console.error(`❌ Test failed for ${testAddress}:`, error);
            console.error('Error stack:', error.stack);
        }
    }
    
    // Test manual NFT analysis
    async function testManualNFTAnalysis() {
        console.log('\n🎵 TESTING MANUAL NFT ANALYSIS');
        console.log('='.repeat(60));
        
        const app = window.simpleRankChecker || new SimpleRankChecker();
        
        try {
            // Get NFT data
            const nftData = await app.getNFTDataETH(testAddress);
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
                console.log('This means the fallback logic should have been triggered');
            }
            
        } catch (error) {
            console.error('❌ Error in NFT analysis:', error);
        }
    }
    
    // Test direct API call
    async function testDirectAPICall() {
        console.log('\n🌐 TESTING DIRECT API CALL');
        console.log('='.repeat(60));
        
        try {
            // Test direct API call
            const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${testAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
            console.log('🌐 NFT API URL:', nftUrl);
            
            // Test with CORS proxy
            const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(nftUrl)}`;
            console.log('🌐 CORS Proxy URL:', corsProxyUrl);
            
            const response = await fetch(corsProxyUrl);
            console.log('📡 Response status:', response.status, response.statusText);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ NFT API response:', data);
                
                if (data.result && Array.isArray(data.result)) {
                    console.log(`📊 Total NFT transfers: ${data.result.length}`);
                    
                    // Analyze each transfer
                    console.log('\n🔍 NFT Transfer Analysis:');
                    data.result.forEach((transfer, index) => {
                        console.log(`  ${index + 1}. Token: ${transfer.tokenName} (${transfer.tokenSymbol})`);
                        console.log(`     Contract: ${transfer.contractAddress}`);
                        console.log(`     From: ${transfer.from}`);
                        console.log(`     To: ${transfer.to}`);
                        console.log(`     TokenID: ${transfer.tokenID}`);
                    });
                    
                    // Test SoulBound detection
                    console.log('\n🎵 SoulBound Detection:');
                    let soulboundCount = 0;
                    let whitelistCount = 0;
                    let regularCount = 0;
                    let allTokenNames = [];
                    
                    data.result.forEach((transfer, index) => {
                        const tokenName = transfer.tokenName || '';
                        allTokenNames.push(tokenName);
                        
                        const isSoulbound = tokenName.toLowerCase().includes('soulbound');
                        const isWhitelist = tokenName.toLowerCase().includes('whitelist');
                        
                        console.log(`  ${index + 1}. ${tokenName}:`);
                        console.log(`     Is SoulBound: ${isSoulbound}`);
                        console.log(`     Is Whitelist: ${isWhitelist}`);
                        
                        if (isSoulbound) {
                            soulboundCount++;
                            if (isWhitelist) {
                                whitelistCount++;
                            } else {
                                regularCount++;
                            }
                        }
                    });
                    
                    console.log('\n📊 SoulBound Analysis:');
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
                    console.log('❌ No NFT transfers found or invalid data structure');
                }
            } else {
                console.log('❌ API request failed');
            }
            
        } catch (error) {
            console.error(`❌ Error testing direct API for ${testAddress}:`, error);
        }
    }
    
    // Run all tests
    async function runAllTests() {
        await testAppWith3NFTWallet();
        await testManualNFTAnalysis();
        await testDirectAPICall();
        
        console.log('\n' + '='.repeat(80));
        console.log('🎯 3 NFT WALLET TEST SUMMARY');
        console.log('='.repeat(80));
        
        console.log('\n✅ TESTS COMPLETED:');
        console.log('  🧪 App with 3 NFT wallet');
        console.log('  🎵 Manual NFT analysis');
        console.log('  🌐 Direct API call');
        
        console.log('\n💡 WHAT TO LOOK FOR:');
        console.log('  1. Check if NFT data is fetched correctly');
        console.log('  2. Verify SoulBound NFT detection');
        console.log('  3. Check if fallback logic works');
        console.log('  4. Verify ranking shows Kite Legend');
        console.log('  5. Check UI displays correctly');
        
        console.log('='.repeat(80));
    }
    
    // Run the tests
    runAllTests().catch(console.error);
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running 3 NFT wallet test...');
    test3NFTWallet();
} else {
    console.log('📝 Copy and paste this function into browser console to test 3 NFT wallet');
}
