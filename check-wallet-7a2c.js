/**
 * Check wallet 0x7a2C109ceabF0818F461278f57234Dd2440a41DB
 */

async function checkWallet7a2c() {
    const address = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    console.log('🔍 Checking wallet:', address);
    console.log('🌐 KiteScan URL: https://testnet.kitescan.ai/address/' + address);
    console.log('='.repeat(80));
    
    // 1. Account Balance
    console.log('\n💰 ACCOUNT BALANCE');
    console.log('-'.repeat(50));
    try {
        const balanceUrl = `https://testnet.kitescan.ai/api?module=account&action=balance&address=${address}&tag=latest`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(balanceUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Status:', data.status === '1' ? 'SUCCESS' : 'FAILED');
            console.log('📊 Message:', data.message);
            
            if (data.result) {
                const balanceInWei = data.result;
                const balanceInEther = parseInt(balanceInWei) / Math.pow(10, 18);
                console.log('💎 Balance (raw):', balanceInWei);
                console.log('💎 Balance (wei):', parseInt(balanceInWei).toLocaleString());
                console.log('💎 Balance (KITE):', balanceInEther.toFixed(8));
            }
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    // 2. Transaction History
    console.log('\n📋 TRANSACTION HISTORY');
    console.log('-'.repeat(50));
    try {
        const txUrl = `https://testnet.kitescan.ai/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(txUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Status:', data.status === '1' ? 'SUCCESS' : 'FAILED');
            console.log('📊 Message:', data.message);
            console.log('📊 Total Transactions:', data.result ? data.result.length : 0);
            
            if (data.result && data.result.length > 0) {
                // Calculate total gas used
                const totalGasUsed = data.result.reduce((sum, tx) => sum + parseInt(tx.gasUsed || 0), 0);
                console.log('⛽ Total Gas Used:', totalGasUsed.toLocaleString());
                
                console.log('\n📋 Recent Transactions:');
                data.result.slice(0, 5).forEach((tx, index) => {
                    const timestamp = new Date(parseInt(tx.timeStamp) * 1000);
                    const valueInEther = parseInt(tx.value) / Math.pow(10, 18);
                    
                    console.log(`\n  ${index + 1}. Transaction #${tx.transactionIndex}`);
                    console.log(`     Hash: ${tx.hash}`);
                    console.log(`     Block: ${tx.blockNumber}`);
                    console.log(`     From: ${tx.from}`);
                    console.log(`     To: ${tx.to}`);
                    console.log(`     Value: ${valueInEther.toFixed(6)} KITE`);
                    console.log(`     Gas Used: ${tx.gasUsed}`);
                    console.log(`     Time: ${timestamp.toLocaleString()}`);
                    console.log(`     Status: ${tx.isError === '0' ? '✅ Success' : '❌ Failed'}`);
                });
            }
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    // 3. Token Transfers
    console.log('\n🪙 TOKEN TRANSFERS');
    console.log('-'.repeat(50));
    try {
        const tokenUrl = `https://testnet.kitescan.ai/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(tokenUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Status:', data.status === '1' ? 'SUCCESS' : 'NO DATA');
            console.log('📊 Message:', data.message);
            console.log('📊 Token Transfers:', data.result ? data.result.length : 0);
            
            if (data.result && data.result.length > 0) {
                console.log('\n🪙 Token Transfer Details:');
                data.result.slice(0, 5).forEach((tx, index) => {
                    const timestamp = new Date(parseInt(tx.timeStamp) * 1000);
                    const value = parseInt(tx.value) / Math.pow(10, parseInt(tx.tokenDecimal));
                    
                    console.log(`\n  ${index + 1}. ${tx.tokenName} (${tx.tokenSymbol})`);
                    console.log(`     Contract: ${tx.contractAddress}`);
                    console.log(`     Amount: ${value.toFixed(6)} ${tx.tokenSymbol}`);
                    console.log(`     From: ${tx.from}`);
                    console.log(`     To: ${tx.to}`);
                    console.log(`     Hash: ${tx.hash}`);
                    console.log(`     Time: ${timestamp.toLocaleString()}`);
                });
            } else {
                console.log('📊 No token transfers found');
            }
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    // 4. NFT Transfers
    console.log('\n🖼️ NFT TRANSFERS');
    console.log('-'.repeat(50));
    try {
        const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(nftUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Status:', data.status === '1' ? 'SUCCESS' : 'NO DATA');
            console.log('📊 Message:', data.message);
            console.log('📊 NFT Transfers:', data.result ? data.result.length : 0);
            
            if (data.result && data.result.length > 0) {
                console.log('\n🖼️ NFT Transfer Details:');
                data.result.slice(0, 5).forEach((tx, index) => {
                    const timestamp = new Date(parseInt(tx.timeStamp) * 1000);
                    
                    console.log(`\n  ${index + 1}. ${tx.tokenName} (${tx.tokenSymbol})`);
                    console.log(`     Contract: ${tx.contractAddress}`);
                    console.log(`     Token ID: ${tx.tokenID}`);
                    console.log(`     From: ${tx.from}`);
                    console.log(`     To: ${tx.to}`);
                    console.log(`     Hash: ${tx.hash}`);
                    console.log(`     Time: ${timestamp.toLocaleString()}`);
                });
            } else {
                console.log('📊 No NFT transfers found');
            }
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    // 5. Check for Soundbound NFTs specifically
    console.log('\n🎵 SOUNDBOUND NFT CHECK');
    console.log('-'.repeat(50));
    try {
        const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(nftUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            
            if (data.result && data.result.length > 0) {
                // Filter for Soundbound NFTs
                const soundboundNfts = data.result.filter(tx => 
                    tx.tokenName && tx.tokenName.toLowerCase().includes('soundbound')
                );
                
                console.log('🎵 Soundbound NFTs found:', soundboundNfts.length);
                
                if (soundboundNfts.length > 0) {
                    console.log('\n🎵 Soundbound NFT Details:');
                    soundboundNfts.forEach((tx, index) => {
                        const timestamp = new Date(parseInt(tx.timeStamp) * 1000);
                        console.log(`\n  ${index + 1}. ${tx.tokenName} (${tx.tokenSymbol})`);
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
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('🏁 WALLET CHECK COMPLETED');
    console.log('🌐 View on KiteScan: https://testnet.kitescan.ai/address/' + address);
    console.log('='.repeat(80));
}

// Run the check
console.log('🚀 Starting wallet check...\n');
checkWallet7a2c().catch(console.error);
