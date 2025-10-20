/**
 * Test App with Logo
 * Test the app with the new Kite AI logo integration
 */

function testAppWithLogo() {
    console.log('🖼️ TESTING APP WITH LOGO');
    console.log('='.repeat(80));
    
    // Check if we're on the right page
    if (!document.getElementById('resultsSection')) {
        console.error('❌ Not on the right page! Please run this on the Kite AI Chain page.');
        return;
    }
    
    // Test logo integration with app
    function testLogoWithApp() {
        console.log('\n🖼️ TESTING LOGO WITH APP');
        console.log('='.repeat(60));
        
        // Check if CSS file is loaded
        const cssLink = document.querySelector('link[href*="styles-vibrant.css"]');
        if (cssLink) {
            console.log('✅ Vibrant CSS file is loaded');
            console.log(`   CSS file: ${cssLink.href}`);
        } else {
            console.log('❌ Vibrant CSS file not found');
        }
        
        // Check logo elements
        const logoContainer = document.querySelector('.logo-container');
        const logoImage = document.querySelector('.logo-image');
        const logoText = document.querySelector('.logo');
        const subtitle = document.querySelector('.subtitle');
        const authorInfo = document.querySelector('.author-info');
        
        if (logoContainer && logoImage && logoText && subtitle && authorInfo) {
            console.log('✅ All logo elements found');
            
            console.log('\n📊 LOGO ELEMENT DETAILS:');
            console.log(`   Container: ${logoContainer.className}`);
            console.log(`   Image: ${logoImage.className}`);
            console.log(`   Text: ${logoText.textContent}`);
            console.log(`   Subtitle: ${subtitle.textContent}`);
            console.log(`   Author: ${authorInfo.textContent}`);
            console.log(`   Author Link: ${authorInfo.href}`);
        } else {
            console.log('❌ Some logo elements missing');
            console.log(`   Container: ${logoContainer ? '✅' : '❌'}`);
            console.log(`   Image: ${logoImage ? '✅' : '❌'}`);
            console.log(`   Text: ${logoText ? '✅' : '❌'}`);
            console.log(`   Subtitle: ${subtitle ? '✅' : '❌'}`);
            console.log(`   Author: ${authorInfo ? '✅' : '❌'}`);
        }
    }
    
    // Test logo image loading
    function testLogoImageLoading() {
        console.log('\n🖼️ TESTING LOGO IMAGE LOADING');
        console.log('='.repeat(60));
        
        const logoImage = document.querySelector('.logo-image');
        if (!logoImage) {
            console.log('❌ Logo image element not found');
            return;
        }
        
        // Check background image
        const backgroundImage = getComputedStyle(logoImage).backgroundImage;
        console.log(`Background image: ${backgroundImage}`);
        
        if (backgroundImage && backgroundImage !== 'none') {
            console.log('✅ Background image is set');
            
            // Check if it's the correct URL
            const expectedUrl = 'https://img.cryptorank.io/coins/kite_ai1756818084693.png';
            if (backgroundImage.includes('kite_ai1756818084693.png')) {
                console.log('✅ Correct Kite AI logo URL detected');
            } else {
                console.log('⚠️ Logo URL might be different');
            }
        } else {
            console.log('❌ Background image not set');
        }
        
        // Test image loading
        const img = new Image();
        img.onload = function() {
            console.log('✅ Kite AI logo loaded successfully');
            console.log(`   Image dimensions: ${img.width}x${img.height}`);
            console.log(`   Image natural dimensions: ${img.naturalWidth}x${img.naturalHeight}`);
            console.log(`   Image source: ${img.src}`);
        };
        img.onerror = function() {
            console.log('❌ Kite AI logo failed to load');
            console.log('   This might be due to CORS or network issues');
            console.log('   Fallback CSS logo should be visible');
        };
        img.src = 'https://img.cryptorank.io/coins/kite_ai1756818084693.png';
    }
    
    // Test logo styling
    function testLogoStyling() {
        console.log('\n🎨 TESTING LOGO STYLING');
        console.log('='.repeat(60));
        
        const logoImage = document.querySelector('.logo-image');
        if (!logoImage) {
            console.log('❌ Logo image element not found');
            return;
        }
        
        const styles = getComputedStyle(logoImage);
        
        console.log('\n📐 LOGO DIMENSIONS:');
        console.log(`   Width: ${styles.width}`);
        console.log(`   Height: ${styles.height}`);
        console.log(`   Expected: 60px x 60px`);
        
        console.log('\n🎨 LOGO STYLING:');
        console.log(`   Border radius: ${styles.borderRadius}`);
        console.log(`   Border: ${styles.border}`);
        console.log(`   Box shadow: ${styles.boxShadow}`);
        console.log(`   Background size: ${styles.backgroundSize}`);
        console.log(`   Background position: ${styles.backgroundPosition}`);
        console.log(`   Background repeat: ${styles.backgroundRepeat}`);
        
        console.log('\n🔄 LOGO INTERACTIONS:');
        console.log(`   Transition: ${styles.transition}`);
        console.log(`   Transform: ${styles.transform}`);
        
        // Test hover effect
        const hoverStyles = getComputedStyle(logoImage, ':hover');
        console.log(`   Hover transform: ${hoverStyles.transform}`);
        console.log(`   Hover box shadow: ${hoverStyles.boxShadow}`);
    }
    
    // Test app functionality with logo
    async function testAppFunctionality() {
        console.log('\n🚀 TESTING APP FUNCTIONALITY WITH LOGO');
        console.log('='.repeat(60));
        
        // Get the app instance
        const app = window.simpleRankChecker || new SimpleRankChecker();
        
        // Test with a known address
        const testAddress = '0x7a2C109ceabF0818F461278f57234Dd2440a41DB';
        console.log(`\n📍 Testing with address: ${testAddress}`);
        
        try {
            // Get account data
            const accountData = await app.getAccountData(testAddress);
            console.log('📊 Account Data:', accountData);
            
            // Calculate scores
            const scores = app.calculateScoreBreakdown(accountData);
            console.log('📊 Scores:', scores);
            
            // Get rank tier
            const rankTier = app.getRankTier(accountData);
            console.log('📊 Rank Tier:', rankTier);
            
            // Check if results are displayed
            const resultsSection = document.getElementById('resultsSection');
            if (resultsSection) {
                console.log('✅ Results section found');
                console.log(`   Display: ${resultsSection.style.display}`);
                console.log(`   Classes: ${resultsSection.className}`);
                
                // Check if rank badge is displayed
                const rankBadge = document.getElementById('rankBadge');
                if (rankBadge) {
                    console.log('✅ Rank badge found');
                    console.log(`   Text: ${rankBadge.textContent}`);
                    console.log(`   Classes: ${rankBadge.className}`);
                } else {
                    console.log('❌ Rank badge not found');
                }
            } else {
                console.log('❌ Results section not found');
            }
            
        } catch (error) {
            console.error('❌ App functionality test failed:', error);
        }
    }
    
    // Test responsive design with logo
    function testResponsiveDesign() {
        console.log('\n📱 TESTING RESPONSIVE DESIGN WITH LOGO');
        console.log('='.repeat(60));
        
        const logoContainer = document.querySelector('.logo-container');
        const logoImage = document.querySelector('.logo-image');
        const logoText = document.querySelector('.logo');
        
        if (!logoContainer || !logoImage || !logoText) {
            console.log('❌ Logo elements not found');
            return;
        }
        
        const containerStyles = getComputedStyle(logoContainer);
        const imageStyles = getComputedStyle(logoImage);
        const textStyles = getComputedStyle(logoText);
        
        console.log('\n📐 CONTAINER LAYOUT:');
        console.log(`   Display: ${containerStyles.display}`);
        console.log(`   Flex direction: ${containerStyles.flexDirection}`);
        console.log(`   Align items: ${containerStyles.alignItems}`);
        console.log(`   Justify content: ${containerStyles.justifyContent}`);
        console.log(`   Gap: ${containerStyles.gap}`);
        
        console.log('\n🖼️ IMAGE RESPONSIVE:');
        console.log(`   Width: ${imageStyles.width}`);
        console.log(`   Height: ${imageStyles.height}`);
        console.log(`   Background size: ${imageStyles.backgroundSize}`);
        
        console.log('\n📝 TEXT RESPONSIVE:');
        console.log(`   Font size: ${textStyles.fontSize}`);
        console.log(`   Font weight: ${textStyles.fontWeight}`);
        
        // Test viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        console.log(`\n📱 CURRENT VIEWPORT: ${viewportWidth}x${viewportHeight}`);
        
        if (viewportWidth < 768) {
            console.log('📱 Mobile viewport detected');
            console.log('   - Logo should maintain aspect ratio');
            console.log('   - Text should scale appropriately');
            console.log('   - Container should stack vertically if needed');
        } else {
            console.log('💻 Desktop viewport detected');
            console.log('   - Logo and text should be side by side');
            console.log('   - Full size and effects should be visible');
        }
    }
    
    // Test logo fallback
    function testLogoFallback() {
        console.log('\n🔄 TESTING LOGO FALLBACK');
        console.log('='.repeat(60));
        
        const logoImage = document.querySelector('.logo-image');
        if (!logoImage) {
            console.log('❌ Logo image element not found');
            return;
        }
        
        // Check if fallback pseudo-element exists
        const beforeElement = getComputedStyle(logoImage, '::before');
        if (beforeElement.content && beforeElement.content !== 'none') {
            console.log('✅ Fallback pseudo-element found');
            console.log(`   Content: ${beforeElement.content}`);
            console.log(`   Opacity: ${beforeElement.opacity}`);
            console.log(`   Position: ${beforeElement.position}`);
            console.log(`   Width: ${beforeElement.width}`);
            console.log(`   Height: ${beforeElement.height}`);
            console.log(`   Background: ${beforeElement.background}`);
            console.log(`   Border radius: ${beforeElement.borderRadius}`);
        } else {
            console.log('❌ Fallback pseudo-element not found');
        }
        
        console.log('\n💡 Fallback mechanism:');
        console.log('   - If Kite AI logo fails to load, CSS-generated logo will show');
        console.log('   - Fallback uses beige dots pattern');
        console.log('   - Opacity transitions smoothly between states');
    }
    
    // Run all tests
    async function runAllTests() {
        testLogoWithApp();
        testLogoImageLoading();
        testLogoStyling();
        await testAppFunctionality();
        testResponsiveDesign();
        testLogoFallback();
        
        console.log('\n' + '='.repeat(80));
        console.log('🖼️ APP WITH LOGO TEST SUMMARY');
        console.log('='.repeat(80));
        
        console.log('\n✅ FEATURES TESTED:');
        console.log('  🖼️ Kite AI logo integration');
        console.log('  🎨 Logo styling and effects');
        console.log('  🚀 App functionality with logo');
        console.log('  📱 Responsive design');
        console.log('  🔄 Fallback mechanism');
        console.log('  🖱️ Interactive effects');
        
        console.log('\n🎯 EXPECTED RESULTS:');
        console.log('  - Kite AI logo from Cryptorank should display');
        console.log('  - Logo should be 60x60px with rounded corners');
        console.log('  - Hover effect should scale logo to 105%');
        console.log('  - Fallback CSS logo should show if image fails');
        console.log('  - Logo should be responsive on mobile');
        console.log('  - App functionality should work with logo');
        
        console.log('\n💡 USAGE INSTRUCTIONS:');
        console.log('  1. Check if Kite AI logo loads correctly');
        console.log('  2. Hover over logo to see scale effect');
        console.log('  3. Test app functionality with logo');
        console.log('  4. Test on different screen sizes');
        console.log('  5. Verify fallback works if image fails');
        
        console.log('='.repeat(80));
    }
    
    // Run the tests
    runAllTests().catch(console.error);
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running app with logo test...');
    testAppWithLogo();
} else {
    console.log('📝 Copy and paste this function into browser console to test app with logo');
}
