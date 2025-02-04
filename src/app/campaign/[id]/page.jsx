const detailPage = async ({ params }) => {
  const id = (await params).id;
  return (
    <>
      <div>
        <h1>detail page {id}</h1>
      </div>
    </>
  );
};

export default detailPage;
