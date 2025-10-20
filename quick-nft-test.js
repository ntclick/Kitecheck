/**
 * Quick NFT Test
 * Quick test to see what's wrong with NFT detection
 */

function quickNFTTest() {
    console.log('🔍 QUICK NFT TEST');
    console.log('='.repeat(80));
    
    // Test the address that should have 3 NFTs
    const testAddress = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    
    async function quickTest() {
        console.log(`🧪 Quick test for: ${testAddress}`);
        
        try {
            // Test CORS proxy directly
            const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${testAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
            const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(nftUrl)}`;
            
            console.log('🌐 Testing CORS proxy...');
            const response = await fetch(corsProxyUrl);
            console.log('📡 Response status:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ API Response:', data);
                
                if (data.result && Array.isArray(data.result)) {
                    console.log('📊 Total transfers:', data.result.length);
                    
                    // Show all transfers
                    data.result.forEach((transfer, index) => {
                        console.log(`Transfer ${index + 1}:`);
                        console.log(`  Token Name: "${transfer.tokenName}"`);
                        console.log(`  Token Symbol: "${transfer.tokenSymbol}"`);
                        console.log(`  Contract: ${transfer.contractAddress}`);
                        console.log(`  Token ID: ${transfer.tokenID}`);
                        console.log(`  From: ${transfer.from}`);
                        console.log(`  To: ${transfer.to}`);
                        console.log('---');
                    });
                    
                    // Count SoulBound NFTs
                    let soulboundCount = 0;
                    let whitelistCount = 0;
                    let regularCount = 0;
                    
                    data.result.forEach(transfer => {
                        if (transfer.tokenName && transfer.tokenName.toLowerCase().includes('soulbound')) {
                            soulboundCount++;
                            if (transfer.tokenName.toLowerCase().includes('whitelist')) {
                                whitelistCount++;
                            } else {
                                regularCount++;
                            }
                        }
                    });
                    
                    console.log('🎯 SoulBound Analysis:');
                    console.log(`  Total SoulBound: ${soulboundCount}`);
                    console.log(`  WhitelistSoulBoundNFT: ${whitelistCount}`);
                    console.log(`  Regular SoulBoundNFT: ${regularCount}`);
                    
                    // Apply caps
                    const cappedWhitelist = Math.min(whitelistCount, 2);
                    const cappedRegular = Math.min(regularCount, 1);
                    const totalSoulbound = cappedWhitelist + cappedRegular;
                    
                    console.log('🎯 Final Count:');
                    console.log(`  Capped Whitelist: ${cappedWhitelist}`);
                    console.log(`  Capped Regular: ${cappedRegular}`);
                    console.log(`  Total SoulBound NFTs: ${totalSoulbound}`);
                    
                    if (totalSoulbound === 3) {
                        console.log('✅ CORRECT! Should show 3 NFTs');
                    } else {
                        console.log(`❌ INCORRECT! Expected 3, got ${totalSoulbound}`);
                    }
                    
                } else {
                    console.log('❌ No result array in response');
                }
            } else {
                console.log('❌ API request failed:', response.status);
            }
            
        } catch (error) {
            console.error('❌ Test error:', error);
        }
    }
    
    // Run the test
    quickTest();
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running quick NFT test...');
    quickNFTTest();
} else {
    console.log('📝 Copy and paste this function into browser console to test NFT quickly');
}
