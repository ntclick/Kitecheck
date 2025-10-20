/**
 * Simple NFT Test
 * Test NFT data fetching with specific addresses
 */

function simpleNFTTest() {
    console.log('🔍 SIMPLE NFT TEST');
    console.log('='.repeat(80));
    
    // Test the known address that should have 3 NFTs
    const testAddress = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    
    async function testNFTFetch() {
        console.log(`🧪 Testing NFT fetch for: ${testAddress}`);
        console.log('='.repeat(60));
        
        try {
            // Test 1: Direct API call
            console.log('🔍 Test 1: Direct API call');
            const directUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${testAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
            console.log('URL:', directUrl);
            
            try {
                const directResponse = await fetch(directUrl);
                console.log('Direct API Status:', directResponse.status);
                
                if (directResponse.ok) {
                    const directData = await directResponse.json();
                    console.log('Direct API Data:', directData);
                    console.log('Direct API Result Length:', directData.result?.length || 0);
                } else {
                    console.log('Direct API Failed:', directResponse.status);
                }
            } catch (directError) {
                console.log('Direct API Error:', directError.message);
            }
            
            // Test 2: CORS Proxy
            console.log('\n🔍 Test 2: CORS Proxy');
            const corsUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(directUrl)}`;
            console.log('CORS URL:', corsUrl);
            
            try {
                const corsResponse = await fetch(corsUrl);
                console.log('CORS Status:', corsResponse.status);
                
                if (corsResponse.ok) {
                    const corsData = await corsResponse.json();
                    console.log('CORS Data:', corsData);
                    console.log('CORS Result Length:', corsData.result?.length || 0);
                    
                    // Analyze the data
                    if (corsData.result && Array.isArray(corsData.result)) {
                        console.log('\n🔍 Analyzing NFT transfers:');
                        
                        let soulboundCount = 0;
                        let whitelistCount = 0;
                        let regularCount = 0;
                        
                        corsData.result.forEach((transfer, index) => {
                            console.log(`Transfer ${index + 1}:`);
                            console.log(`  Token Name: ${transfer.tokenName}`);
                            console.log(`  Token Symbol: ${transfer.tokenSymbol}`);
                            console.log(`  Contract: ${transfer.contractAddress}`);
                            console.log(`  Token ID: ${transfer.tokenID}`);
                            
                            if (transfer.tokenName && transfer.tokenName.toLowerCase().includes('soulbound')) {
                                soulboundCount++;
                                console.log(`  ✅ SoulBound NFT detected!`);
                                
                                if (transfer.tokenName.toLowerCase().includes('whitelist')) {
                                    whitelistCount++;
                                    console.log(`  🏆 WhitelistSoulBoundNFT`);
                                } else {
                                    regularCount++;
                                    console.log(`  📱 Regular SoulBoundNFT`);
                                }
                            }
                        });
                        
                        console.log('\n📊 Analysis Results:');
                        console.log(`Total transfers: ${corsData.result.length}`);
                        console.log(`SoulBound transfers: ${soulboundCount}`);
                        console.log(`WhitelistSoulBoundNFT: ${whitelistCount}`);
                        console.log(`Regular SoulBoundNFT: ${regularCount}`);
                        
                        // Apply caps
                        const cappedWhitelist = Math.min(whitelistCount, 2);
                        const cappedRegular = Math.min(regularCount, 1);
                        const totalSoulbound = cappedWhitelist + cappedRegular;
                        
                        console.log('\n🎯 Final Count (with caps):');
                        console.log(`Capped Whitelist: ${cappedWhitelist}`);
                        console.log(`Capped Regular: ${cappedRegular}`);
                        console.log(`Total SoulBound NFTs: ${totalSoulbound}`);
                        
                        if (totalSoulbound === 3) {
                            console.log('✅ CORRECT! Should show 3 NFTs');
                        } else {
                            console.log(`❌ INCORRECT! Expected 3, got ${totalSoulbound}`);
                        }
                    }
                } else {
                    console.log('CORS Failed:', corsResponse.status);
                }
            } catch (corsError) {
                console.log('CORS Error:', corsError.message);
            }
            
        } catch (error) {
            console.error('Test error:', error);
        }
    }
    
    // Run the test
    testNFTFetch();
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running simple NFT test...');
    simpleNFTTest();
} else {
    console.log('📝 Copy and paste this function into browser console to test NFT');
}
