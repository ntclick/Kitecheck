/**
 * Debug balance parsing issue
 */

async function debugBalance() {
    const address = '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D';
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    
    console.log('🔍 Debugging balance parsing...');
    console.log('📍 Address:', address);
    console.log('='.repeat(80));
    
    try {
        const balanceUrl = `https://testnet.kitescan.ai/api?module=account&action=balance&address=${address}&tag=latest`;
        const response = await fetch(`${corsProxy}${encodeURIComponent(balanceUrl)}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('📊 Raw API Response:', JSON.stringify(data, null, 2));
            
            if (data.result) {
                const hexValue = data.result;
                console.log('\n🔍 Balance Analysis:');
                console.log('📊 Hex value:', hexValue);
                console.log('📊 Hex length:', hexValue.length);
                
                // Try different parsing methods
                console.log('\n🧮 Parsing Methods:');
                
                // Method 1: parseInt with hex
                const method1 = parseInt(hexValue, 16);
                const method1Ether = method1 / Math.pow(10, 18);
                console.log('1️⃣ parseInt(hex, 16):', method1.toLocaleString());
                console.log('1️⃣ In ether:', method1Ether.toFixed(8));
                
                // Method 2: BigInt
                const method2 = BigInt(hexValue);
                const method2Ether = Number(method2) / Math.pow(10, 18);
                console.log('2️⃣ BigInt(hex):', method2.toString());
                console.log('2️⃣ In ether:', method2Ether.toFixed(8));
                
                // Method 3: Manual hex to decimal
                const method3 = parseInt(hexValue.slice(2), 16); // Remove 0x
                const method3Ether = method3 / Math.pow(10, 18);
                console.log('3️⃣ Manual (no 0x):', method3.toLocaleString());
                console.log('3️⃣ In ether:', method3Ether.toFixed(8));
                
                // Expected value
                console.log('\n🎯 Expected: 0.19998918 KITE');
                console.log('🎯 Expected in wei:', (0.19998918 * Math.pow(10, 18)).toLocaleString());
                console.log('🎯 Expected in hex:', '0x' + (0.19998918 * Math.pow(10, 18)).toString(16));
                
                // Check which method gives expected result
                console.log('\n✅ Checking matches:');
                console.log('1️⃣ Method 1 match:', Math.abs(method1Ether - 0.19998918) < 0.00000001 ? 'YES' : 'NO');
                console.log('2️⃣ Method 2 match:', Math.abs(method2Ether - 0.19998918) < 0.00000001 ? 'YES' : 'NO');
                console.log('3️⃣ Method 3 match:', Math.abs(method3Ether - 0.19998918) < 0.00000001 ? 'YES' : 'NO');
                
            }
        } else {
            console.log('❌ API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

// Run the debug
console.log('🚀 Starting balance debug...\n');
debugBalance().catch(console.error);
