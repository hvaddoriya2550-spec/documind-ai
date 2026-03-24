# Tailwind CSS Class Guide - Text Colors & Styling

## 📌 Understanding className Attributes

`className` is used to apply **Tailwind CSS utility classes** to elements. These are pre-defined CSS classes that style elements without writing custom CSS.

**Example:**
```tsx
<h1 className="text-white text-3xl font-bold">
  Hello World
</h1>
```

This applies 3 Tailwind classes:
- `text-white` → Sets text color to white
- `text-3xl` → Sets font size to 3xl
- `font-bold` → Sets font weight to bold

---

## 🎨 Text Color Classes (Changing Text Color)

### Basic Colors
```tsx
text-white       // Pure white #ffffff
text-black       // Pure black #000000
text-red-500     // Medium red
text-blue-600    // Medium-dark blue
text-green-500   // Medium green
text-yellow-400  // Medium-light yellow
text-purple-600  // Medium-dark purple
```

### Gray Shades (Most Common)
```tsx
text-gray-50     // Almost white
text-gray-100    // Very light gray
text-gray-200    // Light gray
text-gray-300    // Light-medium gray
text-gray-500    // Medium gray
text-gray-600    // Medium-dark gray
text-gray-700    // Dark gray
text-gray-800    // Very dark gray
text-gray-900    // Almost black
```

### Brand Colors (from your THEME)
```tsx
text-purple-600  // Primary color
text-cyan-500    // Secondary color
text-green-600   // Success
text-red-600     // Error/Danger
text-yellow-500  // Warning
text-blue-600    // Info
```

---

## 🔄 How to Change Text Color

### Step 1: Find the text element
```tsx
<p className="text-center text-gray-600 mb-6">
  Sign in to your account
</p>
```

### Step 2: Replace the color class
```tsx
// Original: text-gray-600
// Change to: text-white

<p className="text-center text-white mb-6">
  Sign in to your account
</p>
```

### Step 3: That's it! No CSS needed

---

## 📋 Common className Patterns

### Text Styling
```tsx
// Font sizes
text-xs      // 12px
text-sm      // 14px
text-base    // 16px (default)
text-lg      // 18px
text-xl      // 20px
text-2xl     // 24px
text-3xl     // 30px

// Font weights
font-light    // 300
font-normal   // 400
font-medium   // 500
font-semibold // 600
font-bold     // 700

// Text alignment
text-left
text-center
text-right

// Line height
leading-tight  // 1.25
leading-normal // 1.5
leading-loose  // 1.75
```

### Spacing (Margin & Padding)
```tsx
// Margin
m-0, m-1, m-2, m-4, m-6, m-8  // all sides
mx-0, mx-2, mx-4               // left & right
my-0, my-2, my-4               // top & bottom
mt-0, mt-2, mt-4               // top only
mb-0, mb-2, mb-4               // bottom only
ml-0, ml-2, ml-4               // left only
mr-0, mr-2, mr-4               // right only

// Padding (same pattern)
p-0, p-1, p-2, p-4, p-6
px-4, py-2, pt-4, pb-2, pl-4, pr-4

// Space between children
space-y-2   // vertical space
space-x-4   // horizontal space
```

### Background Colors
```tsx
bg-white
bg-gray-50
bg-gray-100
bg-red-50
bg-blue-500
```

### Borders
```tsx
border              // 1px border
border-2            // 2px border
border-gray-200     // light gray border
rounded-lg          // border radius
rounded-full        // fully rounded
```

### Width & Height
```tsx
w-full     // 100% width
w-1/2      // 50% width
w-screen   // viewport width

h-full     // 100% height
h-screen   // viewport height
```

---

## 🎯 Real-World Example

### Before (Dark Gray Text)
```tsx
<h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
  Login
</h1>
<p className="text-center text-gray-600 mb-6">
  Sign in to your account
</p>
```

### After (White Text)
```tsx
<h1 className="text-3xl font-bold text-center mb-2 text-white">
  Login
</h1>
<p className="text-center text-white mb-6">
  Sign in to your account
</p>
```

---

## 💡 Combining Multiple Classes

You can combine as many classes as needed:
```tsx
className="
  text-white           // color
  text-3xl             // size
  font-bold            // weight
  text-center          // alignment
  mb-6                 // margin
  leading-tight        // line height
  tracking-wide        // letter spacing
"
```

This is much cleaner than inline styles!

---

## 🚀 Pro Tips

### 1. Use meaningful combinations
```tsx
// Good
className="text-white font-bold text-lg"

// Avoid
className="text-gray-300 text-sm"  // Hard to read
```

### 2. Check Tailwind color scale
When you see `text-gray-600`, the number (100-900 in 100 increments) represents:
- 50 = Very light
- 100-400 = Light
- 500 = Medium
- 600-700 = Dark
- 800-900 = Very dark

### 3. Use your design system colors
From your theme, use consistent colors:
```tsx
text-purple-600  // Primary (from THEME.colors.primary)
text-cyan-500    // Secondary (from THEME.colors.secondary)
text-green-600   // Success
text-red-600     // Error
```

---

## 🔗 Quick Reference

| What you want | Tailwind class |
|--------------|----------------|
| White text | `text-white` |
| Black text | `text-black` |
| Large text | `text-lg`, `text-xl`, `text-3xl` |
| Bold text | `font-bold`, `font-semibold` |
| Center text | `text-center` |
| Add spacing | `mb-6`, `mt-4`, `px-2`, `py-4` |
| White background | `bg-white` |
| Light background | `bg-gray-50` |
| Add border | `border border-gray-200` |
| Rounded corners | `rounded-lg` |

---

## ✅ Your Login Page - Changed to White Title

The title "Sign In" is now **white** instead of dark gray!

Change made:
```diff
- <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
+ <h1 className="text-3xl font-bold text-center mb-2 text-white">
```

That's all you need to do! Reload your browser to see the change.

---

## 📚 Learn More

- [Tailwind CSS Official Docs](https://tailwindcss.com/docs)
- [Tailwind Color Reference](https://tailwindcss.com/docs/customizing-colors)
- [Complete Class Reference](https://tailwindcss.com/docs/display)
