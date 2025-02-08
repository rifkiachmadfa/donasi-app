const donors = async ({ params }) => {
  const id = (await params).id;
  return (
    <>
      <h1>donors detail for {id}</h1>
    </>
  );
};

export default donors;
