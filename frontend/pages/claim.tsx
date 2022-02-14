import {eth} from "state/eth"; // Global state: ETH
import Image from "next/image"; // Images
import {useState} from "react"; // State management
import {token} from "state/token"; // Global state: Tokens
import Layout from "components/Layout"; // Layout wrapper
import styles from "styles/pages/Claim.module.scss"; // Page styles

export default function Claim() {
  // Global ETH state
  const {address, unlock}: {address: string | null; unlock: Function} =
    eth.useContainer();
  // Global token state
  const {
    dataLoading,
    numTokens,
    alreadyClaimed,
    claimAirdrop,
  }: {
    dataLoading: boolean;
    numTokens: number;
    alreadyClaimed: boolean;
    claimAirdrop: Function;
  } = token.useContainer();
  // Local button loading
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  /**
   * Claims airdrop with local button loading
   */
  const claimWithLoading = async () => {
    setButtonLoading(true); // Toggle
    await claimAirdrop(); // Claim
    setButtonLoading(false); // Toggle
  };

  return (
    <Layout>
      <div className={styles.claim}>
        {!address ? (
          // Not authenticated
          <div className={styles.card}>
            <h1>You are not authenticated.</h1>
            <p>Please connect with your wallet to check your airdrop.</p>
            <button onClick={() => unlock()}>Connect Wallet</button>
          </div>
        ) : dataLoading ? (
          // Loading details about address
          <div className={styles.card}>
            <h1>
              Loading airdrop details... Make sure you are on Gnosis Chain
              (xdai)
            </h1>
            <p>Please wait while we calculate details about your address.</p>
          </div>
        ) : numTokens == 0 ? (
          // Not part of airdrop
          <div className={styles.card}>
            <h1>You do not qualify.</h1>
            <p>
              Unfortunately, your address does not qualify for the airdrop. But
              there are still lots of ways to get involved in Hero DAO and earn
              Moon Rock tokens and shares in the DAO.
            </p>
          </div>
        ) : alreadyClaimed ? (
          // Already claimed airdrop
          <div className={styles.card}>
            <h1>Congrats! You've claimed your airdrop already! 🎉🎉🎉</h1>
            <p>
              Your address ({address}) has already claimed {numTokens} tokens on{" "}
              {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}.
            </p>
            <br />
            <Image src="/moon-rock-found.png" height={450} width={300} />
            <br />
            <h2>What to do next, after claiming?</h2>
            <p>
              After you claim your Moon Rock, or if you are looking for more
              info, consider joining our discord community, participating in a
              Town Hall (Wednesdays at 4:30 PM EST), and contributing to Hero
              DAO!
            </p>
            <p>
              You can provide Moon Rock tokens to{" "}
              <strong>
                <a href="https://swapr.eth.link/#/add/0x481D6104761442F162d1f7AC3DC6F98896e7A4ef/XDAI?chainId=100">
                  this swapr liquidity pool{" "}
                </a>
              </strong>
              and earn additional rewards. If certain liquidity goals are hit as
              a community, additional rewards are unlocked are unlocked through{" "}
              <strong>
                <a href="https://carrot.eth.link/#/?chainId=100">Carrot.</a>{" "}
              </strong>
            </p>
          </div>
        ) : (
          // Claim your airdrop
          <div className={styles.card}>
            <h1>Claim your airdrop.</h1>
            <p>Your address qualifies for {numTokens} Moon Rock.</p>
            <button onClick={claimWithLoading} disabled={buttonLoading}>
              {buttonLoading ? "Claiming Airdrop..." : "Claim Airdrop"}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
