/**
 * Debug NFT Issue
 * Comprehensive debugging to find the exact problem
 */

function debugNFTIssue() {
    console.log('🔍 DEBUGGING NFT ISSUE');
    console.log('='.repeat(80));
    
    // Check if we're on the right page
    if (!document.getElementById('resultsSection')) {
        console.error('❌ Not on the right page! Please run this on the Kite AI Chain page.');
        return;
    }
    
    // Test with known addresses
    const testAddresses = [
        '0x7a2C109ceabF0818F461278f57234Dd2440a41DB', // Should have 3 NFTs
        '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D'  // Should have 0 NFTs
    ];
    
    // Debug app instance
    function debugAppInstance() {
        console.log('\n🔍 DEBUGGING APP INSTANCE');
        console.log('='.repeat(60));
        
        const app = window.simpleRankChecker || new SimpleRankChecker();
        console.log('App instance:', app);
        console.log('App methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(app)));
        
        // Check if methods exist
        const methods = ['getAccountData', 'calculateScoreBreakdown', 'getRankTier'];
        methods.forEach(method => {
            if (typeof app[method] === 'function') {
                console.log(`✅ ${method} method exists`);
            } else {
                console.log(`❌ ${method} method missing`);
            }
        });
    }
    
    // Debug NFT data fetching
    async function debugNFTDataFetching() {
        console.log('\n🔍 DEBUGGING NFT DATA FETCHING');
        console.log('='.repeat(60));
        
        const app = window.simpleRankChecker || new SimpleRankChecker();
        
        for (const address of testAddresses) {
            console.log(`\n📍 Testing address: ${address}`);
            console.log('='.repeat(40));
            
            try {
                // Test NFT data fetching directly
                console.log('🖼️ Testing NFT data fetching...');
                const nftData = await app.getNFTDataETH(address);
                console.log('NFT Data Result:', nftData);
                
                // Analyze the data structure
                console.log('\n📊 Data Structure Analysis:');
                console.log(`  Has nftData: ${!!nftData}`);
                console.log(`  Has result: ${!!(nftData && nftData.result)}`);
                console.log(`  Is array: ${!!(nftData && nftData.result && Array.isArray(nftData.result))}`);
                console.log(`  Result length: ${nftData && nftData.result ? nftData.result.length : 0}`);
                
                if (nftData && nftData.result && Array.isArray(nftData.result)) {
                    console.log('\n🔍 NFT Transfers Analysis:');
                    nftData.result.forEach((transfer, index) => {
                        console.log(`  ${index + 1}. Token: ${transfer.tokenName} (${transfer.tokenSymbol})`);
                        console.log(`     Contract: ${transfer.contractAddress}`);
                        console.log(`     From: ${transfer.from}`);
                        console.log(`     To: ${transfer.to}`);
                        console.log(`     TokenID: ${transfer.tokenID}`);
                    });
                    
                    // Test SoulBound detection
                    console.log('\n🎵 SoulBound Detection Test:');
                    let soulboundCount = 0;
                    let whitelistCount = 0;
                    let regularCount = 0;
                    
                    nftData.result.forEach((transfer, index) => {
                        const tokenName = transfer.tokenName || '';
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
                    
                    console.log('\n📊 SoulBound Counts:');
                    console.log(`  Total SoulBound: ${soulboundCount}`);
                    console.log(`  Whitelist: ${whitelistCount}`);
                    console.log(`  Regular: ${regularCount}`);
                    
                    // Apply capping logic
                    const cappedWhitelist = Math.min(whitelistCount, 2);
                    const cappedRegular = Math.min(regularCount, 1);
                    const totalCapped = cappedWhitelist + cappedRegular;
                    
                    console.log('\n🎯 After Capping:');
                    console.log(`  Capped Whitelist: ${cappedWhitelist}`);
                    console.log(`  Capped Regular: ${cappedRegular}`);
                    console.log(`  Total Capped: ${totalCapped}`);
                    
                } else {
                    console.log('❌ No valid NFT data structure found');
                }
                
            } catch (error) {
                console.error(`❌ Error fetching NFT data for ${address}:`, error);
            }
            
            // Wait between tests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    // Debug full account data
    async function debugFullAccountData() {
        console.log('\n🔍 DEBUGGING FULL ACCOUNT DATA');
        console.log('='.repeat(60));
        
        const app = window.simpleRankChecker || new SimpleRankChecker();
        
        for (const address of testAddresses) {
            console.log(`\n📍 Testing address: ${address}`);
            console.log('='.repeat(40));
            
            try {
                // Get full account data
                console.log('📊 Getting full account data...');
                const accountData = await app.getAccountData(address);
                console.log('Full Account Data:', accountData);
                
                // Check each field
                console.log('\n📋 Account Data Fields:');
                console.log(`  Address: ${accountData.address}`);
                console.log(`  Balance: ${accountData.balance}`);
                console.log(`  Transaction Count: ${accountData.transactionCount}`);
                console.log(`  Soundbound NFTs: ${accountData.soundboundNFTs}`);
                console.log(`  Kite Tokens: ${accountData.kiteTokens}`);
                
                // Test score calculation
                console.log('\n🧮 Testing Score Calculation:');
                const scores = app.calculateScoreBreakdown(accountData);
                console.log('Scores:', scores);
                
                // Test rank tier
                console.log('\n🎯 Testing Rank Tier:');
                const rankTier = app.getRankTier(accountData);
                console.log('Rank Tier:', rankTier);
                
                // Compare with expected
                const expectedNFTs = address === '0x7a2C109ceabF0818F461278f57234Dd2440a41DB' ? 3 : 0;
                console.log('\n🔍 Comparison:');
                console.log(`  Expected NFTs: ${expectedNFTs}`);
                console.log(`  Actual NFTs: ${accountData.soundboundNFTs}`);
                console.log(`  Match: ${accountData.soundboundNFTs === expectedNFTs ? '✅' : '❌'}`);
                
            } catch (error) {
                console.error(`❌ Error getting account data for ${address}:`, error);
            }
            
            // Wait between tests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    // Debug UI display
    function debugUIDisplay() {
        console.log('\n🔍 DEBUGGING UI DISPLAY');
        console.log('='.repeat(60));
        
        // Check if elements exist
        const elements = {
            'resultsSection': document.getElementById('resultsSection'),
            'rankBadge': document.getElementById('rankBadge'),
            'scoreValue': document.getElementById('scoreValue'),
            'balanceScore': document.getElementById('balanceScore'),
            'transactionScore': document.getElementById('transactionScore'),
            'activityScore': document.getElementById('activityScore'),
            'nftScore': document.getElementById('nftScore'),
            'tokenScore': document.getElementById('tokenScore')
        };
        
        console.log('\n📋 UI Elements Check:');
        Object.entries(elements).forEach(([name, element]) => {
            if (element) {
                console.log(`  ✅ ${name}: Found`);
                console.log(`     Display: ${getComputedStyle(element).display}`);
                console.log(`     Classes: ${element.className}`);
                if (element.textContent) {
                    console.log(`     Text: ${element.textContent}`);
                }
            } else {
                console.log(`  ❌ ${name}: Not found`);
            }
        });
        
        // Check CSS classes
        console.log('\n🎨 CSS Classes Check:');
        const rankBadge = document.getElementById('rankBadge');
        if (rankBadge) {
            console.log(`  Rank Badge Classes: ${rankBadge.className}`);
            console.log(`  Rank Badge HTML: ${rankBadge.innerHTML}`);
        }
    }
    
    // Debug CSS file
    function debugCSSFile() {
        console.log('\n🔍 DEBUGGING CSS FILE');
        console.log('='.repeat(60));
        
        // Check if CSS file is loaded
        const cssLink = document.querySelector('link[href*="styles-vibrant.css"]');
        if (cssLink) {
            console.log('✅ Vibrant CSS file is loaded');
            console.log(`   CSS file: ${cssLink.href}`);
        } else {
            console.log('❌ Vibrant CSS file not found');
        }
        
        // Check for rank badge styles
        const rankBadge = document.getElementById('rankBadge');
        if (rankBadge) {
            const styles = getComputedStyle(rankBadge);
            console.log('\n🎨 Rank Badge Styles:');
            console.log(`   Background: ${styles.background}`);
            console.log(`   Background Image: ${styles.backgroundImage}`);
            console.log(`   Color: ${styles.color}`);
            console.log(`   Border: ${styles.border}`);
            console.log(`   Box Shadow: ${styles.boxShadow}`);
            console.log(`   Border Radius: ${styles.borderRadius}`);
        }
    }
    
    // Run all debug tests
    async function runAllDebugTests() {
        debugAppInstance();
        await debugNFTDataFetching();
        await debugFullAccountData();
        debugUIDisplay();
        debugCSSFile();
        
        console.log('\n' + '='.repeat(80));
        console.log('🔍 NFT ISSUE DEBUG SUMMARY');
        console.log('='.repeat(80));
        
        console.log('\n✅ DEBUGGING COMPLETED:');
        console.log('  🔍 App instance check');
        console.log('  🖼️ NFT data fetching');
        console.log('  📊 Full account data');
        console.log('  🖥️ UI display check');
        console.log('  🎨 CSS file check');
        
        console.log('\n💡 NEXT STEPS:');
        console.log('  1. Check console logs above for specific errors');
        console.log('  2. Look for NFT data structure issues');
        console.log('  3. Verify SoulBound detection logic');
        console.log('  4. Check UI element display');
        console.log('  5. Verify CSS file loading');
        
        console.log('='.repeat(80));
    }
    
    // Run the debug tests
    runAllDebugTests().catch(console.error);
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running NFT issue debug...');
    debugNFTIssue();
} else {
    console.log('📝 Copy and paste this function into browser console to debug NFT issue');
}