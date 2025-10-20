/**
 * Verify correct data from KiteScan for wallet 0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D
 */

async function verifyKiteScanData() {
    const address = '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D';
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    console.log('🔍 Verifying CORRECT data from KiteScan...');
    console.log('📍 Address:', address);
    console.log('🌐 KiteScan URL: https://testnet.kitescan.ai/address/' + address);
    console.log('='.repeat(80));
    
    // Expected data from user:
    console.log('\n📊 EXPECTED DATA (from user):');
    console.log('-'.repeat(50));
    console.log('💰 Balance: 0.19998918 KITE');
    console.log('📋 Transactions: 41');
    console.log('🪙 Token transfers: 0');
    console.log('🪙 Tokens: 0');
    console.log('⚡ Internal txns: 0');
    console.log('🔧 Widgets: 10');
    console.log('⛽ Gas used: 10,817,351');
    console.log('🔄 Last balance update: 16823741');
    
    // 1. Check Balance
    console.log('\n💰 CHECKING BALANCE...');
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
                console.log('💎 Balance (KITE):', balanceInEther.toFixed(8));
                console.log('🎯 Expected: 0.19998918 KITE');
                console.log('✅ Match:', Math.abs(balanceInEther - 0.19998918) < 0.00000001 ? 'YES' : 'NO');
            }
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    // 2. Check Transaction Count
    console.log('\n📋 CHECKING TRANSACTION COUNT...');
    console.log('-'.repeat(50));
    try {
        const txUrl = `https://testnet.kitescan.ai/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(txUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Status:', data.status === '1' ? 'SUCCESS' : 'FAILED');
            console.log('📊 Message:', data.message);
            console.log('📊 Total Transactions:', data.result ? data.result.length : 0);
            console.log('🎯 Expected: 41 transactions');
            console.log('✅ Match:', data.result && data.result.length === 41 ? 'YES' : 'NO');
            
            if (data.result && data.result.length > 0) {
                // Calculate total gas used
                const totalGasUsed = data.result.reduce((sum, tx) => sum + parseInt(tx.gasUsed || 0), 0);
                console.log('⛽ Total Gas Used:', totalGasUsed.toLocaleString());
                console.log('🎯 Expected: 10,817,351');
                console.log('✅ Gas Match:', totalGasUsed === 10817351 ? 'YES' : 'NO');
            }
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    // 3. Check Token Transfers
    console.log('\n🪙 CHECKING TOKEN TRANSFERS...');
    console.log('-'.repeat(50));
    try {
        const tokenUrl = `https://testnet.kitescan.ai/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(tokenUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Status:', data.status === '1' ? 'SUCCESS' : 'NO DATA');
            console.log('📊 Message:', data.message);
            console.log('📊 Token Transfers:', data.result ? data.result.length : 0);
            console.log('🎯 Expected: 0 token transfers');
            console.log('✅ Match:', (!data.result || data.result.length === 0) ? 'YES' : 'NO');
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    // 4. Check NFT Transfers
    console.log('\n🖼️ CHECKING NFT TRANSFERS...');
    console.log('-'.repeat(50));
    try {
        const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(nftUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Status:', data.status === '1' ? 'SUCCESS' : 'NO DATA');
            console.log('📊 Message:', data.message);
            console.log('📊 NFT Transfers:', data.result ? data.result.length : 0);
            console.log('🎯 Expected: 0 NFT transfers');
            console.log('✅ Match:', (!data.result || data.result.length === 0) ? 'YES' : 'NO');
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    // 5. Check Internal Transactions
    console.log('\n⚡ CHECKING INTERNAL TRANSACTIONS...');
    console.log('-'.repeat(50));
    try {
        const internalUrl = `https://testnet.kitescan.ai/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(internalUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ API Status:', data.status === '1' ? 'SUCCESS' : 'NO DATA');
            console.log('📊 Message:', data.message);
            console.log('📊 Internal Transactions:', data.result ? data.result.length : 0);
            console.log('🎯 Expected: 0 internal transactions');
            console.log('✅ Match:', (!data.result || data.result.length === 0) ? 'YES' : 'NO');
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('🏁 VERIFICATION COMPLETED');
    console.log('🌐 View on KiteScan: https://testnet.kitescan.ai/address/' + address);
    console.log('='.repeat(80));
}

// Run the verification
console.log('🚀 Starting KiteScan data verification...\n');
verifyKiteScanData().catch(console.error);
