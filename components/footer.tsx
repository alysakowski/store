import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-100 py-16 mt-8">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col justify-start gap-8">
          {/* Links Section */}
          <div className="flex gap-8 text-sm">
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>

              <ul className="space-y-2">
                <li className="hover:underline">
                  <Link href="/category/watches">Watches</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/category/bags">Bags</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-end text-sm border-t pt-4">
            All rights reserved &copy; 2024 by
            <a
              href="https://github.com/alysakowski"
              className="hover:text-foreground ml-1 underline underline-offset-4"
            >
              @alysakowski
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
