# 🪁 Kite AI Chain Leaderboard

A comprehensive leaderboard system for ranking users on the Kite AI Chain based on NFT Soulbound ownership and transaction activity.

## 🌟 Features

### 🎯 **Smart Ranking System**
- **NFT Priority**: NFT holders get higher ranks than transaction-based users
- **Fixed Scoring**: Consistent scores for the same wallet across multiple checks
- **9-Level System**: From Kite Newbie (Level 1) to Kite Legend (Level 9)

### 🏆 **Rank Tiers**

| Level | Rank | Requirements | Color | Icon |
|-------|------|-------------|-------|------|
| 9 | **Kite Legend** | 3+ NFTs | Gold | ⚔️ |
| 8 | **Kite Hero** | 2 NFTs | Purple | 🛡️ |
| 7 | *(Unused)* | - | - | - |
| 6 | **Kite Advanced** | 500+ transactions | Green | 🚀 |
| 5 | **Kite Intermediate** | 200+ transactions | Orange | ⚡ |
| 4 | **Kite Active** | 100+ transactions | Red | 🔥 |
| 3 | **Kite Regular** | 1 NFT | Gray | 📈 |
| 2 | **Kite Beginner** | 50+ transactions | Light Gray | 🌱 |
| 1 | **Kite Newbie** | 0-49 transactions | Very Light Gray | 🆕 |

### 🎨 **UI Features**
- **Game-style Design**: Vibrant colors and animations
- **Kite AI Logo**: Integrated branding
- **Responsive Layout**: Works on all devices
- **Real-time Data**: Live blockchain data fetching
- **Toast Notifications**: User feedback system

## 🚀 Quick Start

### 1. **Clone Repository**
```bash
git clone https://github.com/ntclick/Kitecheck.git
cd Kitecheck
```

### 2. **Start Local Server**
```bash
# Option 1: Using Node.js
npx http-server -p 8080

# Option 2: Using Python
python -m http.server 8080

# Option 3: Using PHP
php -S localhost:8080
```

### 3. **Open in Browser**
```
http://localhost:8080
```

## 📁 Project Structure

```
Kitecheck/
├── index.html              # Main HTML file
├── app.js                  # Core application logic
├── styles-vibrant.css      # Vibrant UI styles
├── README.md              # Project documentation
├── test-*.js              # Various test scripts
└── docs/                  # Additional documentation
```

## 🔧 Technical Details

### **Data Sources**
- **Kite AI Testnet API**: Primary blockchain data
- **ETH RPC Methods**: `eth_getBalance`, `eth_getTransactionCount`
- **Blockscout API**: NFT and token data
- **CORS Proxies**: Fallback for cross-origin requests

### **Scoring Algorithm**
```javascript
// Fixed points system
const balancePoints = Math.floor(balance * 100);        // 1 KITE = 100 points
const transactionPoints = Math.floor(transactionCount * 3); // 1 tx = 3 points
const activityPoints = Math.floor(transactionCount * 2.5);  // Activity bonus
const nftPoints = soundboundNFTs * 1000;                // 1 NFT = 1000 points

// NFT multipliers
if (soundboundNFTs >= 3) nftMultiplier = 3.0;
else if (soundboundNFTs >= 2) nftMultiplier = 2.5;
else if (soundboundNFTs >= 1) nftMultiplier = 1.5;
else nftMultiplier = 1.0;

const totalPoints = Math.floor(basePoints * nftMultiplier);
```

### **NFT Detection**
- **WhitelistSoulBoundNFT**: Limited supply, higher priority
- **SoulBoundNFT**: Regular SoulBound NFTs
- **Fallback System**: Known addresses with manual NFT data

## 🧪 Testing

### **Test Scripts**
```bash
# Test level ranking system
node test-level-ranking.js

# Test specific wallet with 3 NFTs
node test-3-nft-wallet.js

# Test ranking with real data
node test-ranking-with-real-data.js
```

### **Browser Console Testing**
```javascript
// Test level ranking
testLevelRanking();

// Test specific wallet
simpleTest();

// Test new wallet
testNewWallet();
```

## 🌐 API Endpoints

### **Kite AI Testnet**
- **Base URL**: `https://testnet.kitescan.ai/api`
- **Balance**: `eth_getBalance`
- **Transactions**: `eth_getTransactionCount`
- **NFTs**: `tokennfttx` action

### **CORS Proxies**
- `https://api.allorigins.win/raw?url=`
- `https://cors-anywhere.herokuapp.com/`
- `https://thingproxy.freeboard.io/fetch/`

## 🎨 Customization

### **Colors**
Edit `styles-vibrant.css` to customize rank colors:
```css
.rank-legend { color: #D4A574; }  /* Gold */
.rank-hero { color: #9B59B6; }    /* Purple */
.rank-advanced { color: #2ECC71; } /* Green */
```

### **Ranking Logic**
Modify `getRankTier()` in `app.js` to adjust ranking criteria.

## 🔍 Debugging

### **Console Logs**
The app provides extensive logging:
- 🔍 Data fetching steps
- 📊 Score calculations
- 🎯 Rank determinations
- ❌ Error handling

### **Common Issues**
1. **CORS Errors**: Use local server instead of file://
2. **API Timeouts**: Check network connection
3. **NFT Data Missing**: Verify fallback logic

## 📈 Performance

- **Caching**: API responses cached for consistency
- **Timeout**: 10-second timeout for API calls
- **Fallback**: Multiple CORS proxy options
- **Error Handling**: Graceful degradation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Repository**: [https://github.com/ntclick/Kitecheck.git](https://github.com/ntclick/Kitecheck.git)
- **Kite AI**: [https://kite.ai](https://kite.ai)
- **Testnet Explorer**: [https://testnet.kitescan.ai](https://testnet.kitescan.ai)

## 🆘 Support

For issues and questions:
1. Check the console logs for debugging info
2. Review the test scripts for examples
3. Open an issue on GitHub

---

**Made with ❤️ for the Kite AI community**