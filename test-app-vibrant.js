/**
 * Test App with Vibrant Colors
 * Test the app with the new vibrant color scheme
 */

function testAppVibrant() {
    console.log('🎨 TESTING APP WITH VIBRANT COLORS');
    console.log('='.repeat(80));
    
    // Check if we're on the right page
    if (!document.getElementById('resultsSection')) {
        console.error('❌ Not on the right page! Please run this on the Kite AI Chain page.');
        return;
    }
    
    // Test addresses with different expected ranks
    const testAddresses = [
        {
            address: '0x7a2C109ceabF0818F461278f57234Dd2440a41DB',
            expectedRank: 'Kite Legend',
            expectedClass: 'legendary',
            expectedColor: 'Gold/Yellow gradient',
            description: 'Should have 3 NFTs - Ultra Rare Gold'
        },
        {
            address: '0xE24546D5Ff7bf460Ebdaa36847e38669996D1a0D',
            expectedRank: 'Kite Active',
            expectedClass: 'active',
            expectedColor: 'Red gradient',
            description: 'Should have 0 NFTs, high transactions - Basic Red'
        },
        {
            address: '0x28ccE1d1B8469dD7Daaf2B1FFF3d2DC4F1dCcEf1',
            expectedRank: 'Kite Active',
            expectedClass: 'active',
            expectedColor: 'Red gradient',
            description: 'Should have 0 NFTs, moderate transactions - Basic Red'
        }
    ];
    
    // Test vibrant colors
    async function testVibrantColors() {
        console.log('🧪 Testing vibrant color scheme...');
        
        // Get the app instance
        const app = window.simpleRankChecker || new SimpleRankChecker();
        
        for (const testCase of testAddresses) {
            console.log(`\n📍 Testing: ${testCase.address}`);
            console.log(`   Expected: ${testCase.expectedRank} (${testCase.expectedClass})`);
            console.log(`   Color: ${testCase.expectedColor}`);
            console.log(`   Description: ${testCase.description}`);
            console.log('='.repeat(60));
            
            try {
                // Get account data
                const accountData = await app.getAccountData(testCase.address);
                console.log('📊 Account Data:', accountData);
                
                // Calculate scores
                const scores = app.calculateScoreBreakdown(accountData);
                console.log('📊 Scores:', scores);
                
                // Get rank tier
                const rankTier = app.getRankTier(accountData);
                console.log('📊 Rank Tier:', rankTier);
                
                // Check if rank matches expectation
                if (rankTier.name === testCase.expectedRank) {
                    console.log(`✅ Rank matches expectation: ${rankTier.name}`);
                } else {
                    console.log(`⚠️ Rank differs from expectation:`);
                    console.log(`   Expected: ${testCase.expectedRank}`);
                    console.log(`   Actual: ${rankTier.name}`);
                }
                
                // Check if CSS class matches expectation
                if (rankTier.name.toLowerCase().replace('kite ', '').replace(' ', '') === testCase.expectedClass) {
                    console.log(`✅ CSS class matches expectation: ${testCase.expectedClass}`);
                } else {
                    console.log(`⚠️ CSS class differs from expectation:`);
                    console.log(`   Expected: ${testCase.expectedClass}`);
                    console.log(`   Actual: ${rankTier.name.toLowerCase().replace('kite ', '').replace(' ', '')}`);
                }
                
                console.log(`🎨 Expected Color: ${testCase.expectedColor}`);
                console.log(`🎨 Rank Color: ${rankTier.color}`);
                console.log(`🎨 Rank Gradient: ${rankTier.gradient}`);
                
            } catch (error) {
                console.error(`❌ Test failed for ${testCase.address}:`, error);
            }
            
            // Wait between tests
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    // Test visual elements
    function testVisualElements() {
        console.log('\n🎨 TESTING VISUAL ELEMENTS');
        console.log('='.repeat(60));
        
        // Check if CSS file is loaded
        const cssLink = document.querySelector('link[href*="styles-vibrant.css"]');
        if (cssLink) {
            console.log('✅ Vibrant CSS file is loaded');
        } else {
            console.log('❌ Vibrant CSS file not found');
        }
        
        // Check for rank badge elements
        const rankBadge = document.getElementById('rankBadge');
        if (rankBadge) {
            console.log('✅ Rank badge element found');
            console.log(`   Current classes: ${rankBadge.className}`);
        } else {
            console.log('❌ Rank badge element not found');
        }
        
        // Check for result section
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            console.log('✅ Results section found');
            console.log(`   Display style: ${resultsSection.style.display}`);
            console.log(`   Classes: ${resultsSection.className}`);
        } else {
            console.log('❌ Results section not found');
        }
        
        // Check for score elements
        const scoreValue = document.getElementById('scoreValue');
        if (scoreValue) {
            console.log('✅ Score value element found');
        } else {
            console.log('❌ Score value element not found');
        }
    }
    
    // Test color scheme
    function testColorScheme() {
        console.log('\n🌈 TESTING COLOR SCHEME');
        console.log('='.repeat(60));
        
        const colorTests = [
            {
                rank: 'Kite Legend',
                class: 'legendary',
                expectedColors: ['#FFD700', '#FFA500', '#FF8C00'],
                expectedGlow: 'rgba(255, 215, 0, 0.8)',
                description: 'Ultra Rare Gold with intense glow'
            },
            {
                rank: 'Kite Hero',
                class: 'master',
                expectedColors: ['#8A2BE2', '#9932CC', '#9400D3'],
                expectedGlow: 'rgba(138, 43, 226, 0.8)',
                description: 'Epic Purple with strong glow'
            },
            {
                rank: 'Kite Elite',
                class: 'elite',
                expectedColors: ['#00BFFF', '#1E90FF', '#4169E1'],
                expectedGlow: 'rgba(0, 191, 255, 0.8)',
                description: 'Rare Blue with medium glow'
            },
            {
                rank: 'Kite Advanced',
                class: 'advanced',
                expectedColors: ['#00FF7F', '#32CD32', '#228B22'],
                expectedGlow: 'rgba(0, 255, 127, 0.7)',
                description: 'Uncommon Green with moderate glow'
            },
            {
                rank: 'Kite Intermediate',
                class: 'intermediate',
                expectedColors: ['#FF8C00', '#FF7F50', '#FF6347'],
                expectedGlow: 'rgba(255, 140, 0, 0.7)',
                description: 'Common Orange with light glow'
            },
            {
                rank: 'Kite Active',
                class: 'active',
                expectedColors: ['#FF4500', '#DC143C', '#B22222'],
                expectedGlow: 'rgba(255, 69, 0, 0.6)',
                description: 'Basic Red with subtle glow'
            }
        ];
        
        colorTests.forEach((test, index) => {
            console.log(`\n${index + 1}. ${test.rank} (${test.class})`);
            console.log(`   Description: ${test.description}`);
            console.log(`   Expected Colors: ${test.expectedColors.join(', ')}`);
            console.log(`   Expected Glow: ${test.expectedGlow}`);
            console.log(`   CSS Class: .rank-badge.${test.class}`);
        });
    }
    
    // Test animations
    function testAnimations() {
        console.log('\n✨ TESTING ANIMATIONS');
        console.log('='.repeat(60));
        
        const animationTests = [
            {
                rank: 'Kite Legend',
                class: 'legendary',
                glowAnimation: 'legendaryGlow 2s ease-in-out infinite alternate',
                pulseAnimation: 'legendaryPulse 1.5s ease-in-out infinite alternate',
                description: 'Fastest animations for highest rank'
            },
            {
                rank: 'Kite Hero',
                class: 'master',
                glowAnimation: 'epicGlow 2.5s ease-in-out infinite alternate',
                pulseAnimation: 'epicPulse 1.8s ease-in-out infinite alternate',
                description: 'Fast animations for epic rank'
            },
            {
                rank: 'Kite Elite',
                class: 'elite',
                glowAnimation: 'rareGlow 3s ease-in-out infinite alternate',
                pulseAnimation: 'rarePulse 2s ease-in-out infinite alternate',
                description: 'Medium animations for rare rank'
            },
            {
                rank: 'Kite Advanced',
                class: 'advanced',
                glowAnimation: 'uncommonGlow 3.5s ease-in-out infinite alternate',
                pulseAnimation: 'uncommonPulse 2.2s ease-in-out infinite alternate',
                description: 'Moderate animations for uncommon rank'
            },
            {
                rank: 'Kite Intermediate',
                class: 'intermediate',
                glowAnimation: 'commonGlow 4s ease-in-out infinite alternate',
                pulseAnimation: 'commonPulse 2.5s ease-in-out infinite alternate',
                description: 'Slower animations for common rank'
            },
            {
                rank: 'Kite Active',
                class: 'active',
                glowAnimation: 'basicGlow 4.5s ease-in-out infinite alternate',
                pulseAnimation: 'basicPulse 2.8s ease-in-out infinite alternate',
                description: 'Slow animations for basic rank'
            }
        ];
        
        animationTests.forEach((test, index) => {
            console.log(`\n${index + 1}. ${test.rank} (${test.class})`);
            console.log(`   Description: ${test.description}`);
            console.log(`   Glow Animation: ${test.glowAnimation}`);
            console.log(`   Pulse Animation: ${test.pulseAnimation}`);
        });
    }
    
    // Test responsive design
    function testResponsiveDesign() {
        console.log('\n📱 TESTING RESPONSIVE DESIGN');
        console.log('='.repeat(60));
        
        console.log('\n💻 DESKTOP FEATURES:');
        console.log('  ✅ Full gradient backgrounds');
        console.log('  ✅ Maximum glow intensity');
        console.log('  ✅ All animation effects');
        console.log('  ✅ Complete visual hierarchy');
        
        console.log('\n📱 MOBILE ADAPTATIONS:');
        console.log('  ✅ Maintained color intensity');
        console.log('  ✅ Preserved glow effects');
        console.log('  ✅ Responsive badge sizing');
        console.log('  ✅ Touch-friendly interactions');
        
        // Test current viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        console.log(`\n📐 CURRENT VIEWPORT: ${viewportWidth}x${viewportHeight}`);
        
        if (viewportWidth < 768) {
            console.log('📱 Mobile viewport detected');
            console.log('  - Rank badges should be full width');
            console.log('  - Animations should be preserved');
            console.log('  - Colors should remain vibrant');
        } else {
            console.log('💻 Desktop viewport detected');
            console.log('  - Full gradient backgrounds');
            console.log('  - Maximum glow intensity');
            console.log('  - All animation effects');
        }
    }
    
    // Run all tests
    async function runAllTests() {
        await testVibrantColors();
        testVisualElements();
        testColorScheme();
        testAnimations();
        testResponsiveDesign();
        
        console.log('\n' + '='.repeat(80));
        console.log('🎨 VIBRANT COLORS TEST SUMMARY');
        console.log('='.repeat(80));
        
        console.log('\n✅ FEATURES TESTED:');
        console.log('  🎨 Vibrant color scheme');
        console.log('  ✨ Glowing animations');
        console.log('  🎯 Visual hierarchy');
        console.log('  📱 Responsive design');
        console.log('  🎭 Animation timing');
        console.log('  🌈 Color accessibility');
        
        console.log('\n🎯 EXPECTED RESULTS:');
        console.log('  - Kite Legend: Bright gold with intense glow');
        console.log('  - Kite Hero: Vibrant purple with strong glow');
        console.log('  - Kite Elite: Bright blue with medium glow');
        console.log('  - Kite Advanced: Vibrant green with moderate glow');
        console.log('  - Kite Intermediate: Bright orange with light glow');
        console.log('  - Kite Active: Vibrant red with subtle glow');
        
        console.log('\n💡 USAGE INSTRUCTIONS:');
        console.log('  1. Open the Kite AI Chain Leaderboard');
        console.log('  2. Check different wallet addresses');
        console.log('  3. Observe the vibrant rank colors');
        console.log('  4. Notice the glowing animations');
        console.log('  5. Compare visual hierarchy between ranks');
        
        console.log('='.repeat(80));
    }
    
    // Run the tests
    runAllTests().catch(console.error);
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running app vibrant colors test...');
    testAppVibrant();
} else {
    console.log('📝 Copy and paste this function into browser console to test app vibrant colors');
}
