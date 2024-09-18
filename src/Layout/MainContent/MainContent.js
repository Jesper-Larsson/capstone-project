import "./MainContent.css";
const MainContent = () => (
  <main>
    <h1>Main element - content here</h1>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
      <>
        <div key={id}>div with id: {id}</div>
        <br />
        <br />
      </>
    ))}
  </main>
);

export default MainContent;
