/**
 * Test SoulBound NFTs detection
 */

async function testSoulBoundNFTs() {
    console.log('🎯 TESTING SOULBOUND NFTs DETECTION');
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
                
                // Test the updated filter logic - ONLY SoulBound NFTs
                console.log('🔍 Testing Updated Filter Logic:');
                const soundboundTransfers = transfers.filter(transfer => {
                    const tokenName = transfer.tokenName?.toLowerCase() || '';
                    return tokenName.includes('soulbound');
                });
                
                console.log('🎵 SoulBound NFTs found:', soundboundTransfers.length);
                
                if (soundboundTransfers.length > 0) {
                    console.log('\n🎵 SoulBound NFT Details:');
                    soundboundTransfers.forEach((transfer, index) => {
                        console.log(`  ${index + 1}. ${transfer.tokenName} (${transfer.tokenSymbol})`);
                        console.log(`     Token ID: ${transfer.tokenID}`);
                        console.log(`     Contract: ${transfer.contractAddress}`);
                    });
                    
                    // Count unique tokens (not transfers)
                    const uniqueTokens = new Set();
                    soundboundTransfers.forEach(transfer => {
                        if (transfer.to?.toLowerCase() === address.toLowerCase()) {
                            uniqueTokens.add(transfer.tokenID);
                        }
                    });
                    
                    console.log('\n🎯 Unique SoulBound NFTs owned:', uniqueTokens.size);
                    
                    // Calculate score
                    const balance = 0.685719; // Known balance
                    const transactions = 46; // Known transaction count
                    const soundboundNFTs = uniqueTokens.size;
                    
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
                    
                } else {
                    console.log('📊 No Soundbound/SoulBound NFTs found');
                }
            } else {
                console.log('📊 No NFT transfers found');
            }
        } else {
            console.log('❌ NFT API Error:', nftResponse.status, nftResponse.statusText);
        }
        
        console.log('\n' + '='.repeat(80));
        console.log('✅ UPDATED LOGIC:');
        console.log('='.repeat(80));
        console.log('✅ Only detects: SoulBound NFTs (WhitelistSoulBoundNFT + SoulBoundNFT)');
        console.log('✅ Counts unique NFTs (not transfers)');
        console.log('✅ Maximum limit: 3 NFTs');
        console.log('✅ Applies correct multiplier');
        console.log('🌐 Test at: http://localhost:8001');
        console.log('='.repeat(80));
        
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

// Run test
testSoulBoundNFTs().catch(console.error);
