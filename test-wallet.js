/**
 * Test script for specific wallet: 0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D
 */

async function testWallet() {
    const address = '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D';
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    console.log('🔍 Testing Wallet:', address);
    console.log('🌐 KiteScan URL: https://testnet.kitescan.ai/address/' + address);
    console.log('='.repeat(80));
    
    // Test 1: Account Balance
    console.log('\n💰 1. ACCOUNT BALANCE');
    console.log('-'.repeat(40));
    try {
        const balanceUrl = `https://testnet.kitescan.ai/api?module=account&action=balance&address=${address}&tag=latest`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(balanceUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Status:', data.status === '1' ? 'SUCCESS' : 'FAILED');
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
    
    // Test 2: Transaction Count (Nonce)
    console.log('\n📝 2. TRANSACTION COUNT (NONCE)');
    console.log('-'.repeat(40));
    try {
        const nonceUrl = `https://testnet.kitescan.ai/api?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(nonceUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Status:', data.result ? 'SUCCESS' : 'FAILED');
            
            if (data.result) {
                const nonce = parseInt(data.result, 16);
                console.log('🔢 Nonce (hex):', data.result);
                console.log('🔢 Nonce (decimal):', nonce);
                console.log('📊 Transaction Count:', nonce, 'transactions sent');
            }
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    // Test 3: Token Transfers
    console.log('\n🪙 3. TOKEN TRANSFERS');
    console.log('-'.repeat(40));
    try {
        const tokenUrl = `https://testnet.kitescan.ai/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(tokenUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Status:', data.status === '1' ? 'SUCCESS' : 'NO DATA');
            console.log('📊 Message:', data.message);
            console.log('📊 Result Count:', data.result ? data.result.length : 0);
            
            if (data.result && data.result.length > 0) {
                console.log('\n🪙 Token Transfers Found:');
                data.result.slice(0, 5).forEach((tx, index) => {
                    console.log(`  ${index + 1}. ${tx.tokenName} (${tx.tokenSymbol})`);
                    console.log(`     Amount: ${tx.value} ${tx.tokenSymbol}`);
                    console.log(`     From: ${tx.from}`);
                    console.log(`     To: ${tx.to}`);
                    console.log(`     Hash: ${tx.hash}`);
                    console.log('');
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
    
    // Test 4: NFT Transfers
    console.log('\n🖼️ 4. NFT TRANSFERS');
    console.log('-'.repeat(40));
    try {
        const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(nftUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Status:', data.status === '1' ? 'SUCCESS' : 'NO DATA');
            console.log('📊 Message:', data.message);
            console.log('📊 Result Count:', data.result ? data.result.length : 0);
            
            if (data.result && data.result.length > 0) {
                console.log('\n🖼️ NFT Transfers Found:');
                data.result.slice(0, 5).forEach((tx, index) => {
                    console.log(`  ${index + 1}. ${tx.tokenName} (${tx.tokenSymbol})`);
                    console.log(`     Token ID: ${tx.tokenID}`);
                    console.log(`     From: ${tx.from}`);
                    console.log(`     To: ${tx.to}`);
                    console.log(`     Hash: ${tx.hash}`);
                    console.log('');
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
    
    // Test 5: Try Transaction List (might fail)
    console.log('\n📋 5. TRANSACTION LIST (MIGHT FAIL)');
    console.log('-'.repeat(40));
    try {
        const txUrl = `https://testnet.kitescan.ai/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(txUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Status:', data.status === '1' ? 'SUCCESS' : 'FAILED');
            console.log('📊 Message:', data.message);
            console.log('📊 Result Count:', data.result ? data.result.length : 0);
            
            if (data.result && data.result.length > 0) {
                console.log('\n📋 Recent Transactions:');
                data.result.slice(0, 3).forEach((tx, index) => {
                    console.log(`  ${index + 1}. Hash: ${tx.hash}`);
                    console.log(`     From: ${tx.from}`);
                    console.log(`     To: ${tx.to}`);
                    console.log(`     Value: ${tx.value} wei`);
                    console.log(`     Time: ${new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}`);
                    console.log('');
                });
            }
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
            console.log('💡 This endpoint often fails with 500 error');
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('📊 SUMMARY FOR WALLET:', address);
    console.log('='.repeat(80));
    console.log('🌐 View on KiteScan: https://testnet.kitescan.ai/address/' + address);
    console.log('💡 Note: Transaction list API often fails, but balance and nonce work');
    console.log('🏁 Test completed!');
}

// Run the test
console.log('🚀 Starting wallet test...\n');
testWallet().catch(console.error);
