/**
 * Test ETH RPC Methods
 */

function testEthRpcMethods() {
    console.log('🔧 TESTING ETH RPC METHODS');
    console.log('='.repeat(80));
    
    // Test data
    const testAddress = '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D';
    
    // Create a simple test class
    class EthRpcTester {
        constructor() {
            this.baseURL = 'https://testnet.kitescan.ai';
        }
        
        async makeEthRpcRequest(method, params = []) {
            const url = `${this.baseURL}/api/eth-rpc`;
            const payload = {
                jsonrpc: '2.0',
                method: method,
                params: params,
                id: 1
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error.message);
                }

                return data.result;
            } catch (error) {
                console.error(`ETH RPC ${method} failed:`, error);
                throw error;
            }
        }
        
        async testBalance(address) {
            try {
                console.log('💰 Testing eth_getBalance...');
                const balance = await this.makeEthRpcRequest('eth_getBalance', [address, 'latest']);
                console.log('✅ Balance result:', balance);
                
                // Parse balance
                const balanceInWei = parseInt(balance, 16);
                const balanceInEther = balanceInWei / Math.pow(10, 18);
                console.log('📊 Balance in wei:', balanceInWei);
                console.log('📊 Balance in ether:', balanceInEther);
                
                return { success: true, balance: balanceInEther };
            } catch (error) {
                console.error('❌ Balance test failed:', error);
                return { success: false, error: error.message };
            }
        }
        
        async testTransactionCount(address) {
            try {
                console.log('📝 Testing eth_getTransactionCount...');
                const txCount = await this.makeEthRpcRequest('eth_getTransactionCount', [address, 'latest']);
                console.log('✅ Transaction count result:', txCount);
                
                // Parse transaction count
                const count = parseInt(txCount, 16);
                console.log('📊 Transaction count:', count);
                
                return { success: true, count: count };
            } catch (error) {
                console.error('❌ Transaction count test failed:', error);
                return { success: false, error: error.message };
            }
        }
        
        async testBlockNumber() {
            try {
                console.log('📊 Testing eth_blockNumber...');
                const blockNumber = await this.makeEthRpcRequest('eth_blockNumber');
                console.log('✅ Block number result:', blockNumber);
                
                // Parse block number
                const block = parseInt(blockNumber, 16);
                console.log('📊 Block number:', block);
                
                return { success: true, block: block };
            } catch (error) {
                console.error('❌ Block number test failed:', error);
                return { success: false, error: error.message };
            }
        }
        
        async testCorsProxy() {
            try {
                console.log('🌐 Testing CORS proxy for token data...');
                const tokenUrl = `https://testnet.kitescan.ai/api?module=account&action=tokentx&address=${testAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
                const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(tokenUrl)}`;
                
                const response = await fetch(corsProxyUrl);
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ CORS proxy token data:', data.result?.length || 0, 'transfers');
                    return { success: true, transfers: data.result?.length || 0 };
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.error('❌ CORS proxy test failed:', error);
                return { success: false, error: error.message };
            }
        }
        
        async testNFTData() {
            try {
                console.log('🖼️ Testing CORS proxy for NFT data...');
                const nftUrl = `https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${testAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`;
                const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(nftUrl)}`;
                
                const response = await fetch(corsProxyUrl);
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ CORS proxy NFT data:', data.result?.length || 0, 'transfers');
                    return { success: true, transfers: data.result?.length || 0 };
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.error('❌ CORS proxy NFT test failed:', error);
                return { success: false, error: error.message };
            }
        }
    }
    
    // Run tests
    async function runTests() {
        const tester = new EthRpcTester();
        
        console.log('\n🧪 Running ETH RPC Tests...');
        console.log('Test Address:', testAddress);
        
        // Test 1: Balance
        console.log('\n' + '='.repeat(50));
        const balanceResult = await tester.testBalance(testAddress);
        
        // Test 2: Transaction Count
        console.log('\n' + '='.repeat(50));
        const txCountResult = await tester.testTransactionCount(testAddress);
        
        // Test 3: Block Number
        console.log('\n' + '='.repeat(50));
        const blockResult = await tester.testBlockNumber();
        
        // Test 4: CORS Proxy Token Data
        console.log('\n' + '='.repeat(50));
        const tokenResult = await tester.testCorsProxy();
        
        // Test 5: CORS Proxy NFT Data
        console.log('\n' + '='.repeat(50));
        const nftResult = await tester.testNFTData();
        
        // Summary
        console.log('\n' + '='.repeat(80));
        console.log('📊 TEST SUMMARY:');
        console.log('='.repeat(80));
        console.log('💰 Balance:', balanceResult.success ? `✅ ${balanceResult.balance} ETH` : `❌ ${balanceResult.error}`);
        console.log('📝 Transaction Count:', txCountResult.success ? `✅ ${txCountResult.count}` : `❌ ${txCountResult.error}`);
        console.log('📊 Block Number:', blockResult.success ? `✅ ${blockResult.block}` : `❌ ${blockResult.error}`);
        console.log('🪙 Token Transfers:', tokenResult.success ? `✅ ${tokenResult.transfers}` : `❌ ${tokenResult.error}`);
        console.log('🖼️ NFT Transfers:', nftResult.success ? `✅ ${nftResult.transfers}` : `❌ ${nftResult.error}`);
        
        const successCount = [balanceResult, txCountResult, blockResult, tokenResult, nftResult].filter(r => r.success).length;
        console.log('\n🎯 Overall Success Rate:', `${successCount}/5 (${(successCount/5*100).toFixed(1)}%)`);
        
        if (successCount >= 3) {
            console.log('✅ ETH RPC methods are working well!');
        } else {
            console.log('⚠️ Some ETH RPC methods need attention');
        }
        
        console.log('='.repeat(80));
    }
    
    // Run the tests
    runTests().catch(console.error);
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running ETH RPC test...');
    testEthRpcMethods();
} else {
    console.log('📝 Copy and paste this function into browser console to test ETH RPC methods');
}
