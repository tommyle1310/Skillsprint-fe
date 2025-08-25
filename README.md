# SkillSprint - E-Learning Platform

A modern, interactive e-learning platform built with Next.js, MagicUI components, and GraphQL APIs. SkillSprint focuses on sequential learning to ensure students master concepts before moving forward.

## 🚀 Features

### User Side
- **Lead Capture**: Simple email form on landing page
- **Course Discovery**: Browse and search through available courses
- **Sequential Learning**: Lessons unlock progressively as you complete previous ones
- **Quiz Integration**: Interactive quizzes to test knowledge and unlock content
- **Mock Checkout**: Simulated payment process for course enrollment
- **Progress Tracking**: Monitor your learning journey

### Admin Side
- **Dashboard Analytics**: Real-time metrics and insights
- **Traffic Monitoring**: Track page views and user engagement
- **Lead Management**: Monitor email signups and conversions
- **Revenue Tracking**: Monitor orders and revenue performance
- **Conversion Analytics**: Lead conversion rates and revenue per visitor

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: MagicUI, TailwindCSS
- **Backend**: GraphQL API (NestJS)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **State Management**: React hooks and context
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
skillsprint/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── leads/         # Lead management
│   │   ├── orders/        # Order processing
│   │   └── admin/         # Admin dashboard APIs
│   ├── auth/              # Authentication pages
│   ├── courses/           # Course listing
│   ├── admin/             # Admin dashboard
│   ├── checkout/          # Payment flow
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── magicui/           # MagicUI components
│   └── ui/                # Base UI components
├── lib/                    # Utility functions
└── public/                 # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or use NeonDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skillsprint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3001/graphql
   DATABASE_URL=postgresql://username:password@localhost:5432/skillsprint
   JWT_SECRET=your-secret-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Component Development

The platform uses MagicUI components for a modern, animated interface:

- **AuroraText**: Animated text effects
- **BorderBeam**: Animated border effects
- **ShimmerButton**: Shimmer effect buttons
- **InteractiveHoverButton**: Interactive hover effects
- **AnimatedCircularProgressBar**: Progress indicators
- **Marquee**: Scrolling content
- **AnimatedList**: Animated list items

### API Integration

The frontend communicates with the backend through GraphQL APIs:

- **Authentication**: Login/register with JWT
- **Leads**: Email capture and management
- **Courses**: Course listing and details
- **Orders**: Payment processing
- **Analytics**: Dashboard statistics

## 📊 Analytics & Tracking

### Metrics Collected
- **Traffic**: Page views and user sessions
- **Leads**: Email signups and conversions
- **Orders**: Course purchases and revenue
- **Conversion Rates**: Lead-to-customer conversion
- **Revenue Per Visitor**: Average revenue per user

### Implementation
- Backend database counters
- GraphQL mutations for tracking
- Real-time dashboard updates

## 🎨 Customization

### Styling
- TailwindCSS for utility-first styling
- CSS variables for theme customization
- Responsive design for all devices

### Content
- Easy course management through admin dashboard
- Dynamic content loading
- SEO-optimized pages

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
NEXT_PUBLIC_GRAPHQL_URL=https://your-backend-url.com/graphql
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Landing page loads with lead form
- [ ] Lead form submission creates lead in database
- [ ] User registration and login
- [ ] Course browsing and search
- [ ] Mock checkout process
- [ ] Admin dashboard displays metrics
- [ ] Sequential lesson unlocking
- [ ] Quiz completion and progress

## 📈 Performance

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components load on demand
- **Caching**: Optimized caching strategies

## 🔒 Security

- **JWT Authentication**: Secure token-based auth
- **HTTP-only Cookies**: XSS protection
- **Input Validation**: Server-side validation
- **CORS Configuration**: Proper cross-origin handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the troubleshooting guide

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Social learning features
- [ ] AI-powered recommendations
- [ ] Multi-language support
- [ ] Advanced payment gateways

---

Built with ❤️ using Next.js and MagicUI
