import Image from "next/image"; // Images
import {eth} from "state/eth"; // State container
import Layout from "components/Layout"; // Layout wrapper
import {useRouter} from "next/router"; // Routing
import styles from "styles/pages/Home.module.scss"; // Page styles

// Setup project details
const tokenName: string = process.env.NEXT_PUBLIC_TOKEN_NAME ?? "Token Name";

export default function Home() {
  // Routing
  const {push} = useRouter();
  // Authentication status
  const {address}: {address: string | null} = eth.useContainer();

  return (
    <Layout>
      <div className={styles.home}>
        {/* Project logo */}
        <div>
          <Image
            src="/moonrock_token.png"
            alt="Logo"
            width={250}
            height={250}
            priority
          />
        </div>

        {/* Project introduction article, if it exists */}
        {process.env.NEXT_PUBLIC_ARTICLE ? (
          <a
            href={process.env.NEXT_PUBLIC_ARTICLE}
            target="_blank"
            rel="noopener noreferrer"
          >
            Introducing {tokenName}{" "}
            <Image src="/icons/arrow.svg" alt="Arrow" height={12} width={12} />
          </a>
        ) : null}

        {/* Project heading */}
        <h1>Your ticket to the first community owned super hero franchise.</h1>

        {/* Project description */}
        <p>
          HeroDAO has launched the first community owned super hero franchise,
          and our first physical comic book,
          <strong> Moon Girl, Issue #1</strong>, will be out in a few weeks. The
          Moon Rock token is a celebration of our new Heroes Universe. The token
          rewards users who have inspired both Hero DAO and other related
          projects. Moon Rock is similar to tickets won at an arcade for
          participating and will primarily be used to redeem awesome prizes,
          like issues of our comic books and more that be revealed in the coming
          weeks.
        </p>

        {/* Claim button */}
        {!address ? (
          // If not authenticated, disabled
          <button disabled>Connect Wallet above to Claim MoonRock</button>
        ) : (
          // Else, reroute to /claim
          <button onClick={() => push("/claim")}>Claim Your MoonRock</button>
        )}

        <br />
        <h2>How is Moon Rock Distributed</h2>
        <p>
          <strong>33.3%</strong> - Airdrop to people we want to invite into our
          Hero ecosystem
          <br />
          <strong>66.7%</strong> - Directly into the <span></span>
          <u>
            <a href="https://app.daohaus.club/dao/0x64/0x82b09c514d5427c8184b2fe7dc9fa632a6c05c26/vaults/minion/0x136a66e6690637539a9e248a020a10405e495c58">
              DAO Treasury
            </a>
          </u>
        </p>
        <p>
          The DAO Treasury does not go to any individual or team members. Some
          portions of it, decided through votes and executed without human
          intervention, will go towards liquidity incentives, extra rewards for
          artists, and rewards for our licensing partners plus people who buy
          goods from them.
        </p>
        <p>pie chart here</p>

        <br />
        <h2>Who is being rewarded Moon Rock?</h2>
        <div className="text-left">
          <p>
            <ul>
              <li>Users who participated in the Greatest Larp</li>
              <li>Members of the Meta Cartel</li>
              <li>Meta Game seeds holders and LPs</li>
              <li>Minters of the firt PUNKS comic NFT</li>
              <li>Hero DAO members, pre Moon Rock launch</li>
            </ul>
          </p>
          <p>
            In total, this amounts to about 4000 addresses. If your address was
            included in multiple of these groups, then your total airdrop amount
            was mutlipled.
          </p>
        </div>

        <br />
        <h2>Moon Rock prize redemption</h2>
        <p>
          The primary use of Moon Rock will be redeeming prizes from Hero DAO
          and participating in our quickly growing ecosystem. The first of many
          things to redeem your Moon Rock for will be a
          <strong> Moon Girl, Issue #1</strong> comic. Comics will be redeemed
          for increasingly large amounts of Moon Rock accourding to this bonding
          curve.
        </p>
        <br />
        <iframe
          src="https://www.desmos.com/calculator/ig111sspnj?embed"
          width="500"
          height="500"
        ></iframe>
      </div>
    </Layout>
  );
}
