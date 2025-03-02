import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from "@/components/ui/mode-toggle";
import { GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold">Sstudize</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className='border border-input'>Login</Button>
          </Link>
          <ModeToggle />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Track Student Performance with Ease
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Sstudize provides a comprehensive dashboard for parents and teachers to monitor student progress, attendance, and performance.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login?role=teacher">
                    <Button size="lg">Teacher Login</Button>
                  </Link>
                  <Link href="/login?role=parent">
                    <Button size="lg" variant="outline">Parent Login</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Dashboard Preview"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop&auto=format"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Features
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our dashboard provides powerful tools for monitoring and improving student performance.
                </p>
              </div>
              <div className="grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="rounded-full bg-primary p-2 text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Performance Tracking</h3>
                  <p className="text-muted-foreground">
                    Monitor student performance across all subjects with detailed charts and analytics.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="rounded-full bg-primary p-2 text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Attendance Monitoring</h3>
                  <p className="text-muted-foreground">
                    Keep track of attendance records and identify patterns to improve engagement.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="rounded-full bg-primary p-2 text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Progress Reports</h3>
                  <p className="text-muted-foreground">
                    Generate comprehensive progress reports to track improvement over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center border-t py-6">
        <p className="text-sm text-muted-foreground">
          © 2025 Sstudize. All rights reserved.
        </p>
      </footer>
    </div>
  );
}