/**
 * Test the fixed balance parsing with hex format
 */

async function testBalanceFix() {
    console.log('🔍 Testing FIXED balance parsing with hex format...');
    console.log('='.repeat(80));
    
    // Test the hex value from the log
    const hexValue = '0x2c68119335cd870';
    const expectedKite = 0.19998918;
    
    console.log('📊 Test Data:');
    console.log('Hex value from API:', hexValue);
    console.log('Expected KITE:', expectedKite);
    
    // Test parsing methods
    console.log('\n🧮 Parsing Methods:');
    
    // Method 1: parseInt with hex (CORRECT for hex format)
    const method1 = parseInt(hexValue, 16) / Math.pow(10, 18);
    console.log('1️⃣ parseInt(hex, 16):', method1.toFixed(8), 'KITE');
    
    // Method 2: parseInt without base (WRONG for hex)
    const method2 = parseInt(hexValue) / Math.pow(10, 18);
    console.log('2️⃣ parseInt(hex):', method2.toFixed(8), 'KITE');
    
    // Method 3: Smart parsing (check if starts with 0x)
    const method3 = hexValue.startsWith('0x') 
        ? parseInt(hexValue, 16) / Math.pow(10, 18)
        : parseInt(hexValue) / Math.pow(10, 18);
    console.log('3️⃣ Smart parsing:', method3.toFixed(8), 'KITE');
    
    console.log('\n✅ Results:');
    console.log('1️⃣ Method 1 match:', Math.abs(method1 - expectedKite) < 0.00000001 ? 'YES' : 'NO');
    console.log('2️⃣ Method 2 match:', Math.abs(method2 - expectedKite) < 0.00000001 ? 'YES' : 'NO');
    console.log('3️⃣ Method 3 match:', Math.abs(method3 - expectedKite) < 0.00000001 ? 'YES' : 'NO');
    
    if (Math.abs(method1 - expectedKite) < 0.00000001) {
        console.log('\n🎉 SUCCESS! Method 1 (parseInt with hex) is CORRECT!');
        console.log('✅ App should now parse balance correctly!');
    } else {
        console.log('\n❌ Still not matching. Need more investigation.');
    }
    
    // Test with real API call
    console.log('\n🌐 Testing with real API call...');
    try {
        const address = '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D';
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        const balanceUrl = `https://testnet.kitescan.ai/api?module=account&action=balance&address=${address}&tag=latest`;
        
        const response = await fetch(`${corsProxy}${encodeURIComponent(balanceUrl)}`);
        if (response.ok) {
            const data = await response.json();
            const balanceInWei = data.result;
            const balanceInEther = balanceInWei.startsWith('0x') 
                ? parseInt(balanceInWei, 16) / Math.pow(10, 18)
                : parseInt(balanceInWei) / Math.pow(10, 18);
            
            console.log('📊 Real API Test:');
            console.log('Raw result:', balanceInWei);
            console.log('Parsed balance:', balanceInEther.toFixed(8), 'KITE');
            console.log('Expected:', expectedKite, 'KITE');
            console.log('✅ Match:', Math.abs(balanceInEther - expectedKite) < 0.00000001 ? 'YES' : 'NO');
        }
    } catch (error) {
        console.log('❌ API Error:', error.message);
    }
}

// Run the test
console.log('🚀 Starting balance fix test...\n');
testBalanceFix().catch(console.error);
