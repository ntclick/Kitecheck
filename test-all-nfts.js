/**
 * Test ALL NFTs as SoulBound NFTs (max 3)
 */

async function testAllNFTsAsSoulBound() {
    console.log('🎯 TESTING ALL NFTs AS SOULBOUND (MAX 3)');
    console.log('='.repeat(80));
    
    const address = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    console.log('🔍 Testing wallet:', address);
    console.log('='.repeat(80));
    
    try {
        // Get NFT transfers
        const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
        const nftResponse = await fetch(`${corsProxy}${encodeURIComponent(nftUrl)}`);
        
        if (nftResponse.ok) {
            const nftData = await nftResponse.json();
            const transfers = nftData.result || [];
            
            console.log('📊 NFT Transfers Found:', transfers.length);
            
            if (transfers.length > 0) {
                console.log('\n🖼️ All NFT Transfers:');
                transfers.forEach((transfer, index) => {
                    console.log(`  ${index + 1}. ${transfer.tokenName} (${transfer.tokenSymbol})`);
                    console.log(`     Token ID: ${transfer.tokenID}`);
                    console.log(`     Contract: ${transfer.contractAddress}`);
                    console.log(`     To: ${transfer.to}`);
                    console.log('');
                });
                
                // NEW LOGIC: Count only SoulBound NFTs (max 3)
                const soulboundTransfers = transfers.filter(transfer => {
                    const tokenName = transfer.tokenName?.toLowerCase() || '';
                    return tokenName.includes('soulbound');
                });
                
                const uniqueTokens = new Set();
                soulboundTransfers.forEach(transfer => {
                    if (transfer.to?.toLowerCase() === address.toLowerCase()) {
                        uniqueTokens.add(transfer.tokenID);
                    }
                });
                
                // Limit to maximum 3 NFTs
                const soundboundNFTs = Math.min(uniqueTokens.size, 3);
                
                console.log('🎯 NEW LOGIC:');
                console.log('='.repeat(50));
                console.log(`📊 Total SoulBound NFTs owned: ${uniqueTokens.size}`);
                console.log(`🎵 SoulBound NFTs (max 3): ${soundboundNFTs}`);
                console.log('✅ Only NFTs with "SoulBound" in name are counted');
                console.log('✅ Maximum limit: 3 NFTs');
                
                // Calculate score with new logic
                const balance = 0.685719; // Known balance
                const transactions = 46; // Known transaction count
                
                const baseScore = (balance * 100) + (transactions * 10) + (soundboundNFTs * 50);
                const multiplier = soundboundNFTs >= 3 ? 2.5 : soundboundNFTs >= 2 ? 2.0 : 1.0;
                const finalScore = baseScore * multiplier;
                
                console.log('\n🏆 Updated Score Calculation:');
                console.log(`  💰 Balance: ${balance.toFixed(6)} KITE → ${(balance * 100).toFixed(2)} points`);
                console.log(`  📋 Transactions: ${transactions} → ${(transactions * 10).toFixed(2)} points`);
                console.log(`  🎵 SoulBound NFTs: ${soundboundNFTs} → ${(soundboundNFTs * 50).toFixed(2)} points`);
                console.log(`  🏆 Base Score: ${baseScore.toFixed(2)}`);
                console.log(`  🔢 Multiplier: ${multiplier}x`);
                console.log(`  🏆 Final Score: ${finalScore.toFixed(2)}`);
                
                // Test with different NFT counts
                console.log('\n🧪 Testing Different NFT Scenarios:');
                console.log('-'.repeat(50));
                
                const testScenarios = [0, 1, 2, 3, 4, 5];
                testScenarios.forEach(nftCount => {
                    const limitedCount = Math.min(nftCount, 3);
                    const testBaseScore = (balance * 100) + (transactions * 10) + (limitedCount * 50);
                    const testMultiplier = limitedCount >= 3 ? 2.5 : limitedCount >= 2 ? 2.0 : 1.0;
                    const testFinalScore = testBaseScore * testMultiplier;
                    
                    console.log(`  ${nftCount} NFTs → ${limitedCount} counted → ${testMultiplier}x → ${testFinalScore.toFixed(2)} points`);
                });
                
            } else {
                console.log('📊 No NFT transfers found');
            }
        } else {
            console.log('❌ NFT API Error:', nftResponse.status, nftResponse.statusText);
        }
        
        console.log('\n' + '='.repeat(80));
        console.log('✅ UPDATED LOGIC SUMMARY:');
        console.log('='.repeat(80));
        console.log('✅ Only SoulBound NFTs are counted');
        console.log('✅ Maximum limit: 3 NFTs (even if user has more)');
        console.log('✅ Filter by name containing "SoulBound"');
        console.log('✅ Counts unique NFTs (not transfers)');
        console.log('🌐 Test at: http://localhost:8001');
        console.log('='.repeat(80));
        
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

// Run test
testAllNFTsAsSoulBound().catch(console.error);
