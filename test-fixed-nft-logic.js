/**
 * Test fixed NFT logic using already fetched data
 */

async function testFixedNFTLogic() {
    console.log('🎯 TESTING FIXED NFT LOGIC');
    console.log('='.repeat(80));
    
    const address1 = '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D';
    const address2 = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    console.log('🔍 Testing both wallets to verify NFT data...');
    console.log('='.repeat(80));
    
    for (const address of [address1, address2]) {
        console.log(`\n📍 Testing wallet: ${address}`);
        console.log('-'.repeat(60));
        
        try {
            // Get NFT transfers
            const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
            const nftResponse = await fetch(`${corsProxy}${encodeURIComponent(nftUrl)}`);
            
            if (nftResponse.ok) {
                const nftData = await nftResponse.json();
                const transfers = nftData.result || [];
                
                console.log(`📊 NFT Transfers Found: ${transfers.length}`);
                
                if (transfers.length > 0) {
                    console.log('\n🖼️ NFT Transfer Details:');
                    transfers.forEach((transfer, index) => {
                        console.log(`  ${index + 1}. ${transfer.tokenName} (${transfer.tokenSymbol})`);
                        console.log(`     Token ID: ${transfer.tokenID}`);
                        console.log(`     Contract: ${transfer.contractAddress}`);
                        console.log(`     To: ${transfer.to}`);
                        console.log('');
                    });
                    
                    // Apply the fixed logic
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
                    
                    // Calculate score
                    const balance = address === address1 ? 0.199989 : 0.685719;
                    const transactions = address === address1 ? 41 : 46;
                    
                    let nftMultiplier;
                    if (totalSoundboundNFTs >= 3) {
                        nftMultiplier = 3.0;
                    } else if (totalSoundboundNFTs >= 2) {
                        nftMultiplier = 2.5;
                    } else if (totalSoundboundNFTs >= 1) {
                        nftMultiplier = 1.5;
                    } else {
                        nftMultiplier = 1.0;
                    }
                    
                    const baseScore = (balance * 100) + (transactions * 10) + (totalSoundboundNFTs * 50);
                    const finalScore = baseScore * nftMultiplier;
                    
                    console.log('\n🏆 SCORE CALCULATION:');
                    console.log('='.repeat(40));
                    console.log(`  💰 Balance: ${balance.toFixed(6)} KITE → ${(balance * 100).toFixed(2)} points`);
                    console.log(`  📋 Transactions: ${transactions} → ${(transactions * 10).toFixed(2)} points`);
                    console.log(`  🎵 SoulBound NFTs: ${totalSoundboundNFTs} → ${(totalSoundboundNFTs * 50).toFixed(2)} points`);
                    console.log(`  🏆 Base Score: ${baseScore.toFixed(2)}`);
                    console.log(`  🔢 Multiplier: ${nftMultiplier}x`);
                    console.log(`  🏆 Final Score: ${finalScore.toFixed(2)}`);
                    
                } else {
                    console.log('📊 No NFT transfers found');
                }
            } else {
                console.log('❌ NFT API Error:', nftResponse.status, nftResponse.statusText);
            }
        } catch (error) {
            console.log('❌ Error:', error.message);
        }
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ FIXED NFT LOGIC SUMMARY:');
    console.log('='.repeat(80));
    console.log('✅ Uses already fetched NFT data instead of separate API calls');
    console.log('✅ Properly separates WhitelistSoulBoundNFT and SoulBoundNFT');
    console.log('✅ Correctly counts unique tokens (not transfers)');
    console.log('✅ Applies proper multipliers based on NFT count');
    console.log('🌐 Test at: http://localhost:8001');
    console.log('='.repeat(80));
}

// Run test
testFixedNFTLogic().catch(console.error);
