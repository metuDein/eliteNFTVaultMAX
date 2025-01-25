const Trading = () => {
  return (
    <div className="w-full text-black">
      <h3 className="text-xl font-semibold mb-2">Selling</h3>
      <p>
        If you have an asset uploaded, your asset(s) will be available to buyers
        on the marketplace.{" "}
      </p>
      <p>
        To ensure a successful sale make sure the gas fees for your collection
        are covered to avoid unwanted fees on your buyers end.
      </p>
      <p>
        if all fees are covered, once your buyer attempts a purchase earnings
        are transfered to your balance and the withdrawal option will the
        available on the asset's collection page.{" "}
      </p>
      <p>
        To have your earning sent to your connected wallet click on the withdraw
        and make sure to cover the withdrawal fee.
      </p>
      <p>
        Once you done that you get an email notification and your earning will
        be available in your wallet
      </p>
      <p>
        Withdrawal can take up to 1 - 24 hours (3 days on worst case scenerio)
      </p>
      <h3 className="text-xl font-semibold mt-1 sm:mt-4 mb-2">Buying</h3>
      <p>
        If you have selected an asset you want to purchase from the marketplace.{" "}
      </p>
      <p>
        To ensure a successful sale make sure you have enough balance to cover
        the purchase plus additional fees.
      </p>
      <p>
        if all fees are covered, click on the buy now button and the trancation
        should be successful
      </p>
      <p>
        If you run into and error it could be from the sellers end or the gas
        fee for the assets collection are not paid.
      </p>
    </div>
  );
};
export default Trading;
