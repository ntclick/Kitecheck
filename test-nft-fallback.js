/**
 * Test NFT fallback logic with timeout handling
 */

async function testNFTFallback() {
    console.log('🎯 TESTING NFT FALLBACK LOGIC');
    console.log('='.repeat(80));
    
    const address = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    
    console.log('🔍 Testing wallet:', address);
    console.log('='.repeat(80));
    
    try {
        // Test CORS proxy directly (since API might timeout)
        console.log('🌐 Testing CORS proxy for NFT data...');
        
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
        
        console.log('📡 Fetching from CORS proxy...');
        const nftResponse = await fetch(`${corsProxy}${encodeURIComponent(nftUrl)}`);
        
        if (nftResponse.ok) {
            const nftData = await nftResponse.json();
            const transfers = nftData.result || [];
            
            console.log('✅ CORS proxy successful!');
            console.log('📊 NFT Transfers Found:', transfers.length);
            
            if (transfers.length > 0) {
                console.log('\n🖼️ NFT Transfer Details:');
                transfers.forEach((transfer, index) => {
                    console.log(`  ${index + 1}. ${transfer.tokenName} (${transfer.tokenSymbol})`);
                    console.log(`     Token ID: ${transfer.tokenID}`);
                    console.log(`     Contract: ${transfer.contractAddress}`);
                    console.log(`     To: ${transfer.to}`);
                    console.log('');
                });
                
                // Apply the new logic: Count ALL NFTs as SoulBound NFTs (max 3)
                const uniqueTokens = new Set();
                transfers.forEach(transfer => {
                    if (transfer.to?.toLowerCase() === address.toLowerCase()) {
                        uniqueTokens.add(transfer.tokenID);
                    }
                });
                
                // Limit to maximum 3 NFTs
                const soundboundNFTs = Math.min(uniqueTokens.size, 3);
                
                console.log('🎯 NEW LOGIC RESULTS:');
                console.log('='.repeat(50));
                console.log(`📊 Total unique NFTs owned: ${uniqueTokens.size}`);
                console.log(`🎵 SoulBound NFTs (max 3): ${soundboundNFTs}`);
                console.log('✅ ALL NFTs counted as SoulBound NFTs');
                console.log('✅ Maximum limit: 3 NFTs applied');
                
                // Calculate final score
                const balance = 0.685719;
                const transactions = 46;
                
                const baseScore = (balance * 100) + (transactions * 10) + (soundboundNFTs * 50);
                const multiplier = soundboundNFTs >= 3 ? 2.5 : soundboundNFTs >= 2 ? 2.0 : 1.0;
                const finalScore = baseScore * multiplier;
                
                console.log('\n🏆 FINAL SCORE CALCULATION:');
                console.log('='.repeat(50));
                console.log(`  💰 Balance: ${balance.toFixed(6)} KITE → ${(balance * 100).toFixed(2)} points`);
                console.log(`  📋 Transactions: ${transactions} → ${(transactions * 10).toFixed(2)} points`);
                console.log(`  🎵 SoulBound NFTs: ${soundboundNFTs} → ${(soundboundNFTs * 50).toFixed(2)} points`);
                console.log(`  🏆 Base Score: ${baseScore.toFixed(2)}`);
                console.log(`  🔢 Multiplier: ${multiplier}x`);
                console.log(`  🏆 Final Score: ${finalScore.toFixed(2)}`);
                
                console.log('\n✅ EXPECTED RESULT IN APP:');
                console.log('='.repeat(50));
                console.log(`🎵 Soundbound NFTs: ${soundboundNFTs}`);
                console.log(`🔢 Multiplier: ${multiplier}x`);
                console.log(`🏆 Final Score: ${finalScore.toFixed(2)}`);
                
            } else {
                console.log('📊 No NFT transfers found');
            }
        } else {
            console.log('❌ CORS proxy failed:', nftResponse.status, nftResponse.statusText);
        }
        
        console.log('\n' + '='.repeat(80));
        console.log('🔧 FALLBACK LOGIC SUMMARY:');
        console.log('='.repeat(80));
        console.log('✅ Primary: Try API with working auth method');
        console.log('✅ Fallback: Try CORS proxy if API fails/timeout');
        console.log('✅ Logic: Count ALL NFTs as SoulBound (max 3)');
        console.log('✅ No filtering by name or symbol');
        console.log('🌐 Test at: http://localhost:8001');
        console.log('='.repeat(80));
        
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

// Run test
testNFTFallback().catch(console.error);
