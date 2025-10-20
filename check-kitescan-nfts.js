/**
 * Check KiteScan NFTs and Tokens for specific wallet
 */

async function checkKiteScanNFTs() {
    const address = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    console.log('🔍 Checking KiteScan NFTs and Tokens');
    console.log('📍 Address:', address);
    console.log('🌐 KiteScan URL: https://testnet.kitescan.ai/address/' + address + '?tab=tokens_nfts');
    console.log('='.repeat(80));
    
    try {
        // 1. Check NFT Transfers
        console.log('\n🖼️ CHECKING NFT TRANSFERS:');
        console.log('-'.repeat(50));
        
        const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
        const nftResponse = await fetch(`${corsProxy}${encodeURIComponent(nftUrl)}`);
        
        if (nftResponse.ok) {
            const nftData = await nftResponse.json();
            console.log('📊 NFT API Response:');
            console.log('  Status:', nftData.status);
            console.log('  Message:', nftData.message);
            console.log('  Result Count:', nftData.result ? nftData.result.length : 0);
            
            if (nftData.result && nftData.result.length > 0) {
                console.log('\n🖼️ NFT Transfer Details:');
                nftData.result.forEach((tx, index) => {
                    const timestamp = new Date(parseInt(tx.timeStamp) * 1000);
                    console.log(`  ${index + 1}. ${tx.tokenName} (${tx.tokenSymbol})`);
                    console.log(`     Token ID: ${tx.tokenID}`);
                    console.log(`     Contract: ${tx.contractAddress}`);
                    console.log(`     From: ${tx.from}`);
                    console.log(`     To: ${tx.to}`);
                    console.log(`     Time: ${timestamp.toLocaleString()}`);
                    console.log('');
                });
                
                // Check for Soundbound NFTs
                const soundboundNfts = nftData.result.filter(tx => 
                    tx.tokenName && tx.tokenName.toLowerCase().includes('soundbound')
                );
                
                console.log('🎵 Soundbound NFTs found:', soundboundNfts.length);
                
                if (soundboundNfts.length > 0) {
                    console.log('\n🎵 Soundbound NFT Details:');
                    soundboundNfts.forEach((tx, index) => {
                        console.log(`  ${index + 1}. ${tx.tokenName} (${tx.tokenSymbol})`);
                        console.log(`     Token ID: ${tx.tokenID}`);
                        console.log(`     Contract: ${tx.contractAddress}`);
                    });
                }
            } else {
                console.log('📊 No NFT transfers found');
            }
        } else {
            console.log('❌ NFT API Error:', nftResponse.status, nftResponse.statusText);
        }
        
        // 2. Check Token Transfers
        console.log('\n🪙 CHECKING TOKEN TRANSFERS:');
        console.log('-'.repeat(50));
        
        const tokenUrl = `https://testnet.kitescan.ai/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
        const tokenResponse = await fetch(`${corsProxy}${encodeURIComponent(tokenUrl)}`);
        
        if (tokenResponse.ok) {
            const tokenData = await tokenResponse.json();
            console.log('📊 Token API Response:');
            console.log('  Status:', tokenData.status);
            console.log('  Message:', tokenData.message);
            console.log('  Result Count:', tokenData.result ? tokenData.result.length : 0);
            
            if (tokenData.result && tokenData.result.length > 0) {
                console.log('\n🪙 Token Transfer Details:');
                tokenData.result.forEach((tx, index) => {
                    const timestamp = new Date(parseInt(tx.timeStamp) * 1000);
                    const value = parseInt(tx.value) / Math.pow(10, parseInt(tx.tokenDecimal));
                    console.log(`  ${index + 1}. ${tx.tokenName} (${tx.tokenSymbol})`);
                    console.log(`     Amount: ${value.toFixed(6)} ${tx.tokenSymbol}`);
                    console.log(`     Contract: ${tx.contractAddress}`);
                    console.log(`     From: ${tx.from}`);
                    console.log(`     To: ${tx.to}`);
                    console.log(`     Time: ${timestamp.toLocaleString()}`);
                    console.log('');
                });
                
                // Check for Kite tokens
                const kiteTokens = tokenData.result.filter(tx => 
                    tx.tokenName && tx.tokenName.toLowerCase().includes('kite')
                );
                
                console.log('🪙 Kite Tokens found:', kiteTokens.length);
                
                if (kiteTokens.length > 0) {
                    console.log('\n🪙 Kite Token Details:');
                    kiteTokens.forEach((tx, index) => {
                        console.log(`  ${index + 1}. ${tx.tokenName} (${tx.tokenSymbol})`);
                        console.log(`     Contract: ${tx.contractAddress}`);
                    });
                }
            } else {
                console.log('📊 No token transfers found');
            }
        } else {
            console.log('❌ Token API Error:', tokenResponse.status, tokenResponse.statusText);
        }
        
        // 3. Summary
        console.log('\n' + '='.repeat(80));
        console.log('📊 SUMMARY:');
        console.log('='.repeat(80));
        console.log('🌐 KiteScan URL: https://testnet.kitescan.ai/address/' + address + '?tab=tokens_nfts');
        console.log('💡 This data should match what you see on KiteScan website');
        console.log('🎯 Use this data to verify app accuracy');
        console.log('='.repeat(80));
        
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

// Run the check
checkKiteScanNFTs().catch(console.error);
