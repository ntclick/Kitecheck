/**
 * Test WhitelistSoulBoundNFT priority logic (limited 10,000 supply)
 */

async function testWhitelistPriority() {
    console.log('🎯 TESTING WHITELIST SOULBOUND NFT PRIORITY');
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
                
                // NEW LOGIC: Separate WhitelistSoulBoundNFT and SoulBoundNFT
                const soulboundTransfers = transfers.filter(transfer => {
                    const tokenName = transfer.tokenName?.toLowerCase() || '';
                    return tokenName.includes('soulbound');
                });
                
                const whitelistTransfers = soulboundTransfers.filter(transfer => 
                    transfer.tokenName?.toLowerCase().includes('whitelist')
                );
                const regularSoulboundTransfers = soulboundTransfers.filter(transfer => 
                    !transfer.tokenName?.toLowerCase().includes('whitelist')
                );
                
                console.log('🎯 WHITELIST PRIORITY ANALYSIS:');
                console.log('='.repeat(50));
                console.log(`📊 Total SoulBound transfers: ${soulboundTransfers.length}`);
                console.log(`🏆 WhitelistSoulBoundNFT transfers: ${whitelistTransfers.length}`);
                console.log(`📱 Regular SoulBoundNFT transfers: ${regularSoulboundTransfers.length}`);
                
                if (whitelistTransfers.length > 0) {
                    console.log('\n🏆 WhitelistSoulBoundNFT Details (Limited 10,000):');
                    whitelistTransfers.forEach((transfer, index) => {
                        console.log(`  ${index + 1}. ${transfer.tokenName} (${transfer.tokenSymbol})`);
                        console.log(`     Token ID: ${transfer.tokenID}`);
                        console.log(`     Contract: ${transfer.contractAddress}`);
                    });
                }
                
                if (regularSoulboundTransfers.length > 0) {
                    console.log('\n📱 Regular SoulBoundNFT Details:');
                    regularSoulboundTransfers.forEach((transfer, index) => {
                        console.log(`  ${index + 1}. ${transfer.tokenName} (${transfer.tokenSymbol})`);
                        console.log(`     Token ID: ${transfer.tokenID}`);
                        console.log(`     Contract: ${transfer.contractAddress}`);
                    });
                }
                
                // Count unique tokens
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
                
                // Calculate weighted score
                const whitelistCount = Math.min(uniqueWhitelistTokens.size, 2); // Max 2 whitelist
                const regularCount = Math.min(uniqueRegularTokens.size, 1); // Max 1 regular
                const totalSoundboundNFTs = whitelistCount + regularCount; // Total max 3
                
                console.log('\n🎯 FINAL COUNT WITH PRIORITY:');
                console.log('='.repeat(50));
                console.log(`🏆 WhitelistSoulBoundNFT owned: ${uniqueWhitelistTokens.size} → ${whitelistCount} counted`);
                console.log(`📱 Regular SoulBoundNFT owned: ${uniqueRegularTokens.size} → ${regularCount} counted`);
                console.log(`🎵 Total SoulBound NFTs: ${totalSoundboundNFTs}`);
                console.log('✅ WhitelistSoulBoundNFT gets priority (limited 10,000 supply)');
                
                // Calculate score with new multipliers
                const balance = 0.685719;
                const transactions = 46;
                
                let nftMultiplier;
                if (totalSoundboundNFTs >= 3) {
                    nftMultiplier = 3.0; // 3.0x for 3 NFTs (2 Whitelist + 1 Regular)
                } else if (totalSoundboundNFTs >= 2) {
                    nftMultiplier = 2.5; // 2.5x for 2 NFTs (Whitelist priority)
                } else if (totalSoundboundNFTs >= 1) {
                    nftMultiplier = 1.5; // 1.5x for 1 NFT
                } else {
                    nftMultiplier = 1.0; // No multiplier
                }
                
                const baseScore = (balance * 100) + (transactions * 10) + (totalSoundboundNFTs * 50);
                const finalScore = baseScore * nftMultiplier;
                
                console.log('\n🏆 UPDATED SCORE CALCULATION:');
                console.log('='.repeat(50));
                console.log(`  💰 Balance: ${balance.toFixed(6)} KITE → ${(balance * 100).toFixed(2)} points`);
                console.log(`  📋 Transactions: ${transactions} → ${(transactions * 10).toFixed(2)} points`);
                console.log(`  🎵 SoulBound NFTs: ${totalSoundboundNFTs} → ${(totalSoundboundNFTs * 50).toFixed(2)} points`);
                console.log(`  🏆 Base Score: ${baseScore.toFixed(2)}`);
                console.log(`  🔢 Multiplier: ${nftMultiplier}x (WhitelistSoulBoundNFT priority)`);
                console.log(`  🏆 Final Score: ${finalScore.toFixed(2)}`);
                
                console.log('\n✅ EXPECTED RESULT IN APP:');
                console.log('='.repeat(50));
                console.log(`🎵 Soundbound NFTs: ${totalSoundboundNFTs}`);
                console.log(`🔢 Multiplier: ${nftMultiplier}x`);
                console.log(`🏆 Final Score: ${finalScore.toFixed(2)}`);
                
                // Test different scenarios
                console.log('\n🧪 Testing Different Scenarios:');
                console.log('-'.repeat(50));
                const scenarios = [
                    { whitelist: 0, regular: 0, expected: '1.0x' },
                    { whitelist: 1, regular: 0, expected: '1.5x' },
                    { whitelist: 2, regular: 0, expected: '2.5x' },
                    { whitelist: 2, regular: 1, expected: '3.0x' },
                ];
                
                scenarios.forEach((scenario, index) => {
                    const total = Math.min(scenario.whitelist, 2) + Math.min(scenario.regular, 1);
                    let multiplier;
                    if (total >= 3) multiplier = 3.0;
                    else if (total >= 2) multiplier = 2.5;
                    else if (total >= 1) multiplier = 1.5;
                    else multiplier = 1.0;
                    
                    console.log(`  ${index + 1}. ${scenario.whitelist} Whitelist + ${scenario.regular} Regular → ${total} total → ${multiplier}x (expected: ${scenario.expected})`);
                });
                
            } else {
                console.log('📊 No NFT transfers found');
            }
        } else {
            console.log('❌ NFT API Error:', nftResponse.status, nftResponse.statusText);
        }
        
        console.log('\n' + '='.repeat(80));
        console.log('✅ WHITELIST PRIORITY LOGIC SUMMARY:');
        console.log('='.repeat(80));
        console.log('✅ WhitelistSoulBoundNFT: Limited 10,000 supply (higher priority)');
        console.log('✅ SoulBoundNFT: Regular supply (lower priority)');
        console.log('✅ Max 2 Whitelist + 1 Regular = 3 total');
        console.log('✅ Higher multipliers for WhitelistSoulBoundNFT');
        console.log('🌐 Test at: http://localhost:8001');
        console.log('='.repeat(80));
        
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

// Run test
testWhitelistPriority().catch(console.error);
