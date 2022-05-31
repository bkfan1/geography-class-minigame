export default function StaticFlag({ imageUrl }) {
  return (
    <>
      <img
        src={`assets/flags/${imageUrl}`}
        alt="guessed-flag"
        className="staticFlag"
      />
    </>
  );
}
