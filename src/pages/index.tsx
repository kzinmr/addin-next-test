import { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
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

export default Home