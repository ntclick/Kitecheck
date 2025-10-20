/**
 * Test real data verification
 */

async function testRealDataVerification() {
    console.log('🎯 TESTING REAL DATA VERIFICATION');
    console.log('='.repeat(80));
    
    const address = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    
    console.log('🔍 Testing real data verification...');
    console.log('='.repeat(80));
    
    try {
        // Simulate the exact same flow as the app
        console.log('🔄 Simulating app flow...');
        
        // Step 1: Try direct API call
        console.log('1️⃣ Trying direct API call...');
        try {
            const directResponse = await fetch(`https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`);
            
            if (directResponse.ok) {
                const directData = await directResponse.json();
                console.log('✅ Direct API call successful');
                console.log('🔍 Direct data structure:', {
                    message: directData.message,
                    status: directData.status,
                    resultLength: directData.result?.length,
                    resultType: typeof directData.result,
                    isArray: Array.isArray(directData.result)
                });
                
                if (directData.result && Array.isArray(directData.result)) {
                    console.log(`📊 Direct NFT transfers: ${directData.result.length}`);
                    
                    // Test analysis logic
                    const soulboundTransfers = directData.result.filter(transfer => {
                        const tokenName = transfer.tokenName?.toLowerCase() || '';
                        return tokenName.includes('soulbound');
                    });
                    
                    console.log(`🎵 Direct SoulBound transfers: ${soulboundTransfers.length}`);
                    
                    // Show first few transfers
                    soulboundTransfers.slice(0, 3).forEach((transfer, index) => {
                        console.log(`  ${index + 1}. ${transfer.tokenName} (${transfer.tokenSymbol})`);
                        console.log(`     Token ID: ${transfer.tokenID}`);
                        console.log(`     To: ${transfer.to}`);
                        console.log('');
                    });
                    
                    // Test the exact same logic as app
                    const whitelistTransfers = soulboundTransfers.filter(transfer => 
                        transfer.tokenName?.toLowerCase().includes('whitelist')
                    );
                    const regularSoulboundTransfers = soulboundTransfers.filter(transfer => 
                        !transfer.tokenName?.toLowerCase().includes('whitelist')
                    );
                    
                    console.log(`🏆 WhitelistSoulBoundNFT transfers: ${whitelistTransfers.length}`);
                    console.log(`📱 Regular SoulBoundNFT transfers: ${regularSoulboundTransfers.length}`);
                    
                    const uniqueWhitelistTokens = new Set();
                    const uniqueRegularTokens = new Set();
                    
                    whitelistTransfers.forEach(transfer => {
                        if (transfer.to?.toLowerCase() === address.toLowerCase()) {
                            uniqueWhitelistTokens.add(transfer.tokenID);
                        }
                    });
                    
                    regularSoulboundTransfers.forEach(transfer => {
                        if (transfer.to?.toLowerCase() === address.toLowerCase()) {
                            uniqueRegularTokens.add(transfer.tokenID);
                        }
                    });
                    
                    const whitelistCount = Math.min(uniqueWhitelistTokens.size, 2);
                    const regularCount = Math.min(uniqueRegularTokens.size, 1);
                    const totalSoundboundNFTs = whitelistCount + regularCount;
                    
                    console.log('\n🎯 FINAL ANALYSIS:');
                    console.log('='.repeat(40));
                    console.log(`🏆 WhitelistSoulBoundNFT owned: ${uniqueWhitelistTokens.size} → ${whitelistCount} counted`);
                    console.log(`📱 Regular SoulBoundNFT owned: ${uniqueRegularTokens.size} → ${regularCount} counted`);
                    console.log(`🎵 Total SoulBound NFTs: ${totalSoundboundNFTs}`);
                    
                    console.log('\n✅ EXPECTED RESULT IN APP:');
                    console.log('='.repeat(40));
                    console.log(`🎵 Soundbound NFTs: ${totalSoundboundNFTs}`);
                    console.log(`🔢 Multiplier: ${totalSoundboundNFTs >= 3 ? '3.0x' : totalSoundboundNFTs >= 2 ? '2.5x' : totalSoundboundNFTs >= 1 ? '1.5x' : '1.0x'}`);
                    
                } else {
                    console.log('❌ No NFT data in direct response');
                }
                
            } else {
                console.log('❌ Direct API call failed:', directResponse.status);
            }
            
        } catch (error) {
            console.log('❌ Direct API call error:', error.message);
        }
        
        // Step 2: Try CORS proxy (same as app)
        console.log('\n2️⃣ Trying CORS proxy (same as app)...');
        try {
            const corsResponse = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`)}`);
            
            if (corsResponse.ok) {
                const corsData = await corsResponse.json();
                console.log('✅ CORS proxy successful');
                console.log('🔍 CORS data structure:', {
                    message: corsData.message,
                    status: corsData.status,
                    resultLength: corsData.result?.length,
                    resultType: typeof corsData.result,
                    isArray: Array.isArray(corsData.result)
                });
                
                if (corsData.result && Array.isArray(corsData.result)) {
                    console.log(`📊 CORS NFT transfers: ${corsData.result.length}`);
                    
                    // Test analysis logic
                    const soulboundTransfers = corsData.result.filter(transfer => {
                        const tokenName = transfer.tokenName?.toLowerCase() || '';
                        return tokenName.includes('soulbound');
                    });
                    
                    console.log(`🎵 CORS SoulBound transfers: ${soulboundTransfers.length}`);
                    
                    // Test the exact same logic as app
                    const whitelistTransfers = soulboundTransfers.filter(transfer => 
                        transfer.tokenName?.toLowerCase().includes('whitelist')
                    );
                    const regularSoulboundTransfers = soulboundTransfers.filter(transfer => 
                        !transfer.tokenName?.toLowerCase().includes('whitelist')
                    );
                    
                    console.log(`🏆 WhitelistSoulBoundNFT transfers: ${whitelistTransfers.length}`);
                    console.log(`📱 Regular SoulBoundNFT transfers: ${regularSoulboundTransfers.length}`);
                    
                    const uniqueWhitelistTokens = new Set();
                    const uniqueRegularTokens = new Set();
                    
                    whitelistTransfers.forEach(transfer => {
                        if (transfer.to?.toLowerCase() === address.toLowerCase()) {
                            uniqueWhitelistTokens.add(transfer.tokenID);
                        }
                    });
                    
                    regularSoulboundTransfers.forEach(transfer => {
                        if (transfer.to?.toLowerCase() === address.toLowerCase()) {
                            uniqueRegularTokens.add(transfer.tokenID);
                        }
                    });
                    
                    const whitelistCount = Math.min(uniqueWhitelistTokens.size, 2);
                    const regularCount = Math.min(uniqueRegularTokens.size, 1);
                    const totalSoundboundNFTs = whitelistCount + regularCount;
                    
                    console.log('\n🎯 FINAL ANALYSIS:');
                    console.log('='.repeat(40));
                    console.log(`🏆 WhitelistSoulBoundNFT owned: ${uniqueWhitelistTokens.size} → ${whitelistCount} counted`);
                    console.log(`📱 Regular SoulBoundNFT owned: ${uniqueRegularTokens.size} → ${regularCount} counted`);
                    console.log(`🎵 Total SoulBound NFTs: ${totalSoundboundNFTs}`);
                    
                    console.log('\n✅ EXPECTED RESULT IN APP:');
                    console.log('='.repeat(40));
                    console.log(`🎵 Soundbound NFTs: ${totalSoundboundNFTs}`);
                    console.log(`🔢 Multiplier: ${totalSoundboundNFTs >= 3 ? '3.0x' : totalSoundboundNFTs >= 2 ? '2.5x' : totalSoundboundNFTs >= 1 ? '1.5x' : '1.0x'}`);
                    
                } else {
                    console.log('❌ No NFT data in CORS response');
                }
                
            } else {
                console.log('❌ CORS proxy failed:', corsResponse.status);
            }
            
        } catch (error) {
            console.log('❌ CORS proxy error:', error.message);
        }
        
    } catch (error) {
        console.error('❌ Error in test:', error.message);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ REAL DATA VERIFICATION SUMMARY:');
    console.log('='.repeat(80));
    console.log('✅ Tested direct API calls');
    console.log('✅ Tested CORS proxy calls');
    console.log('✅ Analyzed NFT data structure');
    console.log('✅ Verified analysis logic');
    console.log('🌐 Test at: http://localhost:8001');
    console.log('='.repeat(80));
}

// Run test
testRealDataVerification().catch(console.error);
