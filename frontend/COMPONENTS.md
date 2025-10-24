# Component Library

This document provides an overview of all available components in the Chefly application.

## Atomic Design Structure

All components follow the Atomic Design methodology for better organization and reusability.

---

## Atoms

### Button
**Path:** `@/components/atoms/Button`

Versatile button component with multiple variants and states.

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `isLoading`: boolean

**Example:**
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

### Input
**Path:** `@/components/atoms/Input`

Text input with label, error states, and icon support.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode

**Example:**
```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  leftIcon={<Mail size={20} />}
/>
```

### Avatar
**Path:** `@/components/atoms/Avatar`

User avatar with image fallback support.

**Props:**
- `src`: string
- `alt`: string
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `fallback`: string

**Example:**
```tsx
<Avatar src={user.profileImage} alt={user.name} size="md" />
```

### Badge
**Path:** `@/components/atoms/Badge`

Status indicators and tags.

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
- `size`: 'sm' | 'md' | 'lg'

**Example:**
```tsx
<Badge variant="success">Verified</Badge>
```

### Card
**Path:** `@/components/atoms/Card`

Container component with optional hover effects.

**Props:**
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hover`: boolean
- `onClick`: function

**Example:**
```tsx
<Card padding="md" hover>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

---

## Molecules

### SearchBar
**Path:** `@/components/molecules/SearchBar`

Search input with clear button and optional search trigger.

**Props:**
- `value`: string
- `onChange`: (value: string) => void
- `onSearch`: () => void
- `placeholder`: string

**Example:**
```tsx
<SearchBar
  value={search}
  onChange={setSearch}
  onSearch={handleSearch}
  placeholder="Search chefs..."
/>
```

### ChefCard
**Path:** `@/components/molecules/ChefCard`

Display chef profile information in a card layout.

**Props:**
- `chef`: Partial<Chef>
- `onClick`: () => void

**Example:**
```tsx
<ChefCard
  chef={chefData}
  onClick={() => navigate(`/chefs/${chef.id}`)}
/>
```

### ReviewCard
**Path:** `@/components/molecules/ReviewCard`

Display customer reviews with ratings.

**Props:**
- `review`: Partial<Review>

**Example:**
```tsx
<ReviewCard review={reviewData} />
```

### BookingCard
**Path:** `@/components/molecules/BookingCard`

Display booking information with actions.

**Props:**
- `booking`: Partial<Booking>
- `onViewDetails`: () => void
- `onCancel`: () => void
- `showActions`: boolean

**Example:**
```tsx
<BookingCard
  booking={bookingData}
  onViewDetails={handleView}
  onCancel={handleCancel}
/>
```

---

## Organisms

### Navbar
**Path:** `@/components/organisms/Navbar`

Application navigation with authentication states.

**Features:**
- Responsive mobile menu
- Authentication state handling
- Notifications indicator
- User profile dropdown

**Example:**
```tsx
<Navbar />
```

### ChefGrid
**Path:** `@/components/organisms/ChefGrid`

Grid layout for displaying multiple chefs.

**Props:**
- `chefs`: Partial<Chef>[]
- `onChefClick`: (chef: Partial<Chef>) => void
- `loading`: boolean

**Example:**
```tsx
<ChefGrid
  chefs={chefsList}
  onChefClick={handleChefClick}
  loading={isLoading}
/>
```

### BookingForm
**Path:** `@/components/organisms/BookingForm`

Complete booking form with validation.

**Props:**
- `onSubmit`: (data: BookingFormData) => void
- `loading`: boolean
- `initialData`: Partial<BookingFormData>

**Example:**
```tsx
<BookingForm
  onSubmit={handleBooking}
  loading={isSubmitting}
/>
```

---

## Usage Guidelines

### Importing Components

**Individual import:**
```tsx
import { Button } from '@/components/atoms/Button';
import { ChefCard } from '@/components/molecules/ChefCard';
```

**Barrel import:**
```tsx
import { Button, Input, ChefCard, SearchBar } from '@/components';
```

### Styling

All components use Tailwind CSS for styling. The `cn()` utility function (from `@/lib/utils`) is used for conditional class merging.

### Extending Components

Components are built with extensibility in mind. Use the `className` prop to add custom styles:

```tsx
<Button className="mt-4 shadow-lg">
  Custom styled button
</Button>
```

### TypeScript

All components are fully typed with TypeScript interfaces exported alongside the component.

---

## Testing in Storybook

All components have corresponding `.stories.tsx` files for visual testing and documentation.

View components in Storybook:
```bash
npm run storybook
```

Navigate to:
- **Atoms/** - Basic components
- **Molecules/** - Composite components
- **Organisms/** - Complex components
- **Pages/** - Full page views

---

## Contributing

When adding new components:

1. Choose the appropriate atomic level (atom, molecule, organism)
2. Create the component file with TypeScript
3. Export types and the component
4. Create a `.stories.tsx` file with multiple variants
5. Update this documentation
6. Add to the barrel export in `components/index.ts`

Example structure:
```
NewComponent/
├── NewComponent.tsx
├── NewComponent.stories.tsx
└── index.ts
```

---

## Resources

- [Storybook Documentation](./STORYBOOK.md)
- [Atomic Design Principles](https://bradfrost.com/blog/post/atomic-web-design/)
- [Component Examples in Storybook](http://localhost:6006)

