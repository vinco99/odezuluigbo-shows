import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function VoteFailedPage({ searchParams }: PageProps) {
  const { ref } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
        ✕
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Failed</h1>
      <p className="text-gray-600 max-w-sm mb-6">
        We couldn't verify your transaction. Your account hasn't been charged, or the payment gateway interrupted the process.
      </p>
      
      {ref && (
        <div className="bg-gray-50 border border-gray-200 rounded p-3 text-xs font-mono text-gray-500 mb-6">
          Ref: {ref}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Link 
          href="/vote" 
          className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2.5 rounded-lg transition"
        >
          Return to Voting
        </Link>
      </div>
    </div>
  );
}
