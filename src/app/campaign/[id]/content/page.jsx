const detailContent = async ({ params }) => {
  const id = (await params).id;
  return (
    <>
      <div>
        <h1>detail content {id}</h1>
      </div>
    </>
  );
};

export default detailContent;
