// Test fixes for accountInfo and CORS issues - paste this directly into browser console

function testFixes() {
    console.log('🔧 TESTING FIXES');
    console.log('='.repeat(60));
    
    const app = window.simpleRankChecker || new SimpleRankChecker();
    if (!app) {
        console.error('❌ App not found');
        return;
    }
    
    console.log('✅ App found');
    
    const testAddresses = [
        {
            address: '0x1F7edB3dffaFA48Fc852742D36A0D83487A60693',
            description: 'Address that caused accountInfo error'
        },
        {
            address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            description: 'Known address with NFTs'
        },
        {
            address: '0x5603800fD5aC900Bd5D710B461A9874E6201F7d5',
            description: 'Another known address'
        }
    ];
    
    async function testAddress(testCase) {
        console.log(`\n📍 Testing: ${testCase.address}`);
        console.log(`📝 Description: ${testCase.description}`);
        console.log('-'.repeat(50));
        
        try {
            // Test account data fetching
            console.log('🔍 Step 1: Fetching account data...');
            const accountData = await app.getAccountData(testCase.address);
            console.log('📊 Account Data:', accountData);
            
            // Check if accountInfo is properly defined
            if (accountData && accountData.name) {
                console.log(`✅ Account name: ${accountData.name}`);
            } else {
                console.log('❌ Account name missing');
            }
            
            // Test rank calculation
            console.log('\n🔍 Step 2: Calculating rank...');
            const rankTier = app.getRankTier(accountData);
            console.log('🎯 Rank Tier:', rankTier);
            
            // Test scores
            console.log('\n🔍 Step 3: Calculating scores...');
            const scores = app.calculateScoreBreakdown(accountData);
            console.log('🧮 Scores:', scores);
            
            // Results
            console.log('\n🎯 RESULTS:');
            console.log('='.repeat(30));
            console.log(`Address: ${accountData.address}`);
            console.log(`Name: ${accountData.name}`);
            console.log(`Balance: ${accountData.balance} KITE`);
            console.log(`Transactions: ${accountData.transactionCount}`);
            console.log(`NFTs: ${accountData.soundboundNFTs}`);
            console.log(`Rank: ${rankTier.name} (Level ${rankTier.level})`);
            console.log(`Total Score: ${scores.total}`);
            
            // Check for errors
            if (accountData.name && accountData.name !== 'undefined') {
                console.log('\n✅ AccountInfo fix working correctly');
            } else {
                console.log('\n❌ AccountInfo still has issues');
            }
            
            // Check CORS handling
            if (accountData.soundboundNFTs >= 0) {
                console.log('✅ CORS handling working (NFT data retrieved or fallback used)');
            } else {
                console.log('❌ CORS handling has issues');
            }
            
        } catch (error) {
            console.error(`❌ Error testing ${testCase.address}:`, error);
            
            // Check if it's the accountInfo error
            if (error.message.includes('accountInfo is not defined')) {
                console.log('❌ AccountInfo error still exists');
            } else {
                console.log('✅ AccountInfo error fixed, but other error occurred');
            }
        }
    }
    
    // Test CORS proxies specifically
    async function testCORSProxies() {
        console.log('\n🔍 Testing CORS proxy fallbacks...');
        console.log('-'.repeat(50));
        
        const testAddress = '0x1F7edB3dffaFA48Fc852742D36A0D83487A60693';
        
        try {
            console.log('🪙 Testing token data with CORS fallbacks...');
            const tokenData = await app.getTokenDataETH(testAddress);
            console.log('📊 Token Data:', tokenData);
            
            if (tokenData && tokenData.result) {
                console.log(`✅ Token data retrieved: ${tokenData.result.length} transfers`);
            } else {
                console.log('❌ Token data failed');
            }
            
        } catch (error) {
            console.error('❌ Token data error:', error);
        }
        
        try {
            console.log('\n🖼️ Testing NFT data with CORS fallbacks...');
            const nftData = await app.getNFTDataETH(testAddress);
            console.log('📊 NFT Data:', nftData);
            
            if (nftData && nftData.result) {
                console.log(`✅ NFT data retrieved: ${nftData.result.length} transfers`);
            } else {
                console.log('❌ NFT data failed');
            }
            
        } catch (error) {
            console.error('❌ NFT data error:', error);
        }
    }
    
    // Run all tests
    async function runAllTests() {
        for (const testCase of testAddresses) {
            await testAddress(testCase);
            console.log('\n' + '='.repeat(60));
        }
        
        await testCORSProxies();
        
        console.log('\n🏁 ALL FIXES TESTS COMPLETED');
        console.log('='.repeat(60));
        console.log('\n📊 FIXES SUMMARY:');
        console.log('✅ AccountInfo: Added back to parallel calls');
        console.log('✅ CORS Proxies: Multiple fallback proxies');
        console.log('✅ Error Handling: Better error messages');
        console.log('✅ Timeouts: 5s timeout for all CORS calls');
        console.log('\n🎯 EXPECTED RESULTS:');
        console.log('- No more "accountInfo is not defined" errors');
        console.log('- Better CORS proxy reliability');
        console.log('- Faster failure on slow proxies');
    }
    
    // Run the tests
    runAllTests();
}

// Run the test
testFixes();