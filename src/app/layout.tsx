import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {NextUIProvider} from "@nextui-org/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokemon Trading Guide',
  description: 'Projeto para determinar trocas justas ou injustas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
