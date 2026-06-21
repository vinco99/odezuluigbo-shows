export default function UnauthorizedPage(){

  return (

    <main className="min-h-screen flex items-center justify-center bg-black text-white">

        <div className="text-center">

            <h1 className="text-5xl font-bold text-red-500">
                Access Denied
            </h1>

            <p className="mt-4 text-gray-400">
                You do not have permission to view this page.
            </p>

            <a
            href="/dashboard"
            className="inline-block mt-6 bg-yellow-500 text-black px-5 py-3 rounded"
            >
                Go back to dashboard
            </a>

        </div>

    </main>

  );

}