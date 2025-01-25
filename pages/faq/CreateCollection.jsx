const CreateCollection = () => {
  return (
    <div className="w-full text-black">
      <h3 className="sm:text-xl font-medium sm:font-semibold text-black text-center my-2">
        {" "}
        How to Create a collection{" "}
      </h3>

      <div>
        <p className="">Step 1:</p>
        <p>
          Login to your account and and navigate to your profile page, select
          the collection tab an click on create
        </p>
      </div>
      <div>
        <p className="">Step 2:</p>
        <p>you are require to provide the following items</p>
        <ol className="list-decimal list-inside">
          <li>collection image </li>
          <li>collection name </li>
          <li>collection Default network </li>
        </ol>
        <p>
          Once you fill out the form and click on the "create" button you will
          be propmted to pay the creation fee which is a a default of 0.0025 ETH
        </p>
        <p>
          A menu will pop-up on your wallet to confirm the payment of the fee
          (0.0025 ETH). click on confirm
        </p>
      </div>
      <p>
        Once the payment is confirm on the blockchain the collection is created
        and you get the success message.
      </p>
      <p className="font-semibold">
        Please make sure you have sufficient funds to make the payment else the
        transaction will be cancelled.
      </p>
    </div>
  );
};
export default CreateCollection;
