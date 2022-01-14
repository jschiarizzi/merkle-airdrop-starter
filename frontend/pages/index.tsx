import Image from "next/image"; // Images
import {eth} from "state/eth"; // State container
import Layout from "components/Layout"; // Layout wrapper
import {useRouter} from "next/router"; // Routing
import styles from "styles/pages/Home.module.scss"; // Page styles
import 'chart.js/auto';
import {Chart, Pie} from 'react-chartjs-2';

// Setup project details
const tokenName: string = process.env.NEXT_PUBLIC_TOKEN_NAME ?? "Token Name";

export default function Home() {
  // Routing
  const {push} = useRouter();
  // Authentication status
  const {address}: {address: string | null} = eth.useContainer();
  const data = {
    labels: [
      'Airdrop',
      'Treasury',
      'Core Team'
    ],
    datasets: [{
      data: [33, 66, 1],
     backgroundColor: [
        'rgb(171, 171, 171)',
        'rgb(9, 72, 146)',
        'rgb(16, 124, 241)'
      ],
    }]
  };
   const canvasStyle = {
        maxHeight: "300px",
        maxWidth: "300px",
        marginLeft: "auto",
        marginRight: "auto"
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
          HeroDAO has launched the first community owned super hero franchise,
          and our first physical comic book,
          <strong>Moon Girl, Issue #1</strong>, will be out in a few weeks. The
          Moon Rock token is a celebration of this new Heroes Universe, and
          rewards to users who have inspired both Hero DAO and other related
          projects. The token is similar to tickets won at an arcade for
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
        <div style={canvasStyle}>
            <Pie data={data} width={400} height={400}/>
        </div>
      </div>
    </Layout>
  );
}
