import Link from "next/link";

export default function Home() {
  const tools = [
    { name: "✅ Todo Manager", href: "/todos" },
    { name: "📂 Task Board", href: "/taskboard" },
    { name: "📝 Notes App", href: "/notes" },
    { name: "⏲️ Pomodoro Timer", href: "/pomodoro" },
    { name: "📊 Habit Tracker", href: "/habits" },
    { name: "🧠 Flashcards", href: "/flashcards" },
    { name: "🧾 Invoice Generator", href: "/invoices" },
    { name: "📈 Analytics Dashboard", href: "/dashboard" },
    { name: "📁 File Uploads", href: "/uploads" },
    { name: "💬 Feedback Board", href: "/feedback" },
    { name: "🌍 URL Shortener", href: "/shortener" },
    { name: "📅 Booking Scheduler", href: "/scheduler" },
  ];

  
  return (
    <div className="min-h-screen p-8 sm:p-20 grid grid-rows-[auto_1fr_auto] items-center justify-items-center font-sans">
      <main className="w-full max-w-2xl row-start-2 flex flex-col items-start gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">🧰 Toolbox</h1>
          <p className="text-gray-600">Your collection of useful developer tools:</p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {tools.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="block px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md transition text-green-700 font-medium"
              >
                {tool.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}


