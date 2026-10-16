import { auth } from "@/lib/auth";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ credited?: string }>;
}

export default async function WalletPage({ searchParams }: PageProps) {

    const session = await auth();

    const { credited } = await searchParams;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      {credited === "1" && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg mb-6 flex items-start gap-3 text-sm animate-fade-in">
          <span className="text-xl">✓</span>
          <div>
            <strong className="font-semibold block">Wallet Topped Up Successfully!</strong>
            Your credits have been added to your balance and are ready to use.
          </div>
        </div>
      )}

      <h1 className="text-xl font-bold text-gray-900 mb-4">Your Voting Wallet</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6 text-center">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
          Available Balance
        </span>
        {/* Your balance component or data fetching layout will render here */}
        <span className="text-3xl font-bold text-gray-900">{session?.user.creditBalance.toLocaleString()} Credits</span>
      </div>

      <Link 
        href="/vote" 
        className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
      >
        Go Cast Votes
      </Link>
    </div>
  );
}
