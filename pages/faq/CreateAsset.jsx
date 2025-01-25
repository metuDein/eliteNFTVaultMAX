const CreateAsset = () => {
  return (
    <div className="w-full text-black">
      <h3 className="sm:text-xl font-medium sm:font-semibold text-black text-center my-2">
        {" "}
        How to create an asset{" "}
      </h3>

      <div>
        <p className="">Step 1:</p>
        <p>
          To create an asset you need to have a collection if you already have
          one. head to your profile and select the collection to want to add
          assets to and click on the add asset button
        </p>
      </div>
      <div>
        <p className="">Step 2:</p>
        <p>
          you are require to provide the following items in order to create an
          asset
        </p>
        <ol className="list-decimal list-inside">
          <li>Asset image </li>
          <li>Price : the amount your selling the asset for. </li>
          <li>Supply: the amount you want available for sale. </li>
          <li>Select a category of your. </li>
          <li>Add a little description (optional). </li>
        </ol>
        <p>Once you fill out the form and click on the "create" button</p>
      </div>
      <p>
        Once it is created you will get a success message at the top left corner
        of your screen.
      </p>
    </div>
  );
};
export default CreateAsset;
