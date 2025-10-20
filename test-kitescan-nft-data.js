/**
 * Test KiteScan NFT data directly
 */

async function testKiteScanNFTData() {
    console.log('🎯 TESTING KITESCAN NFT DATA DIRECTLY');
    console.log('='.repeat(80));
    
    const addresses = [
        '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
        '0xD3e9eB2A0445E6003f45F9cB6Ba96a3efB3020d6'
    ];
    
    for (const address of addresses) {
        console.log(`\n🔍 Testing address: ${address}`);
        console.log('='.repeat(60));
        
        try {
            // Try direct API call first
            console.log('🔄 Trying direct API call...');
            const directResponse = await fetch(`https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`);
            
            if (directResponse.ok) {
                const directData = await directResponse.json();
                console.log('✅ Direct API call successful');
                console.log('🔍 Direct response:', directData);
                
                if (directData.result && Array.isArray(directData.result)) {
                    console.log(`📊 Direct NFT transfers: ${directData.result.length}`);
                    
                    // Show first few transfers
                    directData.result.slice(0, 3).forEach((transfer, index) => {
                        console.log(`  ${index + 1}. ${transfer.tokenName} (${transfer.tokenSymbol})`);
                        console.log(`     Token ID: ${transfer.tokenID}`);
                        console.log(`     Contract: ${transfer.contractAddress}`);
                        console.log(`     To: ${transfer.to}`);
                        console.log(`     From: ${transfer.from}`);
                        console.log('');
                    });
                    
                    // Test analysis
                    const soulboundTransfers = directData.result.filter(transfer => {
                        const tokenName = transfer.tokenName?.toLowerCase() || '';
                        return tokenName.includes('soulbound');
                    });
                    
                    console.log(`🎵 SoulBound transfers: ${soulboundTransfers.length}`);
                    
                } else {
                    console.log('❌ No NFT data in direct response');
                }
                
            } else {
                console.log('❌ Direct API call failed:', directResponse.status);
            }
            
        } catch (error) {
            console.log('❌ Direct API call error:', error.message);
        }
        
        // Try CORS proxy
        try {
            console.log('\n🔄 Trying CORS proxy...');
            const corsResponse = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://testnet.kitescan.ai/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc`)}`);
            
            if (corsResponse.ok) {
                const corsData = await corsResponse.json();
                console.log('✅ CORS proxy successful');
                console.log('🔍 CORS response:', corsData);
                
                if (corsData.result && Array.isArray(corsData.result)) {
                    console.log(`📊 CORS NFT transfers: ${corsData.result.length}`);
                    
                    // Show first few transfers
                    corsData.result.slice(0, 3).forEach((transfer, index) => {
                        console.log(`  ${index + 1}. ${transfer.tokenName} (${transfer.tokenSymbol})`);
                        console.log(`     Token ID: ${transfer.tokenID}`);
                        console.log(`     Contract: ${transfer.contractAddress}`);
                        console.log(`     To: ${transfer.to}`);
                        console.log(`     From: ${transfer.from}`);
                        console.log('');
                    });
                    
                    // Test analysis
                    const soulboundTransfers = corsData.result.filter(transfer => {
                        const tokenName = transfer.tokenName?.toLowerCase() || '';
                        return tokenName.includes('soulbound');
                    });
                    
                    console.log(`🎵 SoulBound transfers: ${soulboundTransfers.length}`);
                    
                } else {
                    console.log('❌ No NFT data in CORS response');
                }
                
            } else {
                console.log('❌ CORS proxy failed:', corsResponse.status);
            }
            
        } catch (error) {
            console.log('❌ CORS proxy error:', error.message);
        }
        
        console.log('\n' + '-'.repeat(60));
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ KITESCAN NFT DATA TEST SUMMARY:');
    console.log('='.repeat(80));
    console.log('✅ Tested direct API calls');
    console.log('✅ Tested CORS proxy calls');
    console.log('✅ Analyzed NFT data structure');
    console.log('🌐 Check KiteScan: https://testnet.kitescan.ai/address/0x7a2C109ceabF0818F461278f57234Dd2440a41DB?tab=tokens_nfts');
    console.log('🌐 Check KiteScan: https://testnet.kitescan.ai/address/0xD3e9eB2A0445E6003f45F9cB6Ba96a3efB3020d6?tab=tokens_nfts');
    console.log('='.repeat(80));
}

// Run test
testKiteScanNFTData().catch(console.error);
