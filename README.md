# 🛡️ Safe Travel Platform

A comprehensive, safety-first travel platform that connects travelers with verified local companions and authentic cultural experiences. Built with modern web technologies and a focus on user safety and verification.

## 🎯 Vision

**Safe & Personalized Travel Platform** — Similar to Airbnb + MakeMyTrip but with safety-first features and verified travel companions for solo travelers, elderly, women, and kids.

### Key Features
- **Verified Safety**: All companions and experiences undergo thorough background checks
- **Personalized Itineraries**: AI-assisted trip planning with safety considerations
- **Local Experiences**: Curated cultural activities led by verified locals
- **Travel Companions**: Verified local guides for safety and comfort
- **Real-time Tracking**: Location sharing and emergency support
- **24/7 Support**: Round-the-clock assistance and emergency response

### Target Audience
- Solo travelers
- Elderly travelers
- Women travelers
- Parents sending kids on trips
- Families
- Corporate travel groups

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- TailwindCSS
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- express-validator
- multer
- helmet
- cors

**Development Tools:**
- ESLint
- Prettier
- Nodemon

**Deployment & Infrastructure:**
- Docker
- Docker Compose

**Other:**
- Git (version control)

## 🏗️ Architecture

```
safe-travel-platform/
├── frontend/                # React app (Vite + React + TailwindCSS)
│   ├── src/
│   │   ├── pages/          # Main application pages
│   │   ├── components/      # Reusable UI components
│   │   ├── assets/          # Images, icons, etc.
│   │   └── styles/          # CSS and Tailwind configuration
│   └── package.json
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── routes/          # API route definitions
│   │   ├── controllers/     # Business logic handlers
│   │   ├── models/          # Database models (MongoDB)
│   │   ├── middleware/      # Authentication, validation, etc.
│   │   └── utils/           # Helper functions and utilities
│   └── package.json
├── infra/                   # Deployment configuration
│   ├── Dockerfile
│   └── docker-compose.yml
├── docs/                    # Business documentation
└── scripts/                 # Development utilities
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd safe-travel-platform
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

**Backend Environment Variables (.env)**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/safe-travel

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📚 API Routes

### Companions
- `GET /companions` — List companions (filter by location, language, specialty, rating, price)
- `GET /companions/:id` — Get companion profile by ID
- `GET /companions/:id/reviews` — Get reviews for a companion
- `POST /companions` — Create companion profile (authenticated)
- `PUT /companions/:id` — Update companion profile (authenticated)
- `DELETE /companions/:id` — Delete companion profile (authenticated)
- `POST /companions/:id/book` — Book a companion (authenticated)
- `PATCH /companions/:id/verify` — Verify companion (admin only)

*Other routes for users, experiences, authentication, etc. are similarly structured.*

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Emergency**: Use the SOS button in the application for immediate assistance

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Basic authentication system
- ✅ User profile management
- ✅ Trip planning interface
- ✅ Companion search and booking
- ✅ Experience marketplace

### Phase 2 (Next)
- 🔄 AI-powered itinerary generation
- 🔄 Real-time location tracking
- 🔄 Payment integration (Razorpay)
- 🔄 Advanced safety features

### Phase 3 (Future)
- 📋 Mobile app (React Native)
- 📋 Advanced analytics dashboard
- 📋 Multi-language support
- 📋 Integration with travel APIs

---

**Built with ❤️ for safe and enjoyable travels around the world!**
