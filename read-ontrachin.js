/**
 * Script to read data from KiteScan (on-chain data) for wallet 0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D
 */

async function readOnChainData() {
    const address = '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D';
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    console.log('🔍 Reading ON-CHAIN data from KiteScan...');
    console.log('📍 Address:', address);
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
                const balanceInWei = parseInt(data.result, 16);
                const balanceInEther = balanceInWei / Math.pow(10, 18);
                console.log('💎 Balance (hex):', data.result);
                console.log('💎 Balance (wei):', balanceInWei.toLocaleString());
                console.log('💎 Balance (KITE):', balanceInEther.toFixed(6));
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
        const txUrl = `https://testnet.kitescan.ai/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=20&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(txUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Status:', data.status === '1' ? 'SUCCESS' : 'FAILED');
            console.log('📊 Message:', data.message);
            console.log('📊 Total Transactions:', data.result ? data.result.length : 0);
            
            if (data.result && data.result.length > 0) {
                console.log('\n📋 Recent Transactions:');
                data.result.forEach((tx, index) => {
                    const timestamp = new Date(parseInt(tx.timeStamp) * 1000);
                    const valueInEther = parseInt(tx.value) / Math.pow(10, 18);
                    
                    console.log(`\n  ${index + 1}. Transaction #${tx.transactionIndex}`);
                    console.log(`     Hash: ${tx.hash}`);
                    console.log(`     Block: ${tx.blockNumber}`);
                    console.log(`     From: ${tx.from}`);
                    console.log(`     To: ${tx.to}`);
                    console.log(`     Value: ${valueInEther.toFixed(6)} KITE`);
                    console.log(`     Gas Used: ${tx.gasUsed}`);
                    console.log(`     Gas Price: ${tx.gasPrice} wei`);
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
                data.result.forEach((tx, index) => {
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
                data.result.forEach((tx, index) => {
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
    
    // 5. Account Info Summary
    console.log('\n📊 ACCOUNT SUMMARY');
    console.log('-'.repeat(50));
    try {
        // Get nonce (transaction count)
        const nonceUrl = `https://testnet.kitescan.ai/api?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest`;
        const nonceResponse = await fetch(`${corsProxy}${encodeURIComponent(nonceUrl)}`);
        
        if (nonceResponse.ok) {
            const nonceData = await nonceResponse.json();
            if (nonceData.result) {
                const nonce = parseInt(nonceData.result, 16);
                console.log('🔢 Nonce (Transaction Count):', nonce);
            }
        }
        
        // Get code (is contract?)
        const codeUrl = `https://testnet.kitescan.ai/api?module=proxy&action=eth_getCode&address=${address}&tag=latest`;
        const codeResponse = await fetch(`${corsProxy}${encodeURIComponent(codeUrl)}`);
        
        if (codeResponse.ok) {
            const codeData = await codeResponse.json();
            if (codeData.result) {
                const isContract = codeData.result !== '0x';
                console.log('📄 Account Type:', isContract ? 'Contract' : 'EOA (Externally Owned Account)');
            }
        }
        
    } catch (error) {
        console.log('❌ Error getting account info:', error.message);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('🏁 ON-CHAIN DATA READING COMPLETED');
    console.log('🌐 View on KiteScan: https://testnet.kitescan.ai/address/' + address);
    console.log('='.repeat(80));
}

// Run the script
console.log('🚀 Starting on-chain data reading...\n');
readOnChainData().catch(console.error);
