import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <div className="text-8xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-display font-bold text-gray-900">
          Page not found
        </h1>
        <p className="mt-3 text-base text-gray-500">
          The path you&apos;re seeking isn&apos;t here. Return home and continue
          your journey.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full btn-gold px-8 py-3 text-sm font-semibold"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
