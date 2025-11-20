# 🚀 Smart Resource Booking System

A comprehensive and beautiful resource booking and management system built with Next.js 16, PrimeReact, and TypeScript.

## ✨ Features

### User Management (Implemented)
- ✅ **Advanced DataTable** with sorting, pagination, and filtering using OData protocol
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete users
- ✅ **Role-Based Access Control** - Admin, Manager, User, Guest roles
- ✅ **User Status Management** - Active, Inactive, Suspended
- ✅ **Bulk Operations** - Select and delete multiple users at once
- ✅ **Beautiful UI** with smooth animations and transitions
- ✅ **Responsive Design** - Works on all devices

### Layout & Navigation
- ✅ **Modern Sidebar** with role-based menu items
- ✅ **Collapsible Navigation** for better space utilization
- ✅ **Beautiful Navbar** with user profile and notifications
- ✅ **Notification System** with real-time updates
- ✅ **Smooth Animations** throughout the application

### Dashboard
- ✅ **Statistics Cards** with trends and analytics
- ✅ **Interactive Charts** for data visualization
- ✅ **Recent Activity Feed**
- ✅ **Responsive Grid Layout**

### UI/UX
- ✅ **Gradient Themes** - Beautiful purple-blue gradient design
- ✅ **Smooth Animations** - Fade-in, slide-in, scale effects
- ✅ **Custom Scrollbars** for better aesthetics
- ✅ **Hover Effects** on interactive elements
- ✅ **Loading States** with shimmer effects
- ✅ **Toast Notifications** for user feedback
- ✅ **Confirm Dialogs** for destructive actions

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** PrimeReact 10.9.7
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + PrimeFlex + Custom CSS
- **Icons:** PrimeIcons 7
- **State Management:** React Context API

## 📦 Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Project Structure

```
smart-resource-booking/
├── src/
│   ├── app/                      # Next.js app router pages
│   │   ├── dashboard/           # Dashboard page
│   │   ├── users/               # User management page
│   │   ├── resources/           # Resource management (placeholder)
│   │   ├── bookings/            # Bookings management (placeholder)
│   │   ├── my-bookings/         # User bookings (placeholder)
│   │   ├── reports/             # Reports & Analytics (placeholder)
│   │   └── settings/            # System settings (placeholder)
│   ├── components/
│   │   ├── layout/              # Layout components
│   │   │   ├── Navbar.tsx       # Top navigation bar
│   │   │   ├── Sidebar.tsx      # Side navigation menu
│   │   │   └── DashboardLayout.tsx  # Main layout wrapper
│   │   └── users/               # User management components
│   │       └── UserManagement.tsx
│   ├── context/                 # React context providers
│   │   └── UserContext.tsx      # User session context
│   ├── services/                # API services
│   │   ├── userService.ts       # User CRUD operations
│   │   └── notificationService.ts
│   └── types/                   # TypeScript type definitions
│       ├── user.ts              # User-related types
│       └── layout.ts            # Layout-related types
```

## 🎨 Features in Detail

### User Management
The User Management module includes:
- **DataTable with OData**: Server-side pagination, sorting, and filtering
- **Advanced Search**: Real-time search across all user fields
- **Role Management**: Assign and manage user roles (Admin, Manager, User, Guest)
- **Status Control**: Set user status (Active, Inactive, Suspended)
- **Avatar Support**: Automatic avatar generation based on user name
- **Bulk Actions**: Delete multiple users at once
- **Form Validation**: Client-side validation for all fields
- **Responsive Design**: Mobile-friendly interface

### Navigation & Layout
- **Role-Based Menu**: Menu items shown based on user role
- **Collapsible Sidebar**: Maximize screen space when needed
- **Notification Center**: View and manage notifications
- **User Profile Menu**: Quick access to profile and logout
- **Breadcrumb Navigation**: Easy navigation tracking
- **Smooth Transitions**: All page transitions are animated

## 🚀 Upcoming Features

- Resource Management module
- Booking system with calendar view
- Advanced reporting and analytics
- Email notifications
- User authentication and authorization
- Multi-language support
- Dark mode theme
- Export/Import functionality
- Advanced filtering and search

## 🎨 Design Philosophy

This application follows modern design principles:
- **Clean & Minimal**: Uncluttered interface focusing on content
- **Beautiful Animations**: Smooth transitions for better UX
- **Consistent Design**: Unified color scheme and component styling
- **Responsive**: Works seamlessly on all screen sizes
- **Accessible**: ARIA labels and keyboard navigation support

## 📝 Default User

For demo purposes, the application uses a default admin user:
- **Username:** admin
- **Email:** admin@smartbooking.com
- **Role:** Admin

## 🔧 Configuration

The application uses CSS variables for easy theming. You can modify the colors in `src/app/globals.css`:

```css
:root {
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  --accent-color: #8b5cf6;
  --sidebar-width: 280px;
  --navbar-height: 70px;
}
```

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
## 📄 License
This project is open source and available under the MIT License.
## 👨‍💻 Author
Built with ❤️ using Next.js and PrimeReact
---
**Happy Coding! 🎉**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
