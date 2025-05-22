// utils/helper.ts

// ✅ Utility to combine class names conditionally
export function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ✅ Utility to format a date string
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// ✅ Interface for user payload (e.g., from JWT)
export interface UserPayload {
  id: string;
  username: string;
  role: string;
}

// ✅ (Optional) Mongoose DB connection helper (backend only)
export async function connectToDatabase(): Promise<void> {
  const mongoose = require('mongoose');

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}
