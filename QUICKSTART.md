# 📚 Quick Start Guide - Smart Resource Booking System

## 🚀 Running the Application

1. **Install Dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to: http://localhost:3000

   The application will automatically redirect you to the Dashboard.

## 🎯 What You Can Do Right Now

### ✅ User Management (Fully Implemented)

1. **Navigate to User Management**:
   - Click on "User Management" in the sidebar
   - Or go directly to: http://localhost:3000/users

2. **View Users**:
   - See a beautiful DataTable with 8 pre-loaded users
   - Columns: Avatar, Name, Email, Department, Role, Status, Created Date, Actions
   - Real-time search across all fields
   - Sort by any column (click column header)
   - Pagination with customizable rows per page (5, 10, 25, 50)

3. **Add New User**:
   - Click "New User" button (green button, top left)
   - Fill in the form:
     - Username *
     - Email *
     - First Name *
     - Last Name *
     - Department
     - Phone
     - Role (Admin/Manager/User/Guest)
     - Status (Active/Inactive/Suspended)
     - Password (for new users)
   - Click "Save"
   - See success toast notification
   - New user appears in the table

4. **Edit User**:
   - Click the blue pencil icon on any user row
   - Edit form appears with pre-filled data
   - Make changes
   - Click "Save"
   - See success notification

5. **Delete User**:
   - Click the red trash icon on any user row
   - Confirm deletion in dialog
   - User is removed from the list

6. **Bulk Delete**:
   - Select multiple users using checkboxes
   - Click "Delete" button (red button, top left)
   - Confirm bulk deletion
   - All selected users are removed

7. **Search Users**:
   - Type in the search box (top right)
   - Results filter in real-time
   - Search works across: username, email, first name, last name, department

8. **Statistics**:
   - View total users count (top right card)
   - View active users count (top right card)

### 🏠 Dashboard

Navigate to Dashboard (http://localhost:3000/dashboard) to see:
- 4 Statistics cards with trends
- Booking trends chart
- Recent activity feed
- Beautiful gradient background
- Smooth animations

### 🔔 Notifications

Click the bell icon in the navbar to:
- View all notifications
- See unread count badge
- Mark individual notifications as read
- Mark all as read
- Click notification to navigate (if linked)

### 👤 User Profile

Click your avatar/name in the navbar to:
- View profile info
- Access settings
- Logout

### 📱 Sidebar Navigation

- **Collapsible**: Click the circle button with arrow to collapse/expand
- **Role-Based**: Menu items change based on user role
- **Smooth Animations**: Each item has a staggered animation on load
- **Active State**: Current page is highlighted

## 🎨 Beautiful UI Features You'll Notice

### Animations
- ✨ Fade-in animations on page load
- 🎭 Slide-in animations for sidebar items
- 📈 Scale-in animations for cards
- 🌊 Smooth hover effects on all interactive elements
- 🎪 Gentle transitions on all state changes

### Hover Effects
- Cards lift up on hover
- Buttons have shadow effects
- Table rows slide right slightly
- Icons scale up
- Colors transition smoothly

### Color Scheme
- Primary gradient: Purple to Blue (#667eea to #764ba2)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Danger: Red (#ef4444)
- Info: Blue (#3b82f6)

### Responsive Design
- Works perfectly on desktop, tablet, and mobile
- Sidebar collapses automatically on mobile
- Tables scroll horizontally on small screens
- Touch-friendly buttons and interactions

## 📁 Test the Features

### Try These Actions:

1. **Add a new user**:
   - Username: testuser
   - Email: test@example.com
   - First Name: Test
   - Last Name: User
   - Role: User
   - Status: Active

2. **Search for users**:
   - Type "john" in search box
   - See filtered results
   - Clear search to see all users

3. **Sort users**:
   - Click "Name" column header to sort by name
   - Click "Email" to sort by email
   - Click again to reverse sort order

4. **Paginate**:
   - Change rows per page dropdown
   - Navigate between pages
   - Notice smooth transitions

5. **Edit an existing user**:
   - Click edit icon on any user
   - Change their department
   - Save and see update

## 🎯 Role-Based Menu Items

Different roles see different menu items:

**Admin** (current default user):
- Dashboard ✅
- User Management ✅
- Resource Management ✅
- Bookings ✅
- My Bookings ✅
- Reports ✅
- Settings ✅

**Manager**:
- Dashboard ✅
- User Management ✅
- Resource Management ✅
- Bookings ✅
- My Bookings ✅
- Reports ✅

**User**:
- Dashboard ✅
- Bookings ✅
- My Bookings ✅

**Guest**:
- Dashboard ✅

## 🔍 Mock Data

The application uses mock data with 8 pre-configured users:
1. Admin User (admin@smartbooking.com) - Admin
2. John Doe (john.doe@smartbooking.com) - Manager
3. Alice Smith (alice.smith@smartbooking.com) - User
4. Bob Wilson (bob.wilson@smartbooking.com) - User
5. Carol Johnson (carol.johnson@smartbooking.com) - Manager
6. David Miller (david.miller@smartbooking.com) - User (Inactive)
7. Emma Williams (emma.williams@smartbooking.com) - User
8. Frank Brown (frank.brown@smartbooking.com) - Guest

All CRUD operations work with this mock data and persist during your session.

## 🛠️ Technical Details

### OData Implementation
The DataTable uses OData query parameters:
- `$skip`: For pagination offset
- `$top`: For page size
- `$orderby`: For sorting (field + asc/desc)
- `$filter`: For search filtering
- `$count`: To get total record count

### State Management
- User session managed via React Context
- Local state for component data
- Toast notifications for feedback
- Confirm dialogs for destructive actions

### Performance
- Lazy loading for DataTable
- Debounced search (simulated)
- Optimized re-renders
- Smooth 60fps animations

## 🎉 Enjoy!

Your Smart Resource Booking System is ready to use! Explore all the features, test the animations, and enjoy the beautiful UI!

For any questions or issues, check the main README.md file.

**Happy Booking! 🚀**

