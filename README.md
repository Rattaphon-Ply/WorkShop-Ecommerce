## 🚀 WorkShop-Ecommerce
เว็บแอปพลิเคชันที่พัฒนาด้วย React + Vite ฝั่ง Frontend และ Node.js + Express ฝั่ง Backend
รองรับการใช้งานที่ทันสมัย มีระบบฟอร์ม การยืนยันตัวตน และการจำลองระบบชำระเงินด้วย Stripe

## 🧾 สารบัญ

- ✨ Features
- 🧑‍💻 Tech Stack
- ⚙️ Getting Started
- 🔐 Environment Variables
- 📦 Scripts
- 🧪 API Testing

## 🚀 Features
ฟีเจอร์หลักของโปรเจกต์นี้:
- Responsive UI (รองรับมือถือ) ด้วย TailwindCSS และ ShadCN
- Routing แบบ client-side ด้วย React Router DOM
- Global state management ด้วย Zustand
- Form validation ด้วย React Hook Form + Zod
- JWT authentication (Login / Register)
- ระบบอัปโหลดรูปภาพไปยัง Cloudinary
- ตรวจสอบความปลอดภัยของรหัสผ่านด้วย zxcvbn
- Resize รูปก่อนอัปโหลดด้วย react-image-file-resizer
- Toast แจ้งเตือนด้วย React Toastify
- Carousel และ Slider ด้วย SwiperJS
- Animation ด้วย Motion.dev
- ทดลองชำระเงินผ่าน Stripe (test mode)

---

## 🧑‍💻 Tech Stack

### Frontend

- Vite + React
- Tailwind CSS
- ShadCN UI
- React Router DOM
- Zustand
- Axios
- React Toastify
- Lucide React
- Motion.dev
- SwiperJS
- React Hook Form + Zod + @hookform/resolvers
- Zxcvbn
- Material UI
- React Image File Resizer

### Backend

- Node.js + Express.js
- Prisma ORM
- Cloudinary
- Morgan
- CORS
- Nodemon
- BcryptJS
- JSON Web Token (JWT)
- Stripe (Test Mode)

---

## ⚙️ Getting Started

### 1. Clone repo

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### Install dependencies
```bash
# frontend
cd client
npm install

# backend
cd ../server
npm install
```

### Run dev servers
```bash
# frontend
cd client
npm run dev

# backend
cd ../server
npm run dev
```

## 📦 Scripts
### Frontend
```bash
npm run dev        # เริ่ม development server
npm run build      # สร้าง production build
```

### Backend
```bash
npm run dev        # ใช้งาน nodemon สำหรับพัฒนา
```

## API Testing
สามารถใช้ Postman เพื่อทดสอบ API
(หากมีไฟล์ collection ให้ใส่ไว้ในโฟลเดอร์ /postman)
