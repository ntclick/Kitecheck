/**
 * Test the fixed balance parsing
 */

async function testFixedBalance() {
    const address = '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D';
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    console.log('🔍 Testing FIXED balance parsing...');
    console.log('📍 Address:', address);
    console.log('='.repeat(80));
    
    try {
        const balanceUrl = `https://testnet.kitescan.ai/api?module=account&action=balance&address=${address}&tag=latest`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(balanceUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('📊 Raw API Response:', JSON.stringify(data, null, 2));
            
            if (data.result) {
                const balanceInWei = data.result;
                
                // OLD METHOD (WRONG):
                const oldMethod = parseInt(balanceInWei, 16) / Math.pow(10, 18);
                
                // NEW METHOD (CORRECT):
                const newMethod = parseInt(balanceInWei) / Math.pow(10, 18);
                
                console.log('\n🔍 Balance Comparison:');
                console.log('📊 Raw value:', balanceInWei);
                console.log('❌ OLD method (parseInt with hex):', oldMethod.toFixed(8), 'KITE');
                console.log('✅ NEW method (parseInt decimal):', newMethod.toFixed(8), 'KITE');
                console.log('🎯 Expected:', '0.19998918 KITE');
                
                console.log('\n✅ Results:');
                console.log('❌ OLD match:', Math.abs(oldMethod - 0.19998918) < 0.00000001 ? 'YES' : 'NO');
                console.log('✅ NEW match:', Math.abs(newMethod - 0.19998918) < 0.00000001 ? 'YES' : 'NO');
                
                if (Math.abs(newMethod - 0.19998918) < 0.00000001) {
                    console.log('\n🎉 SUCCESS! Balance parsing is now CORRECT!');
                } else {
                    console.log('\n❌ Still not matching. Need more investigation.');
                }
            }
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

// Run the test
console.log('🚀 Testing fixed balance parsing...\n');
testFixedBalance().catch(console.error);
