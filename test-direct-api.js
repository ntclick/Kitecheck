/**
 * Test Direct API
 * Test the API directly to see what data is actually returned
 */

function testDirectAPI() {
    console.log('🔍 TESTING DIRECT API');
    console.log('='.repeat(80));
    
    // Test addresses
    const testAddresses = [
        '0x7a2C109ceabF0818F461278f57234Dd2440a41DB', // Should have 3 NFTs
        '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D'  // Should have 0 NFTs
    ];
    
    // Test NFT API directly
    async function testNFTAPIDirectly() {
        console.log('\n🖼️ TESTING NFT API DIRECTLY');
        console.log('='.repeat(60));
        
        for (const address of testAddresses) {
            console.log(`\n📍 Testing address: ${address}`);
            console.log('='.repeat(40));
            
            try {
                // Test direct API call
                const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
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
                            console.log(`     Block: ${transfer.blockNumber}`);
                            console.log(`     Time: ${transfer.timeStamp}`);
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
                        const expectedNFTs = address === '0x7a2C109ceabF0818F461278f57234Dd2440a41DB' ? 3 : 0;
                        console.log('\n🔍 Expected vs Actual:');
                        console.log(`  Expected NFTs: ${expectedNFTs}`);
                        console.log(`  Actual NFTs: ${totalCapped}`);
                        console.log(`  Match: ${totalCapped === expectedNFTs ? '✅' : '❌'}`);
                        
                    } else {
                        console.log('❌ No NFT transfers found or invalid data structure');
                    }
                } else {
                    console.log('❌ API request failed');
                }
                
            } catch (error) {
                console.error(`❌ Error testing NFT API for ${address}:`, error);
            }
            
            // Wait between tests
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    // Test balance API
    async function testBalanceAPIDirectly() {
        console.log('\n💰 TESTING BALANCE API DIRECTLY');
        console.log('='.repeat(60));
        
        for (const address of testAddresses) {
            console.log(`\n📍 Testing address: ${address}`);
            console.log('='.repeat(40));
            
            try {
                // Test ETH RPC balance
                const balanceUrl = 'https://testnet.kitescan.ai/api/eth-rpc';
                const balancePayload = {
                    jsonrpc: '2.0',
                    method: 'eth_getBalance',
                    params: [address, 'latest'],
                    id: 1
                };
                
                console.log('🌐 Balance API URL:', balanceUrl);
                console.log('📦 Balance payload:', balancePayload);
                
                const response = await fetch(balanceUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(balancePayload)
                });
                
                console.log('📡 Response status:', response.status, response.statusText);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ Balance API response:', data);
                    
                    if (data.result) {
                        const balanceInWei = parseInt(data.result, 16);
                        const balanceInEther = balanceInWei / Math.pow(10, 18);
                        console.log(`💰 Balance: ${balanceInEther} KITE`);
                    }
                } else {
                    console.log('❌ Balance API request failed');
                }
                
            } catch (error) {
                console.error(`❌ Error testing balance API for ${address}:`, error);
            }
            
            // Wait between tests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    // Test transaction count API
    async function testTransactionCountAPIDirectly() {
        console.log('\n📝 TESTING TRANSACTION COUNT API DIRECTLY');
        console.log('='.repeat(60));
        
        for (const address of testAddresses) {
            console.log(`\n📍 Testing address: ${address}`);
            console.log('='.repeat(40));
            
            try {
                // Test ETH RPC transaction count
                const txCountUrl = 'https://testnet.kitescan.ai/api/eth-rpc';
                const txCountPayload = {
                    jsonrpc: '2.0',
                    method: 'eth_getTransactionCount',
                    params: [address, 'latest'],
                    id: 1
                };
                
                console.log('🌐 Transaction Count API URL:', txCountUrl);
                console.log('📦 Transaction Count payload:', txCountPayload);
                
                const response = await fetch(txCountUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(txCountPayload)
                });
                
                console.log('📡 Response status:', response.status, response.statusText);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ Transaction Count API response:', data);
                    
                    if (data.result) {
                        const txCount = parseInt(data.result, 16);
                        console.log(`📝 Transaction Count: ${txCount}`);
                    }
                } else {
                    console.log('❌ Transaction Count API request failed');
                }
                
            } catch (error) {
                console.error(`❌ Error testing transaction count API for ${address}:`, error);
            }
            
            // Wait between tests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    // Run all API tests
    async function runAllAPITests() {
        await testNFTAPIDirectly();
        await testBalanceAPIDirectly();
        await testTransactionCountAPIDirectly();
        
        console.log('\n' + '='.repeat(80));
        console.log('🔍 DIRECT API TEST SUMMARY');
        console.log('='.repeat(80));
        
        console.log('\n✅ API TESTS COMPLETED:');
        console.log('  🖼️ NFT API direct test');
        console.log('  💰 Balance API direct test');
        console.log('  📝 Transaction Count API direct test');
        
        console.log('\n💡 WHAT TO LOOK FOR:');
        console.log('  1. Check if NFT API returns correct data');
        console.log('  2. Verify SoulBound NFT detection');
        console.log('  3. Check balance and transaction count');
        console.log('  4. Compare expected vs actual results');
        console.log('  5. Look for any API errors or issues');
        
        console.log('='.repeat(80));
    }
    
    // Run the API tests
    runAllAPITests().catch(console.error);
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running direct API test...');
    testDirectAPI();
} else {
    console.log('📝 Copy and paste this function into browser console to test direct API');
}
