import Image from "next/image"; // Images
import {eth} from "state/eth"; // State container
import Layout from "components/Layout"; // Layout wrapper
import {useRouter} from "next/router"; // Routing
import styles from "styles/pages/Home.module.scss"; // Page styles
import "chart.js/auto";
import {Chart, Pie} from "react-chartjs-2";

// Setup project details
const tokenName: string = process.env.NEXT_PUBLIC_TOKEN_NAME ?? "Token Name";

export default function Home() {
  // Routing
  const {push} = useRouter();
  // Authentication status
  const {address}: {address: string | null} = eth.useContainer();
  const data = {
    labels: ["DAO Treasury", "Airdrop"],
    datasets: [
      {
        data: [66, 34],
        backgroundColor: ["#54A0FF", "#2E86DE"],
      },
    ],
  };
  const data2 = {
    labels: [
      "DAO Reserve",
      "Product Rewards",
      "LP Incentives",
      "Artist Rewards",
    ],
    datasets: [
      {
        data: [65, 10, 10, 15],
        backgroundColor: ["#54A0FF", "#256BB2", "#98C6FF", "#1C5085"],
      },
    ],
  };

  const canvasStyle = {
    maxHeight: "300px",
    maxWidth: "300px",
    marginLeft: "auto",
    marginRight: "auto",
  };

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
          Hero DAO has launched the first community owned super hero franchise,
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
          <button disabled>
            Connect Wallet above to Claim Moon Rock on Gnosis Chain
          </button>
        ) : (
          // Else, reroute to /claim
          <button onClick={() => push("/claim")}>
            Claim Your Moon Rock on Gnosis Chain (xdai)
          </button>
        )}

        <br />
        <Image src="/moon-rock-found.png" height={450} width={300} />
        <br />
        <h2>What to do next, after claiming?</h2>
        <p>
          After you claim your Moon Rock, or if you are looking for more info,
          consider joining our discord community, participating in a Town Hall
          (Wednesdays at 4:30 PM EST), and contributing to Hero DAO!
        </p>
        <p>
          You can provide Moon Rock tokens to{" "}
          <strong>
            <a href="https://swapr.eth.link/#/add/0x481D6104761442F162d1f7AC3DC6F98896e7A4ef/XDAI?chainId=100">
              this swapr liquidity pool{" "}
            </a>
          </strong>
          and earn additional rewards. If certain liquidity goals are hit as a
          community, additional rewards are unlocked through{" "}
          <strong>
            <a href="https://carrot.eth.link/#/?chainId=100">Carrot.</a>{" "}
          </strong>
        </p>

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
        <div style={canvasStyle}>
          <Pie data={data} width={400} height={400} />
        </div>
        <p>
          The DAO Treasury does not go to any individual or team members. Some
          portions of it, decided through votes and executed without human
          intervention, will go towards liquidity incentives, extra rewards for
          artists, and rewards for our licensing partners plus people who buy
          goods from them.
        </p>
        <p>
          The DAO Treasury will be further broken up into a long term Reserve,
          and rewards for contributors, although specific percentages / amounts
          are still being voted on.
        </p>
        <div style={canvasStyle}>
          <Pie data={data2} width={400} height={400} />
        </div>

        <br />
        <h2>Who is being rewarded Moon Rock?</h2>
        <div className="text-left">
          <ul>
            <li>Users who participated in the Greatest Larp</li>
            <li>Members of the Meta Cartel</li>
            <li>Meta Game seeds holders and LPs</li>
            <li>Minters of the firt PUNKS comic NFT</li>
            <li>Hero DAO members, pre Moon Rock launch</li>
          </ul>
          <p>
            In total, this amounts to about ~3000 addresses. If your address was
            included in multiple of these groups, then your total airdrop amount
            was mutlipled. Check{" "}
            <u>
              <a href="https://github.com/HeroDAO/moonrock-airdrop">here </a>
            </u>
            for a full list of addresses included.
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
