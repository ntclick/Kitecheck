/**
 * Test script to check KiteScan API endpoints
 */

async function testKiteScanAPI() {
    const address = '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D';
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    console.log('🔍 Testing KiteScan API endpoints...');
    console.log('Address:', address);
    console.log('---');
    
    // Test 1: Transaction List
    try {
        console.log('📝 Testing transaction list...');
        const txUrl = `https://testnet.kitescan.ai/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(txUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Transaction API Response:');
            console.log('- Status:', data.status);
            console.log('- Message:', data.message);
            console.log('- Result count:', data.result ? data.result.length : 0);
            if (data.result && data.result.length > 0) {
                console.log('- First transaction:', data.result[0]);
            }
        } else {
            console.log('❌ Transaction API failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Transaction API error:', error.message);
    }
    
    console.log('---');
    
    // Test 2: Token Transfers
    try {
        console.log('🪙 Testing token transfers...');
        const tokenUrl = `https://testnet.kitescan.ai/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(tokenUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Token API Response:');
            console.log('- Status:', data.status);
            console.log('- Message:', data.message);
            console.log('- Result count:', data.result ? data.result.length : 0);
            if (data.result && data.result.length > 0) {
                console.log('- First token transfer:', data.result[0]);
            }
        } else {
            console.log('❌ Token API failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Token API error:', error.message);
    }
    
    console.log('---');
    
    // Test 3: NFT Transfers
    try {
        console.log('🖼️ Testing NFT transfers...');
        const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(nftUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ NFT API Response:');
            console.log('- Status:', data.status);
            console.log('- Message:', data.message);
            console.log('- Result count:', data.result ? data.result.length : 0);
            if (data.result && data.result.length > 0) {
                console.log('- First NFT transfer:', data.result[0]);
            }
        } else {
            console.log('❌ NFT API failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ NFT API error:', error.message);
    }
    
    console.log('---');
    
    // Test 4: Account Balance
    try {
        console.log('💰 Testing account balance...');
        const balanceUrl = `https://testnet.kitescan.ai/api?module=account&action=balance&address=${address}&tag=latest`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(balanceUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Balance API Response:');
            console.log('- Status:', data.status);
            console.log('- Message:', data.message);
            console.log('- Result:', data.result);
            if (data.result) {
                const balanceInWei = parseInt(data.result, 16);
                const balanceInEther = balanceInWei / Math.pow(10, 18);
                console.log('- Balance in wei:', balanceInWei);
                console.log('- Balance in ether:', balanceInEther);
            }
        } else {
            console.log('❌ Balance API failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Balance API error:', error.message);
    }
    
    console.log('---');
    console.log('🏁 Test completed!');
}

// Run the test
testKiteScanAPI().catch(console.error);
