/**
 * Test CSS Fix
 */

function testCSSFix() {
    console.log('🔧 TESTING CSS FIX');
    console.log('='.repeat(80));
    
    // Check if we're in the right page
    if (!document.getElementById('resultsSection')) {
        console.error('❌ Not on the right page! Please run this on the Kite AI Chain page.');
        return;
    }
    
    const resultsSection = document.getElementById('resultsSection');
    console.log('🔍 resultsSection element:', resultsSection);
    
    // Test CSS classes
    console.log('\n📋 CSS Test:');
    console.log('Current classes:', resultsSection.className);
    console.log('Current display:', window.getComputedStyle(resultsSection).display);
    
    // Test with hidden class
    console.log('\n🧪 Test 1: With hidden class');
    resultsSection.classList.add('hidden');
    console.log('Classes with hidden:', resultsSection.className);
    console.log('Display with hidden:', window.getComputedStyle(resultsSection).display);
    
    // Test without hidden class
    console.log('\n🧪 Test 2: Without hidden class');
    resultsSection.classList.remove('hidden');
    console.log('Classes without hidden:', resultsSection.className);
    console.log('Display without hidden:', window.getComputedStyle(resultsSection).display);
    
    // Test with inline style
    console.log('\n🧪 Test 3: With inline style');
    resultsSection.style.display = 'block';
    console.log('Classes with inline style:', resultsSection.className);
    console.log('Display with inline style:', window.getComputedStyle(resultsSection).display);
    
    // Test CSS rules
    console.log('\n🎨 CSS Rules Check:');
    const styles = window.getComputedStyle(resultsSection);
    console.log('Computed display:', styles.display);
    console.log('Computed visibility:', styles.visibility);
    console.log('Computed opacity:', styles.opacity);
    
    // Check if element is actually visible
    const rect = resultsSection.getBoundingClientRect();
    console.log('\n📐 Element Dimensions:');
    console.log('Width:', rect.width);
    console.log('Height:', rect.height);
    console.log('Top:', rect.top);
    console.log('Left:', rect.left);
    console.log('Is visible:', rect.width > 0 && rect.height > 0);
    
    console.log('\n' + '='.repeat(80));
    console.log('🚀 CSS fix test complete!');
    console.log('='.repeat(80));
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running CSS fix test...');
    testCSSFix();
} else {
    console.log('📝 Copy and paste this function into browser console to test CSS fix');
}
