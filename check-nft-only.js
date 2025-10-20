/**
 * Check NFT Soundbound specifically - Remove Kite Tokens
 */

async function checkNFTOnly() {
    console.log('🔍 CHECKING NFT SOUNDBOUND ONLY (No Kite Tokens)');
    console.log('='.repeat(80));
    
    const testWallets = [
        {
            address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
            name: 'Wallet 1'
        },
        {
            address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            name: 'Wallet 2'
        }
    ];
    
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    for (const wallet of testWallets) {
        console.log(`\n🔍 Checking ${wallet.name}: ${wallet.address}`);
        console.log('-'.repeat(60));
        
        try {
            // 1. Get Balance
            const balanceUrl = `https://testnet.kitescan.ai/api?module=account&action=balance&address=${wallet.address}&tag=latest`;
            const balanceResponse = await fetch(`${corsProxy}${encodeURIComponent(balanceUrl)}`);
            
            if (balanceResponse.ok) {
                const balanceData = await balanceResponse.json();
                const balanceInWei = balanceData.result || '0';
                const balance = balanceInWei.startsWith('0x') 
                    ? parseInt(balanceInWei, 16) / Math.pow(10, 18)
                    : parseInt(balanceInWei) / Math.pow(10, 18);
                
                console.log('💰 Balance:', balance.toFixed(6), 'KITE');
            }
            
            // 2. Get Transactions
            const txUrl = `https://testnet.kitescan.ai/api?module=account&action=txlist&address=${wallet.address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
            const txResponse = await fetch(`${corsProxy}${encodeURIComponent(txUrl)}`);
            
            if (txResponse.ok) {
                const txData = await txResponse.json();
                const txCount = txData.result ? txData.result.length : 0;
                console.log('📋 Transactions:', txCount);
            }
            
            // 3. Get NFT Transfers (Soundbound NFTs)
            console.log('\n🖼️ Checking NFT Transfers...');
            const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${wallet.address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
            const nftResponse = await fetch(`${corsProxy}${encodeURIComponent(nftUrl)}`);
            
            if (nftResponse.ok) {
                const nftData = await nftResponse.json();
                console.log('📊 NFT API Status:', nftData.status === '1' ? 'SUCCESS' : 'NO DATA');
                console.log('📊 NFT API Message:', nftData.message);
                console.log('📊 Total NFT Transfers:', nftData.result ? nftData.result.length : 0);
                
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
                    
                    // Check for SoulBound NFTs specifically
                    const soundboundNfts = nftData.result.filter(tx => 
                        tx.tokenName && tx.tokenName.toLowerCase().includes('soulbound')
                    );
                    
                    console.log('🎵 Soundbound NFTs found:', soundboundNfts.length);
                    
                    if (soundboundNfts.length > 0) {
                        console.log('\n🎵 Soundbound NFT Details:');
                        soundboundNfts.forEach((tx, index) => {
                            const timestamp = new Date(parseInt(tx.timeStamp) * 1000);
                            console.log(`  ${index + 1}. ${tx.tokenName} (${tx.tokenSymbol})`);
                            console.log(`     Token ID: ${tx.tokenID}`);
                            console.log(`     Contract: ${tx.contractAddress}`);
                            console.log(`     Time: ${timestamp.toLocaleString()}`);
                        });
                    } else {
                        console.log('📊 No Soundbound NFTs found');
                    }
                } else {
                    console.log('📊 No NFT transfers found');
                }
            } else {
                console.log('❌ NFT API Error:', nftResponse.status, nftResponse.statusText);
            }
            
            // 4. Get Token Transfers (but ignore Kite tokens)
            console.log('\n🪙 Checking Token Transfers (excluding Kite tokens)...');
            const tokenUrl = `https://testnet.kitescan.ai/api?module=account&action=tokentx&address=${wallet.address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
            const tokenResponse = await fetch(`${corsProxy}${encodeURIComponent(tokenUrl)}`);
            
            if (tokenResponse.ok) {
                const tokenData = await tokenResponse.json();
                console.log('📊 Token API Status:', tokenData.status === '1' ? 'SUCCESS' : 'NO DATA');
                console.log('📊 Total Token Transfers:', tokenData.result ? tokenData.result.length : 0);
                
                if (tokenData.result && tokenData.result.length > 0) {
                    // Filter out Kite tokens
                    const nonKiteTokens = tokenData.result.filter(tx => 
                        !tx.tokenName || !tx.tokenName.toLowerCase().includes('kite')
                    );
                    
                    console.log('🪙 Non-Kite Token Transfers:', nonKiteTokens.length);
                    
                    if (nonKiteTokens.length > 0) {
                        console.log('\n🪙 Non-Kite Token Details:');
                        nonKiteTokens.slice(0, 3).forEach((tx, index) => {
                            const timestamp = new Date(parseInt(tx.timeStamp) * 1000);
                            const value = parseInt(tx.value) / Math.pow(10, parseInt(tx.tokenDecimal));
                            console.log(`  ${index + 1}. ${tx.tokenName} (${tx.tokenSymbol})`);
                            console.log(`     Amount: ${value.toFixed(6)} ${tx.tokenSymbol}`);
                            console.log(`     Contract: ${tx.contractAddress}`);
                            console.log(`     Time: ${timestamp.toLocaleString()}`);
                        });
                    }
                } else {
                    console.log('📊 No token transfers found');
                }
            } else {
                console.log('❌ Token API Error:', tokenResponse.status, tokenResponse.statusText);
            }
            
        } catch (error) {
            console.log(`❌ Error checking ${wallet.name}:`, error.message);
        }
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('🎯 UPDATED RANKING CRITERIA:');
    console.log('='.repeat(80));
    console.log('✅ Balance: KITE token balance');
    console.log('✅ Transactions: Transaction count');
    console.log('✅ Soundbound NFTs: NFT transfers (with multiplier)');
    console.log('❌ Kite Tokens: REMOVED from ranking');
    console.log('='.repeat(80));
}

// Run the check
checkNFTOnly().catch(console.error);
