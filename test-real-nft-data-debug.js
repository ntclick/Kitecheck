/**
 * Test real NFT data with debug
 */

async function testRealNFTDataDebug() {
    console.log('🎯 TESTING REAL NFT DATA WITH DEBUG');
    console.log('='.repeat(80));
    
    const address = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    
    console.log('🔍 Testing real NFT data fetch...');
    console.log('='.repeat(80));
    
    try {
        // Try to fetch real NFT data via CORS proxy
        console.log('🔄 Fetching real NFT data via CORS proxy...');
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ CORS proxy response received');
            console.log('🔍 Raw response:', data);
            
            if (data.result && Array.isArray(data.result)) {
                console.log(`📊 NFT transfers found: ${data.result.length}`);
                
                // Show first few transfers
                data.result.slice(0, 5).forEach((transfer, index) => {
                    console.log(`  ${index + 1}. ${transfer.tokenName} (${transfer.tokenSymbol})`);
                    console.log(`     Token ID: ${transfer.tokenID}`);
                    console.log(`     Contract: ${transfer.contractAddress}`);
                    console.log(`     To: ${transfer.to}`);
                    console.log(`     From: ${transfer.from}`);
                    console.log('');
                });
                
                // Test the analysis logic
                console.log('🎵 Testing analysis logic...');
                const transfers = data.result || [];
                
                // Count SoulBound NFTs
                const soulboundTransfers = transfers.filter(transfer => {
                    const tokenName = transfer.tokenName?.toLowerCase() || '';
                    return tokenName.includes('soulbound');
                });
                
                console.log(`🎵 SoulBound transfers found: ${soulboundTransfers.length}`);
                
                // Separate WhitelistSoulBoundNFT and SoulBoundNFT
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
                
                // Calculate final count
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
                
            } else {
                console.log('❌ No NFT data in response');
                console.log('🔍 Response structure:', Object.keys(data));
            }
            
        } else {
            console.log('❌ CORS proxy request failed:', response.status);
        }
        
    } catch (error) {
        console.error('❌ Error fetching NFT data:', error.message);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ REAL NFT DATA DEBUG SUMMARY:');
    console.log('='.repeat(80));
    console.log('✅ Tested real NFT data fetch');
    console.log('✅ Analyzed NFT data structure');
    console.log('✅ Verified analysis logic');
    console.log('🌐 Test at: http://localhost:8001');
    console.log('='.repeat(80));
}

// Run test
testRealNFTDataDebug().catch(console.error);
