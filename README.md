# Kite AI Chain Rank Checker

Giao diện đơn giản để kiểm tra xếp hạng của một địa chỉ ví trên Kite AI Chain.

## Tính năng

- 🔍 **Kiểm tra rank đơn giản**: Chỉ cần nhập địa chỉ ví và click "Check Rank"
- 📊 **Hiển thị chi tiết**: Số dư, giao dịch, NFT Soundbound, Kite tokens
- 🎯 **Phân tích điểm**: Hiển thị breakdown chi tiết từng tiêu chí xếp hạng
- 📱 **Responsive**: Tương thích với mọi thiết bị
- ⚡ **Nhanh chóng**: Kết quả hiển thị ngay lập tức

## Cách sử dụng

1. **Mở file `index.html`** trong trình duyệt
2. **Nhập địa chỉ ví** (bắt đầu bằng 0x và có 42 ký tự)
3. **Click "Check Rank"** hoặc nhấn Enter
4. **Xem kết quả** với thông tin chi tiết và điểm xếp hạng

## Cấu trúc dự án

```
├── index.html          # Giao diện chính
├── styles.css          # CSS styling
├── app.js             # Logic ứng dụng
└── README.md          # Tài liệu hướng dẫn
```

## Thuật toán xếp hạng

Điểm xếp hạng được tính dựa trên 5 tiêu chí với **NFT Soundbound là quan trọng nhất**:

1. **🎵 NFT Soundbound (50%)** - **QUAN TRỌNG NHẤT**
2. **💰 Số dư tài khoản (15%)** - Số dư KITE token
3. **📝 Số lượng giao dịch (15%)** - Tổng số giao dịch đã thực hiện
4. **⚡ Hoạt động gần đây (10%)** - Thời gian hoạt động cuối cùng
5. **🪙 Kite Tokens (10%)** - Số lượng Kite tokens đặc biệt (Legend, Hero, Master, Champion, Warrior, Guardian, Elite, Supreme)

## 🏆 Hệ số nhân NFT Soundbound

- **🏆 Đủ 3 NFT Soundbound**: **2.5x** (Hệ số nhân tối đa!)
- **🥈 Có 2 NFT Soundbound**: **2.0x** 
- **📱 Có 1 NFT Soundbound**: **1.0x** (Không có hệ số nhân - vì ai cũng có)
- **❌ Không có NFT**: **1.0x** (Không có hệ số nhân)

## Giao diện

### Input Section
- Ô nhập địa chỉ ví với validation
- Nút "Check Rank" với loading state
- Hỗ trợ nhấn Enter để kiểm tra

### Results Section
- **Thông tin tài khoản**: Tên, địa chỉ, hạng
- **Thống kê**: Số dư, giao dịch, NFT, Kite tokens
- **Điểm xếp hạng**: Tổng điểm và breakdown chi tiết
- **Hệ số nhân**: Hiển thị rõ ràng khi có NFT
- **Trạng thái NFT**: Thông báo đặc biệt với emoji
- **Click địa chỉ** để copy vào clipboard

### Error Handling
- Validation địa chỉ ví
- Hiển thị lỗi rõ ràng
- Nút "Thử lại" khi có lỗi

## API Endpoints sử dụng

- `GET /accounts/{address}` - Thông tin tài khoản
- `GET /accounts/{address}/balance` - Số dư
- `GET /accounts/{address}/transactions` - Lịch sử giao dịch
- `GET /accounts/{address}/tokens` - Token balances
- `GET /accounts/{address}/nfts` - NFT collection
- `GET /nft-contracts` - Danh sách NFT contracts

## Responsive Design

- **Desktop**: Layout 2 cột cho stats
- **Tablet**: Layout 1 cột cho stats
- **Mobile**: UI tối ưu cho màn hình nhỏ

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Demo

Thử với địa chỉ ví mẫu:
```
0x7a2C109ceabF0818F461278f57234Dd2440a41DB
```

## License

Distributed under the MIT License.

## Liên hệ

- Website: [https://testnet.kitescan.ai](https://testnet.kitescan.ai)
- API Docs: [https://testnet.kitescan.ai/api-docs](https://testnet.kitescan.ai/api-docs)