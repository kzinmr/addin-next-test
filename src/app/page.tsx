import Link from 'next/link'

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/taskpane">
          taskpane
        </Link>
      </li>
      <li>
        <Link href="/commands">
          commands
        </Link>
      </li>
    </ul>
  )
}
